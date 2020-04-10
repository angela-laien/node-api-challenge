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

router.get("/:id", (req, res) => {
    const { id } = req.params;
    actionDb
        .get(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting action with that id"});
        });
});

router.post("/:id", (req, res) => {
    const newAction = {...req.body, project_id: req.params.id}
    actionDb
        .insert(newAction)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "Error adding action"})
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    actionDb 
        .update(id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({error: "Error updating action"});
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    actionDb
        .remove(id)
        .then(data => {
            res.status(200).json({ message: `action ${id} deleted`, data })
        })
        .catch(err => {
            res.status(500).json({error: "Error deleting action"});
        });
});

module.exports = router;