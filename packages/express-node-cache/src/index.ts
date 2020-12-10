import express, { Router, Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

export interface IOptions {
  cache?: NodeCache;
  password?: string | boolean;
  router?: Router;
  prefix?: string;
}

export const cacheRoute = ({
  password,
  router,
  cache,
  prefix = "_cache",
}: IOptions = {}) => {
  const expressRouter = router ?? express.Router();

  // routes
  expressRouter.get(`/${prefix}`, (req: Request, res: Response) => {
    res.send(`
      cache ok!
    `);
  });

  return expressRouter;
};

export default {
  cacheRoute,
};
