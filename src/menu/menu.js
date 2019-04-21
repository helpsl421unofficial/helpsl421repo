import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdbreact";

import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import { addNewPost } from "../store/actions/index";

class Menu extends Component {
  state = {
    title: "",
    con1: "",
    con2: "",
    desc: "",
    image: "",
    imageDisplay: ""
  };

  updateForm = () => {
    let content = (
      <div className="row">
        <div className="col-md-12 p-2">
          <div className="row">
            <div className="col-8">Add New</div>
            <div
              className="col-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="p-3 bg-danger text-white helpsl-hand"
                onClick={() => {
                  PopupboxManager.close();
                }}
              >
                <strong>X</strong>
              </div>
            </div>
          </div>
          <div className="form-group">
            <MDBInput
              label="Title (Optional)"
              onChange={evt => this.setState({ title: evt.target.value })}
            />
            <MDBInput
              label="Contact 1"
              onChange={evt => {
                this.setState({ con1: evt.target.value }, () =>
                  this.updateForm()
                );
              }}
            />
            <MDBInput
              label="Contact 2 (Optional)"
              onChange={evt => this.setState({ con2: evt.target.value })}
            />
            <MDBInput
              type="textarea"
              label="Description (Optional)"
              rows="5"
              onChange={evt => this.setState({ desc: evt.target.value })}
            />
          </div>
          {this.state.imageDisplay !== "" ? (
            <div className="col-md-12 p-2">
              <img
                src={this.state.imageDisplay}
                alt="uploadingImg"
                style={{ maxWidth: "80vw" }}
              />
            </div>
          ) : null}
          <div className="col-md-12 p-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload Image
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={event => {
                    this.someFunction(event);
                  }}
                />

                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>
        {this.state.con1 !== "" && this.state.imageDisplay !== "" ? (
          <div className="col-md-12 p-2">
            <MDBBtn
              rounded
              color="success"
              onClick={() =>
                this.props.onAddPost({
                  data: {
                    title: this.state.title,
                    con1: this.state.con1,
                    con2: this.state.con2,
                    desc: this.state.desc,
                    image: this.state.image
                  }
                })
              }
            >
              Add
            </MDBBtn>
          </div>
        ) : null}
      </div>
    );

    PopupboxManager.update({
      content,
      config: {
        titleBar: {
          text: "Updated!"
        }
      }
    });
  };

  fetchData = async inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  someFunction = async event => {
    try {
      let files = event.target.files;
      const data = await this.fetchData(files[0]);
      this.setState({ image: data.split(",").pop(), imageDisplay: data });
      this.updateForm();
    } catch (e) {
      console.error("Problem", e);
    }
  };

  openPopupbox = post => {
    let content = (
      <div className="row">
        <div className="col-md-12 p-2">
          <div className="row">
            <div className="col-8">Add New</div>
            <div
              className="col-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="p-3 bg-danger text-white helpsl-hand"
                onClick={() => {
                  PopupboxManager.close();
                }}
              >
                <strong>X</strong>
              </div>
            </div>
          </div>
          <div className="form-group">
            <MDBInput
              label="Title (Optional)"
              onChange={evt => this.setState({ title: evt.target.value })}
            />
            <MDBInput
              label="Contact 1"
              onChange={evt => {
                this.setState({ con1: evt.target.value }, () =>
                  this.updateForm()
                );
              }}
            />
            <MDBInput
              label="Contact 2 (Optional)"
              onChange={evt => this.setState({ con2: evt.target.value })}
            />
            <MDBInput
              type="textarea"
              label="Description (Optional)"
              rows="5"
              onChange={evt => this.setState({ desc: evt.target.value })}
            />
          </div>

          <div className="col-md-12 p-2">
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={event => {
                    this.someFunction(event);
                  }}
                />

                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: false
        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <ul className="nav justify-content-center">
          {/* <li className="nav-item">
          <NavLink
            activeClassName="activeMainNav"
            to="/"
            exact
            className="nav-link"
          >
            Home
          </NavLink>
        </li> */}
          <li className="nav-item helpsl-hand ">
            <div
              className="nav-link"
              onClick={() => {
                this.setState({
                  title: "",
                  con1: "",
                  con2: "",
                  desc: "",
                  image: "",
                  imageDisplay: ""
                });
                this.openPopupbox();
              }}
            >
              Add New +
            </div>
          </li>
          <li className="nav-item helpsl-hand ">
            <div className="nav-link">Feedback/ Contact</div>
          </li>
        </ul>
        <PopupboxContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: postData => dispatch(addNewPost(postData))
    // onLoadData: getData => dispatch(getDataFirebase(getData)),
    // onTryAutoSignUp: postData => dispatch(authCheckState(postData))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
);