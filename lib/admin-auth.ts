// Admin Authentication Service
const ADMIN_KEY = 'gofamintrpt_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export class AdminAuthService {
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const session = localStorage.getItem(ADMIN_KEY);
    if (!session) return false;
    
    try {
      const { expiry } = JSON.parse(session);
      if (Date.now() > expiry) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  static login(password: string): boolean {
    // Get password from environment or use default
    // In production, use a proper auth system
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'RoyalPriesthood2025';
    
    if (password === adminPassword) {
      const session = {
        authenticated: true,
        expiry: Date.now() + SESSION_DURATION,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_KEY);
    }
  }

  static getSessionInfo(): { loginTime: string; expiresIn: number } | null {
    if (typeof window === 'undefined') return null;
    
    const session = localStorage.getItem(ADMIN_KEY);
    if (!session) return null;
    
    try {
      const { expiry, loginTime } = JSON.parse(session);
      return {
        loginTime,
        expiresIn: Math.max(0, expiry - Date.now())
      };
    } catch {
      return null;
    }
  }
}
