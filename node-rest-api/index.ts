import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './db';
import userRouter from './routes/user.routes';
import petRouter from './routes/pet.routes';
import * as dotenv from 'dotenv';

dotenv.config({ path: './environment.env' });

const app = express();
db.connect();

app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// API root
app.use('/api', userRouter);
app.use('/api/pets', petRouter);

// PORT
const port: string = process.env.PORT || '8000';

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
