import { Home, Shirt, Upload, Sparkles, ShoppingBag, User } from "lucide-react";

export const P_GRAD = "linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%)";
export const P_SOFT = "linear-gradient(135deg, #F3F0FF 0%, #EDE9FE 100%)";

export const WARDROBE_ITEMS = [
  { id: 1, name: "White Oxford Shirt", category: "Tops", tags: ["Formal", "Office"], photo: "1596755094514-f87e34085b2c", h: 260 },
  { id: 2, name: "Navy Slim Blazer", category: "Outerwear", tags: ["Business", "Smart"], photo: "1507003211169-0a1dd7228f2d", h: 300 },
  { id: 3, name: "High-Rise Jeans", category: "Bottoms", tags: ["Casual", "Everyday"], photo: "1591047139829-d91aecb6caea", h: 240 },
  { id: 4, name: "Floral Midi Dress", category: "Dresses", tags: ["Party", "Summer"], photo: "1434389677669-e08b4cac3105", h: 320 },
  { id: 5, name: "Camel Trench Coat", category: "Outerwear", tags: ["Fall", "Classic"], photo: "1551028719-00167b16eac5", h: 280 },
  { id: 6, name: "White Sneakers", category: "Footwear", tags: ["Casual", "Sport"], photo: "1542291026-7eec264c27ff", h: 220 },
  { id: 7, name: "Black Turtleneck", category: "Tops", tags: ["Winter", "Minimal"], photo: "1512436991641-6745cdb1723f", h: 260 },
  { id: 8, name: "Pleated Trousers", category: "Bottoms", tags: ["Office", "Smart"], photo: "1490481651871-ab68de25d43d", h: 280 },
  { id: 9, name: "Silk Blouse", category: "Tops", tags: ["Elegant", "Work"], photo: "1509631179647-0177331693ae", h: 240 },
  { id: 10, name: "Midi Wrap Skirt", category: "Bottoms", tags: ["Feminine", "Date"], photo: "1515886657613-9f3515b0c78f", h: 300 },
  { id: 11, name: "Denim Jacket", category: "Outerwear", tags: ["Casual", "Layering"], photo: "1469334031218-e382a71b716b", h: 250 },
  { id: 12, name: "Block Heel Pumps", category: "Footwear", tags: ["Formal", "Evening"], photo: "1578587018452-892bacefd3f2", h: 210 },
];

export const OCCASIONS = ["College", "Office", "Interview", "Party", "Travel", "Date Night"];

export const OUTFIT_DATA = {
  College: [
    { name: "Study Chic", items: ["White Tee", "High-Rise Jeans", "White Sneakers", "Tote"], score: 94, photo: "1483985988355-763728e1935b" },
    { name: "Campus Cool", items: ["Denim Jacket", "Striped Tee", "Joggers", "Sneakers"], score: 88, photo: "1469334031218-e382a71b716b" },
    { name: "Library Look", items: ["Knit Sweater", "Pleated Skirt", "Loafers"], score: 91, photo: "1515886657613-9f3515b0c78f" },
  ],
  Office: [
    { name: "Power Meeting", items: ["Navy Blazer", "White Shirt", "Trousers", "Block Heels"], score: 97, photo: "1507003211169-0a1dd7228f2d" },
    { name: "Business Casual", items: ["Silk Blouse", "Tailored Pants", "Ballet Flats"], score: 93, photo: "1509631179647-0177331693ae" },
    { name: "Smart Friday", items: ["Turtleneck", "Wide-Leg Trousers", "Loafers"], score: 89, photo: "1512436991641-6745cdb1723f" },
  ],
  Interview: [
    { name: "First Impression", items: ["Tailored Suit", "Classic Shirt", "Oxford Shoes"], score: 99, photo: "1551028719-00167b16eac5" },
    { name: "Creative Pro", items: ["Blazer", "Slim Trousers", "Clean Sneakers"], score: 92, photo: "1596755094514-f87e34085b2c" },
    { name: "Tech Interview", items: ["Smart Casual Shirt", "Dark Jeans", "Leather Shoes"], score: 87, photo: "1491553895911-0055eca6402d" },
  ],
  Party: [
    { name: "Night Out Glam", items: ["Sequin Top", "Black Skirt", "Heeled Sandals"], score: 96, photo: "1434389677669-e08b4cac3105" },
    { name: "Garden Party", items: ["Floral Dress", "Espadrilles", "Wicker Bag"], score: 94, photo: "1515886657613-9f3515b0c78f" },
    { name: "Cocktail Chic", items: ["Little Black Dress", "Strappy Heels", "Earrings"], score: 98, photo: "1483985988355-763728e1935b" },
  ],
  Travel: [
    { name: "Airport OOTD", items: ["Oversized Hoodie", "Leggings", "Slip-ons"], score: 91, photo: "1469334031218-e382a71b716b" },
    { name: "City Explorer", items: ["Trench Coat", "Straight Jeans", "Chelsea Boots"], score: 95, photo: "1551028719-00167b16eac5" },
    { name: "Beach Ready", items: ["Linen Set", "Sandals", "Sun Hat", "Tote"], score: 93, photo: "1434389677669-e08b4cac3105" },
  ],
  "Date Night": [
    { name: "Romantic Evening", items: ["Wrap Dress", "Strappy Heels", "Gold Jewelry"], score: 97, photo: "1515886657613-9f3515b0c78f" },
    { name: "Casual Date", items: ["Fitted Tee", "Wide-Leg Jeans", "Mules"], score: 90, photo: "1469334031218-e382a71b716b" },
    { name: "Dinner Glam", items: ["Silk Slip Dress", "Block Heels", "Clutch"], score: 96, photo: "1483985988355-763728e1935b" },
  ],
};

export const TESTIMONIALS = [
  { name: "Sophia Chen", role: "Fashion Blogger", avatar: "1580489944761-15a19d654956", text: "WearWise AI transformed how I organize my wardrobe. The outfit recommendations are spot-on and I save hours every week.", stars: 5 },
  { name: "Marcus Williams", role: "Creative Director", avatar: "1507003211169-0a1dd7228f2d", text: "I was skeptical but the AI genuinely understands style. My outfits have never been more cohesive and I feel confident at work.", stars: 5 },
  { name: "Priya Sharma", role: "UX Designer", avatar: "1438761681033-6461ffad8d80", text: "The shopping assistant alone is worth every penny. No more impulse buys — it tells me exactly what works with my wardrobe.", stars: 5 },
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "wardrobe", label: "My Wardrobe", icon: Shirt },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "outfits", label: "Outfit AI", icon: Sparkles },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
];
