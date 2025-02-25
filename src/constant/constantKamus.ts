export interface constantKamusType {
  id: number;
  abjad: string;
  keterangan: string;
  badge: string[];
}

export const constantKamus: constantKamusType[] = [
  {
    id: 1,
    abjad: "a",
    keterangan: `Huruf "A" dalam bahasa isyarat SIBI diwakili dengan tangan mengepal, di mana jempol menempel pada sisi telunjuk. Gerakan ini statis tanpa perubahan posisi tangan.`,
    badge: ["Mudah", "Statis"],
  },
  {
    id: 2,
    abjad: "b",
    keterangan: `Huruf "B" dalam SIBI diwakili dengan tangan terbuka, jari-jari rapat dan ibu jari menempel pada telapak tangan. Posisi tetap dan jelas terlihat.`,
    badge: ["Mudah", "Terbuka"],
  },
  {
    id: 3,
    abjad: "c",
    keterangan: `Huruf "C" dalam SIBI ditunjukkan dengan tangan membentuk huruf "C", jari-jari melengkung ke depan dengan ibu jari menopang.`,
    badge: ["Menengah", "Melengkung"],
  },
  {
    id: 4,
    abjad: "d",
    keterangan: `Huruf "D" dalam SIBI diwakili dengan jari telunjuk tegak lurus ke atas, sementara jari lainnya mengepal. Gerakan ini sangat khas dan mudah dikenali.`,
    badge: ["Mudah", "Tegak Lurus"],
  },
  {
    id: 5,
    abjad: "e",
    keterangan: `Huruf "E" ditunjukkan dengan jari-jari melipat ke dalam dan ibu jari menekan jari-jari lainnya. Gerakan ini statis dan tidak memerlukan pergerakan tangan.`,
    badge: ["Mudah", "Statis"],
  },
  {
    id: 6,
    abjad: "f",
    keterangan: `Huruf "F" dalam SIBI terbentuk dengan jari telunjuk dan ibu jari membuat lingkaran, sementara jari-jari lainnya tetap tegak.`,
    badge: ["Menengah", "Simbolik"],
  },
  {
    id: 7,
    abjad: "g",
    keterangan: `Huruf "G" dalam SIBI menyerupai bentuk "L" dengan jari telunjuk dan ibu jari, sedangkan jari lainnya tetap mengepal.`,
    badge: ["Menengah", "Horizontal"],
  },
  {
    id: 8,
    abjad: "h",
    keterangan: `Huruf "H" terbentuk dengan jari telunjuk dan jari tengah lurus ke depan, sedangkan jari lainnya mengepal. Posisi ini harus jelas agar tidak tertukar dengan huruf lain.`,
    badge: ["Menengah", "Dua Jari"],
  },
  {
    id: 9,
    abjad: "i",
    keterangan: `Huruf "I" dalam SIBI menggunakan jari kelingking yang tegak lurus ke atas, sementara jari lainnya mengepal. Ini adalah bentuk yang sederhana dan mudah diingat.`,
    badge: ["Mudah", "Satu Jari"],
  },
  {
    id: 10,
    abjad: "k",
    keterangan: `Huruf "K" terbentuk dengan jari telunjuk dan jari tengah tegak membentuk huruf "V", dengan ibu jari menopang di bagian bawah.`,
    badge: ["Menengah", "Dua Jari"],
  },
  {
    id: 11,
    abjad: "l",
    keterangan: `Huruf "L" dalam SIBI ditunjukkan dengan jari telunjuk tegak dan ibu jari membentuk sudut 90 derajat.`,
    badge: ["Mudah", "Tegak Lurus"],
  },
  {
    id: 12,
    abjad: "m",
    keterangan: `Huruf "M" dibuat dengan jari telunjuk, jari tengah, dan jari manis menutup ibu jari, sedangkan jari kelingking tetap terlipat.`,
    badge: ["Menengah", "Tiga Jari"],
  },
  {
    id: 13,
    abjad: "n",
    keterangan: `Huruf "N" menyerupai "M", tetapi hanya dua jari yang menutup ibu jari.`,
    badge: ["Menengah", "Dua Jari"],
  },
  {
    id: 14,
    abjad: "o",
    keterangan: `Huruf "O" dalam SIBI ditunjukkan dengan jari-jari membentuk lingkaran bersama ibu jari.`,
    badge: ["Mudah", "Lingkaran"],
  },
  {
    id: 15,
    abjad: "p",
    keterangan: `Huruf "P" dalam SIBI serupa dengan "K", tetapi posisinya miring ke bawah.`,
    badge: ["Menengah", "Miring"],
  },
  {
    id: 16,
    abjad: "q",
    keterangan: `Huruf "Q" mirip dengan "G" tetapi mengarah ke bawah.`,
    badge: ["Menengah", "Miring"],
  },
  {
    id: 17,
    abjad: "r",
    keterangan: `Huruf "R" terbentuk dengan jari telunjuk dan jari tengah yang saling bersilangan.`,
    badge: ["Sulit", "Silang"],
  },
  {
    id: 18,
    abjad: "s",
    keterangan: `Huruf "S" dalam SIBI diwakili dengan tangan mengepal, ibu jari berada di depan jari lainnya.`,
    badge: ["Mudah", "Kepalan"],
  },
  {
    id: 19,
    abjad: "t",
    keterangan: `Huruf "T" ditunjukkan dengan jari telunjuk melingkari ibu jari.`,
    badge: ["Mudah", "Satu Jari"],
  },
  {
    id: 20,
    abjad: "u",
    keterangan: `Huruf "U" menggunakan jari telunjuk dan jari tengah tegak, tetapi merapat.`,
    badge: ["Mudah", "Dua Jari"],
  },
  {
    id: 21,
    abjad: "v",
    keterangan: `Huruf "V" terbentuk dengan jari telunjuk dan jari tengah terbuka membentuk huruf "V".`,
    badge: ["Mudah", "V-Shape"],
  },
  {
    id: 22,
    abjad: "w",
    keterangan: `Huruf "W" dalam SIBI menggunakan tiga jari tegak lurus membentuk huruf "W".`,
    badge: ["Menengah", "Tiga Jari"],
  },
  {
    id: 23,
    abjad: "x",
    keterangan: `Huruf "X" dibentuk dengan jari telunjuk melengkung seperti kait.`,
    badge: ["Menengah", "Melengkung"],
  },
  {
    id: 24,
    abjad: "y",
    keterangan: `Huruf "Y" dalam SIBI menggunakan jari kelingking dan ibu jari terbuka membentuk huruf "Y".`,
    badge: ["Mudah", "Simbolik"],
  },
];
