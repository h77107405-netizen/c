// ============================================
// DATABASE CONFIGURATION
// ============================================

import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/coaching-platform';
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ Database connected successfully');
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}
