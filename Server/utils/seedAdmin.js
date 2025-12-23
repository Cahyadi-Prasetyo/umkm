import bcrypt from 'bcrypt';
import { User, sequelize } from '../models/index.js';

async function seedAdmin() {
  console.log("🌱 Creating default Admin user...");

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@surotaste.com' } });
    if (existingAdmin) {
      console.log("✅ Admin user already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create user
    await User.create({
      name: 'Super Admin',
      email: 'admin@surotaste.com',
      password: hashedPassword,
      role: 'admin',
      provider: 'local',
      image: 'https://ui-avatars.com/api/?name=Admin+SuroTaste'
    });

    console.log("✅ Admin user created successfully!");
    console.log("   Email: admin@surotaste.com");
    console.log("   Pass:  admin123");
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    await sequelize.close();
  }
}

seedAdmin();
