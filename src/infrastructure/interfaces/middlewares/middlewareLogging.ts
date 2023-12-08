//handling errors, parsing requests
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from "express";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  console.error(error);
  res.status(500).send("Interval Server Error");
};

app.use(errorHandler);
