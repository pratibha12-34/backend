import express from 'express'
import cors from 'cors'

const app = express()

// Application level Middleware
app.use(express.json())
// Decrypt the data 
app.use(cors({
    origin: 'http://localhost:5173',
}))
// allow requests from 5173 port

// router level middleware4
const valid = (req, res, next) => {
    if (req.body[0].name.length<3) {
        res.send(
            "sorry"
        )
    }
    else {
        next()
    }
}

app.get('/', (req, res) => {
    res.send('Hello World')
});

// error handling func
const checkError = (err, req, res, next) => {
    console.error(err)
    res.status(500).send('Internal error')
}

app.post('/register', valid, (req, res) => {
    console.log(req.body)
});

app.use(checkError)

app.listen('8000', () => {
    console.log('Server is running on port 8000')
});