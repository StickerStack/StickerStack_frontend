import { API_URL } from './constants';

class Api {
  private _url: string;
  private _headers: HeadersInit;

  constructor(url: string, headers: HeadersInit) {
    this._url = url;
    this._headers = headers;
  }

  private _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }

    // Для тестов бэкенда 
    res.json().then(res => console.log(res.detail));

    return Promise.reject(`${res.status}`);
  }

  private _formatingData(email: string, password: string) {
    const data = new URLSearchParams();

    data.append('username', email);
    data.append('password', password);

    return data;
  }

  public async signUp(email: string, password: string) {
    const data = await fetch(`${this._url}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async signIn(email: string, password: string) {
    const data = await fetch(`${this._url}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this._formatingData(email, password),
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async logOut() {
    const data = await fetch(`${this._url}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async getUser() {
    const data = await fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async updateUser(email: string, password: string) {
    const data = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async forgotPassword(email: string) {
    const data = await fetch(`${this._url}/auth/forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async resetPassword(token: string, newPassword: string) {
    const data = await fetch(`${this._url}/auth/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        token: token,
        password: newPassword
      }),
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async verifyEmail(token: string) {
    const data = await fetch(`${this._url}/auth/verifyemail`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        token: token
      })
    });

    const response = await this._checkResponse(data);
        
    return response;
  }
}

const api = new Api(API_URL, {
  'Content-Type': 'application/json',
});

export { api };
