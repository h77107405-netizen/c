import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { verifyToken } from '../utils/jwt.js';

interface AuthenticatedClient {
  ws: WebSocket;
  userId: string;
  role: string;
  isAlive: boolean;
}

const clients = new Map<string, Set<AuthenticatedClient>>();

let wss: WebSocketServer | null = null;

export function createWsServer(server: any) {
  wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    // Extract token from query string: /ws?token=...
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(4001, 'No token');
      return;
    }

    const user = verifyToken(token);
    if (!user) {
      ws.close(4002, 'Invalid token');
      return;
    }

    const client: AuthenticatedClient = { ws, userId: user.id, role: user.role, isAlive: true };

    if (!clients.has(user.id)) clients.set(user.id, new Set());
    clients.get(user.id)!.add(client);

    ws.send(JSON.stringify({ type: 'connected', data: { userId: user.id, role: user.role } }));

    ws.on('pong', () => { client.isAlive = true; });

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }));
      } catch {}
    });

    ws.on('close', () => {
      clients.get(user.id)?.delete(client);
      if (clients.get(user.id)?.size === 0) clients.delete(user.id);
    });

    ws.on('error', () => {});
  });

  // Heartbeat: ping every 25s, close stale connections
  const heartbeat = setInterval(() => {
    clients.forEach((userClients) => {
      userClients.forEach((client) => {
        if (!client.isAlive) {
          client.ws.terminate();
          userClients.delete(client);
          return;
        }
        client.isAlive = false;
        client.ws.ping();
      });
    });
  }, 25000);

  wss.on('close', () => clearInterval(heartbeat));

  console.log('🔌 WebSocket server initialized at /ws');
  return wss;
}

// Send a notification event to a specific user (all their open sessions)
export function emitToUser(userId: string, event: object) {
  const userClients = clients.get(userId);
  if (!userClients) return;
  const payload = JSON.stringify({ type: 'notification', data: event });
  userClients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(payload);
    }
  });
}

// Send to all connected clients of a given role
export function emitToRole(role: string, event: object) {
  const payload = JSON.stringify({ type: 'notification', data: event });
  clients.forEach((userClients) => {
    userClients.forEach((client) => {
      if (client.role === role && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(payload);
      }
    });
  });
}

// Send to a list of userIds
export function emitToUsers(userIds: string[], event: object) {
  const payload = JSON.stringify({ type: 'notification', data: event });
  userIds.forEach((uid) => {
    clients.get(uid)?.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) client.ws.send(payload);
    });
  });
}

// Broadcast to all connected clients
export function emitToAll(event: object) {
  const payload = JSON.stringify({ type: 'notification', data: event });
  clients.forEach((userClients) => {
    userClients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) client.ws.send(payload);
    });
  });
}

// Get stats
export function getWsStats() {
  let total = 0;
  clients.forEach((s) => { total += s.size; });
  return { connectedUsers: clients.size, totalConnections: total };
}
