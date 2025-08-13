import express from "express"
import cors from "cors"
import { connectDB } from "./config/DB.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/OrderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// Connecting DB
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res)=>{
    res.send("API working");
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})