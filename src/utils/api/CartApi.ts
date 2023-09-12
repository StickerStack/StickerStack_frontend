import { Api } from './Api';
import { API_URL } from '../constants';
import { ISticker as IStickerNew } from '../../interfaces/ISticker-new';
import { ISticker } from '../../interfaces';

class CartApi extends Api {
  constructor(url: string, headers: HeadersInit) {
    super(url, headers);
  }

  public async addSticker(stickers: IStickerNew) {
    const data = await fetch(`${this.url}/cart/add_stickers`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(stickers),
    });

    return this.checkResponse(data);
  }

  public async addStickers(stickers: IStickerNew[]) {
    const data = await fetch(`${this.url}/cart/add_stickers`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(stickers),
    });

    return this.checkResponse(data);
  }

  public async getCart() {
    const data = await fetch(`${this.url}/cart`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    });

    return this.checkResponse(data);
  }

  public async deleteSticker(id: string) {
    const data = await fetch(`${this.url}/cart/delete_sticker`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        uuid: id,
      }),
    });

    return this.checkResponse(data);
  }

  public async uploadOrder(
    cost: number,
    address: string,
    number: number,
    cropping: boolean,
    stickers: Array<ISticker>,
  ) {
    const data = await fetch(`${this.url}/orders/add_order`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        cost: cost,
        address: address,
        number_of_sheets: number,
        cropping: cropping,
        stickers: stickers,
      }),
    });

    return this.checkResponse(data);
  }

  public async putStickerInCart(sticker: IStickerNew) {
    const body = {
      image: sticker.image,
      amount: sticker.amount,
      shape: sticker.shape,
      height: sticker.height,
      width: sticker.width,
      optimal_width: sticker.optimal_width,
      optimal_height: sticker.optimal_height,
    };
    const data = await fetch(`${this.url}/cart/update_sticker/${sticker.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return this.checkResponse(data);
  }
}

export const cartApi = new CartApi(API_URL, {
  'Content-Type': 'application/json',
});
