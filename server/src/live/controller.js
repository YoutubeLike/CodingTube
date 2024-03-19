const ffmpeg = require("fluent-ffmpeg")
const fs = require ('fs')

const saveThumbnail = ((req, res) => 
{
    let user = req.body.user
    const test = ffmpeg().input("http://live:8090/live/" + user + ".flv")
    test.inputOptions("-ss 00:00:01")
    test.outputOptions("-frames:v 1")
    test.save(user + ".jpg")
    res.sendFile("/app/back/" + user + ".jpg");
})

const sendThumbnail = ((req, res) => {
    res.sendFile("/app/back/akik4.jpg");
    // convert binary data to base64 encoded string

    // res.json({image: new Buffer(bitmap).toString('base64')})
})

module.exports = {
    saveThumbnail,
    sendThumbnail
}