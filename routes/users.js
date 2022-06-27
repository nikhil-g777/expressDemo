const express = require("express");

const router = express.Router();

// register
router.post("/register", async (req, res) => {
    const {name, email} = req.body;

    if(!name || !email) {
        res.status(400).json({
            msg: "invalid request"
        })

    //save user    

    res.json({
        msg: "User registered"
    })
    }
});

module.exports = router;