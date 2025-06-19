import express from 'express';
import cors from 'cors';

// app.use(cors());
// app.use(express.json());
const app = express();
const middleware = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
];
app.use(middleware);

app.get('/', (req, res)=>{
    res.send({success:true, message: 'Sever is Live'})
})
export default app;