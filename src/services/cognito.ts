import { useAuthStore } from './auth';

const TOKEN_ENDPOINT = 'https://eu-west-3tombzuhsn.auth.eu-west-3.amazoncognito.com/oauth2/token';
const CLIENT_ID = '1hg85eeoni6k1q6lg5sf61tnh4';
const REDIRECT_URI = 'https://taskui.cyrilmarchive.com';
const CLIENT_SECRET = 'i0muoh8cqcov2mdd51q6j1sb1dd6crn6aapts6ltdhe273mt2v7';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
  return JSON.parse(jsonPayload);
}

export const exchangeCodeForToken = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'échange du code');
    }

    const data = await response.json();
    const { access_token, id_token } = data;
    
    const decodedToken = parseJwt(id_token);
    const userInfo = {
      givenName: decodedToken.given_name,
      familyName: decodedToken.family_name
    };

    const authStore = useAuthStore.getState();
    authStore.setTokens(access_token, id_token);
    authStore.setUserInfo(userInfo);

    return access_token;
  } catch (error) {
    console.error('Erreur lors de l\'échange du code:', error);
    throw error;
  }
};