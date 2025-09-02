const User = require("../models/users");
const tokenGenerator  = require("../utils/tokenGenerator");

const createUser = async (req, res) => {
  try {
    const { username, email, password, role, department, action } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, password, role, department, action }
    });

    if (!created) {
        console.error("User already exists:", user);
      return res.status(400).json({ error: "User already exists" });
    }

    const token = tokenGenerator(user);
    console.log("Generated JWT:", token);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
} 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers
};