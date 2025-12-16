import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();    

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;



//middleware


// middleware act as a bridge between request and response
// --example auth check by server before sending response
//--example:rate limiting- is way to limit number of requests from a user in a time frame

app.use(express.json());// to parse JSON bodies: req.body
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(rateLimiter);


// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is  ${req.method} & Req URL is ${req.url}`);
//     next();
// });



//routes

app.use("/api/notes", notesRoutes);

//start server after db connection
connectDB().then(() => {    
    
    app.listen(PORT,()=>{
       console.log("Server is running on PORT:",PORT);
    });

});