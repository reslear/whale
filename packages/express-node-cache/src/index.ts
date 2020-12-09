import express, { Request, Response, NextFunction } from "express";

export const cacheRoute = () => {
  const router = express.Router();

  // routes
  router.get("/_cache", (req: Request, res: Response) => {
    res.send(`
        cache ok!
      `);
  });
  return router;
};
