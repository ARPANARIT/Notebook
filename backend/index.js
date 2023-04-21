const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const app = express()
const port = 3001

app.use(express.json())// Middleware to send req body

app.get('/', (req, res) => {
    res.send('Hello Arpana You can do it keep working dont give up')
})
//Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})