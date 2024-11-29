const express = require("express");
const cors = require("cors");
const splitRoute = require("./routes/split");
const mergeRoute = require("./routes/merge");
const compressRoute = require('./routes/compress')

const app = express();

//Middleware
app.use(cors());

app.use(mergeRoute);
app.use(splitRoute);
app.use(compressRoute);

app.listen(5000, () => {
  console.log("Server has started running on port 5000");
});

