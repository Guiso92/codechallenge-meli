export interface BaseData {
  author: {
    name: string;
    lastname: string;
  };
  categories: Array<string>;
  items: Array<Items>;
}

export interface Items {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  address: string;
}
