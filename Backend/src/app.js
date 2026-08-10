import express from 'express';
import cors from 'cors';
import dateRoutes from './routes/dateRoutes.js'
const app = express();

app.use(cors())
app.use(express.json())


app.use('/api/v1/dates', dateRoutes)

app.get('/', (req, res) => {
  res.json({
    message:"Date App API is live! 💕"});
});

export default app;