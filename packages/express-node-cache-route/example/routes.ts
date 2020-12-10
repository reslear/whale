import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

// routes
router.get(
  "/",
  asyncHandler((req: Request, res: Response) => {
    res.send(`
      test ok!
    `);
  })
);

export default router;
