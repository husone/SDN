const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://127.0.0.1:27017";
const dbName = "conFursion";

MongoClient.connect(url).then((client) => {

    console.log("Connected correctly to server");
    const db = client.db(dbName);
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },"dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return dboper.updateDocument(db, { name: "Vad`onut" },
                { description: "Updated Test" }, "dishes");
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);
            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
            return db.dropCollection("dishes");
        })
        .catch((err) => console.log(err));

});