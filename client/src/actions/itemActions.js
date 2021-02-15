import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";

export const getItems = () => {
  return {
    type: GET_ITEMS,
  };
};
//delete item needs a payload with the item id so it knows what item to delete
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};
export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};