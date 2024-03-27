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
        getVideo,
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
router.get("/get-identifier", getIdentifier);
router.get("/infos", selectChannel);
router.get("/infosId", selectChannelIdentifier);
router.get("/id", selectId);
router.get("/video", selectVideo);
router.get("/submitChannel", submitChannel);

router.get("/videos", videoOnTab);
router.get("/nombreVideo", NumberVideo);

router.get("/get-identifier", getIdentifier);
router.get("/videoPath", getVideo);
 
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

// UPLOAD =======================

const upload  = multer({ limites: { fileSize: 1024 * 1024 * 50 }});

/* Config */
const rootdir = __dirname;
const port    = 10201;
const BASE_URL = "https://imgs.digyx.co/i/";

// const dataStore = require('./store');
// const store = dataStore.store;

router.get('/tout', (req,res) => {
    res.send('coucou')
})


/* Server Routes */
router.post('/test', upload.single('img'), async (req, res) => {
   
    var access = null;

    // if (!req.body.key) {
    //     return res.status(401).json({ error: 'No api key' });
    // } else {
    //     access = await ApiAccess.findOne({ api_secret: req.body.key });
    //     if (!access) {
    //         return res.status(401).json({ error: 'Bad api key' });
    //     }
    // }
    console.log(req.file);
    const info = imageinfo(req.file.buffer);
    console.log(info);
    if (!info) { return res.status(400).json({ error: 'Bad image file' }); }

    const type = info.format;

    const folderName = `${crypto.randomBytes(16).toString('hex')}`;
    if (!fs.existsSync(`${rootdir}/i/${folderName}`)) {
        fs.mkdirSync(`${rootdir}/i/${folderName}`);
    }
    const newName = `${slug(req.file.originalname.substring(0, 16))}.${type}`;
    const path = `${rootdir}/i/${folderName}/${newName}`;
    const directory = `/i/${folderName}/`;
    const upload_id = crypto.randomBytes(16).toString('hex') + '.' + type;
    const url = BASE_URL + upload_id;

    fs.writeFile(`${path}`, req.file.buffer, async (err) => {
        if (err)
            return res.status(500).json({ error: 'Internal error occurred while writing the image data' });
        
        let imgInfo = await ImageInfo.create({
            api_public: access.api_public,
            fullpath: path,
            public_id: upload_id,
            infos: info,
            directory,
            rootdir,
        })
        return res.status(200).json({ infos: { api_public: access.api_public, url } });
    })
});



module.exports = router;
