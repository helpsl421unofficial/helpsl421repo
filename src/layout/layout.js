import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Home from "../home/home";

// import { authCheckState, getDataFirebase } from "../../store/actions/index";

class Layout extends Component {
  state = {};

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />

        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    // onLoadData: getData => dispatch(getDataFirebase(getData)),
    // onTryAutoSignUp: postData => dispatch(authCheckState(postData))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
