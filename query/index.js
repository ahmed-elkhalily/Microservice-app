const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.post("/events", (req, res) => {
	const { type } = req.body
	if (type === "postCreation") {
		const { post } = req.body
		posts[post.id] = {
			...post,
			comments: {},
		}
		console.log("query type", posts)
	}
	if (type === "commentCreation") {
		const { postId, comment } = req.body
		posts[postId].comments[comment.commentId] = comment
		console.log("query comment: ", posts)
	}
	if (type === "commentApproval") {
		const {
			postId,
			comment: { commentId, status },
		} = req.body
		posts[postId].comments[commentId].status = status
		console.log(posts[postId].comments)
	}
	res.send({})
})
app.get("/posts", (req, res) => {
	res.send(posts)
})

app.listen(4003, () => console.log("Queries on:localhost:4003"))
