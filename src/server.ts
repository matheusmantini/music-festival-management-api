import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./shared/middlewares/errorHandler";
import AllRoutes from "./shared/routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(AllRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
);
