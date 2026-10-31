import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Clock, CheckCircle2, AlertCircle, HelpCircle, User, Award, 
  BarChart3, FileSpreadsheet, Plus, Edit3, Trash2, Download, Upload, 
  Settings, Lock, RefreshCw, Eye, ChevronLeft, ChevronRight, Save, 
  Check, X, Flag, LogOut, ArrowRight, FileText, Printer, School, Atom, Layers
} from 'lucide-react';

// --- INITIAL QUESTION BANK (40 COMPLETE QUESTIONS) ---
const INITIAL_BANK = [
  // MATERI 1: STRUKTUR ATOM (20 SOAL)
  {
    id: "SA-01",
    materi: "Struktur Atom",
    indikator: "Menjelaskan perkembangan teori atom dan kelemahan model atom Bohr",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Model atom yang menggambarkan elektron beredar mengelilingi inti atom pada lintasan/tingkat energi tertentu seperti sistem tata surya dikemukakan oleh Niels Bohr. Kelemahan utama dari model atom Bohr adalah...",
    pilihan: [
      "Tidak dapat menjelaskan keberadaan inti atom yang bermuatan positif",
      "Tidak dapat menjelaskan spektrum warna untuk atom yang memiliki banyak elektron",
      "Belum menemukan partikel penyusun atom berupa neutron",
      "Menganggap atom sebagai bola pejal yang tidak dapat dibagi lagi",
      "Menyatakan bahwa elektron tidak memiliki lintasan yang pasti"
    ],
    kunci: 1,
    pembahasan: "Model atom Bohr berhasil menjelaskan spektrum atom Hidrogen (satu elektron), namun gagal menjelaskan spektrum garis untuk atom bermuatan banyak (banyak elektron) serta efek Zeeman."
  },
  {
    id: "SA-02",
    materi: "Struktur Atom",
    indikator: "Mengidentifikasi partikel penyusun atom dan notasi atom",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Sebuah atom netral Kalsium memiliki lambang ion/atom ${}_{20}^{40}\\text{Ca}$. Jumlah proton, neutron, dan elektron secara berturut-turut pada atom kalsium tersebut adalah...",
    pilihan: [
      "20, 20, dan 20",
      "20, 40, dan 20",
      "40, 20, dan 20",
      "20, 20, dan 40",
      "40, 40, dan 20"
    ],
    kunci: 0,
    pembahasan: "Proton (Z) = 20. Karena atom netral, Elektron = Z = 20. Neutron = Nomor Massa (A) - Nomor Atom (Z) = 40 - 20 = 20."
  },
  {
    id: "SA-03",
    materi: "Struktur Atom",
    indikator: "Menentukan jumlah p, n, e pada ion bermuatan",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Ion Aluminum dirumuskan sebagai ${}_{13}^{27}\\text{Al}^{3+}$. Jumlah proton, neutron, dan elektron yang terdapat dalam ion tersebut adalah...",
    pilihan: [
      "13 proton, 14 neutron, dan 13 elektron",
      "13 proton, 14 neutron, dan 10 elektron",
      "13 proton, 27 neutron, dan 10 elektron",
      "10 proton, 14 neutron, dan 13 elektron",
      "16 proton, 14 neutron, dan 10 elektron"
    ],
    kunci: 1,
    pembahasan: "Proton = 13; Neutron = 27 - 13 = 14; Elektron = 13 - 3 (melepas 3 e⁻) = 10."
  },
  {
    id: "SA-04",
    materi: "Struktur Atom",
    indikator: "Membedakan Isotop, Isobar, dan Isoton",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Diberikan pasangan unsur berikut:\n(1) ${}_{6}^{12}\\text{C}$ dan ${}_{6}^{13}\\text{C}$\n(2) ${}_{6}^{14}\\text{C}$ dan ${}_{7}^{14}\\text{N}$\n(3) ${}_{11}^{23}\\text{Na}$ dan ${}_{12}^{24}\\text{Mg}$\nPasangan yang berturut-turut merupakan ISOTOP, ISOBAR, dan ISOTON adalah...",
    pilihan: [
      "(1), (2), dan (3)",
      "(1), (3), dan (2)",
      "(2), (1), dan (3)",
      "(3), (2), dan (1)",
      "(2), (3), dan (1)"
    ],
    kunci: 0,
    pembahasan: "(1) Isotop: Z sama (6 dan 6). (2) Isobar: A sama (14 dan 14). (3) Isoton: N sama (23-11=12 dan 24-12=12)."
  },
  {
    id: "SA-05",
    materi: "Struktur Atom",
    indikator: "Menentukan konfigurasi elektron Bohr (Kulit K, L, M, N)",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Konfigurasi elektron menurut Niels Bohr untuk unsur Kalium (${}_{19}\\text{K}$) pada kondisi dasar adalah...",
    pilihan: [
      "2 . 8 . 9",
      "2 . 8 . 8 . 1",
      "2 . 9 . 8",
      "2 . 8 . 7 . 2",
      "2 . 10 . 7"
    ],
    kunci: 1,
    pembahasan: "Pengisian kulit Bohr: K=2, L=8, M=8 (maksimal 8 sebelum mengisi N), N=1. Jadi 2.8.8.1."
  },
  {
    id: "SA-06",
    materi: "Struktur Atom",
    indikator: "Menentukan elektron valensi suatu unsur",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Suatu unsur mempunyai nomor atom 15 (Fosfor, P). Jumlah elektron valensi dari atom Fosfor tersebut adalah...",
    pilihan: [
      "3",
      "5",
      "7",
      "8",
      "2"
    ],
    kunci: 1,
    pembahasan: "Konfigurasi 15P = 2 . 8 . 5. Elektron valensi di kulit terluar adalah 5."
  },
  {
    id: "SA-07",
    materi: "Struktur Atom",
    indikator: "Menentukan konfigurasi elektron subkulit (spdf)",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Konfigurasi elektron berdasarkan subkulit (aturan Aufbau) untuk atom Besi (${}_{26}\\text{Fe}$) adalah...",
    pilihan: [
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁷",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 4p⁶",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s³"
    ],
    kunci: 0,
    pembahasan: "Urutan Aufbau: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ (Total = 26 e⁻)."
  },
  {
    id: "SA-08",
    materi: "Struktur Atom",
    indikator: "Konfigurasi elektron ion transisi (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Konfigurasi elektron dari ion Besi(III) atau $\\text{Fe}^{3+}$ dengan nomor atom Fe = 26 adalah...",
    pilihan: [
      "[Ar] 3d⁵ 4s¹",
      "[Ar] 3d⁶",
      "[Ar] 3d⁵",
      "[Ar] 3d⁴ 4s²",
      "[Ar] 3d³ 4s²"
    ],
    kunci: 2,
    pembahasan: "Atom netral ²⁶Fe: [Ar] 4s² 3d⁶. Membentuk Fe³⁺ berarti melepas 3 elektron (2 dari kulit terluar 4s dan 1 dari 3d). Maka konfigurasinya menjadi [Ar] 3d⁵."
  },
  {
    id: "SA-09",
    materi: "Struktur Atom",
    indikator: "Konfigurasi elektron pengecualian kestabilan subkulit (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Unsur Tembaga (${}_{29}\\text{Cu}$) memiliki konfigurasi elektron keadaan dasar yang unik karena aturan penuh/setengah penuh pada orbital d. Konfigurasi elektron yang paling tepat untuk ${}_{29}\\text{Cu}$ adalah...",
    pilihan: [
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁹",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s⁰ 3d¹¹",
      "1s² 2s² 2p⁶ 3s² 3p⁵ 4s² 3d¹⁰",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁸ 4p¹"
    ],
    kunci: 1,
    pembahasan: "Subkulit d lebih stabil jika terisi penuh (d¹⁰) atau setengah penuh (d⁵). Oleh karena itu, 1 elektron dari 4s berpindah ke 3d sehingga konfigurasi menjadi [Ar] 4s¹ 3d¹⁰."
  },
  {
    id: "SA-10",
    materi: "Struktur Atom",
    indikator: "Menentukan bilangan kuantum elektron terakhir (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Harga keempat bilangan kuantum (n, l, m, s) untuk elektron terakhir dari atom ${}_{17}\\text{Cl}$ adalah...",
    pilihan: [
      "n = 3, l = 1, m = 0, s = -1/2",
      "n = 3, l = 1, m = +1, s = +1/2",
      "n = 3, l = 0, m = 0, s = -1/2",
      "n = 3, l = 2, m = 0, s = -1/2",
      "n = 2, l = 1, m = -1, s = +1/2"
    ],
    kunci: 0,
    pembahasan: "¹⁷Cl: 1s² 2s² 2p⁶ 3s² 3p⁵. Elektron terakhir ada di 3p⁵. n=3, l=1 (subkulit p). Pengisian 5 e⁻ pada orbital m: (-1, 0, +1): e1(-1↑), e2(0↑), e3(+1↑), e4(-1↓), e5(0↓). Maka m = 0, s = -1/2."
  },
  {
    id: "SA-11",
    materi: "Struktur Atom",
    indikator: "Memahami percobaan dan penemu partikel dasar atom",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Penemuan elektron melalui percobaan tabung sinar katode dilakukan oleh seorang ilmuwan bernama...",
    pilihan: [
      "Ernest Rutherford",
      "John Dalton",
      "J.J. Thomson",
      "James Chadwick",
      "Eugen Goldstein"
    ],
    kunci: 2,
    pembahasan: "J.J. Thomson menemukan elektron melalui eksperimen sinar katode dan mengusulkan model atom 'roti kismis'."
  },
  {
    id: "SA-12",
    materi: "Struktur Atom",
    indikator: "Penemuan Inti Atom",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Percobaan penembakan lempeng emas tipis dengan sinar alfa yang membuktikan bahwa atom terdiri atas inti yang bermuatan positif dikemukakan oleh...",
    pilihan: [
      "J.J. Thomson",
      "Ernest Rutherford",
      "Niels Bohr",
      "Louis de Broglie",
      "James Chadwick"
    ],
    kunci: 1,
    pembahasan: "Ernest Rutherford menemukan inti atom melalui penembakan lempeng emas dengan partikel α (alfa)."
  },
  {
    id: "SA-13",
    materi: "Struktur Atom",
    indikator: "Partikel Neutron",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Partikel dasar penyusun inti atom yang tidak bermuatan listrik (netral) ditemukan oleh James Chadwick pada tahun 1932. Partikel tersebut adalah...",
    pilihan: [
      "Proton",
      "Elektron",
      "Neutron",
      "Positron",
      "Foton"
    ],
    kunci: 2,
    pembahasan: "James Chadwick menemukan partikel neutron yang tidak bermuatan (netral) di dalam inti atom."
  },
  {
    id: "SA-14",
    materi: "Struktur Atom",
    indikator: "Notasi Ionik dan Jumlah Elektron",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Suatu ion $X^{2-}$ memiliki 18 elektron dan 16 neutron. Nomor atom dan nomor massa unsur X netral berturut-turut adalah...",
    pilihan: [
      "16 dan 32",
      "18 dan 34",
      "20 dan 36",
      "16 dan 34",
      "18 dan 32"
    ],
    kunci: 0,
    pembahasan: "Ion X²⁻ menangkap 2 e⁻ → e = Z + 2 → 18 = Z + 2 → Z = 16 (Nomor Atom). Nomor Massa A = Z + n = 16 + 16 = 32."
  },
  {
    id: "SA-15",
    materi: "Struktur Atom",
    indikator: "Analisis data konfigurasi ion",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Ion $M^{3+}$ memiliki konfigurasi elektron 1s² 2s² 2p⁶. Jika jumlah neutron atom M adalah 14, maka nomor massa unsur M tersebut adalah...",
    pilihan: [
      "13",
      "24",
      "27",
      "30",
      "23"
    ],
    kunci: 2,
    pembahasan: "Jumlah e⁻ pada M³⁺ = 10. Berarti Z (proton M netral) = 10 + 3 = 13. Nomor massa A = Z + neutron = 13 + 14 = 27 (Unsur Al)."
  },
  {
    id: "SA-16",
    materi: "Struktur Atom",
    indikator: "Model Atom Mekanika Kuantum",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Menurut teori atom mekanika kuantum, kedudukan elektron di dalam atom tidak dapat ditentukan dengan pasti, melainkan hanya daerah kebolehjadian terbesar ditemukannya elektron yang disebut...",
    pilihan: [
      "Lintasan atom",
      "Orbital",
      "Kulit atom",
      "Subkulit utama",
      "Foton"
    ],
    kunci: 1,
    pembahasan: "Berdasarkan prinsip ketidakpastian Heisenberg, ruang atau wilayah dengan kebolehjadian menemukan elektron dinamakan orbital."
  },
  {
    id: "SA-17",
    materi: "Struktur Atom",
    indikator: "Analisis aplikasi isotop dalam kehidupan",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Isotop Karbon-14 (${}_{6}^{14}\\text{C}$) dalam kehidupan sehari-hari dan ilmu pengetahuan sering dimanfaatkan untuk...",
    pilihan: [
      "Membunuh sel-sel kanker",
      "Determinasikan umur fosil dan artefak purbakala",
      "Bahan bakar pembangkit listrik tenaga nuklir",
      "Uji kebocoran pipa industri",
      "Sterilisasi alat kedokteran"
    ],
    kunci: 1,
    pembahasan: "Isotop Karbon-14 (C-14) digunakan dalam radiokarbon dating untuk memperkirakan usia fosil purbakala."
  },
  {
    id: "SA-18",
    materi: "Struktur Atom",
    indikator: "Aturan Hund pada pengisian orbital",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Aturan Hund menyatakan bahwa pada pengisian orbital-orbital dengan tingkat energi sama, elektron-elektron akan...",
    pilihan: [
      "Mengisi orbital secara berpasangan terlebih dahulu",
      "Mengisi orbital secara sendiri-sendiri dengan spin paralel sebelum berpasangan",
      "Menempati tingkat energi paling tinggi terlebih dahulu",
      "Memiliki setidaknya dua bilangan kuantum yang identik",
      "Selalu memancarkan energi foton"
    ],
    kunci: 1,
    pembahasan: "Aturan Hund: Pada orbital berenergi setara, elektron mengisi orbital satu per satu dengan spin sejajar (paralel) sebelum mulai berpasangan."
  },
  {
    id: "SA-19",
    materi: "Struktur Atom",
    indikator: "Prinsip Larangan Pauli",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Menurut Prinsip Larangan Pauli, dalam satu atom tidak boleh ada dua elektron yang memiliki...",
    pilihan: [
      "Nilai tingkat energi yang berdekatan",
      "Keempat bilangan kuantum yang persis sama",
      "Jumlah elektron valensi yang sama",
      "Massa dan muatan yang berbeda",
      "Spin yang berlawanan arah"
    ],
    kunci: 1,
    pembahasan: "Larangan Pauli menegaskan bahwa tidak ada dua elektron dalam satu atom yang dapat memiliki 4 bilangan kuantum (n, l, m, s) yang identik."
  },
  {
    id: "SA-20",
    materi: "Struktur Atom",
    indikator: "Aplikasi Konfigurasi elektron",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Unsur X bereaksi membentuk ion $X^{2+}$ yang isoelektronik (jumlah elektron sama) dengan atom gas mulia Argon (${}_{18}\\text{Ar}$). Nomor atom unsur X adalah...",
    pilihan: [
      "16",
      "18",
      "20",
      "22",
      "24"
    ],
    kunci: 2,
    pembahasan: "Ar memiliki 18 elektron. Ion X²⁺ memiliki 18 elektron (telah melepas 2 e⁻). Maka atom netral X memiliki 18 + 2 = 20 elektron (Nomor atom = 20, yaitu Kalsium)."
  },

  // MATERI 2: SISTEM PERIODIK UNSUR (20 SOAL)
  {
    id: "SPU-01",
    materi: "Sistem Periodik Unsur",
    indikator: "Perkembangan SPU (Triad Dobereiner)",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Pengelompokan unsur berdasarkan Hukum Triad dikemukakan oleh Johann Wolfgang Döbereiner. Prinsip utama Hukum Triad adalah...",
    pilihan: [
      "Massa atom unsur kedua merupakan rata-rata dari massa atom unsur pertama dan ketiga",
      "Sifat unsur akan berulang pada unsur kedelapan",
      "Unsur-unsur disusun berdasarkan kenaikan nomor atom",
      "Setiap kelompok terdiri atas 8 unsur dengan sifat yang mirip",
      "Unsur-unsur disusun dalam bentuk tabel pilin (telluric helix)"
    ],
    kunci: 0,
    pembahasan: "Dalam Triad Döbereiner, 3 unsur dengan sifat mirip dikelompokkan di mana massa atom unsur tengah adalah rata-rata massa atom unsur pertama dan ketiga."
  },
  {
    id: "SPU-02",
    materi: "Sistem Periodik Unsur",
    indikator: "Hukum Oktaf Newlands",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Hukum Oktaf yang menyatakan bahwa sifat-sifat unsur akan berulang secara periodik pada unsur setiap urutan ke-8 dikemukakan oleh...",
    pilihan: [
      "Dmitri Mendeleev",
      "John Newlands",
      "Henry Moseley",
      "Lothar Meyer",
      "Robert Boyle"
    ],
    kunci: 1,
    pembahasan: "Hukum Oktaf dicetuskan oleh John Newlands (1864)."
  },
  {
    id: "SPU-03",
    materi: "Sistem Periodik Unsur",
    indikator: "Dasar Pengelompokan SPU Modern",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Sistem Periodik Unsur Modern yang kita gunakan saat ini disusun oleh Henry Moseley berdasarkan...",
    pilihan: [
      "Kenaikan massa atom relatif",
      "Kenaikan nomor atom (jumlah proton)",
      "Kenaikan jumlah neutron",
      "Kemiripan warna dan wujud fisik",
      "Jumlah isotop yang ditemukan di alam"
    ],
    kunci: 1,
    pembahasan: "SPU Modern (Moseley) disusun berdasarkan kenaikan nomor atom (jumlah proton) dan kemiripan sifat periodik."
  },
  {
    id: "SPU-04",
    materi: "Sistem Periodik Unsur",
    indikator: "Penentuan Golongan dan Periode dari Nomor Atom",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Suatu unsur X memiliki nomor atom 17. Dalam Sistem Periodik Unsur, unsur X terletak pada...",
    pilihan: [
      "Golongan VA, Periode 3",
      "Golongan VIA, Periode 3",
      "Golongan VIIA, Periode 3",
      "Golongan VIIA, Periode 4",
      "Golongan VIIIB, Periode 3"
    ],
    kunci: 2,
    pembahasan: "Konfigurasi ¹⁷X = 1s² 2s² 2p⁶ 3s² 3p⁵. Kulit terbesar = 3 (Periode 3). Elektron valensi pada kulit 3 = 2 + 5 = 7 (Golongan VIIA / Halogen)."
  },
  {
    id: "SPU-05",
    materi: "Sistem Periodik Unsur",
    indikator: "Penentuan Golongan Unsur Transisi",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Unsur Titanium (${}_{22}\\text{Ti}$) dalam tabel periodik unsur terletak pada blok d. Golongan dan periode unsur Titanium yang tepat adalah...",
    pilihan: [
      "Golongan IVB, Periode 4",
      "Golongan IIIA, Periode 4",
      "Golongan IVA, Periode 4",
      "Golongan VB, Periode 4",
      "Golongan IIB, Periode 4"
    ],
    kunci: 0,
    pembahasan: "²²Ti: [Ar] 4s² 3d². Kulit terbesar = 4 (Periode 4). Jumlah e⁻ pada 4s + 3d = 2 + 2 = 4 (Golongan IVB)."
  },
  {
    id: "SPU-06",
    materi: "Sistem Periodik Unsur",
    indikator: "Analisis Jari-Jari Atom dalam Satu Golongan/Periode",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Kecenderungan ukuran jari-jari atom unsur-unsur dalam satu periode dari kiri ke kanan adalah...",
    pilihan: [
      "Semakin besar karena jumlah kulit bertambah",
      "Semakin kecil karena muatan inti bertambah sehingga tarikan ke elektron makin kuat",
      "Tetap karena jumlah elektron valensinya sama",
      "Semakin besar kemudian mendatar",
      "Tidak beraturan tergantung nomor massa"
    ],
    kunci: 1,
    pembahasan: "Dari kiri ke kanan dalam satu periode, jumlah kulit tetap tetapi muatan inti (proton) bertambah, sehingga gaya tarik inti terhadap elektron makin kuat dan jari-jari mengecil."
  },
  {
    id: "SPU-07",
    materi: "Sistem Periodik Unsur",
    indikator: "Pengurutan Jari-jari Atom (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Diketahui nomor atom beberapa unsur Golongan IA: ₃Li, ₁₁Na, ₁₉K, ₃₇Rb. Urutan unsur-unsur tersebut berdasarkan Kenaikan Jari-Jari Atom (dari terkecil ke terbesar) adalah...",
    pilihan: [
      "Rb < K < Na < Li",
      "Li < Na < K < Rb",
      "Na < Li < K < Rb",
      "K < Na < Li < Rb",
      "Li < K < Na < Rb"
    ],
    kunci: 1,
    pembahasan: "Dalam satu golongan dari atas ke bawah (nomor atom bertambah), jumlah kulit atom bertambah sehingga jari-jari atom makin besar. Maka Li < Na < K < Rb."
  },
  {
    id: "SPU-08",
    materi: "Sistem Periodik Unsur",
    indikator: "Konsep Energi Ionisasi",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Energi minimum yang diperlukan oleh suatu atom netral dalam wujud gas untuk melepaskan satu elektron terluarnya membentuk ion positif disebut...",
    pilihan: [
      "Afinitas Elektron",
      "Elektronegativitas",
      "Energi Ionisasi",
      "Keelektropositifan",
      "Energi Ikatan"
    ],
    kunci: 2,
    pembahasan: "Energi Ionisasi adalah energi yang dibutuhkan untuk melepaskan 1 elektron dari atom netral berwujud gas."
  },
  {
    id: "SPU-09",
    materi: "Sistem Periodik Unsur",
    indikator: "Analisis grafik/tabel energi ionisasi (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Berikut adalah data Energi Ionisasi pertama (kJ/mol) unsur-unsur periode 3 secara acak:\nP: 738, Q: 578, R: 496, S: 1000, T: 1251.\nJika unsur-unsur tersebut disusun berdasarkan kenaikan nomor atom dari kiri ke kanan dalam periode 3 (mengabaikan anomali kecil), urutan posisi yang benar adalah...",
    pilihan: [
      "R - Q - P - S - T",
      "R - P - Q - S - T",
      "T - S - P - Q - R",
      "P - Q - R - S - T",
      "Q - P - R - S - T"
    ],
    kunci: 1,
    pembahasan: "Secara umum, dari kiri ke kanan dalam satu periode, Energi Ionisasi cenderung meningkat. Nilai terendah R(496, Na) -> P(738, Mg) -> Q(578, Al: anomali Mg-Al) -> S(1000, P) -> T(1251, Cl). Urutan kenaikan nomor atom: R-P-Q-S-T."
  },
  {
    id: "SPU-10",
    materi: "Sistem Periodik Unsur",
    indikator: "Afinitas Elektron",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Pernyataan yang benar mengenai Afinitas Elektron adalah...",
    pilihan: [
      "Besarnya energi yang dilepaskan/diserap ketika suatu atom netral menangkap satu elektron",
      "Kemampuan atom menarik elektron dalam suatu ikatan kimia",
      "Energi yang diperlukan untuk melepaskan elektron dari kulit terluar",
      "Jarak dari inti atom hingga kulit terluar elektron",
      "Kecenderungan atom untuk membentuk kation positif"
    ],
    kunci: 0,
    pembahasan: "Afinitas elektron adalah perubahan energi saat atom netral fase gas menangkap satu elektron membentuk anion."
  },
  {
    id: "SPU-11",
    materi: "Sistem Periodik Unsur",
    indikator: "Kelektronegatifan (Skala Pauling)",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Unsur yang memiliki nilai keelektronegatifan (elektronegativitas) paling tinggi dalam Sistem Periodik Unsur adalah...",
    pilihan: [
      "Fransium (Fr)",
      "Fluorin (F)",
      "Oksigen (O)",
      "Klorin (Cl)",
      "Helium (He)"
    ],
    kunci: 1,
    pembahasan: "Fluorin (F) merupakan unsur yang paling elektronegatif dengan nilai skala Pauling sebesar 4,0."
  },
  {
    id: "SPU-12",
    materi: "Sistem Periodik Unsur",
    indikator: "Pengelompokan Logam, Nonlogam, dan Metaloid",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Unsur-unsur yang memiliki sifat antara logam dan nonlogam (semikonduktor) disebut metaloid. Contoh pasangan unsur metaloid adalah...",
    pilihan: [
      "Natrium (Na) dan Kalium (K)",
      "Silikon (Si) dan Germanium (Ge)",
      "Klorin (Cl) dan Bromin (Br)",
      "Besi (Fe) dan Tembaga (Cu)",
      "Helium (He) dan Neon (Ne)"
    ],
    kunci: 1,
    pembahasan: "Silikon (Si) dan Germanium (Ge) terletak pada garis diagonal pembatas logam-nonlogam dan merupakan bahan semikonduktor (metaloid)."
  },
  {
    id: "SPU-13",
    materi: "Sistem Periodik Unsur",
    indikator: "Nama Khusus Golongan Utama",
    tingkat: "Mudah",
    bobot: 2.5,
    pertanyaan: "Unsur-unsur yang terletak pada Golongan VIIA (F, Cl, Br, I, At) dikenal dengan nama kelompok...",
    pilihan: [
      "Logam Alkali",
      "Logam Alkali Tanah",
      "Halogen",
      "Gas Mulia",
      "Kalkogen"
    ],
    kunci: 2,
    pembahasan: "Golongan VIIA disebut Halogen (pembentuk garam)."
  },
  {
    id: "SPU-14",
    materi: "Sistem Periodik Unsur",
    indikator: "Sifat Gas Mulia",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Unsur-unsur Golongan VIIIA (Gas Mulia) sangat stabil dan sukar bereaksi dengan unsur lain. Hal ini disebabkan karena...",
    pilihan: [
      "Jari-jari atomnya sangat besar",
      "Kulit terluarnya telah terisi penuh oleh 8 elektron (oktet) atau 2 elektron (duplet)",
      "Memiliki energi ionisasi paling rendah",
      "Dapat melepaskan elektron dengan sangat mudah",
      "Memiliki keelektronegatifan paling tinggi"
    ],
    kunci: 1,
    pembahasan: "Gas Mulia sangat stabil karena konfigurasi elektron valensinya penuh (2 pada He, 8 pada Ne, Ar, Kr, Xe, Rn) sesuai kaidah duplet dan oktet."
  },
  {
    id: "SPU-15",
    materi: "Sistem Periodik Unsur",
    indikator: "Analisis Jari-jari Ion vs Jari-jari Atom (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Pernyataan yang benar mengenai perbandingan jari-jari atom netral dengan jari-jari ionnya adalah...",
    pilihan: [
      "Jari-jari kation ($\text{Na}^+$) lebih besar dari atom netralnya ($\text{Na}$)",
      "Jari-jari kation ($\text{Na}^+$) lebih kecil dari atom netralnya ($\text{Na}$)",
      "Jari-jari anion ($\text{F}^-$) lebih kecil dari atom netralnya ($\text{F}$)",
      "Jari-jari kation dan anion selalu sama dengan atom netralnya",
      "Pelepasan elektron selalu memperbesar ukuran jari-jari atom"
    ],
    kunci: 1,
    pembahasan: "Saat membentuk kation ( Na⁺ ), atom melepas elektron dan mengurangi jumlah kulit/tolakan e⁻, sehingga jari-jari kation LEBIH KECIL daripada atom netralnya. Sebaliknya, anion lebih besar dari atom netralnya."
  },
  {
    id: "SPU-16",
    materi: "Sistem Periodik Unsur",
    indikator: "Isoelektronik dan Ukuran Jari-jari (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Spesi-spesi berikut memiliki jumlah elektron yang sama (isoelektronik): ${}_{11}\\text{Na}^+$, ${}_{12}\\text{Mg}^{2+}$, ${}_{9}\\text{F}^-$, ${}_{8}\\text{O}^{2-}$. Urutan spesi dari yang memiliki JARI-JARI TERBESAR ke TERKECIL adalah...",
    pilihan: [
      "$\\text{Mg}^{2+} > \\text{Na}^+ > \\text{F}^- > \\text{O}^{2-}$",
      "$\\text{O}^{2-} > \\text{F}^- > \\text{Na}^+ > \\text{Mg}^{2+}$",
      "$\\text{Na}^+ > \\text{Mg}^{2+} > \\text{O}^{2-} > \\text{F}^-$",
      "$\\text{F}^- > \\text{O}^{2-} > \\text{Mg}^{2+} > \\text{Na}^+$",
      "$\\text{Mg}^{2+} > \\text{O}^{2-} > \\text{Na}^+ > \\text{F}^-$"
    ],
    kunci: 1,
    pembahasan: "Untuk spesi isoelektronik (semua e⁻ = 10), semakin besar muatan positif (jumlah proton Z), semakin kuat daya tarik inti sehingga jari-jari makin KECIL. O²⁻(Z=8) > F⁻(Z=9) > Na⁺(Z=11) > Mg²⁺(Z=12)."
  },
  {
    id: "SPU-17",
    materi: "Sistem Periodik Unsur",
    indikator: "Sifat Keperiodikan Logam dan Non-logam",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Dalam satu periode dari kiri ke kanan, sifat logam dan kecenderungan daya pereduksi (reduktor) dari unsur-unsur akan...",
    pilihan: [
      "Semakin bertambah",
      "Semakin berkurang",
      "Tetap sama",
      "Meningkat drastis pada golongan halogen",
      "Sama dengan golongan gas mulia"
    ],
    kunci: 1,
    pembahasan: "Dari kiri ke kanan dalam satu periode, sifat logam berkurang (sifat nonlogam bertambah) dan daya pereduksi (kemampuan melepas e⁻) semakin berkurang."
  },
  {
    id: "SPU-18",
    materi: "Sistem Periodik Unsur",
    indikator: "Analisis Tabel Unsur dan Posisi (HOTS)",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Tabel data 3 unsur acak dan konfigurasi elektron valensi:\n• Unsur X: 3s² 3p⁴\n• Unsur Y: 4s¹\n• Unsur Z: 3s² 3p⁵\nBerdasarkan data tersebut, jenis ikatan atau kecenderungan yang benar adalah...",
    pilihan: [
      "Unsur Y adalah nonlogam yang sangat reaktif",
      "Unsur Z berada pada Golongan VIIA (Halogen) dan cenderung menangkap 1 elektron",
      "Unsur X terletak pada periode 4",
      "Unsur Y dan Z keduanya terletak pada periode 3",
      "Unsur X memiliki keelektronegatifan terendah dibanding Y"
    ],
    kunci: 1,
    pembahasan: "Unsur Z berakhiran 3s² 3p⁵ -> e valensi = 7 -> Golongan VIIA (Halogen), periode 3. Halogen sangat mudah menangkap 1 elektron membentuk ion Z⁻."
  },
  {
    id: "SPU-19",
    materi: "Sistem Periodik Unsur",
    indikator: "Aplikasi Sifat Unsur Halogen dalam Kehidupan",
    tingkat: "Sedang",
    bobot: 2.5,
    pertanyaan: "Unsur Klorin ($\text{Cl}$) dan Iodium ($\text{I}$) banyak dimanfaatkan dalam kehidupan sehari-hari secara berturut-turut untuk...",
    pilihan: [
      "Disinfektan air minum/pemutih dan antiseptik luka/pencegah penyakit gondok",
      "Bahan bakar roket dan bahan pembuat kaca",
      "Pupuk tanaman dan pengawet makanan",
      "Pengisi balon udara dan lampu reklame",
      "Pelapis besi tahan karat dan bahan perhiasan"
    ],
    kunci: 0,
    pembahasan: "Klorin digunakan sebagai disinfektan kaporit/pemutih, sedangkan Iodium untuk antiseptik obat luka dan garam beriodium pencegah gondok."
  },
  {
    id: "SPU-20",
    materi: "Sistem Periodik Unsur",
    indikator: "Titik Leleh dan Titik Didih Unsur",
    tingkat: "Sulit",
    bobot: 2.5,
    pertanyaan: "Kecenderungan titik leleh dan titik didih untuk unsur-unsur Golongan IA (Logam Alkali) dari atas ke bawah (Li ke Cs) adalah...",
    pilihan: [
      "Semakin tinggi karena massa atom makin berat",
      "Semakin rendah karena ikatan logam makin lemah akibat jari-jari atom yang membesar",
      "Konstan tidak berubah",
      "Naik drastis pada Kalium",
      "Sama dengan kecenderungan golongan Halogen"
    ],
    kunci: 1,
    pembahasan: "Pada logam alkali (IA), dari atas ke bawah jari-jari atom membesar sehingga ikatan logam makin lemah. Akibatnya titik leleh dan titik didih makin RENDAH."
  }
];

export default function ChemTestApp() {
  // --- APPLICATION STATES ---
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'teacher'
  const [questionBank, setQuestionBank] = useState(() => {
    const saved = localStorage.getItem('chem_test_bank');
    return saved ? JSON.parse(saved) : INITIAL_BANK;
  });

  // Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('chem_test_settings');
    return saved ? JSON.parse(saved) : {
      schoolName: "SMA NEGERI 46 MALUKU TENGAH",
      appTitle: "CHEM-TEST X",
      subtitle: "Sistem Asesmen Digital Kimia Kelas X",
      teacherName: "Sarkia Silawane, S.Pd.",
      schoolYear: "2026/2027",
      kktp: 75,
      durationMinutes: 60,
      totalExamQuestions: 40,
      shuffleQuestions: true,
      shuffleOptions: true,
      showExplanations: true,
      isExamActive: true,
      allowedClasses: ["X-1", "X-2", "X-3", "X-4", "X-5", "X-6"]
    };
  });

  // Save Settings & Bank locally
  useEffect(() => {
    localStorage.setItem('chem_test_bank', JSON.stringify(questionBank));
  }, [questionBank]);

  useEffect(() => {
    localStorage.setItem('chem_test_settings', JSON.stringify(settings));
  }, [settings]);

  // Student Exam Session States
  const [examStep, setExamStep] = useState('welcome'); // 'welcome' | 'confirm' | 'instructions' | 'exam' | 'result'
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    nisn: '',
    kelas: 'X-1',
    noPeserta: ''
  });

  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { qId: chosenOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { qId: boolean }
  const [timeLeft, setTimeLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Class Results database (stored in localStorage)
  const [allExamResults, setAllExamResults] = useState(() => {
    const saved = localStorage.getItem('chem_test_results');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chem_test_results', JSON.stringify(allExamResults));
  }, [allExamResults]);

  // Admin / Teacher Auth & Admin Tab State
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [teacherSubTab, setTeacherSubTab] = useState('bank'); // 'bank' | 'settings' | 'results' | 'analytics'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('All');

  // Question Modal Editor State
  const [editingQuestion, setEditingQuestion] = useState(null); // null or question object

  // --- EXAM TIMER HANDLER ---
  useEffect(() => {
    let timer;
    if (examStep === 'exam' && timeLeft > 0 && !examSubmitted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStep, timeLeft, examSubmitted]);

  // Save progress during exam
  useEffect(() => {
    if (examStep === 'exam') {
      const progress = {
        studentProfile,
        userAnswers,
        flaggedQuestions,
        sessionQuestions,
        currentQIndex,
        timeLeft
      };
      localStorage.setItem('chem_test_current_progress', JSON.stringify(progress));
    }
  }, [userAnswers, flaggedQuestions, currentQIndex, timeLeft, examStep]);

  // --- FUNCTIONS: EXAM PREPARATION ---
  const startExamSetup = () => {
    if (!studentProfile.name || !studentProfile.nisn || !studentProfile.noPeserta) {
      alert("Harap lengkapi semua data identitas peserta ujian!");
      return;
    }
    setExamStep('confirm');
  };

  const confirmAndProceedToInstructions = () => {
    setExamStep('instructions');
  };

  const initiateExamRoom = () => {
    // Generate questions for session
    let selected = [...questionBank];
    
    // Balance distribution if required
    const saQuestions = selected.filter(q => q.materi === "Struktur Atom");
    const spuQuestions = selected.filter(q => q.materi === "Sistem Periodik Unsur");
    
    let pool = [];
    const targetPerTopic = Math.floor(settings.totalExamQuestions / 2);
    
    if (settings.shuffleQuestions) {
      const shuffledSA = [...saQuestions].sort(() => 0.5 - Math.random()).slice(0, targetPerTopic);
      const shuffledSPU = [...spuQuestions].sort(() => 0.5 - Math.random()).slice(0, targetPerTopic);
      pool = [...shuffledSA, ...shuffledSPU].sort(() => 0.5 - Math.random());
    } else {
      pool = selected.slice(0, settings.totalExamQuestions);
    }

    // Process option shuffling if enabled
    const processedPool = pool.map(q => {
      if (!settings.shuffleOptions) return q;
      
      const originalOptions = q.pilihan.map((opt, idx) => ({ text: opt, originalIdx: idx }));
      const shuffledOptions = [...originalOptions].sort(() => 0.5 - Math.random());
      const newKunci = shuffledOptions.findIndex(o => o.originalIdx === q.kunci);
      
      return {
        ...q,
        pilihan: shuffledOptions.map(o => o.text),
        kunci: newKunci
      };
    });

    setSessionQuestions(processedPool);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(settings.durationMinutes * 60);
    setCurrentQIndex(0);
    setExamSubmitted(false);
    setExamStep('exam');
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleFlagQuestion = (qId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleFinalSubmit = () => {
    let scoreObtained = 0;
    let maxScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    let topicStats = {
      "Struktur Atom": { total: 0, correct: 0 },
      "Sistem Periodik Unsur": { total: 0, correct: 0 }
    };

    sessionQuestions.forEach(q => {
      const weight = q.bobot || 2.5;
      maxScore += weight;

      if (!topicStats[q.materi]) {
        topicStats[q.materi] = { total: 0, correct: 0 };
      }
      topicStats[q.materi].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unansweredCount++;
      } else if (userAns === q.kunci) {
        correctCount++;
        scoreObtained += weight;
        topicStats[q.materi].correct += 1;
      } else {
        incorrectCount++;
      }
    });

    const finalScore = maxScore > 0 ? Math.round((scoreObtained / maxScore) * 100) : 0;
    const isPassed = finalScore >= settings.kktp;
    
    let predikat = "E";
    if (finalScore >= 90) predikat = "A (Sangat Baik)";
    else if (finalScore >= 80) predikat = "B (Baik)";
    else if (finalScore >= 75) predikat = "C (Cukup)";
    else if (finalScore >= 60) predikat = "D (Kurang)";
    else predikat = "E (Sangat Kurang)";

    const resultObj = {
      id: "RES-" + Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
      student: studentProfile,
      score: finalScore,
      correctCount,
      incorrectCount,
      unansweredCount,
      totalQuestions: sessionQuestions.length,
      isPassed,
      predikat,
      topicStats,
      userAnswers,
      sessionQuestions
    };

    setExamResult(resultObj);
    setAllExamResults(prev => [resultObj, ...prev]);
    setExamSubmitted(true);
    setExamStep('result');
    localStorage.removeItem('chem_test_current_progress');
  };

  // --- TEACHER ACTIONS ---
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (pinInput === 'admin123' || pinInput === '4646') {
      setIsTeacherLoggedIn(true);
      setPinInput('');
    } else {
      alert("PIN Akses Guru Salah! (Gunakan PIN default: admin123)");
    }
  };

  const handleSaveQuestion = (qData) => {
    if (editingQuestion && editingQuestion.id) {
      setQuestionBank(prev => prev.map(q => q.id === qData.id ? qData : q));
    } else {
      const newId = "Q-" + (questionBank.length + 1).toString().padStart(2, '0');
      setQuestionBank(prev => [...prev, { ...qData, id: newId }]);
    }
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus soal ini dari Bank Soal?")) {
      setQuestionBank(prev => prev.filter(q => q.id !== id));
    }
  };

  const exportBankJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionBank, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Bank_Soal_CHEMTEST_X_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBankJSON = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) {
          setQuestionBank(parsed);
          alert("Bank Soal berhasil diperbarui!");
        } else {
          alert("Format file JSON tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON.");
      }
    };
  };

  const exportResultsCSV = () => {
    if (allExamResults.length === 0) {
      alert("Belum ada data hasil ujian untuk diunduh.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Tanggal,Nama,NISN,Kelas,No Peserta,Nilai,Status,Predikat,Benar,Salah,Kosong\n";
    allExamResults.forEach((r, idx) => {
      csvContent += `${idx + 1},"${r.timestamp}","${r.student.name}","${r.student.nisn}","${r.student.kelas}","${r.student.noPeserta}",${r.score},"${r.isPassed ? 'TUNTAS' : 'BELUM TUNTAS'}","${r.predikat}",${r.correctCount},${r.incorrectCount},${r.unansweredCount}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_SAS_Kimia_SMAN46_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // --- ANALYTICS CALCULATIONS ---
  const classAnalytics = useMemo(() => {
    if (allExamResults.length === 0) return null;
    const scores = allExamResults.map(r => r.score);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const passedCount = allExamResults.filter(r => r.isPassed).length;
    const passPercentage = Math.round((passedCount / allExamResults.length) * 100);

    return {
      total: allExamResults.length,
      highest,
      lowest,
      avg,
      passedCount,
      failedCount: allExamResults.length - passedCount,
      passPercentage
    };
  }, [allExamResults]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* GLOBAL TOP NAV BAR */}
      <header className="bg-slate-900 text-white shadow-lg border-b border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/30">
              <Atom className="w-7 h-7 text-white animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {settings.appTitle}
                <span className="text-xs bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded-full font-semibold">
                  FASE E / KELAS X
                </span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-blue-400" /> {settings.schoolName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition ${
                activeTab === 'student'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <User className="w-4 h-4" /> Ruang Ujian Peserta
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition ${
                activeTab === 'teacher'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Lock className="w-4 h-4" /> Panel Guru / Admin
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* ========================================================================= */}
        {/* TAB 1: STUDENT EXAMINATION WORKFLOW */}
        {/* ========================================================================= */}
        {activeTab === 'student' && (
          <div>
            {/* STEP 1: WELCOME & IDENT FORM */}
            {examStep === 'welcome' && (
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-8 text-white relative">
                  <div className="absolute top-4 right-4 opacity-10">
                    <Atom className="w-48 h-48 text-white" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-blue-400/30">
                      ASESMEN SUMATIF AKHIR SEMESTER (SAS)
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold">{settings.appTitle}</h2>
                    <p className="text-blue-200 mt-1 text-sm md:text-base">{settings.subtitle}</p>
                    
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                      <div>
                        <span className="text-slate-400 block">Mata Pelajaran:</span>
                        <span className="font-semibold text-white">Kimia</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Guru Pengampu:</span>
                        <span className="font-semibold text-white">{settings.teacherName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Tahun Ajaran:</span>
                        <span className="font-semibold text-white">{settings.schoolYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); startExamSetup(); }} className="p-6 md:p-8 space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" /> Identitas Peserta Didik
                    </h3>
                    <p className="text-xs text-slate-500">Silakan isi data diri Anda dengan benar sebelum memulai tes.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nama Lengkap Peserta</label>
                      <input
                        type="text"
                        required
                        value={studentProfile.name}
                        onChange={(e) => setStudentProfile({ ...studentProfile, name: e.target.value })}
                        placeholder="Contoh: Ahmad Abdullah"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">NIS / NISN</label>
                      <input
                        type="text"
                        required
                        value={studentProfile.nisn}
                        onChange={(e) => setStudentProfile({ ...studentProfile, nisn: e.target.value })}
                        placeholder="Contoh: 0061234567"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rombongan Belajar (Kelas)</label>
                      <select
                        value={studentProfile.kelas}
                        onChange={(e) => setStudentProfile({ ...studentProfile, kelas: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                      >
                        {settings.allowedClasses.map(cls => (
                          <option key={cls} value={cls}>Kelas {cls}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nomor Peserta Ujian</label>
                      <input
                        type="text"
                        required
                        value={studentProfile.noPeserta}
                        onChange={(e) => setStudentProfile({ ...studentProfile, noPeserta: e.target.value })}
                        placeholder="Contoh: SAS-X-046"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-blue-800">
                      <BookOpen className="w-4 h-4" /> Cakupan Materi Asesmen:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                      <li><strong>Struktur Atom:</strong> Perkembangan Teori Atom, Partikel Dasar, Konfigurasi Elektron Bohr & Mekanika Kuantum.</li>
                      <li><strong>Sistem Periodik Unsur:</strong> Penentuan Golongan & Periode, Kecenderungan Sifat Periodik Unsur.</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!settings.isExamActive}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition ${
                        settings.isExamActive
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                          : 'bg-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {settings.isExamActive ? (
                        <>Lanjutkan Ke Ujian <ArrowRight className="w-5 h-5" /></>
                      ) : (
                        "UJIAN BELUM DIBUKA OLEH GURU"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: CONFIRMATION PAGE */}
            {examStep === 'confirm' && (
              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Konfirmasi Data Peserta</h3>
                  <p className="text-sm text-slate-500">Periksa kembali identitas Anda sebelum masuk ke ruang instruksi.</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 mb-6">
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
                    <span className="text-slate-500">Nama Lengkap:</span>
                    <span className="font-bold text-slate-900">{studentProfile.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
                    <span className="text-slate-500">NIS / NISN:</span>
                    <span className="font-bold text-slate-900">{studentProfile.nisn}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
                    <span className="text-slate-500">Kelas / Rombel:</span>
                    <span className="font-bold text-blue-700">Kelas {studentProfile.kelas}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
                    <span className="text-slate-500">Nomor Ujian:</span>
                    <span className="font-bold text-slate-900">{studentProfile.noPeserta}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Durasi Pengerjaan:</span>
                    <span className="font-bold text-slate-900">{settings.durationMinutes} Menit</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setExamStep('welcome')}
                    className="w-1/3 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Ubah Data
                  </button>
                  <button
                    onClick={confirmAndProceedToInstructions}
                    className="w-2/3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
                  >
                    Konfirmasi & Lanjut <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EXAM INSTRUCTIONS */}
            {examStep === 'instructions' && (
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-7 h-7 text-blue-600" /> Petunjuk & Tata Tertib Ujian SAS
                </h3>
                <p className="text-sm text-slate-600 mb-6">Bacalah seluruh instruksi teknis di bawah ini dengan cermat sebelum menekan tombol mulai.</p>

                <div className="space-y-3 mb-8 text-sm text-slate-700">
                  <div className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    <p>Soal berjumlah <strong>{settings.totalExamQuestions} nomor</strong> pilihan ganda (A, B, C, D, E) dengan cakupan materi Struktur Atom dan Sistem Periodik Unsur.</p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    <p>Waktu pengerjaan dialokasikan selama <strong>{settings.durationMinutes} menit</strong> dan dihitung mundur otomatis dari sistem.</p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    <p>Anda dapat memilih jawaban, berpindah nomor soal bebas, dan menandai tombol <strong>"Ragu-ragu / Tandai"</strong> jika belum yakin.</p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
                    <p>Jawaban tersimpan secara otomatis. Jika koneksi terputus atau halaman tidak sengaja dimuat ulang, progres jawaban Anda tetap aman.</p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">5</span>
                    <p>Ketika waktu ujian habis, sistem akan melakukan <strong>pengumpulan otomatis (auto-submit)</strong> seluruh jawaban Anda.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <button
                    onClick={() => setExamStep('confirm')}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={initiateExamRoom}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 text-base"
                  >
                    <Check className="w-5 h-5" /> SAYA SIAP MENGERJAKAN UJIAN
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DIGITAL EXAM ROOM */}
            {examStep === 'exam' && sessionQuestions.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* LEFT: QUESTION & OPTIONS (3 COLS) */}
                <div className="lg:col-span-3 space-y-4">
                  {/* TOP CONTROL BAR */}
                  <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap justify-between items-center gap-4 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block">
                        {sessionQuestions[currentQIndex]?.materi}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800">
                        Soal Nomor {currentQIndex + 1} <span className="text-xs font-normal text-slate-500">dari {sessionQuestions.length}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono text-lg font-bold shadow-inner">
                      <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                      <span className={timeLeft < 300 ? "text-red-400 animate-bounce" : "text-emerald-400"}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>

                  {/* QUESTION CARD */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 space-y-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                      <span className="bg-slate-100 px-3 py-1 rounded-full font-medium">
                        Tingkat: <strong className="text-slate-800">{sessionQuestions[currentQIndex]?.tingkat}</strong>
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        Bobot: {sessionQuestions[currentQIndex]?.bobot || 2.5} poin
                      </span>
                    </div>

                    <div className="text-base md:text-lg text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                      {sessionQuestions[currentQIndex]?.pertanyaan}
                    </div>

                    {/* OPTIONS A-E */}
                    <div className="space-y-3 pt-2">
                      {sessionQuestions[currentQIndex]?.pilihan.map((optionText, optIdx) => {
                        const qId = sessionQuestions[currentQIndex].id;
                        const isSelected = userAnswers[qId] === optIdx;
                        const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D, E

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qId, optIdx)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/80 shadow-md ring-1 ring-blue-500'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition ${
                                isSelected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {optionLabel}
                            </span>
                            <span className="text-sm md:text-base text-slate-800 pt-0.5 leading-snug">
                              {optionText}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* NAVIGATION CONTROLS */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
                      <button
                        disabled={currentQIndex === 0}
                        onClick={() => setCurrentQIndex(prev => prev - 1)}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 border ${
                          currentQIndex === 0
                            ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" /> Sebelumnya
                      </button>

                      <button
                        onClick={() => toggleFlagQuestion(sessionQuestions[currentQIndex].id)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border transition ${
                          flaggedQuestions[sessionQuestions[currentQIndex].id]
                            ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                            : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                        }`}
                      >
                        <Flag className="w-4 h-4" />
                        {flaggedQuestions[sessionQuestions[currentQIndex].id] ? 'Ditandai Ragu' : 'Tandai Ragu-Ragu'}
                      </button>

                      {currentQIndex < sessionQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQIndex(prev => prev + 1)}
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 text-sm"
                        >
                          Berikutnya <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (window.confirm("Apakah Anda yakin ingin mengakhiri dan mengumpulkan seluruh jawaban ujian?")) {
                              handleFinalSubmit();
                            }
                          }}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 text-sm"
                        >
                          <Check className="w-4 h-4" /> Akhiri Ujian
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT: QUESTION GRID NAVIGATION (1 COL) */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center justify-between border-b border-slate-100 pb-2">
                      <span>Navigasi Nomor Soal</span>
                      <span className="text-xs font-normal text-slate-500">
                        {Object.keys(userAnswers).length}/{sessionQuestions.length} Terjawab
                      </span>
                    </h4>

                    {/* STATUS LEGEND */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
                        <span className="text-slate-600">Terjawab</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300"></span>
                        <span className="text-slate-600">Belum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
                        <span className="text-slate-600">Ragu-ragu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-white border-2 border-blue-600"></span>
                        <span className="text-slate-600">Aktif</span>
                      </div>
                    </div>

                    {/* GRID BUTTONS */}
                    <div className="grid grid-cols-5 gap-2 pt-2">
                      {sessionQuestions.map((q, idx) => {
                        const isAns = userAnswers[q.id] !== undefined;
                        const isFlagged = flaggedQuestions[q.id];
                        const isCurrent = idx === currentQIndex;

                        let btnBg = "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200";
                        if (isFlagged) {
                          btnBg = "bg-amber-500 text-white border-amber-600 font-bold";
                        } else if (isAns) {
                          btnBg = "bg-emerald-500 text-white border-emerald-600 font-bold";
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQIndex(idx)}
                            className={`h-10 rounded-lg text-xs transition relative font-medium border ${btnBg} ${
                              isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 border-blue-600 font-black' : ''
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          if (window.confirm("Apakah Anda yakin ingin mengakhiri dan mengumpulkan seluruh jawaban ujian?")) {
                            handleFinalSubmit();
                          }
                        }}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
                      >
                        <LogOut className="w-4 h-4" /> Selesai & Kumpulkan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: RESULT & PERFORMANCE REPORT */}
            {examStep === 'result' && examResult && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* HEADER RESULT CARD */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                  <div className={`p-8 text-center text-white ${
                    examResult.isPassed ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-rose-600 to-red-800'
                  }`}>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                      {examResult.isPassed ? (
                        <Award className="w-12 h-12 text-white" />
                      ) : (
                        <AlertCircle className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h2 className="text-3xl font-black">
                      {examResult.isPassed ? 'SELAMAT! ANDA LULUS SAS' : 'BELUM MENCAPAI KKTP'}
                    </h2>
                    <p className="text-white/90 text-sm mt-1">
                      Kriteria Ketuntasan Tujuan Pembelajaran (KKTP) Minimum: <strong>{settings.kktp}</strong>
                    </p>

                    <div className="mt-6 inline-flex flex-col items-center justify-center bg-white/15 px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-widest text-white/80 font-bold">NILAI AKHIR</span>
                      <span className="text-5xl font-black mt-1 text-white">{examResult.score}</span>
                      <span className="text-xs bg-white text-slate-900 font-bold px-3 py-1 rounded-full mt-2">
                        Predikat: {examResult.predikat}
                      </span>
                    </div>
                  </div>

                  {/* IDENT & SUMMARY METRICS */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="text-xs text-slate-500 font-semibold block">Total Soal</span>
                        <span className="text-xl font-bold text-slate-800">{examResult.totalQuestions}</span>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs text-emerald-700 font-semibold block">Jawaban Benar</span>
                        <span className="text-xl font-bold text-emerald-800">{examResult.correctCount}</span>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                        <span className="text-xs text-rose-700 font-semibold block">Jawaban Salah</span>
                        <span className="text-xl font-bold text-rose-800">{examResult.incorrectCount}</span>
                      </div>
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                        <span className="text-xs text-slate-600 font-semibold block">Tidak Dijawab</span>
                        <span className="text-xl font-bold text-slate-700">{examResult.unansweredCount}</span>
                      </div>
                    </div>

                    {/* TOPIC MASTERY BREAKDOWN */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" /> Penguasaan Capaian Pembelajaran per Materi
                      </h4>

                      {Object.entries(examResult.topicStats).map(([topic, stat]) => {
                        const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                        return (
                          <div key={topic} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-800">{topic}</span>
                              <span className="text-blue-700">{stat.correct}/{stat.total} Benar ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* REVIEW & ACTION BUTTONS */}
                    <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3 justify-between">
                      <button
                        onClick={() => window.print()}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 flex items-center gap-2 text-sm"
                      >
                        <Printer className="w-4 h-4" /> Cetak Hasil Ujian
                      </button>
                      <button
                        onClick={() => {
                          setExamStep('welcome');
                          setStudentProfile({ name: '', nisn: '', kelas: 'X-1', noPeserta: '' });
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-sm"
                      >
                        Kembali Ke Halaman Utama
                      </button>
                    </div>
                  </div>
                </div>

                {/* DETAILED ANSWER REVIEW (IF ENABLED BY TEACHER) */}
                {settings.showExplanations && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" /> Pembahasan Soal & Kunci Jawaban
                    </h3>

                    <div className="space-y-6">
                      {examResult.sessionQuestions.map((q, idx) => {
                        const userAns = examResult.userAnswers[q.id];
                        const isCorrect = userAns === q.kunci;

                        return (
                          <div
                            key={q.id}
                            className={`p-5 rounded-xl border-2 space-y-3 ${
                              isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-bold text-sm text-slate-800">
                                Soal {idx + 1}. ({q.materi})
                              </span>
                              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isCorrect ? 'BENAR' : userAns === undefined ? 'TIDAK DIJAWAB' : 'SALAH'}
                              </span>
                            </div>

                            <p className="text-sm text-slate-800 font-medium">{q.pertanyaan}</p>

                            <div className="space-y-1 text-xs">
                              {q.pilihan.map((optText, oIdx) => {
                                const isKey = oIdx === q.kunci;
                                const isUser = oIdx === userAns;
                                const optLabel = String.fromCharCode(65 + oIdx);

                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-2 rounded-lg flex items-center gap-2 ${
                                      isKey
                                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                                        : isUser && !isKey
                                        ? 'bg-rose-100 text-rose-900 font-semibold border border-rose-300'
                                        : 'text-slate-600'
                                    }`}
                                  >
                                    <span className="w-5 text-center">{optLabel}.</span>
                                    <span>{optText}</span>
                                    {isKey && <Check className="w-3.5 h-3.5 text-emerald-700 ml-auto" />}
                                  </div>
                                );
                              })}
                            </div>

                            {/* PEMBAHASAN TEXT */}
                            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                              <span className="font-bold text-slate-900 block">💡 Pembahasan Guru:</span>
                              <p>{q.pembahasan}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TEACHER / ADMIN DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'teacher' && (
          <div>
            {!isTeacherLoggedIn ? (
              /* LOGIN FORM FOR TEACHER */
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200 space-y-5">
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Login Guru / Pengawas</h2>
                  <p className="text-xs text-slate-500 mt-1">Masukkan PIN Otentikasi untuk mengakses Bank Soal dan Pengaturan Ujian.</p>
                </div>

                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">PIN Akses Guru</label>
                    <input
                      type="password"
                      required
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Masukkan PIN (Default: admin123)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-center font-mono text-lg tracking-widest"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition text-sm"
                  >
                    Masuk Ke Dashboard Guru
                  </button>
                </form>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-400">PIN Default Pengujian: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">admin123</code></span>
                </div>
              </div>
            ) : (
              /* TEACHER DASHBOARD CONTENT */
              <div className="space-y-6">
                {/* SUB-TAB NAV */}
                <div className="bg-white rounded-2xl shadow-md p-3 border border-slate-200 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setTeacherSubTab('bank')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                        teacherSubTab === 'bank'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" /> Bank Soal ({questionBank.length})
                    </button>
                    <button
                      onClick={() => setTeacherSubTab('settings')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                        teacherSubTab === 'settings'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Settings className="w-4 h-4" /> Pengaturan Ujian
                    </button>
                    <button
                      onClick={() => setTeacherSubTab('results')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                        teacherSubTab === 'results'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <FileSpreadsheet className="w-4 h-4" /> Hasil Peserta ({allExamResults.length})
                    </button>
                    <button
                      onClick={() => setTeacherSubTab('analytics')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                        teacherSubTab === 'analytics'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" /> Analisis Butir Soal
                    </button>
                  </div>

                  <button
                    onClick={() => setIsTeacherLoggedIn(false)}
                    className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 text-xs flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" /> Keluar Mode Guru
                  </button>
                </div>

                {/* SUB-TAB 1: BANK SOAL MANAGER */}
                {teacherSubTab === 'bank' && (
                  <div className="space-y-4">
                    {/* ACTION TOOLBAR */}
                    <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-200 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                        <input
                          type="text"
                          placeholder="Cari pertanyaan / indikator..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 flex-1 min-w-[180px]"
                        />
                        <select
                          value={filterTopic}
                          onChange={(e) => setFilterTopic(e.target.value)}
                          className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        >
                          <option value="All">Semua Materi</option>
                          <option value="Struktur Atom">Struktur Atom</option>
                          <option value="Sistem Periodik Unsur">Sistem Periodik Unsur</option>
                        </select>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setEditingQuestion({
                            materi: "Struktur Atom",
                            indikator: "",
                            tingkat: "Sedang",
                            bobot: 2.5,
                            pertanyaan: "",
                            pilihan: ["", "", "", "", ""],
                            kunci: 0,
                            pembahasan: ""
                          })}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" /> Tambah Soal Baru
                        </button>
                        <button
                          onClick={exportBankJSON}
                          className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
                        >
                          <Download className="w-4 h-4" /> Ekspor JSON
                        </button>
                        <label className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-100 cursor-pointer flex items-center gap-1.5">
                          <Upload className="w-4 h-4" /> Impor JSON
                          <input type="file" accept=".json" onChange={importBankJSON} className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* QUESTION LIST */}
                    <div className="space-y-4">
                      {questionBank
                        .filter(q => {
                          const matchSearch = q.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                             q.indikator.toLowerCase().includes(searchTerm.toLowerCase());
                          const matchTopic = filterTopic === 'All' || q.materi === filterTopic;
                          return matchSearch && matchTopic;
                        })
                        .map((q, idx) => (
                          <div key={q.id} className="bg-white rounded-2xl shadow-md p-5 border border-slate-200 space-y-3">
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                                  {q.id}
                                </span>
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                                  {q.materi}
                                </span>
                                <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                                  q.tingkat === 'HOTS' || q.tingkat === 'Sulit'
                                    ? 'bg-rose-100 text-rose-800'
                                    : q.tingkat === 'Sedang'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {q.tingkat}
                                </span>
                                <span className="text-xs text-slate-500 font-semibold">
                                  Bobot: {q.bobot || 2.5}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => setEditingQuestion(q)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  title="Edit Soal"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteQuestion(q.id)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                                  title="Hapus Soal"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-500 italic">Indikator: {q.indikator}</p>
                            <p className="text-sm font-semibold text-slate-800">{q.pertanyaan}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                              {q.pilihan.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className={`p-2 rounded-lg border ${
                                    oIdx === q.kunci
                                      ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900'
                                      : 'bg-slate-50 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  {String.fromCharCode(65 + oIdx)}. {opt}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: EXAM SETTINGS */}
                {teacherSubTab === 'settings' && (
                  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200 space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                      <Settings className="w-6 h-6 text-blue-600" /> Pengaturan Parameter Ujian Digital
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Status Ujian</label>
                        <select
                          value={settings.isExamActive ? "active" : "inactive"}
                          onChange={(e) => setSettings({ ...settings, isExamActive: e.target.value === "active" })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                        >
                          <option value="active">AKTIF (Dapat Dikerjakan Sesuai Jadwal)</option>
                          <option value="inactive">NON-AKTIF (Sesi Ditutup)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Batas Nilai KKTP Minimum</label>
                        <input
                          type="number"
                          value={settings.kktp}
                          onChange={(e) => setSettings({ ...settings, kktp: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Durasi Ujian (Menit)</label>
                        <input
                          type="number"
                          value={settings.durationMinutes}
                          onChange={(e) => setSettings({ ...settings, durationMinutes: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Jumlah Soal Diambil per Sesi</label>
                        <input
                          type="number"
                          value={settings.totalExamQuestions}
                          onChange={(e) => setSettings({ ...settings, totalExamQuestions: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Pengacakan Urutan Soal</label>
                        <select
                          value={settings.shuffleQuestions ? "yes" : "no"}
                          onChange={(e) => setSettings({ ...settings, shuffleQuestions: e.target.value === "yes" })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          <option value="yes">Ya, Acak Soal untuk Setiap Siswa</option>
                          <option value="no">Tidak, Sesuai Urutan Bank Soal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Pengacakan Opsi Pilihan (A-E)</label>
                        <select
                          value={settings.shuffleOptions ? "yes" : "no"}
                          onChange={(e) => setSettings({ ...settings, shuffleOptions: e.target.value === "yes" })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          <option value="yes">Ya, Acak Pilihan A-E</option>
                          <option value="no">Tidak Acak Opsi Pilihan</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => alert("Pengaturan berhasil disimpan!")}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
                      >
                        <Save className="w-4 h-4" /> Simpan Perubahan Pengaturan
                      </button>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: RESULTS TABLE & REKAPITULASI */}
                {teacherSubTab === 'results' && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Rekapitulasi Hasil Ujian Peserta</h3>
                        <p className="text-xs text-slate-500">Daftar nilai seluruh siswa yang telah menyelesaikan ujian.</p>
                      </div>

                      <button
                        onClick={exportResultsCSV}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
                      >
                        <Download className="w-4 h-4" /> Unduh Laporan Rekap (.CSV)
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold">
                            <th className="p-3">No</th>
                            <th className="p-3">Waktu</th>
                            <th className="p-3">Nama Siswa</th>
                            <th className="p-3">NISN</th>
                            <th className="p-3">Kelas</th>
                            <th className="p-3">Benar / Salah</th>
                            <th className="p-3">Nilai Akhir</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {allExamResults.length === 0 ? (
                            <tr>
                              <td colSpan="8" className="p-6 text-center text-slate-400 italic">
                                Belum ada data ujian peserta yang tersimpan.
                              </td>
                            </tr>
                          ) : (
                            allExamResults.map((r, idx) => (
                              <tr key={r.id} className="hover:bg-slate-50">
                                <td className="p-3 font-semibold">{idx + 1}</td>
                                <td className="p-3 text-slate-500">{r.timestamp}</td>
                                <td className="p-3 font-bold text-slate-900">{r.student.name}</td>
                                <td className="p-3 text-slate-600">{r.student.nisn}</td>
                                <td className="p-3 font-semibold text-blue-600">{r.student.kelas}</td>
                                <td className="p-3">
                                  <span className="text-emerald-700 font-bold">{r.correctCount}B</span> / <span className="text-rose-600">{r.incorrectCount}S</span>
                                </td>
                                <td className="p-3 text-sm font-black text-slate-900">{r.score}</td>
                                <td className="p-3">
                                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                    r.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {r.isPassed ? 'TUNTAS' : 'BELUM TUNTAS'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: CLASS ANALYTICS & ITEM ANALYSIS */}
                {teacherSubTab === 'analytics' && (
                  <div className="space-y-6">
                    {classAnalytics ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <span className="text-xs text-slate-500 font-bold uppercase block">Jumlah Peserta</span>
                            <span className="text-2xl font-black text-slate-900 mt-1 block">{classAnalytics.total} Siswa</span>
                          </div>
                          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <span className="text-xs text-slate-500 font-bold uppercase block">Rata-Rata Kelas</span>
                            <span className="text-2xl font-black text-blue-600 mt-1 block">{classAnalytics.avg}</span>
                          </div>
                          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <span className="text-xs text-slate-500 font-bold uppercase block">Nilai Tertinggi</span>
                            <span className="text-2xl font-black text-emerald-600 mt-1 block">{classAnalytics.highest}</span>
                          </div>
                          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <span className="text-xs text-slate-500 font-bold uppercase block">Persentase Ketuntasan</span>
                            <span className="text-2xl font-black text-purple-600 mt-1 block">{classAnalytics.passPercentage}%</span>
                          </div>
                        </div>

                        {/* PASS/FAIL VISUAL BAR */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-3">
                          <h4 className="font-bold text-slate-800 text-sm">Distribusi Ketuntasan Hasil Belajar</h4>
                          <div className="w-full bg-slate-100 h-6 rounded-xl overflow-hidden flex text-xs font-bold text-white">
                            <div
                              style={{ width: `${classAnalytics.passPercentage}%` }}
                              className="bg-emerald-500 flex items-center justify-center transition-all duration-500"
                            >
                              {classAnalytics.passedCount} Tuntas ({classAnalytics.passPercentage}%)
                            </div>
                            <div
                              style={{ width: `${100 - classAnalytics.passPercentage}%` }}
                              className="bg-rose-500 flex items-center justify-center transition-all duration-500"
                            >
                              {classAnalytics.failedCount} Belum Tuntas
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white p-8 rounded-2xl shadow-md text-center text-slate-400 border border-slate-200">
                        Belum ada data ujian yang cukup untuk dianalisis.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL EDIT / ADD QUESTION */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-800">
                {editingQuestion.id ? `Edit Soal (${editingQuestion.id})` : 'Tambah Soal Baru'}
              </h3>
              <button onClick={() => setEditingQuestion(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Materi</label>
                  <select
                    value={editingQuestion.materi}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, materi: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Struktur Atom">Struktur Atom</option>
                    <option value="Sistem Periodik Unsur">Sistem Periodik Unsur</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Tingkat Kesulitan</label>
                  <select
                    value={editingQuestion.tingkat}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, tingkat: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="HOTS">HOTS / Sulit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Indikator Soal</label>
                <input
                  type="text"
                  value={editingQuestion.indikator}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, indikator: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Pertanyaan Soal</label>
                <textarea
                  rows="3"
                  value={editingQuestion.pertanyaan}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, pertanyaan: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>

              {/* OPTIONS INPUTS */}
              <div className="space-y-2">
                <label className="font-bold block">Pilihan Jawaban (Pilih Lingkaran untuk Kunci Jawaban)</label>
                {editingQuestion.pilihan.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="kunciRadio"
                      checked={editingQuestion.kunci === idx}
                      onChange={() => setEditingQuestion({ ...editingQuestion, kunci: idx })}
                    />
                    <span className="font-bold w-4">{String.fromCharCode(65 + idx)}.</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...editingQuestion.pilihan];
                        newOpts[idx] = e.target.value;
                        setEditingQuestion({ ...editingQuestion, pilihan: newOpts });
                      }}
                      className="flex-1 p-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-bold block mb-1">Pembahasan Guru</label>
                <textarea
                  rows="2"
                  value={editingQuestion.pembahasan}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, pembahasan: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 border rounded-xl font-semibold text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => handleSaveQuestion(editingQuestion)}
                className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Simpan Soal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 px-4 text-center border-t border-slate-800 mt-auto">
        <p>© 2026 CHEM-TEST X - SMA Negeri 46 Maluku Tengah. Penyusun: <strong>Sarkia Silawane, S.Pd.</strong></p>
      </footer>
    </div>
  );
}