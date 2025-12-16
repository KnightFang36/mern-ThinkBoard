import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';
import helmet from "helmet";
import { fileURLToPath } from "url";



dotenv.config();    

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//middleware


// middleware act as a bridge between request and response
// --example auth check by server before sending response
//--example:rate limiting- is way to limit number of requests from a user in a time frame

app.use(express.json());// to parse JSON bodies: req.body

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
}



app.use(rateLimiter);


// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is  ${req.method} & Req URL is ${req.url}`);
//     next();
// });




app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);


//routes


app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
   app.use(
  express.static(
    path.join(__dirname, "../../frontend/dist")
  )
);

// React fallback route
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
});
}


//start server after db connection
connectDB().then(() => {    
    
    app.listen(PORT,()=>{
       console.log("Server is running on PORT:",PORT);
    });

});