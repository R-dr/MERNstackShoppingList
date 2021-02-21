import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "../actions/authActions";
import { returnErrors } from "../actions/errorActions";
// to connect to the back end you need to add the dispatch the the function call
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
// dispatch edded for database connection
export const addItem = (item) => (dispatch, getState) => {
  axios.post("/api/items", item,tokenConfig(getState)).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  ).catch((err) =>
  dispatch(returnErrors(err.response.data, err.response.status))
);
};
//delete item needs a payload with the item id so it knows what item to delete
export const deleteItem = (id) => (dispatch,getState) => {
  axios.delete(`api/items/${id}`,tokenConfig(getState)).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  ).catch((err) =>
  dispatch(returnErrors(err.response.data, err.response.status))
);
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
