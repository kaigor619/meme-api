const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const config = require("./config");
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Sessions
// app.use(
//   session({
//     secret: "some secret",
//     resave: false,
//     saveUninitialized: false,
//     store,
//   })
// );
// var store = new MongoDBStore({
//   uri: keys.MONGODB_URI,
//   collection: "sessions",
// });

// app.use(csurf());
// app.use(flash());
// app.use(helmet());
// app.use(compression());
// app.use(varMiddleware);
// app.use(userMiddleware);

// Register routes
app.use("/memes", require("./routes/memes"));

// Start server listening
async function start() {
  const port = process.env.PORT || 3001;

  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log("Server beginning in port " + port);
    });
  } catch (e) {
    if (e) console.log(e);
  }
}

start();
