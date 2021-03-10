import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import csp from "helmet-csp";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import noCache from "nocache";
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

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(helmet());
app.use((req, res, next) => {
  csp({
    directives: {
      defaultSrc: ["'self'", "*.fontawesome.com"],
      frameSrc: ["http://postcode.map.daum.net/"],
      scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`, "*.fontawesome.com", "https://t1.daumcdn.net/"],
      imgSrc: ["'self'", "*.fontawesome.com", "https://handygym.s3.ap-northeast-2.amazonaws.com/", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'", "*.fontawesome.com", "https://fonts.googleapis.com"],
      fontSrc: ["*.googleapis.com", "*.fontawesome.com", "https://fonts.gstatic.com/"],
    },
  })(req, res, next);
});
app.use(noCache());
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
