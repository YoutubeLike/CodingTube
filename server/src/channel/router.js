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

const {
    getComments,
    addCommentAndGetId,
    getCommentInfos,
    getCommentLikes,
    getCommentDislikes,
    checkVideoCommentLike,
    addVideoCommentLike,
    removeVideoCommentLike,
    checkVideoCommentDislike,
    addVideoCommentDislike,
    removeVideoCommentDislike,
} = require("./commentsManager.js");

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

router.get("/get-video-comments", getComments);
router.get("/add-video-comment", addCommentAndGetId);
router.get("/get-video-comment-infos", getCommentInfos);
router.get("/get-video-comment-likes", getCommentLikes);
router.get("/get-video-comment-dislikes", getCommentDislikes);
router.get("/check-video-comment-like", checkVideoCommentLike);
router.get("/add-video-comment-like", addVideoCommentLike);
router.get("/remove-video-comment-like", removeVideoCommentLike);
router.get("/check-video-comment-dislike", checkVideoCommentDislike);
router.get("/add-video-comment-dislike", addVideoCommentDislike);
router.get("/remove-video-comment-dislike", removeVideoCommentDislike);

// Configuration de la route POST pour la soumission des données
router.post('/submitVideo', submitVideo);



module.exports = router;
