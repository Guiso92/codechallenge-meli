import { get } from "./base";

export const Items = {
  index: (params) => get(`api/items?q=${params}`),
  single: (id) => get(`api/items/${id}`),
};
