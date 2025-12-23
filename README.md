# SuroTaste 🍛

**SuroTaste** adalah platform berbasis web untuk menjelajahi, mengulas, dan menemukan kuliner UMKM terbaik di Surabaya. Proyek ini bertujuan untuk mempromosikan kekayaan kuliner lokal dan membantu UMKM terhubung dengan pelanggan.

## 🚀 Fitur Utama

- **Jelajah Kuliner**: Temukan berbagai makanan khas Surabaya seperti Rawon, Rujak Cingur, Lontong Balap, dll.
- **Pencarian & Filter**: Cari kuliner berdasarkan kategori, lokasi, atau nama.
- **Review & Rating**: Pengguna dapat memberikan ulasan dan rating untuk restoran.
- **Rekomendasi Cerdas**: Rekomendasi kuliner berdasarkan preferensi pengguna (segera hadir).
- **Admin Panel**: Dashboard lengkap untuk mengelola data restoran, menu, dan pengguna.
- **Peta Lokasi**: Integrasi Google Maps untuk memudahkan navigasi.

## 🛠️ Tech Stack

**Frontend (Client)**
- **React.js** dengan Vite
- **Tailwind CSS** untuk styling
- **Context API** untuk state management

**Backend (Server)**
- **Node.js** & **Express**
- **Sequelize** (ORM)
- **MySQL** (Database)
- **AdminJS** (Panel Admin & CMS)
- **Redis** (Caching - Opsional)

**DevOps**
- **Docker** & **Docker Compose**
- **Nginx** (Reverse Proxy)

---

## ⚙️ Persiapan & Instalasi

Pastikan komputer Anda sudah terinstall:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Clone Repository

```bash
git clone https://github.com/Cahyadi-Prasetyo/umkm.git
cd umkm
```

### 2. Setup Environment Variables

Proyek ini telah menyediakan file example yang aman. Salin dan sesuaikan jika perlu:

**Root (Utama):**
```bash
cp .env.docker.example .env.docker
```

**Client:**
```bash
cp Client/.env.docker.example Client/.env.docker
```

*(Catatan: File example sudah berisi konfigurasi default yang berjalan dengan Docker, Anda hanya perlu mengganti `YOUR_...` jika ingin menggunakan fitur Google Login)*

### 3. Jalankan Aplikasi dengan Docker

Jalankan perintah berikut untuk membangun dan menjalankan seluruh container (Database, Server, Client):

```bash
docker compose up -d --build
```
Tunggu hingga semua container berjalan (status `healthy` atau `started`).

### 4. Seeding Data (Isi Data Awal)

Agar aplikasi tidak kosong, jalankan perintah seeding berikut untuk mengisi data restoran, kuliner, dan akun admin:

```bash
# 1. Buat Akun Admin
docker compose exec server node utils/seedAdmin.js

# 2. Isi Data Restoran
docker compose exec server node utils/seedRestaurants.js

# 3. Isi Data Kuliner
docker compose exec server node utils/seedCulinary.js
```

---

## 🔑 Akses Aplikasi

| Akses | URL | Keterangan |
| :--- | :--- | :--- |
| **Aplikasi Web** | [http://localhost:8080](http://localhost:8080) | Halaman utama untuk user |
| **Admin Panel** | [http://localhost:8080/admin](http://localhost:8080/admin) | Dashboard pengelolaan data |
| **API Server** | [http://localhost:8080/api](http://localhost:8080/api) | Endpoint Backend |

### 👤 Akun Default

**Super Admin:**
- **Email:** `admin@surotaste.com`
- **Password:** `admin123`

---

## 📁 Struktur Folder

```
surotaste/
├── Client/                 # Source code Frontend (React)
├── Server/                 # Source code Backend (Express)
│   ├── .adminjs/           # AdminJS bundler cache
│   ├── controllers/        # Logic API
│   ├── models/             # Database Scheme
│   ├── setup/              # AdminJS Setup
│   └── utils/              # Seeders & Helpers
├── docker-compose.yml      # Konfigurasi Docker
├── .env.docker             # Env untuk Docker (Root)
└── .gitignore
```
