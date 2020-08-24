import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReduxLoadingBar, { showLoading, hideLoading } from "react-redux-loading";
import NavC from "./app/components/Nav";
import Home from "./app/screens/Home";
import Ivdrip from "./app/screens/IVDrip";
import Therapies from "./app/screens/Therapies";
import Services from "./app/screens/Services";
import Team from "./app/screens/Team";
import Email from "./app/screens/Email";
import Yelp from "./app/screens/Yelp";
import LinkedIn from "./app/screens/LinkedIn";
import VerticalNav from "./app/components/VerticalNav";
import Appointment from "./app/screens/Appointment";
import { client } from "./app/graphql/";
import { getMenuQuery } from "./app/graphql/query";
import { setAuthUser } from "./app/redux/actions/auth";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import Signup from "./app/screens/auth/Signup";
import Signin from "./app/screens/auth/Signin";
import ForgetPassword from "./app/screens/auth/ForgetPassword";
import "./App.css";

Amplify.configure(aws_exports);

function App(props) {
  const [showLoader, setShowloader] = useState(true);

  const [menuData, setMenuData] = useState({
    ivdrips: [],
    therapies: [],
    services: [],
    teams: [],
  });

  const getMenu = async () => {
    props.dispatch(showLoading());

    var data = JSON.parse(localStorage.getItem("90210wc-data"));
    if (data) {
      props.dispatch(setAuthUser(data));
    }

    client
      .query({
        query: getMenuQuery,
      })
      .then(({ data }) => {
        setMenuData({
          ivdrips: data.getAllIvdrips,
          therapies: data.getAllTherapies,
          teams: data.getAllTeams,
          services: data.getAllServices,
        });
        setShowloader(false);
        props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        setShowloader(false);
        props.dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ReduxLoadingBar
        style={{ color: "red", zIndex: 9989, position: "fixed", top: 0 }}
      />
      <Router>
        <div>
          {showLoader ? (
            ""
          ) : (
            <>
              <NavC data={menuData} />
              <div className="container">
                <Route
                  exact
                  path="/ivdrip/:slug"
                  render={(props) => (
                    <Ivdrip data={menuData.ivdrips} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/therapies/:slug"
                  render={(props) => (
                    <Therapies data={menuData.therapies} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/services/:slug"
                  render={(props) => (
                    <Services data={menuData.services} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/team/:slug"
                  render={(props) => <Team data={menuData.teams} {...props} />}
                />
                <Route exact path="/email" component={Email} />
                <Route exact path="/signup">
                  {props.authenticated ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route exact path="/signin">
                  {props.authenticated ? (
                    <Redirect to={props.redirect} />
                  ) : (
                    <Signin />
                  )}
                </Route>
                <Route exact path="/forgetpassword">
                  {props.authenticated ? (
                    <Redirect to="/" />
                  ) : (
                    <ForgetPassword />
                  )}
                </Route>
                <Route exact path="/" component={Home} />
              </div>
              <Route
                exact
                path="/data/yelp"
                render={(props) => (
                  <VerticalNav {...props}>
                    <Yelp />
                  </VerticalNav>
                )}
              />
              <Route
                exact
                path="/data/linkedin"
                render={(props) => (
                  <VerticalNav {...props}>
                    <LinkedIn />
                  </VerticalNav>
                )}
              />
              <Route exact path="/appointment" component={Appointment} />
            </>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

const mapStateToProps = ({ auth, redirect }) => {
  return {
    authenticated: auth.authenticated,
    redirect: redirect,
  };
};

export default connect(mapStateToProps)(App);
