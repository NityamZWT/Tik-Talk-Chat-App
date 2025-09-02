const jwt = require('jsonwebtoken');
const path = require('path');
const newEnforcer = require('casbin').newEnforcer;
const abac_model = path.join(__dirname, '../policies/model.conf');
const abac_policy = path.join(__dirname, '../policies/policy.csv');

const authMiddleware = async(req, res, next) => {
    try {
        // console.log("Auth middleware triggered", req.cookies);
        const token = req.cookies.jwt_token;
        console.log("Extracted token:", token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded token:", req.user);
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(401).json({ error: "unauthorized" });
    }
}

const PEP = async(req, res, next) => {
    try {
        const e = await newEnforcer(abac_model, abac_policy);
        console.log("Policy enforcer loaded");
        const { role } = req.user;
        console.log("between", { role });
        const { action, department } = req.body;
        console.log("Policy enforcement result:", { role, action, department });
        const allowed = await e.enforce(role, 'users', action, department);
        console.log("Enforcement result:", allowed);
        if(!allowed) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();

    } catch (error) {
        res.status(401).json({ error: "something went wrong sorry" });
    }
}

module.exports = {authMiddleware, PEP};