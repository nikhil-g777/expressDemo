const express = require("express");
const path = require("path");
require("dotenv-flow").config();
const app = express();

const userRouter = require("./routes/users");
const chatRouter = require("./routes/chat");

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Home page route
app.get("/", (req, res) => res.json({
    msg: "Hello World!"
}));
app.use("/chat", chatRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server stated on port ${PORT}`);
})
