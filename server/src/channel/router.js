// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

// Import des fonctions
const { selectChannel, videoOnTab, NumberVideo, submit, submitVideo, selectVideo, getNbFollowers, getFollow, follow } = require("./controller");
const { getVideoLikes,
    getVideoDislikes,
    checkVideoLike,
    addVideoLike,
    removeVideoLike,
    checkVideoDislike,
    addVideoDislike,
    removeVideoDislike, } = require("./likeManager.js");

// Configuration de la route
router.get('/infos', selectChannel)
router.get('/video', selectVideo)
router.get('/get-nb-followers', getNbFollowers)
router.get('/get-follow', getFollow)
router.get('/follow', follow)
router.post('/submitChannel', submit)
router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);

router.get('/get-video-likes', getVideoLikes)
router.get('/get-video-dislikes', getVideoDislikes)
router.get('/check-video-like', checkVideoLike)
router.get('/add-video-like', addVideoLike)
router.get('/remove-video-like', removeVideoLike)
router.get('/check-video-dislike', checkVideoDislike)
router.get('/add-video-dislike', addVideoDislike)
router.get("/remove-video-dislike", removeVideoDislike);

// Configuration de la route POST pour la soumission des données
router.post('/submitVideo', submitVideo);



module.exports = router;
