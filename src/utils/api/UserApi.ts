import { Api } from './Api';
import { API_URL } from '../constants';

class UserApi extends Api {
  constructor(url: string, headers: HeadersInit) {
    super(url, headers);
  }

  public async getUser() {
    const data = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    });

    return this.checkResponse(data);
  }

  public async updateUser(email: string, firstName: string, lastName: string) {
    const data = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    return this.checkResponse(data);
  }

  public async getUserOrders() {
    const data = await fetch(`${this.url}/get_orders`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    });

    return this.checkResponse(data);
  }
}

export const userApi = new UserApi(API_URL, {
  'Content-Type': 'application/json',
});
