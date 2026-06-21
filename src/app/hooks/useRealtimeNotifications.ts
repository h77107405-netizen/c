import { useEffect, useRef, useCallback } from 'react';

export type RealtimeNotificationEvent = {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  createdAt: string;
  isRead: boolean;
};

type Options = {
  onNotification: (n: RealtimeNotificationEvent) => void;
  enabled?: boolean;
};

export function useRealtimeNotifications({ onNotification, enabled = true }: Options) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectDelay = useRef(1000);
  const mountedRef = useRef(true);
  const onNotificationRef = useRef(onNotification);
  onNotificationRef.current = onNotification;

  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // Determine WebSocket URL — in dev this goes via Vite proxy at /ws
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectDelay.current = 1000; // reset backoff on success
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'notification' && msg.data) {
            onNotificationRef.current(msg.data as RealtimeNotificationEvent);
          }
          // handle ping from server
          if (msg.type === 'ping') {
            ws.send(JSON.stringify({ type: 'pong' }));
          }
        } catch {}
      };

      ws.onclose = (e) => {
        wsRef.current = null;
        // 4001/4002 = auth failure, don't reconnect
        if (e.code === 4001 || e.code === 4002) return;
        if (!mountedRef.current) return;

        // Exponential backoff: 1s → 2s → 4s → ... max 30s
        reconnectTimer.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
          connect();
        }, reconnectDelay.current);
      };

      ws.onerror = () => {
        ws.close();
      };
    } catch {}
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (enabled) connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [enabled, connect]);

  const disconnect = useCallback(() => {
    mountedRef.current = false;
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    wsRef.current?.close();
  }, []);

  return { disconnect };
}
