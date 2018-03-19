// REQUIRE PACKAGES
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { json } = require("body-parser");
const cors = require("cors");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
const path = require("path");

// const checkForSession = require(`${__dirname}/middlewares/checkForSession`);
const bc = require(`${__dirname}/controllers/business_controller`);
const sc = require(`${__dirname}/controllers/sub_controller`);
const uc = require(`${__dirname}/controllers/user_controller`);
const pc = require(`${__dirname}/controllers/profile_controller`);

const port = process.env.PORT || 3001;

const app = express();
app.use(express.static(`${__dirname}/../build`));

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

app.use(json());
app.use(cors());

// SERVING PRODUCTION FILES

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000 //365 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/login"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId([profile.id, profile.displayName])
              .then(created => done(null, created[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//authentication
app.get(
  "/login",
  passport.authenticate("auth0", {
    failureRedirect: "/#/login"
  }),
  (req, res) => {
    // console.log(req.user);
    //if user don't have account
    if (!req.user.city) {
      //send to setup
      res.redirect(`http://localhost:3000/#/setup/`);
    } else {
      //send to profile
      res.redirect(`http://localhost:3000/#/user/${req.user.name}`);
    }
  }
);

app.get("/api/me", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(500).json({ message: "Please Login" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/#/");
  });
});

//get business info
app.get("/api/businesses", bc.getAll);
app.get("/api/businesses/:type", bc.getType);
app.get("/api/business/:id", bc.getOne);
app.get("/api/hours/:id", bc.getHours);
app.get("/api/buspic/:id", bc.profilePic);
app.put("/api/business/:id", bc.updateBus);

//create New Business
app.put("/api/setbus/:id", uc.createBus);
app.post("/api/createbus/:id", bc.createBus);

//subscribers
app.post("/api/subscriptions", sc.createSub);
app.get("/api/subscriptions/:id", sc.getSubs);
app.delete("/api/deletesub/:id/:id2", sc.deleteSub);

//appointments
app.post("/api/appointment/:id", uc.newAppt);
app.get("/api/appointments/:id", uc.getAppt);
app.get("/api/bappointments/:id", uc.getBAppt);
app.delete("/api/deleteappt/:id/:id2", uc.deleteAppt);
app.delete("/api/deletebappt/:id/:id2", uc.deleteBAppt);

//update user info
app.put("/api/user/:id", uc.updateInfo);
app.put("/api/newuser/:id", uc.newUser);

app.get("/api/profilepic/:id", uc.profilePic);

// FOR TESTING PURPOSES

// app.get("/api/test", (req, res) => {
//   req.app
//     .get("db")
//     .getUser()
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// FOR PRODUCTION ONLY
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
