"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //Middleware
const users = [
    {
        "id": 1,
        "name": 'Johnny1'
    },
    {
        "id": 2,
        "name": 'Johnny2'
    },
    {
        "id": 3,
        "name": 'Johnny3'
    }
];
//READ USERS
app.get("/user", function (req, res) {
    res.json(users);
});
//CREATE USER
app.post("/user", function (req, res) {
    const newUser = {
        name: req.body.name,
        id: Date.now(),
    };
    users.push(newUser);
    res.json(users);
});
//UPDATE
app.put("/user", function (req, res) {
    let _a = req.body, id = _a.id, name = _a.name;
    users = users.map(function (user) {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
});
//DELETE
app.delete("/user/:id", function (req, res) {
    let id = req.params.id;
    users = users.filter(function (user) { return user.id !== Number(id); });
    res.json(users);
});
var isAuthorized = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === 'gdscdemocrudapi') {
        next();
    }
    else {
        res.status(401);
        res.json({ msg: 'NO access' });
    }
};
//GET USER BY ID
app.get("/user/:id", isAuthorized, function (req, res) {
    let id = req.params.id;
    const user = users.find(function (user) { return user.id === Number(id); });
    res.json(user);
});
//Start the app
app.listen(port, function () {
    console.log("Server is running on port ".concat(port, "..."));
});
