const ffmpeg = require("fluent-ffmpeg")
const fs = require ('fs')
const socketio = require('socket.io')
const express = require('express')
const router = express.Router();

const saveThumbnail = ((req, res) => 
{
    let user = req.body.user
    const test = ffmpeg().input("http://live:8090/live/" + user + ".flv")
    test.inputOptions("-ss 00:00:01")
    test.outputOptions("-frames:v 1")
    
    test.save("/app/back/public/" + user + ".jpg")
    // res.sendFile("/app/back/public" + user + ".jpg");
})

const sendThumbnail = ((req, res) => {
    console.log(fs.existsSync("/app/back/public/" + req.query.user + ".jpg"))
    if(fs.existsSync("/app/back/public/" + req.query.user + ".jpg"))
    {
        res.sendFile("/app/back/public/" + req.query.user + ".jpg");
    } else 
    {
        res.sendFile("/app/back/src/public/default.png");
    }
})

const display = ((req, res) => {
    res.sendFile("/app/back/src/public/follow.jpg")

})

module.exports = {
    saveThumbnail,
    sendThumbnail,
    display
}