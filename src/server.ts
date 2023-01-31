import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./shared/middlewares/errorHandler";
import {
  authRouter,
  bandRouter,
  showRouter,
  ticketRouter,
  photoRouter,
  userRouter,
} from "./shared/routes";

const app = express();

app.use(cors());

app.use("/v1/users", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/bands", bandRouter);
app.use("/v1/shows", showRouter);
app.use("/v1/tickets", ticketRouter);
app.use("/v1/photos", photoRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
);
