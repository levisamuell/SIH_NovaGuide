const allowedOrigins = ["https://sih-nova-guide.vercel.app"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true"); // ← must be a string
  }
  next();
};

module.exports = credentials;