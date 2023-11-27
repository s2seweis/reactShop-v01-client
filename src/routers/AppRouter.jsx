import { Basket } from 'components/basket';
import { Footer, Navigation } from 'components/common';
import * as ROUTES from 'constants/routes';
import * as ROUTE from 'constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import * as view from 'views';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import MenuBurger from '../components/common/Navigation/MenuBurger';
import '../styles/menu/index.scss'

export const history = createBrowserHistory();

const AppRouter = () => {

  return (
    <Router history={history}>
      <>
        <Navigation />
        <Basket />
        <Switch>
          <Route
            component={view.Search}
            exact
            path={ROUTES.SEARCH}
          />
          <Route
            component={view.Home}
            exact
            path={ROUTES.HOME}
          />
          <Route
            component={view.Post}
            exact
            path={ROUTES.POST}
          />
          <Route
            component={view.Shop}
            exact
            path={ROUTES.SHOP}
          />
          <Route
            component={view.FeaturedProducts}
            exact
            path={ROUTES.FEATURED_PRODUCTS}
          />
          <Route
            component={view.RecommendedProducts}
            exact
            path={ROUTES.RECOMMENDED_PRODUCTS}
          />
          {/* ### - Stripe */}
          <PublicRoute
            component={view.Completion}
            path={ROUTES.COMPLETION}
          />
          <PublicRoute
            component={view.SignUp}
            path={ROUTES.SIGNUP}
          />
          <PublicRoute
            component={view.SignIn}
            exact
            path={ROUTES.SIGNIN}
          />
          <PublicRoute
            component={view.ForgotPassword}
            path={ROUTES.FORGOT_PASSWORD}
          />
          <Route
            component={view.ViewProduct}
            path={ROUTES.VIEW_PRODUCT}
          />
          <Route
            component={view.ViewPost}
            path={ROUTES.VIEW_POST}
          />
          <ClientRoute
            component={view.UserAccount}
            exact
            path={ROUTES.ACCOUNT}
          />
          <AdminRoute
            component={view.ProductOverview}
            exact
            path={ROUTES.ADMIN_PRODUCT_OVERVIEW}
          />
          <ClientRoute
            component={view.EditAccount}
            exact
            path={ROUTES.ACCOUNT_EDIT}
          />
          <ClientRoute
            component={view.CheckOutStep1}
            path={ROUTES.CHECKOUT_STEP_1}
          />
          <ClientRoute
            component={view.CheckOutStep2}
            path={ROUTES.CHECKOUT_STEP_2}
          />
          <ClientRoute
            component={view.CheckOutStep3}
            path={ROUTES.CHECKOUT_STEP_3}
          />
          <ClientRoute
            component={view.CheckOutStep4}
            path={ROUTES.CHECKOUT_STEP_4}
          />
          <AdminRoute
            component={view.EditSetting}
            exact
            path={ROUTES.ADMIN_SETTING_EDIT}
          />
          <AdminRoute
            component={view.EditIngredients}
            exact
            path={ROUTES.ADMIN_INGREDIENT_EDIT}
          />
          <AdminRoute
            component={view.Dashboard}
            exact
            path={ROUTES.ADMIN_DASHBOARD}
          />
          <AdminRoute
            component={view.Ingredients}
            exact
            path={ROUTES.ADMIN_INGREDIENTS}
          />
          {/* new */}
          <AdminRoute
            component={view.IngredientsNew}
            exact
            path={ROUTES.ADMIN_INGREDIENTS_NEW}
          />
          <AdminRoute
            component={view.Products}
            path={ROUTES.ADMIN_PRODUCTS}
          />
          <AdminRoute
            component={view.Setting}
            path={ROUTES.ADMIN_SETTINGS}
          />
          <AdminRoute
            component={view.Orders}
            path={ROUTES.ADMIN_ORDERS}
          />
          <AdminRoute
            component={view.Docs}
            path={ROUTES.ADMIN_DOCS}
          />
          <AdminRoute
            component={view.Posts}
            path={ROUTES.ADMIN_POSTS}
          />
          <AdminRoute
            component={view.Users}
            path={ROUTES.ADMIN_USERS}
          />
          <AdminRoute
            component={view.AddProduct}
            path={ROUTES.ADD_PRODUCT}
          />
          <AdminRoute
            component={view.AddOrder}
            path={ROUTES.ADD_ORDER}
          />
          <AdminRoute
            component={view.AddPost}
            path={ROUTES.ADD_POST}
          />
          <AdminRoute
            component={view.AddUser}
            path={ROUTES.ADD_USER}
          />
          <AdminRoute
            component={view.EditProduct}
            path={`${ROUTES.EDIT_PRODUCT}/:id`}
          />
          <AdminRoute
            component={view.EditOrder}
            path={`${ROUTES.EDIT_ORDER}/:id`}
          />
          <AdminRoute
            component={view.EditPost}
            path={`${ROUTES.EDIT_POST}/:id`}
          />
          <AdminRoute
            component={view.EditUser}
            path={`${ROUTES.EDIT_USER}/:id`}
          />
          <PublicRoute component={view.PageNotFound} />
        </Switch>
        <Footer />
      </>
    </Router>
  )
};

export default AppRouter;