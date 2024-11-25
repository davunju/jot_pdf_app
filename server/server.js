const express = require("express");
const cors = require("cors");
const splitRoute = require("./routes/split");
const mergeRoute = require("./routes/merge");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use(mergeRoute);
app.use(splitRoute);

app.listen(5000, () => {
  console.log("Server has started running on port 5000");
});
