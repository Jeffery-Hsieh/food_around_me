import React, { Component } from 'react'
import Header from "../Header"
import Homepage from "../Homepage"
import Member from "../Member"
import ShopOwner from "../ShopOwner"
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Header />
            <Route path="/" exact component={Homepage} />
            <Route path="/member/" component={Member} />
            <Route path="/shop/" component={ShopOwner} />
        </Router>
      </div>
    );
  }
}

export default App;
