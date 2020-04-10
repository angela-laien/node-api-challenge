const express = require("express");
const projectDb = require("../helpers/projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
    projectDb
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({err: "error getting projects"});
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    projectDb
        .get(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({err: "error getting the project with that id"});
        });
});

router.get("/actions/:id", (req, res) => {
    const { id } = req.params;
    projectDb
        .getProjectActions(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({err: "error getting project action"});
        });
});

router.post("/", (req, res) => {
    projectDb
        .insert(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({err: "error adding project"});
        });
});

router.put("/:id", (req, res) => {
    projectDb
        .update(req.params.id, req.body)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: "Project not found"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "Error updating project"});
        });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    projectDb
        .remove(id)
        .then(data => {
            res.status(200).json({message: `project ${id} deleted`, data})
        })
        .catch(err => {
            res.status(500).json({error: "Error deleting project"});
        });
});

module.exports = router;