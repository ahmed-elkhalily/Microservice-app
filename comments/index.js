const express = require("express")
const cors = require("cors")
const app = express()
const { randomBytes } = require("crypto")
const axios = require("axios")
const bodyParser = require("body-parser")
// middleware used
app.use(bodyParser.json())
app.use(cors())

const commentsOfPosts = {}

// Start Working
app.post("/posts/:id/comment", async (req, res) => {
	const { content } = req.body
	const commentId = randomBytes(4).toString("hex")
	const id = req.params.id
	const comments = commentsOfPosts[id] || []
	comments.push({ id: commentId, content })
	commentsOfPosts[id] = comments

	const eventData = {
		type: "commentCreation",
		postId: req.params.id,
		comment: {
			commentId,
			content,
			status: "pending",
		},
	}
	await axios.post("http://localhost:4005/events", eventData)

	res.status(201).send(comments)
})

app.get("/posts/:id/comments", (req, res) => {
	res.status(201).send(commentsOfPosts[req.params.id])
})

app.post("/events", (req, res) => {
	const data = req.body
	console.log("comment created:", data)
	res.send({})
})

app.listen(4002, () => console.log("posts works on port:4002"))
