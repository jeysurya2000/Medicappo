const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./db')

app.use(express.json())

app.use(cors({origin: ["http://localhost:5173"]}))

app.use(require('./routers/Doctor/doctorRouter'))

app.listen(3001, (req, res) => {
    console.log("Server listened at port 3001");
})