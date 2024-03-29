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

const GetProfilPicture = async (req, res) => {
        const userId = req.query.userId;
        try {
          const connection = await mariadb.pool.getConnection();
          const result = await connection.query("SELECT pp FROM user WHERE id = ?", [
            userId,
          ]);
          connection.release();
          if (result.length > 0) {
            res.json({ profilePicture: result[0].pp });
          } else {
            res.json({ profilePicture: null });
          }
        } catch (err) {
          console.error(err);
          res.json({ profilePicture: null });
        }
}

const GetUsername = async (req, res) => {
    const userId = req.query.userId;
    try {
      const connection = await mariadb.pool.getConnection();
      const result = await connection.query(
        "SELECT username FROM user WHERE id = ?",
        [userId]
      );
      connection.release();
      if (result.length > 0) {
        res.json({ pseudo: result[0].username });
      } else {
        res.json({ pseudo: null });
      }
    } catch (err) {
      console.error(err);
      res.json({ pseudo: null });
    }
} 

const display = ((req, res) => {
    res.sendFile("/app/back/src/public/follow.jpg")

})

const test = ((req, res) => {
  console.log("Utilisateur" + req.session.userId)
  res.send("" + req.session.userId)
})

module.exports = {
    saveThumbnail,
    sendThumbnail,
    GetProfilPicture,
    GetUsername,
    display,
    test
}