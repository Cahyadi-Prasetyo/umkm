import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./utils/googleAuth.js";
import sequelize from "./setup/sequelize.js";
import { adminJs, adminRouter, UPLOADS_DIR } from "./setup/admin.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import foodRoutes from "./routes/foodRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import culinaryRoutes from "./routes/culinaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import savedRestaurantRoutes from "./routes/savedRestaurantRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Setup __dirname untuk ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 24 jam
    secure: false, // Set true jika pakai HTTPS
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files untuk uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// IMPORTANT: Route untuk AdminJS agar bisa akses uploaded files
app.use(
  `${adminJs.options.rootPath}/uploads`, 
  express.static(path.join(__dirname, "uploads"))
);

// WORKAROUND: Serve pre-built components.bundle.js directly 
// This overrides AdminJS's bundleComponents action which fails in Docker
// Using fs.readFileSync because sendFile doesn't work for some reason
import fs from "fs";

app.get(`${adminJs.options.rootPath}/frontend/assets/components.bundle.js`, (req, res) => {
  const bundlePath = path.resolve(process.cwd(), ".adminjs", "components.bundle.js");
  try {
    const bundleContent = fs.readFileSync(bundlePath, "utf8");
    res.set("Content-Type", "application/javascript");
    res.send(bundleContent);
    console.log("✅ Served components.bundle.js:", bundleContent.length, "bytes");
  } catch (err) {
    console.error("Error serving components.bundle.js:", err);
    res.status(500).json({ message: "Bundle not found", path: bundlePath });
  }
});

// AdminJS - HARUS SEBELUM ROUTES LAIN
app.use(adminJs.options.rootPath, adminRouter);

// API Routes
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/culinary", culinaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/saved", savedRestaurantRoutes);
app.use("/api/chat", chatRoutes);


//publik
app.use("/culinary", express.static(path.join(process.cwd(), "uploads/culinary")));
app.use("/restaurants", express.static(path.join(process.cwd(), "uploads/restaurants")));
app.use("/menus", express.static(path.join(process.cwd(), "uploads/menus")));
app.use("/users", express.static(path.join(process.cwd(), "uploads/users")));

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handler - HARUS DI PALING BAWAH
app.use(errorHandler);

// Database & Server - HANYA 1X
// AdminJS DB connection (Sequelize only for admin)
sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Admin DB connected");
    
    // Sync models to database (Create tables)
    try {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synced with MySQL");
    } catch (error) {
      console.error("⚠️  Database sync failed:", error.message);
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Admin panel: http://localhost:${PORT}/admin`);
    });
  })
  .catch((err) => {
    console.error("❌ Admin DB error:", err);
    process.exit(1);
  });
