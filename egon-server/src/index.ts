import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: any, res: any) => {
    console.log("holi");
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})