import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie; // "access_token=eyJhbGci..."
    if (!cookieHeader) {
      return res.status(401).json({ message: "No token" });
    }

    // Split cookies and find the access_token
    const token = cookieHeader
      .split('; ')
      .find(cookie => cookie.startsWith('access_token='))
      ?.split('=')[1];



  if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;    // { id: user._id }

    next();
  } catch (err) {
    next(err);
  }
};
