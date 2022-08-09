const express = require('express');
const router = express.Router();
const Chats = require('../models/Chats');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get All the chats using: GET "/api/notes/getuser". Login required
router.get('/fetchallchats', fetchuser, async (req, res) => {
    try {
        const chats = await Chats.find({ room: req.header('room') });
        res.json(chats)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router