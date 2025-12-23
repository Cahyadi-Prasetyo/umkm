import { Culinary, Food, Restaurant } from "../models/index.js";
import sequelize from "../setup/sequelize.js";

const dummyCulinary = [
  {
    name: "Rujak Cingur",
    description: "Makanan khas Surabaya yang terdiri dari irisan mulut sapi (cingur), sayuran, buah-buahan, tahu, tempe, dan lontong yang disiram bumbu petis udang.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Cingur sapi, Tauge, Kangkung, Bengkoang, Nanas, Mangga muda, Tahu, Tempe, Lontong, Bumbu Petis",
    calories: 450,
    price: 25000,
    taste: "Gurih, Pedas, Petis",
    category: "Makanan Berat"
  },
  {
    name: "Rawon",
    description: "Sup daging sapi berkuah hitam pekat yang menggunakan kluwek sebagai bumbu utamanya. Biasanya disajikan dengan nasi hangat, tauge pendek, dan telur asin.",
    image: "https://images.unsplash.com/photo-1603064755736-ec7003143e33?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Daging sapi, Kluwek, Bawang merah, Bawang putih, Lengkuas, Serai, Daun jeruk",
    calories: 680,
    price: 35000,
    taste: "Gurih, Berkuah",
    category: "Makanan Berat"
  },
  {
    name: "Lontong Balap",
    description: "Hidangan yang terdiri dari lontong, tahu goreng, lentho, dan tauge yang disiram kuah gurih. Lontong balap sangat nikmat disantap dengan sate kerang.",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Lontong, Tahu, Tauge, Lentho, Bawang goreng, Kecap manis, Sambal petis",
    calories: 520,
    price: 20000,
    taste: "Gurih, Segar",
    category: "Makanan Berat"
  },
  {
    name: "Tahu Tek",
    description: "Tahu goreng setengah matang yang dipotong-potong, dicampur dengan kentang goreng, tauge, dan kerupuk, lalu disiram bumbu petis kacang yang kental.",
    image: "https://images.unsplash.com/photo-1628294895950-98052523e036?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Tahu, Kentang, Telur, Tauge, Kerupuk, Kacang tanah, Petis, Bawang putih",
    calories: 590,
    price: 18000,
    taste: "Gurih, Kacang, Petis",
    category: "Makanan Berat"
  },
  {
    name: "Sate Klopo",
    description: "Sate daging sapi atau ayam yang dibalur parutan kelapa berbumbu sebelum dibakar, memberikan rasa gurih yang khas dan aroma yang menggugah selera.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d580690dd0?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Daging sapi/ayam, Kelapa parut, Bawang merah, Bawang putih, Ketumbar, Kunyit",
    calories: 480,
    price: 30000,
    taste: "Gurih, Bakar",
    category: "Sate"
  },
  {
    name: "Semanggi Suroboyo",
    description: "Pecel khas Surabaya yang menggunakan daun semanggi kukus, disajikan dengan sambal ketela rambat yang manis gurih dan kerupuk puli.",
    image: "https://images.unsplash.com/photo-1606416625841-860e68449c28?q=80&w=1000&auto=format&fit=crop",
    origin: "Surabaya",
    ingredients: "Daun semanggi, Tauge, Bumbu ketela rambat, Kacang tanah, Gula merah, Kerupuk puli",
    calories: 320,
    price: 15000,
    taste: "Manis, Gurih",
    category: "Sayuran"
  }
];

const seedCulinary = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    // 1. Get or Create a dummy Food category/parent
    const [food] = await Food.findOrCreate({
      where: { name: "Aneka Kuliner Surabaya" },
      defaults: {
        description: "Kumpulan kuliner khas Surabaya",
        category: "Umum",
        meals: "Lunch, Dinner",
        history: "Sejarah kuliner Surabaya",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
      }
    });

    // 2. Get a dummy restaurant (first one found)
    const restaurant = await Restaurant.findOne();
    if (!restaurant) {
      throw new Error("No restaurant found! Run seedRestaurants.js first.");
    }

    for (const item of dummyCulinary) {
      const data = {
        ...item,
        foodId: food.id,
        restaurantId: restaurant.id
      };

      const existing = await Culinary.findOne({ where: { name: item.name } });
      
      if (existing) {
        await existing.update(data);
        console.log(`🔄 Updated: ${item.name}`);
      } else {
        await Culinary.create(data);
        console.log(`✅ Created: ${item.name}`);
      }
    }

    console.log("✅ Proses seeding Culinary selesai!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal seeding Culinary:", error);
    process.exit(1);
  }
};

seedCulinary();
