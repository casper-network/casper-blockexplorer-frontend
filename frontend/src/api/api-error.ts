interface ApiErrorConfig {
  message: string;
  type: string;
  data?: Record<string, unknown>;
}

export class ApiError extends Error {
  type: ApiErrorConfig['type'];

  data: ApiErrorConfig['data'];

  constructor({ message, type, data = {} }: ApiErrorConfig) {
    super(message);
    this.type = type;
    this.data = data;
  }
}
