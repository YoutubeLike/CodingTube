const mariadb = require("../src/database");

const getComments = (req, res) => {
    mariadb.pool
        .query("SELECT * FROM comment_video WHERE video_id = ?;", [
            req.query.videoId,
        ])
        .then((value) => {
            res.send(value);
        });
};

const addCommentAndGetId = (req, res) => {
    mariadb.pool
        .query(
            "INSERT INTO comment_video (user_id, video_id, text) VALUES (?, ?, ?);",
            [req.session.userId, req.query.videoId, req.query.text]
        )
        .then(() => {
            mariadb.pool
                .query(
                    "SELECT id FROM comment_video WHERE text = ? ORDER BY comment_date DESC;",
                    [req.query.text]
                )
                .then((value) => {
                    res.send(value[0]);
                });
        })
        .catch((error) => {
            console.error("Error inserting comment:", error);
            res.status(500).send("Error inserting comment");
        });
};

const getCommentInfos = (req, res) => {
    mariadb.pool
        .query(
            "SELECT text, comment_date, username, PP FROM comment_video JOIN user ON user_id = user.id WHERE comment_video.id = ?;",
            [req.query.commentId]
        )
        .then((value) => {
            res.send(value[0]);
        });
};

const getCommentLikes = (req, res) => {
    mariadb.pool
        .query("SELECT * FROM like_video_comment WHERE id_comment = ?;", [
            req.query.commentId,
        ])
        .then((value) => {
            res.send(value);
        });
};

const getCommentDislikes = (req, res) => {
    mariadb.pool
        .query("SELECT * FROM dislike_video_comment WHERE id_comment = ?;", [
            req.query.commentId,
        ])
        .then((value) => {
            res.send(value);
        });
};

const checkVideoCommentLike = (req, res) => {
    mariadb.pool
        .query(
            "SELECT * FROM like_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        )
        .then((value) => {
            res.send(value);
        });
};

const addVideoCommentLike = async (req, res) => {
    let checkExistance = await mariadb.pool.query(
        "SELECT * FROM like_video_comment WHERE id_user = ? AND id_comment = ?;",
        [req.session.userId, req.query.commentId]
    );

    if (checkExistance[0] == null) {
        let checkExistance = await mariadb.pool.query(
            "SELECT * FROM dislike_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        );

        if (checkExistance[0] == null) {
            mariadb.pool
                .query(
                    "INSERT INTO like_video_comment (id_user, id_comment) VALUES (?, ?);",
                    [req.session.userId, req.query.commentId]
                )
                .catch((error) => {
                    console.error("Error inserting like:", error);
                    res.status(500).send("Error inserting like");
                });
        } else {
            res.send("User already disliked");
        }
    } else {
        res.send("User already liked");
    }
};

const removeVideoCommentLike = (req, res) => {
    mariadb.pool
        .query(
            "DELETE FROM like_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        )
        .then((value) => {
            res.send(value);
        })
        .catch((error) => {
            console.error("Error removing like:", error);
            res.status(500).send("Error removing like");
        });
};

const checkVideoCommentDislike = (req, res) => {
    mariadb.pool
        .query(
            "SELECT * FROM dislike_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        )
        .then((value) => {
            res.send(value);
        });
};

const addVideoCommentDislike = async (req, res) => {
    let checkExistance = await mariadb.pool.query(
        "SELECT * FROM like_video_comment WHERE id_user = ? AND id_comment = ?;",
        [req.session.userId, req.query.commentId]
    );

    if (checkExistance[0] == null) {
        let checkExistance = await mariadb.pool.query(
            "SELECT * FROM dislike_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        );

        if (checkExistance[0] == null) {
            mariadb.pool
                .query(
                    "INSERT INTO dislike_video_comment (id_user, id_comment) VALUES (?, ?);",
                    [req.session.userId, req.query.commentId]
                )
                .catch((error) => {
                    console.error("Error inserting dislike:", error);
                    res.status(500).send("Error inserting dislike");
                });
        } else {
            res.send("User already disliked");
        }
    } else {
        res.send("User already liked");
    }
};

const removeVideoCommentDislike = (req, res) => {
    mariadb.pool
        .query(
            "DELETE FROM dislike_video_comment WHERE id_user = ? AND id_comment = ?;",
            [req.session.userId, req.query.commentId]
        )
        .then((value) => {
            res.send(value);
        })
        .catch((error) => {
            console.error("Error removing dislike:", error);
            res.status(500).send("Error removing dislike");
        });
};

module.exports = {
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
};