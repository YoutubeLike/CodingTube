// Import de express
const express = require("express");

// Utilisation du router de Express
const router = express.Router();

const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors);
app.use(express.json);

// Import des fonctions
const { selectChannel, 
       	selectChannelIdentifier,
        videoOnTab, 
        NumberVideo, 
        submit,  
       	submitChannel,
       	submitVideo,
        getNbFollowers, 
        getFollow, 
        follow, 
       	selectId,
       	selectVideo,
	    UserChannel,
		getIdentifier,
} = require("./controller");


const { getVideoLikes,
    getVideoDislikes,
    checkVideoLike,
    addVideoLike,
    removeVideoLike,
    checkVideoDislike,
    addVideoDislike,
    removeVideoDislike, 
} = require("./likeManager.js");

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
router.get('/get-nb-followers', getNbFollowers)
router.get('/get-follow', getFollow)
router.get('/follow', follow)

// Configuration de la route
router.get("/infos", selectChannel);
router.get("/infosId", selectChannelIdentifier);
router.get("/id", selectId);
router.get("/video", selectVideo);
router.post("/submitChannel", submitChannel);

router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);
router.get("/userChannel", UserChannel);
router.get("/get-identifier", getIdentifier);
 
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
