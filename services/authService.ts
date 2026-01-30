// Simple simulated auth service using localStorage
const USER_KEY = 'lingocalm_user';

export const login = async (email: string): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email.includes('@')) {
    localStorage.setItem(USER_KEY, JSON.stringify({ email }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(USER_KEY);
};

export const getCurrentUserEmail = (): string | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data).email : null;
};