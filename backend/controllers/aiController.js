import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "../config/cloudinary.js";
import WardrobeItem from "../models/WardrobeItem.js";

// Helper: Upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "wearwise" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Helper: fallback image analysis when Gemini key is absent or fails
const fallbackImageAnalysis = (filename) => {
  const name = (filename || "").toLowerCase();
  let category = "Tops";
  let color = "Black";
  let season = "All Season";
  let occasion = "Casual";

  if (name.includes("jean") || name.includes("pant") || name.includes("trouser") || name.includes("skirt") || name.includes("short") || name.includes("legging")) {
    category = "Bottoms";
  } else if (name.includes("shoe") || name.includes("boot") || name.includes("sneaker") || name.includes("heel") || name.includes("sandal") || name.includes("flat") || name.includes("loaf")) {
    category = "Shoes";
  } else if (name.includes("jacket") || name.includes("coat") || name.includes("blazer") || name.includes("cardigan") || name.includes("hoodie") || name.includes("outerwear") || name.includes("sweater")) {
    category = "Outerwear";
  }

  // Detect colors
  const colorOptions = ["red", "blue", "green", "yellow", "black", "white", "gray", "grey", "pink", "purple", "orange", "brown", "beige", "cream", "navy", "floral", "stripe", "check"];
  for (const c of colorOptions) {
    if (name.includes(c)) {
      color = c.charAt(0).toUpperCase() + c.slice(1);
      break;
    }
  }

  // Detect seasons
  if (name.includes("summer") || name.includes("light") || name.includes("short")) {
    season = "Summer";
  } else if (name.includes("winter") || name.includes("heavy") || name.includes("wool") || name.includes("coat")) {
    season = "Winter";
  } else if (name.includes("spring") || name.includes("autumn") || name.includes("fall")) {
    season = "Spring/Autumn";
  }

  // Detect occasions
  if (name.includes("office") || name.includes("work") || name.includes("formal") || name.includes("suit")) {
    occasion = "Formal";
  } else if (name.includes("party") || name.includes("night") || name.includes("club") || name.includes("dinner")) {
    occasion = "Party";
  } else if (name.includes("sport") || name.includes("run") || name.includes("gym") || name.includes("fit")) {
    occasion = "Sports";
  } else if (name.includes("college") || name.includes("uni")) {
    occasion = "College";
  }

  return { category, color, season, occasion };
};

// Helper: Scrape metadata from URL
const scrapeUrlMetadata = async (url) => {
  let title = "";
  let metaTags = [];

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      },
      signal: AbortSignal.timeout(5000)
    });

    if (response.ok) {
      const html = await response.text();
      // Extract title
      title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || "";
      
      // Extract first few meta tags
      const metaRegex = /<meta[^>]*>/gi;
      let match;
      let count = 0;
      while ((match = metaRegex.exec(html)) !== null && count < 25) {
        metaTags.push(match[0]);
        count++;
      }
    }
  } catch (e) {
    console.error("Link scraping failed:", e.message);
  }

  return { title, metaTags: metaTags.join("\n") };
};

// Helper: fallback URL analysis when Gemini key is absent or fails
const fallbackLinkAnalysis = (url, scraped) => {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (e) {
    urlObj = { hostname: "zara.com", pathname: "/product" };
  }

  const hostname = urlObj.hostname.toLowerCase();
  
  // Extract brand from hostname (e.g. www.zara.com -> Zara)
  let brand = hostname.replace("www.", "").split(".")[0];
  brand = brand.charAt(0).toUpperCase() + brand.slice(1);
  if (brand === "Net-a-porter") brand = "Net-a-Porter";
  if (!brand) brand = "Zara";

  // Try to parse the product name from URL pathname
  const pathname = urlObj.pathname.toLowerCase();
  const pathParts = pathname.split("/").filter(p => p.length > 0);
  
  let bestPart = pathParts.find(p => p.includes("-") && !p.includes("html") && p.length > 8) || pathParts[pathParts.length - 1] || "";
  bestPart = bestPart.replace(/\.html|\.htm/g, "");
  
  // Clean product name
  let cleanName = bestPart
    .split("-")
    .filter(part => !part.match(/^\d+$/) && !part.match(/^p\d+$/))
    .join(" ");

  if (!cleanName || cleanName.trim().length < 3) {
    if (scraped.title) {
      cleanName = scraped.title.split("|")[0].split("-")[0].trim();
    } else {
      cleanName = "Satin Blazer";
    }
  }

  // Capitalize words
  cleanName = cleanName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Determine category
  let category = "Tops";
  const nameLower = cleanName.toLowerCase();
  if (nameLower.includes("jean") || nameLower.includes("pant") || nameLower.includes("trouser") || nameLower.includes("skirt") || nameLower.includes("short") || nameLower.includes("legging") || nameLower.includes("jogger")) {
    category = "Bottoms";
  } else if (nameLower.includes("shoe") || nameLower.includes("boot") || nameLower.includes("sneaker") || nameLower.includes("heel") || nameLower.includes("sandal") || nameLower.includes("flat") || nameLower.includes("loafer") || nameLower.includes("slide")) {
    category = "Shoes";
  } else if (nameLower.includes("jacket") || nameLower.includes("coat") || nameLower.includes("blazer") || nameLower.includes("cardigan") || nameLower.includes("hoodie") || nameLower.includes("outerwear") || nameLower.includes("sweater") || nameLower.includes("trench") || nameLower.includes("bomber")) {
    category = "Outerwear";
  }

  // Determine colors
  let colors = [];
  const colorOptions = ["black", "white", "blue", "green", "red", "yellow", "pink", "purple", "orange", "brown", "grey", "gray", "beige", "cream", "navy", "khaki", "gold", "silver", "champagne", "emerald", "floral", "striped", "plaid"];
  for (const col of colorOptions) {
    if (nameLower.includes(col)) {
      colors.push(col.charAt(0).toUpperCase() + col.slice(1));
    }
  }
  if (colors.length === 0) {
    colors.push("Beige");
  }

  // Determine season
  let season = "All Season";
  if (nameLower.includes("summer") || nameLower.includes("linen") || nameLower.includes("silk") || nameLower.includes("short")) {
    season = "Summer";
  } else if (nameLower.includes("winter") || nameLower.includes("wool") || nameLower.includes("heavy") || nameLower.includes("coat") || nameLower.includes("down")) {
    season = "Winter";
  } else if (nameLower.includes("spring") || nameLower.includes("autumn") || nameLower.includes("fall")) {
    season = "Spring/Autumn";
  }

  // Determine occasion
  let occasion = "Casual";
  if (nameLower.includes("blazer") || nameLower.includes("suit") || nameLower.includes("office") || nameLower.includes("work") || nameLower.includes("formal") || nameLower.includes("trouser")) {
    occasion = "Formal";
  } else if (nameLower.includes("party") || nameLower.includes("night") || nameLower.includes("silk") || nameLower.includes("sequin") || nameLower.includes("satin") || nameLower.includes("dress")) {
    occasion = "Party";
  } else if (nameLower.includes("college") || nameLower.includes("campus") || nameLower.includes("hoodie")) {
    occasion = "College";
  }

  // Generate price
  let price = "$59.90";
  const priceMatch = scraped.metaTags.match(/\$\d+(?:\.\d{2})?/i) || scraped.title.match(/\$\d+(?:\.\d{2})?/i);
  if (priceMatch) {
    price = priceMatch[0];
  } else {
    if (category === "Outerwear") price = "$99.90";
    else if (category === "Shoes") price = "$79.90";
    else if (category === "Bottoms") price = "$49.90";
    else price = "$39.90";
  }

  // Select an appropriate fashion Unsplash image based on category and details
  let imageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500";
  if (category === "Tops") {
    imageUrl = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500";
    if (nameLower.includes("dress")) imageUrl = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500";
    else if (nameLower.includes("t-shirt") || nameLower.includes("tee")) imageUrl = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500";
    else if (nameLower.includes("blouse")) imageUrl = "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500";
  } else if (category === "Bottoms") {
    imageUrl = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500";
    if (nameLower.includes("skirt")) imageUrl = "https://images.unsplash.com/photo-1583496661160-fb488653d5d2?w=500";
    else if (nameLower.includes("short")) imageUrl = "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500";
  } else if (category === "Shoes") {
    imageUrl = "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500";
    if (nameLower.includes("heel") || nameLower.includes("pump")) imageUrl = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500";
    else if (nameLower.includes("boot")) imageUrl = "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500";
    else if (nameLower.includes("loafer") || nameLower.includes("flat")) imageUrl = "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500";
  } else if (category === "Outerwear") {
    imageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500";
    if (nameLower.includes("leather") || nameLower.includes("biker")) imageUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500";
    else if (nameLower.includes("coat") || nameLower.includes("trench")) imageUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500";
    else if (nameLower.includes("sweater") || nameLower.includes("cardigan")) imageUrl = "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=500";
  }

  return {
    name: cleanName,
    brand,
    price,
    imageUrl,
    category,
    colors,
    season,
    occasion
  };
};

// POST /api/ai/analyze-image
export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // 1. Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const imageUrl = uploadResult.secure_url;

    // 2. Perform AI Analysis (Gemini or Fallback)
    let analysisResult = null;
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (hasApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const imagePart = {
          inlineData: {
            data: req.file.buffer.toString("base64"),
            mimeType: req.file.mimetype
          }
        };

        const prompt = `Analyze this clothing item image. Determine the most accurate attributes for it.
Respond ONLY with a JSON object that has these exact string fields:
{
  "category": "Tops" | "Bottoms" | "Shoes" | "Outerwear",
  "color": "color description (e.g. Red, Black/White Striped)",
  "season": "season suitability (e.g. Summer, Winter, All Season)",
  "occasion": "occasion suitability (e.g. Casual, Formal, Party, College)"
}
Respond with only raw JSON. Do not include markdown code block syntax.`;

        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        if (parsed.category && ["Tops", "Bottoms", "Shoes", "Outerwear"].includes(parsed.category)) {
          analysisResult = parsed;
        }
      } catch (err) {
        console.error("Gemini analysis error, falling back to smart tags:", err);
        analysisResult = fallbackImageAnalysis(req.file.originalname);
      }
    } else {
      analysisResult = fallbackImageAnalysis(req.file.originalname);
    }

    if (!analysisResult) {
      analysisResult = fallbackImageAnalysis(req.file.originalname);
    }

    res.json({
      imageUrl,
      ...analysisResult
    });
  } catch (error) {
    console.error("Analyze image failed:", error);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/ai/analyze-link
export const analyzeLink = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // 1. Scrape metadata
    const scraped = await scrapeUrlMetadata(url);

    // 2. Perform AI analysis (Gemini or Fallback)
    let productDetails = null;
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (hasApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Analyze this shopping URL, page title, and meta description. Extract/estimate the product details.
URL: ${url}
Title: ${scraped.title}
Meta Tags: ${scraped.metaTags}

Respond ONLY with a JSON object that has these exact fields:
{
  "name": "Product Name (e.g. Satin Effect Blazer)",
  "brand": "Brand (e.g. Zara, H&M, ASOS)",
  "price": "Price (e.g. $89.90)",
  "imageUrl": "Product image URL from page, or if not found use a relevant high-quality fashion model Unsplash image matching the category/style",
  "category": "Tops" | "Bottoms" | "Shoes" | "Outerwear",
  "colors": ["list of colors, e.g. Black, Champagne"],
  "season": "suitable season (e.g. Summer, Winter, All Season)",
  "occasion": "suitable occasion (e.g. Casual, Formal, Party)"
}
Respond with only raw JSON. Do not include markdown code block syntax.`;

        const result = await model.generateContent([prompt]);
        const text = result.response.text();
        const cleanJson = text.replace(/```json|```/g, "").trim();
        productDetails = JSON.parse(cleanJson);
      } catch (err) {
        console.error("Gemini link analysis error, falling back to heuristics:", err);
        productDetails = fallbackLinkAnalysis(url, scraped);
      }
    } else {
      productDetails = fallbackLinkAnalysis(url, scraped);
    }

    if (!productDetails) {
      productDetails = fallbackLinkAnalysis(url, scraped);
    }

    // Standardize category
    if (!productDetails.category || !["Tops", "Bottoms", "Shoes", "Outerwear"].includes(productDetails.category)) {
      productDetails.category = "Outerwear";
    }
    if (!productDetails.colors || !Array.isArray(productDetails.colors) || productDetails.colors.length === 0) {
      productDetails.colors = ["Beige"];
    }

    // 3. Query user's wardrobe to see if a similar item exists
    const userItems = await WardrobeItem.find({ user: req.userId });
    
    // Find matching items in user's wardrobe (same category and overlapping color)
    const matchingItems = userItems.filter(item => {
      const itemCat = item.category;
      if (itemCat !== productDetails.category) return false;

      const itemColorLower = (item.color || "").toLowerCase();
      return productDetails.colors.some(col => {
        const colLower = col.toLowerCase();
        return itemColorLower.includes(colLower) || colLower.includes(itemColorLower);
      });
    });

    const exists = matchingItems.length > 0;
    const existingItem = exists ? matchingItems[0] : null;

    // Calculate compatibility score with wardrobe
    let matchingSeasonCount = 0;
    let matchingOccasionCount = 0;
    userItems.forEach(item => {
      if (item.season && productDetails.season && item.season.toLowerCase() === productDetails.season.toLowerCase()) {
        matchingSeasonCount++;
      }
      if (item.occasion && productDetails.occasion && item.occasion.toLowerCase() === productDetails.occasion.toLowerCase()) {
        matchingOccasionCount++;
      }
    });

    let score = 70;
    if (userItems.length > 0) {
      const seasonMatchRatio = matchingSeasonCount / userItems.length;
      const occasionMatchRatio = matchingOccasionCount / userItems.length;
      score = Math.min(98, Math.round(70 + seasonMatchRatio * 15 + occasionMatchRatio * 13));
    } else {
      score = 50;
    }

    // Find complimentary items that pair well
    const complimentaryCategories = {
      "Outerwear": ["Tops", "Bottoms"],
      "Tops": ["Bottoms", "Outerwear"],
      "Bottoms": ["Tops", "Shoes"],
      "Shoes": ["Bottoms", "Tops"]
    };

    const targets = complimentaryCategories[productDetails.category] || ["Tops", "Bottoms"];
    const pairs = userItems.filter(item => targets.includes(item.category)).slice(0, 3);
    
    let compatibilityText = "";
    if (exists) {
      compatibilityText = `You already have a similar item in your wardrobe: ${existingItem.color} ${existingItem.category}.`;
    } else if (userItems.length === 0) {
      compatibilityText = `Your wardrobe is currently empty! Add items to see detailed outfit matches.`;
    } else if (pairs.length > 0) {
      const pairNames = pairs.map(p => `${p.color} ${p.category}`).join(", ");
      compatibilityText = `Great match! This ${productDetails.name.toLowerCase()} works with ${userItems.length} of your items including your ${pairNames}.`;
    } else {
      compatibilityText = `Good match! This looks great for the ${productDetails.season} season.`;
    }

    // AI Styling Advice
    const stylingAdvice = [
      {
        tip: `Style this with your wardrobe's ${productDetails.season} pieces for a cohesive, comfortable look.`,
        icon: "✨"
      },
      {
        tip: `Perfect for ${productDetails.occasion} settings. Highly versatile choice.`,
        icon: "💼"
      }
    ];

    if (exists) {
      stylingAdvice.push({
        tip: `Note: You already own a similar ${existingItem.color} item in the ${existingItem.category} category. Do you need another?`,
        icon: "🎯"
      });
    } else {
      stylingAdvice.push({
        tip: `This piece fills a style gap in your ${productDetails.category} collection.`,
        icon: "🎯"
      });
    }

    // Outfit Suggestions
    const mockNewItem = {
      _id: "new_item_temp",
      imageUrl: productDetails.imageUrl,
      category: productDetails.category,
      color: productDetails.colors[0] || "Neutral",
      season: productDetails.season,
      occasion: productDetails.occasion,
      isTemp: true
    };

    const outfit1Items = userItems.filter(item => item.category !== productDetails.category).slice(0, 2);
    const outfit2Items = userItems.filter(item => item.category !== productDetails.category).slice(2, 4);
    const outfit3Items = userItems.filter(item => item.category !== productDetails.category).slice(4, 6);

    const suggestedOutfits = [
      {
        name: "Power Look",
        items: [...outfit1Items, mockNewItem]
      },
      {
        name: "Date Night",
        items: [...outfit2Items, mockNewItem]
      },
      {
        name: "Weekend Edit",
        items: [...outfit3Items, mockNewItem]
      }
    ];

    res.json({
      product: productDetails,
      exists,
      existingItem,
      compatibility: score,
      compatibilityText,
      stylingAdvice,
      suggestedOutfits
    });

  } catch (error) {
    console.error("Analyze link failed:", error);
    res.status(500).json({ message: error.message });
  }
};
