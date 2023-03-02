import { API_URL } from './constants';

class Api {
  private _url: string;

  constructor(url: string) {
    this._url = url;
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await this._checkResponse(data);
    
    return response;
  }
}

const api = new Api(API_URL);

export { api };