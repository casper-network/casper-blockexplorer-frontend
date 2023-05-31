import { SocketServerMock } from 'socket.io-mock-ts';
import { Home } from 'src/pages';
import { render } from 'src/test-utils';

jest.mock('socket.io-client');

const mockMessage = 'message from server';

describe('Socket connection', () => {
  let socket: SocketServerMock;

  beforeEach(() => {
    socket = new SocketServerMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should connect to mock server', () => {
    render(<Home />);

    expect(socket.clientMock.connected).toBeTruthy();
  });

  it('should listen for data from mock server', async () => {
    render(<Home />);

    const data = await new Promise(resolve => {
      socket.on('message', (message: string) => {
        resolve(message);
      });

      socket.clientMock.emit('message', mockMessage);
    });

    expect(data).toBe(mockMessage);
  });
});
