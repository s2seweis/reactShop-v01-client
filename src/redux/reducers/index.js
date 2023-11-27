import authReducer from './authReducer';
import basketReducer from './basketReducer';
import checkoutReducer from './checkoutReducer';
import filterReducer from './filterReducer';
import miscReducer from './miscReducer';
import productReducer from './productReducer';
import settingReducer from './settingReducer';
import ingredientReducer from './ingredientReducer';
import orderReducer from './orderReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';

const rootReducer = {
  products: productReducer,
  settings: settingReducer,
  ingredients: ingredientReducer,
  orders: orderReducer,
  posts: postReducer,
  users: userReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  checkout: checkoutReducer,
  app: miscReducer
};

export default rootReducer;
