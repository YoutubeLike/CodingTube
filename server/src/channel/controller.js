const mariadb = require("../src/database");
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const express = require('express');
const app = express();
app.use(cors);
app.use(express.json);

const source = path.join(__dirname, "../../../..", "uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'thumbnail') {
            cb(null, path.join(source , "thumbnails"));
        } else if (file.fieldname === 'video') {
            cb(null, path.join(source, "videos"));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadVideo = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]);


const selectChannel = (_, res) => {
    mariadb.pool
        .query("SELECT pseudo, nb_follower, bio, banner FROM channel WHERE user_id = 1")
        .then((value) => {
            res.send(value[0]);
        })
        .catch(error => {
            console.error("Error retrieving channel info:", error);
            res.status(500).send("Internal Server Error");
        });
};

const selectVideo = (_, res) => {
    mariadb.pool.query('SELECT title, description, channel_id, upload_video_url, upload_date_time, number_view, nb_comment, nb_like FROM video WHERE channel_id = 1')
        .then((value) => {
            res.send(value[0]);
        })
        .catch(error => {
            console.error("Error retrieving video info:", error);
            res.status(500).send("Internal Server Error");
        });
};

const submit = (req, res) => {
    const { name, identifier, bio } = req.body;
    mariadb.pool.query("INSERT INTO channel (user_id, pseudo, identifier_channel, nb_follower, bio) VALUES (1, ?, ?, 0, ?)", [name, identifier, bio])
        .then(() => {
            res.status(200).send('Chaîne créée');
        })
        .catch(error => {
            console.error("Error submitting channel info:", error);
            res.status(500).send("Internal Server Error");
        });
};


const submitVideo = (req, res) => {
    uploadVideo(req, res, (err) => {

        if (err) { 
            console.error("Error uploading files:", err);
            return res.status(500).send("Internal Server Error");
        }

        const { title, description, category } = req.body;
        const thumbnailFile = req.files['thumbnail'][0];
        const videoFile = req.files['video'][0];

		// Sécurité si aucune vidéo, fichier
        if (!thumbnailFile || !videoFile) {
            console.error("No thumbnail or video file selected");
            return res.status(400).send("No thumbnail or video file selected");
        }

		const thumbnailURL = path.join(source , "thumbnails", thumbnailFile.originalname)
		const videoURL = path.join(source, "/videos/" , videoFile.originalname) 

		mariadb.pool.query('INSERT INTO video (title, description, category, thumbnail, upload_video_url) VALUES (?, ?, ?, ?, ?)', [title, description, category, thumbnailURL, videoURL])
			.then(() => {
				res.status(200).send("Data submitted successfully!");
			})
			.catch(error => {
				console.error("Error submitting video:", error);
				res.status(500).send("An error occurred while submitting video data.");
			});
		});


};

const videoOnTab = (_, res) => {
    mariadb.pool
        .query("SELECT id, channel_id, upload_video_url, title, number_view, upload_date_time, thumbnail FROM video WHERE channel_id = 1")
        .then((value) => {
            res.send(value);
        })
        .catch(error => {
            console.error("Error retrieving posted videos:", error);
            res.status(500).send("Internal Server Error");
        });
};

const NumberVideo = (_, res) => {
    mariadb.pool
        .query("SELECT COUNT(*) AS videoCount FROM video WHERE channel_id = 2")
        .then((result) => {
            const count = result[0].videoCount;
            res.json(count);
        })
        .catch((error) => {
            console.error("Error retrieving video count:", error);
            res.status(500).send("Internal Server Error");
        });
};

module.exports = {
    selectChannel,
    videoOnTab,
    NumberVideo,
    submit,
    submitVideo,
    selectVideo,
};


