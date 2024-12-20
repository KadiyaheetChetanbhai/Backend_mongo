import express from 'express';
import connectdb from './db/indexdb.js';
import userRoutes from "./routes/user/user.routes.js"; 
import productRoutes from "./routes/product/Products.routes.js";



const app = express();

connectdb()
.then(() => {


    // Middleware
    app.use(express.json());

    // Routes
    app.use("/api/users", userRoutes);
    app.use("/api/products",productRoutes);
    app.listen(process.env.PORT||5000, () => {
        console.log(`server is ready ${process.env.PORT||5000}`);
    })
}).catch((errors) => {
    console.log("connection failed due to ", errors);
    //can be rediredted to a database error page  
})   