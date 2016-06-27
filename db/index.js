"use strict";
var RethinkDBDash = require("rethinkdbdash");
var initDB = require("./init");

class RethinkDB {
  constructor() {
    this.r = RethinkDBDash({
      db: "screeps",
      servers: [
        {host: "rethinkdb", port: 28015}
      ],
      silent: true
    });
    this.init();
  }

  init() {
    initDB(this.r);
  }

  newSnippet(user, id, snippet) {
    return this.r.table("snippets").insert({
      id: id,
      user: user,
      content: snippet
    }).run();
  }

  findSnippet(user, id) {
    return this.r.table("snippets").get(id).run();
  }
}

module.exports = RethinkDB;
