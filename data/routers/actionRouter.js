const express = require("express");
const actionDb = require("../helpers/actionModel.js");
const router = express.Router();

router.get("/", (req, res) => {
    actionDb
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting actions"});
        });
});

module.exports = router;