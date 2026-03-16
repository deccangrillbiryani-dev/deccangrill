export interface MenuItem {
  name: string;
  price: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  category: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "appetizers",
    category: "Appetizers",
    items: [
      { name: "Onion Samosa (3 Pc)", price: "$3.99", image: "/images/onion_samosa.jpeg" },
      { name: "Punjabi Samosa (2 Pc)", price: "$4.99", image: "/images/pun_sam.jpeg" },
      { name: "Chicken Samosa (2 Pc)", price: "$4.99", image: "/images/chi_sam.jpeg" },
      { name: "Veg Spring Rolls (3 Pc)", price: "$4.99", image: "/images/veg_spr_rol.jpeg" },
      { name: "Chicken Shami Kabab (2 Pc)", price: "$6.99", image: "/images/chi_sha_kabab.jpeg" },
      { name: "Chicken 65", price: "$12.99", image: "/images/chi_65.jpg" },
      { name: "Chicken Pakoda", price: "$12.99", image: "/images/chicken_pakoda-620.jpg" },
      { name: "Chilli Chicken", price: "$12.99", image: "/images/chil_chi.jpeg" },
      { name: "Apollo Fish", price: "$15.99", image: "/images/apol_fish.jpg" },
      { name: "Fish Fry", price: "$15.99", image: "/images/fis_fry.jpeg" },
      { name: "Chilli Shrimp", price: "$15.99", image: "/images/chill_shrimp.jpg" },
      { name: "Chilli Paneer", price: "$12.99", image: "/images/chill_pan.jpeg" },
      { name: "Gobi Manchurian", price: "$12.99", image: "/images/go_man.jpeg" },
    ],
  },
  {
    id: "bbq",
    category: "BBQ",
    items: [
      { name: "Paneer Tikka", price: "$12.99", image: "/images/pan_ti.jpeg" },
      { name: "Chicken Tandoori (Leg Qtr)", price: "$7.99", image: "/images/chi_tan.jpg" },
      { name: "Royal Deccan Tandoori", price: "$18.99", image: "/images/royal_deccan.jpg" },
      { name: "Chicken Seekh Kabab", price: "$12.99", image: "/images/chi_se_kab.jpeg" },
      { name: "Chicken Tikka Boti", price: "$12.99", image: "/images/chi_ti.jpg" },
      { name: "Mix Grill Platter", price: "$32.99", image: "/images/mix_gri_pla.jpg" },
    ],
  },
  {
    id: "haleem",
    category: "Haleem",
    items: [
      { name: "Mutton Haleem", price: "$18.99", image: "/images/ma_ha.jpeg" },
      { name: "Spl Mutton Haleem", price: "$21.99", image: "/images/spl_mutton_ha.jpg" },
    ],
  },
  {
    id: "biryanis",
    category: "Biryanis",
    items: [
      { name: "Paneer Biryani", price: "$14.99", image: "/images/pan_bir.jpg" },
      { name: "Egg Biryani", price: "$13.99", image: "/images/eg_bir.jpg" },
      { name: "Hyderabadi Chicken Dum Biryani", price: "$14.99", image: "/images/hyd_chi_dum_bri.jpg" },
      { name: "Chicken 65 Biryani (Boneless)", price: "$16.99", image: "/images/chi_65_bir.jpg" },
      { name: "Spl Hyderabadi Chicken Dum Biryani", price: "$17.99", image: "/images/spl_hyd_chi.jpg" },
      { name: "Hyderabadi Goat Dum Biryani", price: "$18.99", image: "/images/hyd_goat_du_bir.jpg" },
      { name: "Spl Hyderabadi Goat Dum Biryani", price: "$21.99", image: "/images/spl_hyd_goat.jpg" },
    ],
  },
  {
    id: "family-packs",
    category: "Family Packs",
    items: [
      { name: "Paneer Biryani (Family Pack)", price: "$30.99", image: "/images/fam_pan_bir.jpeg" },
      { name: "Egg Biryani (Family Pack)", price: "$30.99", image: "/images/fam_egg_bir.jpeg" },
      { name: "Hyderabadi Chicken Dum Biryani (Family Pack)", price: "$34.99", image: "/images/fam_chic_dum.jpg" },
      { name: "Chicken 65 Biryani (Family Pack)", price: "$37.99", image: "/images/fam_chic_65.jpg" },
      { name: "Hyderabadi Goat Dum Biryani (Family Pack)", price: "$44.99", image: "/images/fam_goat.jpg" },
    ],
  },
  {
    id: "curries",
    category: "Curries",
    items: [
      { name: "Palak Paneer", price: "$14.99", image: "/images/palak_pan.jpg" },
      { name: "Paneer Butter Masala", price: "$14.99", image: "/images/pan_butter.jpg" },
      { name: "Dum Aloo", price: "$14.99", image: "/images/dum_aloo.jpg" },
      { name: "Chicken Tikka Masala", price: "$14.99", image: "/images/chi_tikka.jpg" },
      { name: "Butter Chicken", price: "$14.99", image: "/images/butter_chi.jpg" },
      { name: "Andhra Chicken Curry", price: "$14.99", image: "/images/andra_chi.webp" },
      { name: "Kadai Chicken", price: "$14.99", image: "/images/kadai_chi.jpg" },
      { name: "Dum Ka Chicken", price: "$16.99", image: "/images/dumka_chi.webp" },
      { name: "Hyderabadi Goat Curry", price: "$18.99", image: "/images/goat_cur.jpg" },
    ],
  },
  {
    id: "naan",
    category: "Naan",
    items: [
      { name: "Naan / Butter Naan", price: "$1.99", image: "/images/butter_naan.jpg" },
      { name: "Garlic / Bullet Naan", price: "$2.99", image: "/images/garlic_naan.jpg" },
    ],
  },
  {
    id: "roti-rolls",
    category: "Roti Rolls",
    items: [
      { name: "Chicken 65 Roll", price: "$11.99", image: "/images/chi_65_roll.jpg" },
      { name: "Chicken Seekh Kabab Roll", price: "$11.99", image: "/images/chi_kabab_roll.jpg" },
      { name: "Chicken Boti Roll", price: "$11.99", image: "/images/chic_boti_roll.jpg" },
      { name: "Egg Roll", price: "$7.99", image: "/images/egg_roll.webp" },
    ],
  },
  {
    id: "street-style",
    category: "Street Style",
    items: [
      { name: "Zeera Rice", price: "$6.99", image: "/images/jeera_rice.jpg" },
      { name: "Pulav Rice", price: "$6.99", image: "/images/pulav_rice.jpg" },
      { name: "Veg Fried Rice", price: "$12.99", image: "/images/veg_fried.jpg" },
      { name: "Veg Noodles", price: "$12.99", image: "/images/veg_noodles.jpg" },
      { name: "Egg Fried Rice", price: "$13.99", image: "/images/egg_fried.jpg" },
      { name: "Egg Noodles", price: "$13.99", image: "/images/egg_noodles.webp" },
      { name: "Chicken Fried Rice", price: "$14.99", image: "/images/chic_fried.webp" },
      { name: "Chicken Noodles", price: "$14.99", image: "/images/chi_noodles.jpg" },
    ],
  },
  {
    id: "desserts",
    category: "Desserts",
    items: [
      { name: "Kaddu Ka Kheer / Rice Kheer", price: "$5.99", image: "/images/rice_kheer.jpg" },
      { name: "Gulab Jamun", price: "$5.99", image: "/images/gulab.jpg" },
      { name: "Double Ka Meetha", price: "$5.99", image: "/images/double_ka_meetha.jpg" },
      { name: "Gajar Ka Halwa", price: "$5.99", image: "/images/halwa.jpg" },
      { name: "Rasmalai", price: "$5.99", image: "/images/rasmalai.jpg" },
      { name: "Lab-E-Shirin", price: "$5.99", image: "/images/lab.jpg" },
      { name: "Qubani Ka Meetha", price: "$6.99", image: "/images/qubani.jpg" },
    ],
  },
  {
    id: "beverages",
    category: "Beverages",
    items: [
      { name: "Water", price: "$1.69", image: "/images/water.jpg" },
      { name: "Thums Up", price: "$2.99", image: "/images/thumsup.webp" },
      { name: "Ginger Ale", price: "$2.49", image: "/images/ginger.jpg" },
      { name: "Soda Can", price: "$1.79", image: "/images/soda.jpg" },
      { name: "Mango Lassi", price: "$5.99", image: "/images/mango.jpg" },
      { name: "Sitaphal Shake", price: "$6.99", image: "/images/sitafal.jpg" },
      { name: "Chickoo Shake", price: "$6.99", image: "/images/chicko.jpg" },
    ],
  },
];
