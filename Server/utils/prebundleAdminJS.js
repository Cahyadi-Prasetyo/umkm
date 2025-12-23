// Script to pre-bundle AdminJS components during Docker build
// Run this BEFORE starting the server to ensure components.bundle.js is created

import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import { ComponentLoader } from "adminjs";
import uploadFeature from "@adminjs/upload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register adapter
AdminJS.registerAdapter(AdminJSSequelize);

// Create component loader
const componentLoader = new ComponentLoader();

// Setup upload feature to register components (without database connection)
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// Create a minimal upload feature to get components registered
const uploadConfig = uploadFeature({
  componentLoader,
  provider: {
    local: { bucket: UPLOADS_DIR },
  },
  properties: {
    key: "image",
    file: "uploadImage",
  },
});

// Create AdminJS instance for bundling only
const adminJs = new AdminJS({
  componentLoader,
  resources: [], // No resources needed for bundling
});

console.log("🔧 Pre-bundling AdminJS components...");

try {
  // Initialize bundling
  await adminJs.initialize();
  
  // Check if bundle was created
  const bundlePath = path.join(process.cwd(), ".adminjs", "bundle.js");
  const componentsBundlePath = path.join(process.cwd(), ".adminjs", "components.bundle.js");
  
  if (fs.existsSync(bundlePath)) {
    // Copy bundle.js to components.bundle.js (what AdminJS Express expects)
    fs.copyFileSync(bundlePath, componentsBundlePath);
    console.log("✅ Copied bundle.js → components.bundle.js");
    
    // Verify size
    const stats = fs.statSync(componentsBundlePath);
    console.log(`✅ Bundle size: ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log("⚠️  bundle.js not found, bundling may have failed");
  }
  
  console.log("✅ AdminJS pre-bundling complete!");
} catch (error) {
  console.error("❌ Pre-bundling failed:", error.message);
  process.exit(1);
}

process.exit(0);
