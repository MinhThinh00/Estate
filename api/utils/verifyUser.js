import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Lấy giá trị của access_token từ cookie
  const token = req.cookies.access_token;

  // Nếu không tìm thấy token trong cookie
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token not found' });
  }

  try {
    // Giải mã và xác thực token bằng JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin userId từ payload của token vào req.userId
    req.userId = decoded.userId;

    // Chuyển điều khiển sang middleware tiếp theo
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};
