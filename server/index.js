// index.js (CommonJS)

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./src/config/db");
const { Issuer, generators } = require("openid-client");

const authRoutes = require("./src/routes/authRoutes");

async function main() {
  // Discover Google OAuth configuration
  const googleIssuer = await Issuer.discover("https://accounts.google.com");

  const googleClient = new googleIssuer.Client({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: ["http://localhost:5000/auth/google/callback"],
    response_types: ["code"],
  });

  const state = generators.state();
  const nonce = generators.nonce();

  const app = express();
  const PORT = process.env.PORT || 5000;
  const HOSTNAME = process.env.HOSTNAME || "localhost";

  // Middlewares
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // DB Connect
  dbConnect();

  // Your existing API auth routes
  app.use("/api/auth", authRoutes);

  // Step 1: Redirect user to Google login
  app.get("/auth/google", (req, res) => {
    const authUrl = googleClient.authorizationUrl({
      scope: "openid email profile",
      state,
      nonce,
    });
    console.log("Redirecting to:", authUrl);
    res.redirect(authUrl);
  });

  // Step 2: Handle Google callback
  app.get("/auth/google/callback", async (req, res) => {
    try {
      const params = googleClient.callbackParams(req);
      const tokenSet = await googleClient.callback(
        "http://localhost:5000/auth/google/callback",
        params,
        { state, nonce }
      );

      const userinfo = await googleClient.userinfo(tokenSet.access_token);
      res.json({ user: userinfo, tokens: tokenSet });
    } catch (err) {
      console.error("Callback error:", err);
      res.status(500).send("Authentication failed");
    }
  });

  // Default route
  app.all("/{*splat}", (req, res) => {
    res.status(200).send("Hello World!!");
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
  });
}

// Start server
main().catch((err) => {
  console.error("Server startup failed:", err);
  process.exit(1);
});
