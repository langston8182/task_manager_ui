import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const COGNITO_URL = 'https://auth.cyrilmarchive.com';
export const CLIENT_ID = '1hg85eeoni6k1q6lg5sf61tnh4';
export const REDIRECT_URI = 'https://taskui.cyrilmarchive.com';

interface UserInfo {
  givenName: string;
  familyName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  authCode: string | null;
  accessToken: string | null;
  idToken: string | null;
  userInfo: UserInfo | null;
  setAuthCode: (code: string | null) => void;
  setTokens: (accessToken: string, idToken: string) => void;
  setUserInfo: (info: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      authCode: null,
      accessToken: null,
      idToken: null,
      userInfo: null,
      setAuthCode: (code) => set({ isAuthenticated: !!code, authCode: code }),
      setTokens: (accessToken, idToken) => set({ accessToken, idToken }),
      setUserInfo: (userInfo) => set({ userInfo }),
      logout: () => {
        set({ isAuthenticated: false, authCode: null, accessToken: null, idToken: null, userInfo: null });
        const params = new URLSearchParams({
          client_id: CLIENT_ID,
          logout_uri: REDIRECT_URI
        });
        window.location.href = `${COGNITO_URL}/logout?${params.toString()}`;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const redirectToAuth = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    scope: 'email openid profile',
    redirect_uri: REDIRECT_URI,
  });

  window.location.href = `${COGNITO_URL}/login?${params.toString()}`;
};