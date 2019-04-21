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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.updateForm();
    }
    if (prevProps.loading && !this.props.loading) {
      PopupboxManager.close();
    }
  }
  updateForm = () => {
    let btn_loading = null;
    if (this.state.con1 !== "" && this.state.imageDisplay !== "") {
      if (this.props.loading) {
        btn_loading = (
          <>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </>
        );
      } else {
        btn_loading = (
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
        );
      }
    }
    let content = (
      <div className="row">
        <div className="col-md-12 p-2">
          <div className="row">
            <div className="col-8">{btn_loading}</div>
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
            <div className="col-8" />
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
        fadeInSpeed: 200
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div
            className="col-8"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div>
              <div>
                <h4>
                  Help a fellow <strong>Sri Lankan</strong> to find their loved
                  ones
                </h4>
              </div>

              <div>
                <p>A tiny support to help you find your missing loved ones</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <MDBBtn
              color="success"
              className="nav-link"
              onClick={() => {
                this.openPopupbox();
                // console.log(this.state);
                // this.setState(
                //   {
                //     title: "",
                //     con1: "",
                //     con2: "",
                //     desc: "",
                //     image: "",
                //     imageDisplay: ""
                //   },
                //   () => this.openPopupbox()
                // );
              }}
            >
              Add New
            </MDBBtn>
          </div>
        </div>
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
          <li className="nav-item helpsl-hand " />

          {/* <li className="nav-item helpsl-hand ">
            <MDBBtn color="info">Feedback/ Contact</MDBBtn>
          </li> */}
        </ul>
        <PopupboxContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.isLoading
  };
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
