const express = require("express")
const fs = require("fs")
const parser = require("body-parser")
const app = express()
const enc = parser.urlencoded({extended: false})

app.get("/", (req, res) => {
	res.send("This is a landing page...")
})

app.post("/feed", enc, (req, res) => {
	let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
	let data = {
		feed: req.body.error,
		toRead: true
	}
	json.data.push(data)
	fs.writeFileSync("data.json", JSON.strigify(json), "utf8")
	res.end("Feedback sent")
})

app.listen(3000, () => {
	console.log("Server activated.")
})



