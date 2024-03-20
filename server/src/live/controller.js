const ffmpeg = require("fluent-ffmpeg")
const fs = require ('fs')

const saveThumbnail = ((req, res) => 
{
    let user = req.body.user
    const test = ffmpeg().input("http://live:8090/live/" + user + ".flv")
    test.inputOptions("-ss 00:00:01")
    test.outputOptions("-frames:v 1")
    test.save("/app/back/public/" + user + ".jpg")
    res.sendFile("/app/back/public" + user + ".jpg");
})

const sendThumbnail = ((req, res) => {
    if(fs.existsSync("/app/back/public" + req.query.user + ".jpg"))
    {
        res.sendFile("/app/back/public" + req.query.user + ".jpg");
    } else 
    {
        res.sendFile("https://www.pawnamerica.com/images/no-photo.png");
    }
})

module.exports = {
    saveThumbnail,
    sendThumbnail
}