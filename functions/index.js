const functions = require("firebase-functions");

const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

// =============
const { Storage } = require("@google-cloud/storage");
// const storage = new Storage();
const projectId = "helpsl421";
const storage = new Storage({
  projectId: projectId
  // keyFilename: "myp.json"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.storeImages = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    console.log("Line 21");
    // console.log(request.body.path);
    const body = JSON.parse(request.body.data);
    // console.log(Object.keys(request.body));
    // console.log(request.body.data.body.image);
    fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
      console.log(err);
      return response.status(500).send({ error: err });
    });

    // google cloud storage
    const bucket = storage.bucket("helpsl421.appspot.com");
    const uuid = UUID();

    bucket.upload(
      "/tmp/uploaded-image.jpg",
      {
        uploadType: "media",
        destination: "/pics/" + uuid + ".jpg",
        resumable: false,
        metadata: {
          metadata: {
            contentType: "image/jpeg",
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, file) => {
        if (!err) {
          console.log("Line 48");
          console.log(
            "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid
          );
          response.status(201).send({
            data: {
              imageUrl:
                "https://firebasestorage.googleapis.com/v0/b/" +
                bucket.name +
                "/o/" +
                encodeURIComponent(file.name) +
                "?alt=media&token=" +
                uuid
            }
          });
        } else {
          console.log(err);
          response.status(500).send({ error: err });
        }
      }
    );
  });
});
// ==================
