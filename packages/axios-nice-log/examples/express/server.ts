import express from "express";
import { main } from "./main";

const app = express();

app.get("/", async (req, res) => {
  const {} = req.query;
  const result = main();
  res.send(result);
});

app.listen(3000);
console.log("http://localhost:3000/");
