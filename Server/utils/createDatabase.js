import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from Server parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

async function createDb() {
  console.log("🛠️  Attempting to create database...");
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   DB Name: ${process.env.DB_NAME}`);

  try {
    // Connect without database selected
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);
    
    await connection.end();
  } catch (err) {
    console.error("❌ Failed to create database:", err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("\n💡 Tip: Check your DB_PASS in .env file again.");
    }
  }
}

createDb();
