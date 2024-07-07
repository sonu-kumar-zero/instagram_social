import jwt from "jsonwebtoken";

const userVerifyMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Assuming the header is in the format "Bearer token"

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("Error in userVerifyMiddleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { userVerifyMiddleware };
