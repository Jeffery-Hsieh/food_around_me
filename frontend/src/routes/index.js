import React from 'react';
import Header from "../components/Header";

import Home from "../containers/HomePage";
import ShopListPage from "../containers/ShopListPage";
import ShopDetailPage from "../containers/ShopDetailPage";
import CreateShopPage from "../containers/CreateShopPage";
import CreateCommentPage from "../containers/CreateCommentPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const routes = (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/shops" exact component={ShopListPage} />
          <Route path="/shops/:category/:country/:city" exact component={ShopListPage} />
          <Route path="/shops/:shopId" exact component={ShopDetailPage} />
          <Route path="/shop/create" exact component={CreateShopPage} />
      </Switch>
    </Router>
);

export default routes;
