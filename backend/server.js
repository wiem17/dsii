var app = require("./app.js");
require("dotenv").config();

const PORT = process.env.APP_PORT;

app.listen(PORT, async () => {
  console.log(`Listen to port ${PORT}`);
});
