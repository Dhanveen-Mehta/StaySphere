function passportSetup() {
    const User = require("../models/user.js");
    const express = require("express");
    const app = express();
    const passport = require("passport");
    const LocalStrategy = require("passport-local");

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser());

}

module.exports = passportSetup();