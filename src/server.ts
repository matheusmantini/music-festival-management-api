import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorHandler";
import { userRouter } from "./router/UserRouter";
import { authRouter } from "./router/AuthRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));
