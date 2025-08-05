
# Fitur Aplikasi AWS Clarity

Berikut adalah daftar rinci fitur yang saat ini diimplementasikan atau direncanakan untuk aplikasi AWS Clarity.

## 1. Dasbor & Pemantauan

- **Pemantauan Status Instans**: Kartu khusus untuk layanan utama (EC2, Lambda, RDS) yang menampilkan status waktu nyata (Berjalan, Berhenti, Gagal).
- **Pemantauan Waktu Aktif (Uptime)**: Menampilkan persentase waktu aktif untuk periode 24 jam, 7 hari, dan 30 hari untuk setiap layanan yang dipantau.
- **Desain Responsif**: Tata letak dasbor yang dapat beradaptasi dengan mulus di berbagai ukuran layar, dari desktop hingga perangkat seluler.

## 2. Pelacakan Biaya & Keuangan

- **Grafik Pelacak Biaya**: Grafik batang bertumpuk yang memvisualisasikan biaya harian dan bulanan, dikelompokkan berdasarkan layanan (EC2, Lambda, RDS, S3).
- **Peringatan Anggaran Cerdas**: Kartu khusus yang menampilkan pengeluaran saat ini terhadap batas anggaran, beserta perkiraan pengeluaran di masa depan.
- **Peringatan Visual**: Indikator visual yang jelas ketika perkiraan pengeluaran melebihi anggaran yang ditetapkan.

## 3. CI/CD & Deployment

- **Status Pipeline CI/CD**: Daftar pipeline deployment yang dapat diperluas, menampilkan status terbaru (Sukses, Gagal, Sedang Berjalan).
- **Riwayat Pipeline**: Tampilan detail untuk setiap pipeline, memberikan informasi tentang waktu jalan terakhir dan detail eksekusi (placeholder).

## 4. Analisis & AI

- **Ringkasan Log Berbasis AI**: Alat yang didukung oleh Genkit untuk menganalisis data log mentah dan menghasilkan ringkasan dalam bahasa alami yang ringkas.
- **Input yang Dapat Disesuaikan**: Pengguna dapat memilih jangka waktu dan sumber daya AWS yang relevan untuk analisis log.

## 5. Migrasi

- **Pelacakan Migrasi**: Halaman khusus untuk melacak status migrasi basis data dan infrastruktur (misalnya, dari Terraform/CDK).
- **Status Berkode Warna**: Status yang jelas (Selesai, Gagal, Sedang Berjalan, Tertunda) dengan ikon dan lencana yang sesuai.
- **Tipe Migrasi**: Kategorisasi migrasi berdasarkan jenisnya (Skema, Infrastruktur, Data).

## 6. Manajemen Pengguna & Akses

- **Kontrol Akses Berbasis Peran (RBAC)**: Tiga peran pengguna yang telah ditentukan sebelumnya: Admin, Developer, dan Viewer.
- **Navigasi Dinamis**: Sidebar dan menu secara dinamis menampilkan tautan berdasarkan peran pengguna yang masuk.
- **Perlindungan Rute**: Mencegah akses tidak sah ke halaman melalui URL langsung.
- **Tabel Manajemen Pengguna**: Antarmuka untuk Admin guna melihat, mengedit peran, dan menghapus pengguna.

## 7. Pengaturan & Kustomisasi

- **Wizard Koneksi AWS**: Dialog untuk memandu pengguna dalam menghubungkan akun AWS mereka (simulasi).
- **Pengaturan Notifikasi**: Sakelar untuk mengaktifkan/menonaktifkan berbagai jenis lansiran.
- **Pemilihan Bahasa**: Kemampuan untuk beralih antara antarmuka bahasa Inggris dan Indonesia secara instan.
- **Penyesuaian Tema**: Skema warna aplikasi disesuaikan agar cocok dengan branding logo.
