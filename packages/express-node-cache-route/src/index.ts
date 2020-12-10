import express, { Router, Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

export interface IOptions {
  cache?: NodeCache;
  password?: string | boolean;
  router?: Router;
  prefix?: string;
}

enum EErrors {
  Password = "err password, sorry",
}

const checkPassword = (password: any, p: any) => {
  return !password || (password && p && password === p);
};

export const cacheRoute = ({
  password,
  router,
  cache,
  prefix = "_cache",
}: IOptions = {}) => {
  const expressRouter = router ?? express.Router();

  const url = `/${prefix}`;
  const isNodeCache = cache
    ? cache.constructor.name === "NodeCache"
    : undefined;

  // routes
  expressRouter.get(url, (req: Request, res: Response) => {
    try {
      const response = cache?.getStats();

      if (checkPassword(password, req.query.p)) {
        res.type("text/html").send(`<!DOCTYPE html>
<html>
        <title>Cache</title><body>
        000<pre>${JSON.stringify(response, null, 2)}</pre>
        123
        <form type="post" action="${url}">
          <input type="hidden" value="${password}"/>
          <button>Clean Cache</button>
        </form></body>
</html>
      `);
      } else {
        res.send(EErrors.Password);
      }
    } catch (e) {
      res.send(e.response);
    }
  });

  expressRouter.post(url, (req: Request, res: Response) => {
    try {
      if (!checkPassword(password, req.query.p)) {
        throw new Error(EErrors.Password);
      }

      if (isNodeCache) {
        const response = cache?.flushAll();
      }
    } catch (e) {
      res.send(e.response);
    }
  });

  return expressRouter;
};

export default {
  cacheRoute,
};
