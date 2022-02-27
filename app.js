const express = require('express');
const app = express()

const task = require('./routes/taskRoute')
const {connectDB} = require('./db/connect')
const {notFound} = require('./middleware/not-found')
require('dotenv').config()


app.use(express.static('./public'))
app.use(express.json());

app.use('/api/v1/tasks', task)
app.use(notFound)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(5000, () => {console.log(`Server is running on PORT 5000`);})

    } catch (error) {
        console.log(error);
    }
}

start()