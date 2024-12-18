import express from 'express';
import connectdb from './db/indexdb.js';


const app = express();

connectdb().then(() => {
    app.listen(process.env.port || 5000, () => {
        console.log("seerver is ready")
    })
}).catch((errors) => {
    console.log("connection failed due to ", errors);
    //can be rediredted to a database error page  
})   