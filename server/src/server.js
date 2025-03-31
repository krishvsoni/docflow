import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './auth/route.js';
import session from 'express-session'; 
import passport from 'passport';
import connectDB from './database/db.js';
import DraftRouter from './draft/index.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({ origin: ["http://localhost:5173","https://docflow-three.vercel.app"], credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 72 * 60 * 60 * 1000 } 
    })
);
app.use(passport.initialize());
app.use(passport.session());



app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  });
  
app.get('/',(req,res) => {
    res.json({message: 'welcome to document API'});
})

app.use('/auth', router);
app.use('/draft', DraftRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});