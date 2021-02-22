const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())

app.post("/events", async (req, res) => {
	const { type } = req.body
	if (type === "commentCreation") {
		const {
			comment: { content },
		} = req.body
		const status = content.includes("orange") ? "rejected" : "approved"
		const eventData = {
			...req.body,
			type: "commentApproval",
		}
		eventData.comment.status = status
		console.log("eventData", eventData)
		await axios.post("http://localhost:4005/events", eventData)
	}
	res.send({ status: "ok!!" })
})

app.listen(4004, () => console.log("posts works on port:4004"))
