const express = require("express");
const router = express.Router();

const posts = require("../data/post");

router.get("/", (req, res) => {
    const postsName = req.query.name;
    const counter = posts.length;
    const response = {
        conteggio: counter,
        data: [...posts]
    };

    if (postsName) {
        response.data = posts.filter((post) => post.titolo.toLowerCase().includes(postsName.toLowerCase())
        );
    }
    res.json(response);
});

router.get("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (item) {
        res.json({
            success: true,
            item,
        });
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il post non esiste",
        });
    }
});

router.post("/", (req, res) => {
    res.send("Creazione nuovo post");
});

router.put("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (item) {
        res.send(`Modifica integrale del post ${postId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il post non esiste",
        });
    }
});

router.patch("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (item) {
        res.send(`Modifica parziale del post ${postId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il post non esiste",
        });
    }
});

router.delete("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (item) {
        res.send(`Cancellazione del post ${postId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il post non esiste",
        });
    }
});

module.exports = router;