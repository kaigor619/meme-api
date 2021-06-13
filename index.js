const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Register routes
app.use("/memes", require("./routes/memes"));

// Start server listening
async function start() {
  const port = process.env.PORT || 3001;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
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
