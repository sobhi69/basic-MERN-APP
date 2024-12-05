require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/record',require("./routes/record"))

const conn = require("./db/conn")

app.get("/", (req, res) => {
    res.send("hi")
})

conn.on('error', (err) => {
    console.error(err)
    return
})

conn.once("open", () => {
    console.log('connected to DB')
    app.listen(port, () => {
        console.log(`app is alive at http://localhost:${port}`)
    })
})
