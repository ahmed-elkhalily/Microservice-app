const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())

app.post("/events", async (req, res) => {
	const { body } = req
	await axios.post("http:/posts-clusterid:4001/events", body) // posts
	await axios.post("http://localhost:4002/events", body) //comments
	await axios.post("http://localhost:4003/events", body) //query
	await axios.post("http://localhost:4004/events", body) //modration

	console.log("event bus HELLO :)")
	res.send({ status: "ok!" })
})
app.listen(4005, () => console.log("listening to 4005"))
