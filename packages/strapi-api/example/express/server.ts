import express from "express";
import api from "./api";

const app = express();

app.get("/pages", async (req, res) => {
  const {} = req.query;

  const result = api.find("products");
  res.send(result);
});

app.listen(3000);
