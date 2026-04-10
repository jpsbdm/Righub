import { signUp, login, updateProfile, checkAccess, User } from '../../src/backend/auth';

describe('Authentication Service', () => {
  it('should sign up a new user with Free role', async () => {
    const user: User = await signUp('test@example.com', 'password123');
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('Free');
  });

  it('should return a JWT token and user on login', async () => {
    const res = await login('test@example.com', 'password123');
    expect(res.token).toBe('jwt-token-placeholder');
    expect(res.user.email).toBe('test@example.com');
  });

  it('should update user profile', async () => {
    const user = await updateProfile('uid123', { fullName: 'John Doe' });
    expect(user.profile?.fullName).toBe('John Doe');
  });

  it('should check role-based access correctly', async () => {
    const freeUser: User = { id: '1', email: 'f@e.com', role: 'Free' };
    const proUser: User = { id: '2', email: 'p@e.com', role: 'Pro' };

    expect(await checkAccess(freeUser, 'Free')).toBe(true);
    expect(await checkAccess(freeUser, 'Pro')).toBe(false);
    expect(await checkAccess(proUser, 'Pro')).toBe(true);
    expect(await checkAccess(proUser, 'Free')).toBe(true);
  });
});

