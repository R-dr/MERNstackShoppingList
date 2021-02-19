const jwt = require("jsonwebtoken");
// with middle ware functions you always want to have three things, the request response and next. you call next when you're done with this function
function Auth(req, res, next) {
  const token = req.header("x-auth-token");
  // check for token
  if (!token) return res.status(401).json({ msg: "Access denied" });

  try {
    // verify token
    // this takes the token if its present and decodes it with the base set in the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "invalid token" });
  }
}
module.exports = Auth;
