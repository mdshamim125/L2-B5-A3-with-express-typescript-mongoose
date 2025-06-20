import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/globalErrorHandler';
import routes from './modules/routes';

// app.use(cors());
// app.use(express.json());
const app = express();
const middleware = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
];
app.use(middleware);
app.use(routes);
app.get('/', (req, res)=>{
    res.send({success:true, message: 'Sever is Live'})
})


// 404 Not Found handler
app.use(notFoundHandler);

// Global Error handler 
app.use(errorHandler);

export default app;