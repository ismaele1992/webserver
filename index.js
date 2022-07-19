
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
                client.close();
                res.json(result);
            });
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.listen(80, '0.0.0.0');