const express = require('express');
const mongoose=require('mongoose');
const config = require('./config')
const cors = require('cors')

const app = express();
const urlRoute = require('./router/urlRouter')
app.use(express.json());

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.get("/", (req, res) => {
    res.json({ message: "Hello from url shortern" });
});

app.use(cors(corsOptions))
app.use('/api',urlRoute );

app.listen(config.port, () => {
    console.log(`server starts on port ${config.port}`)
});

const mongdb=mongoose.connect(config.db)
.then(() => {
    console.log(`connected on ${config.db}`)
})
.catch((err) =>{
    console.log({error:err})
});

