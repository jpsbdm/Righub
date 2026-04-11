import { jest } from '@jest/globals';

export const db = {
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => [{ id: 'mock-id', userId: 'uid123', garageId: 'gid123' }])
    }))
  })),
  select: jest.fn(() => ({
    from: jest.fn(() => ({
      where: jest.fn(() => [{ id: 'mock-id', userId: 'uid123' }])
    }))
  })),
  delete: jest.fn(() => ({
    where: jest.fn(() => ({
      returning: jest.fn(() => [{ id: 'mock-id' }])
    }))
  })),
  update: jest.fn(() => ({
    set: jest.fn(() => ({
      where: jest.fn(() => ({
        returning: jest.fn(() => [{ id: 'mock-id' }])
      }))
    }))
  }))
};
