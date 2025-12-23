import { Restaurant } from "../models/index.js";
import sequelize from "../setup/sequelize.js";

const dummyRestaurants = [
  {
    name: "Warung Bu Kris",
    description: "Spesialis penyetan dengan sambal khas yang pedas nendang! Warung legendaris yang selalu ramai pengunjung.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    location: "Jl. Manyar Kertoarjo No. 23, Surabaya",
    region: "Surabaya Timur",
    openHours: "10.00 - 22.00",
    instagram: "https://instagram.com/warungbukris",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Warung+Bu+Kris"
  },
  {
    name: "Sate Klopo Ondomohen",
    description: "Sate daging sapi dan ayam dengan balutan kelapa parut gurih sebelum dibakar. Cita rasa unik khas Surabaya.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d580690dd0?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    location: "Jl. Walikota Mustajab No. 36, Surabaya",
    region: "Surabaya Pusat",
    openHours: "07.00 - 23.00",
    instagram: "https://instagram.com/sateondomohen",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Sate+Klopo+Ondomohen"
  },
  {
    name: "Rawon Setan",
    description: "Rawon dengan kuah hitam pekat dari kluwek, daging empuk, dan rasa yang 'pedas setan'. Buka malam hari.",
    image: "https://images.unsplash.com/photo-1546272989-40c92939c6c5?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    location: "Jl. Embong Malang No. 78, Surabaya",
    region: "Surabaya Pusat",
    openHours: "18.00 - 04.00",
    instagram: "https://instagram.com/rawonsetan",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Rawon+Setan"
  },
  {
    name: "Lontong Balap Pak Gendut",
    description: "Makanan khas Surabaya terdiri dari lontong, tahu, lentho, dan tauge, disiram kuah petis yang gurih.",
    image: "https://images.unsplash.com/photo-1603064755736-ec7003143e33?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    location: "Jl. Kranggan No. 60, Surabaya",
    region: "Surabaya Pusat",
    openHours: "09.00 - 21.00",
    instagram: "https://instagram.com/lontongbalappakgendut",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Lontong+Balap+Pak+Gendut"
  },
  {
    name: "Soto Ayam Lamongan Cak Har",
    description: "Soto ayam dengan kuah koya yang kental dan gurih. Porsi besar dan bisa ambil koya sepuasnya!",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    location: "Jl. Arief Rahman Hakim, Surabaya",
    region: "Surabaya Timur",
    openHours: "06.00 - 23.00",
    instagram: "https://instagram.com/sotocakhar",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Soto+Ayam+Cak+Har"
  },
  {
    name: "Bebek Sinjay",
    description: "Bebek goreng Madura yang terkenal dengan kremesan gurih dan sambal pencit (mangga muda) yang super pedas.",
    image: "https://images.unsplash.com/photo-1606509036489-082260ffc31f?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    location: "Jl. Ahmad Yani (Cabang Surabaya)",
    region: "Surabaya Selatan",
    openHours: "09.00 - 21.00",
    instagram: "https://instagram.com/bebeksinjay",
    whatsapp: "https://wa.me/628123456789",
    mapsLink: "https://maps.google.com/?q=Bebek+Sinjay"
  }
];

const seedRestaurants = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    await sequelize.sync(); // Pastikan tabel ada

    // Cek apakah data sudah ada
    const count = await Restaurant.count();
    console.log(`ℹ️  Saat ini ada ${count} restoran di database.`);

    // Gunakan loop untuk check one by one dan UPDATE jika ada
    for (const resto of dummyRestaurants) {
      const existing = await Restaurant.findOne({ where: { name: resto.name } });
      
      if (existing) {
        await existing.update(resto);
        console.log(`🔄 Updated: ${resto.name}`);
      } else {
        await Restaurant.create(resto);
        console.log(`✅ Created: ${resto.name}`);
      }
    }

    console.log("✅ Proses seeding selesai!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal seeding data:", error);
    process.exit(1);
  }
};

seedRestaurants();
