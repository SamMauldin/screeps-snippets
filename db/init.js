function createDB(r) {
    return r.dbList().contains("screeps").do(databaseExists => {
        return r.branch(
            databaseExists,
            true,
            r.dbCreate("screeps")
        );
    }).run().then(() => {
        return r.db("screeps").wait();
    });
}

function createTable(r, name, durability) {
    return r.db("screeps").tableList().contains(name).do(tableExists => {
        return r.branch(
            tableExists,
            true,
            r.db("screeps").tableCreate(name, {
                durability: durability
            })
        );
    }).run().then(() => {
        return r.db("screeps").table(name).wait();
    });
}

module.exports = r => {
    return createDB(r).then(() => {
        return Promise.all([
            createTable(r, "snippets"),
            createTable(r, "users")
        ]);
    });
};
