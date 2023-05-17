import { PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { AppState } from './store';

export const socketIOUrl = 'http://127.0.0.1:4000/gateway';

type CreateSocketOptions = {
  socketIOUrl: string;
  state: AppState;
  actions: PayloadAction;
};

export const createSocketWithHandlers = ({
  socketIOUrl,
  state,
  actions,
}: CreateSocketOptions): Socket => {
  console.log('create socket...');

  const socket = io(socketIOUrl, {
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log(`connected with socket id: ${socket.id}.`);
  });

  return socket;
};
