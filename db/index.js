"use strict";
var RethinkDBDash = require("rethinkdbdash");
var initDB = require("./init");

class RethinkDB {
  constructor() {
    this.r = RethinkDBDash({
      db: "screeps",
      servers: {
        host: "rethinkdb", port: 28015
      },
      silent: true
    });
    this.init();
  }

  init() {
    initDB(this.r);
  }

  createSnippet(user, content, global) {
    return this.r.table("snippets").insert({
      global: global,
      user: user,
      content: content
    }).run();
  }
}

module.exports = RethinkDB;
