import express from "express";
import morgan from "morgan";
import router from "./routes/auth.routes.js";
import Tasksrouter from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import Productsrouter from "./routes/products.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',router);
app.use('/api', Tasksrouter);
app.use('/api', Productsrouter);



export default app;