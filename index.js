const express = require("express")
const fs = require("fs")
const parser = require("body-parser")
const app = express()
const enc = parser.urlencoded({extended: false})

app.use(express.static("public"))
app.get("/", (req, res) => {
	res.send("Please update our apps, for you to make updated.")
})
app.post("/updates", enc, (req, res) => {
	let data = req.body.package
	if(data == undefined){
		res.end("Something went wrong.")
	}else{
		let js_ = JSON.parse(fs.readFileSync("a.json", "utf8"))
		let json = js_[data]
		if(json != undefined){
			let f = {
				"version": json.ver,
				"link": json.url,
				"description": json.desc,
				"isRequired": json.req
			}
		res.end(JSON.stringify(f))
		}else{
			res.end("Not found")
		}
	}
})
app.listen(3000, () => {
	console.log("Listening to default port")
})

module.exports = app