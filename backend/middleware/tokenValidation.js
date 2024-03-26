const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  /* The above code is checking the token that is sent in the header of the request. If the token is valid, the user is allowed to access the route. If the
token is invalid, the user is not allowed to access the route. */
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.send("invalid token");
        } else {
          next();
        }
      });
    } else {
      return res.send("acces denied ! user not autorized");
    }
  },
};
