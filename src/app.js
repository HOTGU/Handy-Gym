import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import trainerRouter from "./routers/trainerRouter";
import wantHealthRouter from "./routers/wantHealthRouter";
import messageRouter from "./routers/messageRouter";
import { localsMiddleware } from "./middleware";
import apiRouter from "./routers/apiRouter";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
// app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

import "./passport";

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.wantHealth, wantHealthRouter);
app.use(routes.users, userRouter);
app.use(routes.trainers, trainerRouter);
app.use(routes.api, apiRouter);
app.use(routes.message, messageRouter);

export default app;
