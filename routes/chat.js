const express = require("express");

const router = express.Router();

var chatRooms = {
    room1: {
        id: "room1",
        name: "Conference Room",
        users: [], // user ids
        messages: [] // objects with message and timestamp
    },
    room2: {
        id: "room1",
        name: "Group Room",
        users: [],
        messages: []
    }
}


// join
router.post("/join", async (req, res) => {
    const {roomId, userId} = req.body;

    if(!roomId || !userId) {
        return res.status(400).json({
            msg: "invalid request"
        })
    }
    
    if(!chatRooms[roomId]) {
        return res.status(400).json({
            msg: "Rooom not found"
        })
    }

    if(chatRooms[roomId].users.includes(userId)){
        return res.status(400).json({
            msg: "User is already part of the chat room"
        })
    }

    chatRooms[roomId].users.push(userId)

    console.log(chatRooms);

    res.json({
        msg: "User added to the chat room"
    })
});

// send message
router.post("/message", async (req, res) => {
    const {roomId, userId, message} = req.body;

    if(!roomId || !userId || !message) {
        return res.status(400).json({
            msg: "invalid request"
        })
    }
    
    if(!chatRooms[roomId]) {
        return res.status(400).json({
            msg: "Rooom not found"
        })
    }
    if(!chatRooms[roomId].users.includes(userId)){
        return res.status(400).json({
            msg: "User is not part of the chat room"
        })
    }

    chatRooms[roomId].messages.push({
        msg: message,
        timestamp: Date.now(),
        userId: userId
    })

    console.log(chatRooms);
    
    res.json({
        msg: "Message sent"
    })
});

// retrieve
router.get("/messages", async (req, res) => {
    const {roomId, userId} = req.body;

    if(!roomId || !userId) {
        return res.status(400).json({
            msg: "invalid request"
        })
    }
    
    if(!chatRooms[roomId]) {
        return res.status(400).json({
            msg: "Rooom not found"
        })
    }

    if(!chatRooms[roomId].users.includes(userId)){
        return res.status(400).json({
            msg: "User does not have access to this room"
        })
    }

    res.json({
        msg: "messages retrieved",
        messages: chatRooms[roomId].messages
    })
});


module.exports = router;