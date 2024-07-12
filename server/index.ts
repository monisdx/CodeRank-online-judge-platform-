import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(cors());

const PORT = Number(process.env.PORT) || 9090;

mongoose.connect(process.env.CONNECTION_URL || '')
   .then(() => app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`)))
   .catch((error)=> console.log(error.message))
