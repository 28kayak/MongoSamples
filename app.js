/**
 * Created by kaya on 10/15/16.
 */
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
//Connection URL
var url = 'mongodb://localhost:27017/myproject';

//Use Conncet method to connect to the server
MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    //call insert document function:
    insertDocuments(db, function () {
        db.close();
    });//end of insertDucments function
    //db.close();
    //Result is out of scope
    //console.log(result);
});//end of connect function

//define Insert Document
/*
* result contains the result document from MongoDB
* ops contains the documents inserted with added _id fields
* connection contains the connection used to perform the insert
* */
var insertDocuments = function (db, callback) {
    //Get the documents collection
    var collection = db.collection('documents');
    console.log("Collection:")
    console.log(collection);
    //Insert some documents
    collection.insertMany([{a:1}, {a:2}, {a:3}], function (err, result) {
        assert.equal(null, err);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection\n console output(result)");
        console.log(result);
        console.log("show result.result");
        console.log(result.result);
        console.log("show result.result.ok");
        console.log(result.result.ok);

        console.log("result.ops");
        console.log(result.ops);

        console.log("inserted IDs");
        console.log(result.insertedIds);
        
        //console.log("result.ops.a");
        //console.log(result.ops.a);//==> undefined
        //console.log("result.ops._id");
        //console.log(result.ops._id); //==> undefined 

        callback(result);
        } //function(err, reuslt)
    );//insert many

    
    
}