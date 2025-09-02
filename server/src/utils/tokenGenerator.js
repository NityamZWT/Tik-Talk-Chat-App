const jwt = require('jsonwebtoken');

const tokenGenerator = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  console.log("Token generated for user:", user, token);
  return token;
}

module.exports = tokenGenerator;