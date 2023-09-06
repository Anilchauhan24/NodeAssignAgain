const express = require("express");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const app = express();
const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
let db;




//restaurant details through id

app.get("/detail", function (req, res) {
    let query = {};
    let stateid = Number(req.query.state_id)
    if (stateid) {
        query = { state_id: stateid };
    }
    db.collection("restaurant").find(query)
        .toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        })
})

//getting restaurant details with respect to state

app.get("/cityName/:states", function (req, res) {
    let states = (req.params.states);
    db.collection("restaurant")
        .find({city_name:states})
        .toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
});

//mealtyp using params
app.get("/mealType/:key", function (req, res) {
    let key = Number(req.params.key)
    db.collection("mealType").find({mealtype_id:key})
        .toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
});


//getting mealtype data

app.get("/widget",function(req,res){
    db.collection("mealType").find()
    .toArray((err,mealData)=>{
        if(err) throw err;
        res.send(mealData);
    });
});




//Mongodb connection with node.js

MongoClient.connect(MONGO_URL, (err, client) => {
    console.log("mongodb is connected");
    if (err) console.log("err while connecting");
    db = client.db("NodeAssign")
    app.listen(PORT, () => console.log("Mongodb connected on", PORT));
})