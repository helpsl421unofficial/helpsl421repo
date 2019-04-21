import React, { Component } from "react";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";

class Post extends Component {
  openPopupbox(post) {
    const content = (
      <div className="row">
        <div className="col-md-12 pb-3 border-bottom">
          <div className="row">
            <div className="col-8">
              {post.title !== "" ? post.title : "Help!"}
            </div>
            <div
              className="col-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="p-3 bg-danger text-white helpsl-hand"
                onClick={() => {}}
              >
                <strong>X</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 pt-3 pb-3 border-bottom">
          <img width="100%" src={post.pic} alt={"post_" + post.id} />
        </div>
        <div className="col-md-12 pt-3 pb-3 border-bottom">
          Contact -
          {post.contact.map((con, index) => (
            <h1 key={post.id + "_cont_" + index}>{con}</h1>
          ))}
        </div>
        <div className="col-md-12 pt-3">
          Description
          <p>{post.desc}</p>
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
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.openPopupbox({
              id: "001",
              pic: "http://fraina.github.io/react-popupbox/cat.jpg",
              contact: ["077 1234 123", "077 1234 123"],
              desc: "some desc"
            })
          }
        >
          Click me
        </button>
        <PopupboxContainer />
      </div>
    );
  }
}

export default Post;
