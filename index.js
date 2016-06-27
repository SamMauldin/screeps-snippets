if (!process.env.SLACK_TOKEN) {
  console.log("Provide a SLACK_TOKEN environment variable for command validation");
  process.exit(0);
}

var slackToken = process.env.SLACK_TOKEN;

var db = new (require("./db"))();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

app.post("/slack-endpoint", function(req, res) {
  if (req.body.token === slackToken) {
    console.log(req.body);
  }
});

app.listen(8080);
