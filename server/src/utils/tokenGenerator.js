import jwt from 'jsonwebtoken';

export default function tokenGenerator(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  console.log("Token generated for user:", user, token);
  return token;
}

// module.exports = tokenGenerator;