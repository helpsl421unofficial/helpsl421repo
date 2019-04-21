import React, { Component } from "react";
// import Post from "./post/post";
import Gallery from "react-photo-gallery";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    desc: "ddd",
    id: "001",
    contact: ["077 1234 123", "077 1234 123"]
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    desc: "234sf",
    id: "002"
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    desc: "dddsfsd",
    id: "003"
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    desc: "jnnf",
    id: "004"
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
    desc: "ijiisdf",
    id: "005"
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
    desc: "ponsdf",
    id: "006"
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
    desc: "ndsfhsd",
    id: "007"
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
    desc: "iosdf",
    id: "008"
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
    desc: "idfsn",
    id: "009"
  }
];

class Posts extends Component {
  state = { currentImage: 0 };

  openPopupbox(event, obj) {
    console.log(event);
    console.log(obj);
    let id = obj.photo.id ? obj.photo.id : Math.random();
    let title = obj.photo.title ? obj.photo.title : "Help!";
    let pic = obj.photo.src ? obj.photo.src : "";
    let contact = obj.photo.contact ? obj.photo.contact : [];
    let desc = obj.photo.desc ? obj.photo.desc : "";
    const content = (
      <div className="row">
        <div className="col-md-12 pb-3 border-bottom">
          <div className="row">
            <div className="col-8">{title}</div>
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
        </div>
        <div className="col-md-12 pt-3 pb-3 border-bottom">
          <img width="100%" src={pic} alt={"post_" + id} />
        </div>
        {contact.length > 0 ? (
          <div className="col-md-12 pt-3 pb-3 border-bottom">
            Contact
            {contact.map((con, index) => (
              <h1 key={id + "_cont_" + index}>{con}</h1>
            ))}
          </div>
        ) : null}
        <div className="col-md-12 pt-3">
          Description
          <p>{desc}</p>
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
        <PopupboxContainer />
        <Gallery photos={this.props.posts} onClick={this.openPopupbox} />
      </div>
    );
  }
}
Posts.defaultProps = {
  posts: []
};
export default Posts;
