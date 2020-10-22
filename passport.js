import passport from "passport";
import User from "./models/User";
import Trainer from "./models/Trainer";

passport.use(User.createStrategy());

// passport.use("trainer", Trainer.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });
