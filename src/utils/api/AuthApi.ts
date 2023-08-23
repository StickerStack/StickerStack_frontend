import { Api } from './Api';
import { API_URL } from '../constants';

class AuthApi extends Api {
  constructor(url: string, headers: HeadersInit) {
    super(url, headers);
  }

  private _formatingData(email: string, password: string) {
    const data = new URLSearchParams();
    data.append('username', email);
    data.append('password', password);
    return data;
  }

  public async signUp(email: string, password: string) {
    const data = await fetch(`${this.url}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    return this.checkResponse(data);
  }

  public async signIn(email: string, password: string) {
    const data = await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this._formatingData(email, password),
    });

    return this.checkResponse(data);
  }

  public async logOut() {
    const data = await fetch(`${this.url}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    });

    return this.checkResponse(data);
  }

  public async forgotPassword(email: string) {
    const data = await fetch(`${this.url}/auth/forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
      }),
    });

    return this.checkResponse(data);
  }

  public async resetPassword(token: string, newPassword: string) {
    const data = await fetch(`${this.url}/auth/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        token: token,
        password: newPassword,
      }),
    });

    return this.checkResponse(data);
  }

  public async verifyEmail(token: string) {
    const data = await fetch(`${this.url}/auth/verify-email`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        token: token,
      }),
    });

    return this.checkResponse(data);
  }

  public async sendVerifycationCode() {
    const data = await fetch(`${this.url}/auth/send-verification-code`, {
      method: 'GET',
      credentials: 'include',
    });

    return this.checkResponse(data);
  }
}

export const authApi = new AuthApi(API_URL, {
  'Content-Type': 'application/json',
});
