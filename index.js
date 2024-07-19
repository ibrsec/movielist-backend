/* -------------------------------------------------------------------------- */
/*                               Express Server                               */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const session = require("cookie-session");
const authentication = require("./src/middlewares/sessionAtuhentication.js");
const cors = require("cors");

/* ----------------------------------- app ---------------------------------- */
const app = express();

/* ------------------------------ DB CONNECTION ----------------------------- */
require("./src/config/dbConnection")();

/* ------------------------------- Middlewares ------------------------------ */
app.use(express.json());
//cors mw
app.use(cors());
//Cookie Sessions middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);

/* --------------------------------- Swagger -------------------------------- */
const SwDoc = swaggerDoc(require("./src/config/swaggerOptions.json"));
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(SwDoc));

/* --------------------------------- Routes --------------------------------- */
app.all("/", authentication, (req, res) => {
  res.send({
    message: "Welcome to the unknown api!",
    sessions: req.session,
    sessionOpt: req.sessionOptions,
  });
});

app.use("/movies", authentication, require("./src/routers/moviesRouter"));
app.use("/users", require("./src/routers/userRouter"));
app.use("/auth", require("./src/routers/authRouter.js"));

/* ------------------------------ error handler ----------------------------- */
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------ x ----------------------------------- */
/* ----------------------------- Port and Listen ---------------------------- */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is runnging on :", PORT));
