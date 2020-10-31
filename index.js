const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoDBConnect } = require('./db/mongo');
const cors = require('cors');
// const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const AuthRouter = require('./routers/authRouter')
const router = require('./route');


// dotenv.config();



const PORT = 5000;

MongoDBConnect();
// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully");
// })

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', AuthRouter);

// app.use('/', router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});