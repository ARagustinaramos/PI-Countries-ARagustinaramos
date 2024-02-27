import { INGRESAR_HOME_PAGE } from './actionTypes';

const initialState = {
    isLoggedIn: false,
    user: null,
  };

  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
  case INGRESAR_HOME_PAGE:
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload, 
    };
    default:
      return state;
}}
export default homeReducer;