const express = require("express")
const cors = require("cors")
const app = express()
const { randomBytes } = require("crypto")
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.post("/posts", async (req, res) => {
	const id = randomBytes(4).toString("hex")
	const { title } = req.body
	posts[id] = {
		id,
		title,
	}
	const eventData = {
		type: "postCreation",
		post: {
			title,
			id,
		},
	}
	await axios.post("http://event-bus-srv:4005/events", eventData)
	res.status(201).json(posts)
})

app.get("/posts", (req, res) => {
	res.send(posts)
})

app.post("/events", (req, res) => {
	const data = req.body
	console.log("post created", data)
	res.send({})
})

app.listen(4001, () => console.log("posts works on port:4001"))
