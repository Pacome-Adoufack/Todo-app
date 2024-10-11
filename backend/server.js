import express from "express";
import todoRouter from "./routes/todos.js";
import cors from "cors";

const app = express()
const port = 8000;

app.use(cors())
app.use(express.json());
app.use("/api/todos", todoRouter)

app.listen(port, () => {
    console.log(`server ist listining on ${port}`); 
})