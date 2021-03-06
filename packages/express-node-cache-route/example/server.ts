import NodeCache from "node-cache";
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import routes from "./routes";
import { cacheRoute } from "../src/index";

const nc = new NodeCache();

// Create express instance
const app = express().disable("x-powered-by");

// to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use routes
app.use(cacheRoute({ password: "123", cache: nc }));
app.use(routes);

// default 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Logging the error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  let response: any = {
    status: error.status,
    message: error.message,
  };

  if (process.env.NODE_ENV === "development") {
    response["stack"] = error.stack;
  }

  res.status(error.status || 500).json(response);
});

app.listen(5000, function () {
  console.log("👾 express – http://localhost:5000");
});
