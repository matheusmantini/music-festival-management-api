import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorHandler";
import { userRouter } from "./router/UserRouter";
import { authRouter } from "./router/AuthRouter";
import { bandRouter } from "./router/BandRouter";
import { showRouter } from "./router/ShowRouter";
import { ticketRouter } from "./router/TicketRouter";
import { photoRouter } from "./router/PhotoRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);
app.use("/ticket", ticketRouter);
app.use("/photo", photoRouter)

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));
