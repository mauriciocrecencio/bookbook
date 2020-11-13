import React from "react";
import Login from "./LoginPage/Login";
import Timeline from "./TimeLinePage/timeline";
import SignUp from "./RegisterPage/SignUp";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import TopBar from "./TopBar/topbar";
import { connect } from "react-redux";
import ProfilePage from "./ProfilePage/ProfilePage"
import Shelf from './ShelfPage/Shelf'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.currentToken !== "" ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
      }
    />
  );
};

class App extends React.Component {
  render() {
    const { currentToken } = this.props;
    return (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute
          path="/timeline"
          component={() => (
            <>
              <TopBar />
              <Timeline />

            </>
          )}
          currentToken={currentToken}
        />
        <PrivateRoute
          path="/profile/:userId"
          component={() => (
            <>
              <TopBar />
              <ProfilePage />
            </>
          )}
          currentToken={currentToken}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  currentToken: state.currentToken,
  user: state.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
