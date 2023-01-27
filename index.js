
var http = require('http');
const express = require('express');
const { nextTick } = require('process');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.2.200:27017";

var queryInfo = async () => {
    var result = await (queryDatabase());
    return result;
};

app.get('/', (req, res) => {
    try {
        const client = MongoClient.connect(url , function(err, client) {
            const dbo = client.db("terrarium");
            var queryDatabase = () => {
                return new Promise((resolve, reject) => {
                    let collection = dbo.collection("terrarium");
                    var query = { temperature : "31.90" };
                    collection.find(query).toArray(function(err, data) {
                        err
                            ? reject(err)
                            : resolve(data);
                    });
                });
            };

            var resultQuery = async () => {
                var result = await (queryDatabase());
                return result;
            };
    
            resultQuery().then(function(result) {
                console.log("Sending query");
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Content-Type', 'application/json');
                res.end((JSON.stringify(result)));
                client.close();
            });
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.get('/24hours', (req, res) => {
    try {
        const client = MongoClient.connect(url , function(err, client) {
            const dbo = client.db("terrarium");
            var queryDatabase = () => {
                return new Promise((resolve, reject) => {
                    let collection = dbo.collection("terrarium");
                    var query = { time : { $gt : req.query.startdate, $lt : req.query.enddate} };
                    console.log(query);
                    collection.find(query).toArray(function(err, data) {
                        err
                            ? reject(err)
                            : resolve(data);
                    });
                });
            };

            var resultQuery = async () => {
                var result = await (queryDatabase());
                return result;
            };
    
            resultQuery().then(function(result) {
                console.log("Sending query 24h");
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Content-Type', 'application/json');
                res.end((JSON.stringify(result)));
                client.close();
            });
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.get('/last', (req, res) => {
    try {
        const client = MongoClient.connect(url , function(err, client) {
            const dbo = client.db("terrarium");
            var queryDatabase = () => {
                return new Promise((resolve, reject) => {
                    let collection = dbo.collection("terrarium");
                    var query = { _id:-1 };
                    collection.find().sort(query).limit(1).toArray(function(err, data) {
                        err
                            ? reject(err)
                            : resolve(data);
                    });
                });
            };

            var resultQuery = async () => {
                var result = await (queryDatabase());
                return result;
            };
    
            resultQuery().then(function(result) {
                console.log("Sending last values inserted");
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Content-Type', 'application/json');
                res.end((JSON.stringify(result)));
                client.close();
            });
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.listen(80, '0.0.0.0');