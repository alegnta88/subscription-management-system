import express from "express";
import morgan from "morgan";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev")); 

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Hello, Subscription Tracker API!");
});

app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase();
});

export default app;