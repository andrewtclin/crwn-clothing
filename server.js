const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { isBuffer } = require("util");

//this automatically looks into the .env file and added to our process environment
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// build server using express library
const app = express();

//run server on certain port
const port = process.env.PORT || 5000;

//automatically parse the content in the body of page to json by "bodyParser"
app.use(bodyParser.json());

//automatically parse the url in the correct format by "bodyParser"
app.use(bodyParser.urlencoded({ extended: true }));

//enable to request from different origin/port - Cross Origin Resources Sharing
app.use(cors());

if (process.env.NODE_ENV === "production") {
  //express to use the "express.static middleware function"
  //allow us to serve a certain file inside of this url we pass into
  //join directory key name which tells us what directory we are currently in
  //__dirname is by Node.js
  //point to client/build & serve all static files in there
  app.use(express.static(path.join(__dirname, "client/build")));

  //any url that the user hits (get request), we pass in a function
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port: " + port);
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
