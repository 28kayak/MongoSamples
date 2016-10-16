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
    insertDocuments(db, function (){
        findDocQueryFileter(db,function () {
          db.close();
        });//end of findDocQueryFilter();
        //findDocuments(db, function(){
          //db.close();
        //});//end of find Document function
        //db.close();
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
    //console.log("print DB");
    //console.log(db);
    //Get the documents collection
    var collection = db.collection('documents');
    console.log("Collection:")
    console.log(collection);
    //create documents JSON
    var insertedData = [{driver :"kaya"}, {driver :"turu"}, {driver : "aaa"}];
    //Insert some documents
    collection.insertMany(insertedData, function (err, result) {
        assert.equal(null, err);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection\n console output(result)");
       /* console.log(result);
        console.log("show result.result");
        console.log(result.result);
        console.log("show result.result.ok");
        console.log(result.result.ok);

        console.log("result.ops");
        console.log(result.ops);

        console.log("inserted IDs");
        console.log(result.insertedIds);
        */
        //console.log("result.ops.a");
        //console.log(result.ops.a);//==> undefined
        //console.log("result.ops._id");
        //console.log(result.ops._id); //==> undefined 

        callback(result);
        } //function(err, reuslt)
    );//insert many

}//inset Documents

//find all documents
//add a query that returns all the documents
var findDocuments = function(db, callback) {
    //get the document collection
    var collection = db.collection('documents');
    //find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);

    });//end of collection.find

}//find document without query filter
var findDocQueryFileter = function (db, callback) {
    //get the documents collection
    var collection = db.collection('documents');
    //find some doc

    collection.find({'driver':'kaya'}).toArray(function(err, docs){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });//should return all records such that field = a and value = 3

}