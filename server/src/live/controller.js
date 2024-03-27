const ffmpeg = require("fluent-ffmpeg")
const fs = require ('fs')
const mariadb = require('/app/back/src/src/database.js')
const bcrypt = require('bcryptjs')

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
        const userId = req.session.userId;
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
    const userId = req.session.userId;
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

const getUserId = ((req, res) => {
  res.send("" + req.session.userId)
})

const generateLiveKey = (async (req, res) => 
{
  if(req.session.userId != undefined)
  {
    mariadb.pool.query("UPDATE channel set stream_key = '" + (await bcrypt.hash(Math.random().toString(36), 10)).replace('/', "") + "' WHERE user_id = '" + req.session.userId + "'")
    res.send('Enregistré')
  } else {
    res.send("Vous n'êtes pas connecté")
  }
})

module.exports = {
    saveThumbnail,
    sendThumbnail,
    GetProfilPicture,
    GetUsername,
    display,
    getUserId,
    generateLiveKey
}