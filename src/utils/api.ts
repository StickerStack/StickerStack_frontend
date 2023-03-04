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
    return Promise.reject(`Ошибка ${res.status}`);
  }

  public async signUp(email: string, password: string) {
    const data = await fetch(`${this._url}/auth/register`, {
      method: "POST",
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
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await this._checkResponse(data);
    
    return response;
  }

  public async logOut() {
    const data = await fetch(`${this._url}/auth/logout`, {
      method: "POST",
      headers: this._headers,
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async getUser() {
    const data = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });

    const response = await this._checkResponse(data);

    return response;
  }

  public async updateUser(email: string, password: string) {
    const data = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await this._checkResponse(data);

    return response;
  }
}

const api = new Api(API_URL, {
  "Content-Type": "application/json",
});

export { api };