import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Menu from "../menu/menu";
import Posts from "./posts/posts";
import { getDataFirebase } from "../store/actions";

class Home extends Component {
  state = {};

  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 border-bottom p-2">
            <Menu />
          </div>
          <div className="col-md-12 p-2">
            <Posts posts={this.props.posts} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firebaseDatabase.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadData: () => dispatch(getDataFirebase())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
