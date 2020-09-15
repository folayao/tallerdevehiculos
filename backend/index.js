const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./Lib/mongo');
const { config } = require('./Config/index');
const passport = require("passport");
const users = require("./routes/api/users");
const { json } = require('body-parser');

/* Configuration */
const PORT = config.port || 3000;
/* Server initialize */
const app = express();
/*  */
mongo(app);

/* --------------------Middlewares---------------------- */
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);



app.listen(PORT, () => {
    console.log(`Aplication is listening to http://localhost:${PORT}`)
})
