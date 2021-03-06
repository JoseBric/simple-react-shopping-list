import Axios from "axios";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())

  Axios.get('/api/items')
    .then(res => {
      dispatch({
        type: 'GET_ITEMS',
        payload: res.data
    })})
}

export const deleteItem = id => dispatch => {
  Axios.delete(`/api/items/${id}`)
    .then(res => dispatch({
      type: 'DELETE_ITEM',
      payload: id,
    }))
}

export const addItem = item => dispatch => {
  Axios.post('/api/items', item)
    .then(res => dispatch({
      type: 'ADD_ITEM',
      payload: res.data,
    }))
}

export const setItemsLoading = () => dispatch => {
  return {
    type: 'ITEMS_LOADING',
  }
}