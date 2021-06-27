import { BaseData, Items } from "./items.interface";
import { Item } from "./item.interface";

const fetch = require("node-fetch");

export const findAll = async (query: string): Promise<BaseData> => {
  let data: BaseData;

  try {
    let categories: Array<string> = [];
    const resp = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );
    let items = await resp.json();
    const formatItems: [Items] = items.results.map((x: any) => {
      categories.push(x.category_id);
      return {
        id: x.id,
        title: x.title,
        price: {
          currency: x.currency_id,
          amount: x.price,
          decimals: 0,
        },
        picture: x.thumbnail,
        condition: x.condition,
        free_shipping: x.shipping.free_shipping,
        address: x.address.state_name,
      };
    });
    categories = [...new Set(categories)];

    data = {
      author: {
        name: "",
        lastname: "",
      },
      categories,
      items: formatItems,
    };
  } catch (err) {
    return err;
  }

  return data;
};

export const find = async (productId: string): Promise<Item> => {
  let data: Item;

  try {
    const itemTmp = await fetch(
      `https://api.mercadolibre.com/items/${productId}`
    );
    const item = await itemTmp.json();
    const url = `https://api.mercadolibre.com/items/${productId}/description`;
    const descTmp = await fetch(url);
    let desc = await descTmp.json();
    const {
      id,
      title,
      price,
      currency_id,
      pictures,
      condition,
      shipping: { free_shipping },
      sold_quantity,
      permalink,
    } = item;

    data = {
      author: {
        name: "",
        lastname: "",
      },
      item: {
        id,
        title,
        price: {
          currency: currency_id,
          amount: price,
          decimals: 0,
        },
        picture: pictures[0]?.secure_url,
        condition,
        free_shipping,
        sold_quantity,
        description: desc.plain_text,
        link: permalink,
      },
    };
  } catch (err) {
    return err;
  }

  return data;
};
