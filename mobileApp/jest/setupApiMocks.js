// Create mock axios instance
export const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn((successFn, errorFn) => {
        mockAxiosInstance.interceptors.request.successHandler = successFn;
        mockAxiosInstance.interceptors.request.errorHandler = errorFn;
      }),
    },
    response: {
      use: jest.fn((successFn, errorFn) => {
        mockAxiosInstance.interceptors.response.successHandler = successFn;
        mockAxiosInstance.interceptors.response.errorHandler = errorFn;
      }),
    },
  },
};

// Mock the axios module
jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
  interceptors: {
    request: {use: jest.fn()},
    response: {use: jest.fn()},
  },
}));

// Mock the apiConfig
jest.mock('../src/config/apiConfig.js', () => {
  return jest.fn(() => mockAxiosInstance);
});
