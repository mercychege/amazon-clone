import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login.js";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import Payment from "./Payment.js";
import Orders from "./Orders.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51J5UruBIARUvvMPCeAEPLDeePx7N2yefAVEUrnlVRtr0Ej4DtSl83BMh74WOBKZaJrdxhoTR5Rjv8r87v9BAO7V800gl0Xdcm4"
);

function App() {
  const [{}, disptch] = useStateValue();

  // create a listner
  useEffect(() => {
    // will only run once when the app component loads..
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>> ", authUser);

      if (authUser) {
        //the user just logged in/ user was logged in
        disptch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        disptch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
