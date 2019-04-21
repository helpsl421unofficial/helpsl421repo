import React, { Component } from "react";
import Menu from "../menu/menu";

class AddNew extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 border-bottom p-2">
            <Menu />
          </div>
          <div className="col-md-12 p-2">Add</div>
        </div>
      </div>
    );
  }
}

export default AddNew;
