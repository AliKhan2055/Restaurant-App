import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/menuItem.js"; // Ensure the path is correct
// import User from "./models/user.js"; // Optional: if you want to seed a default user

dotenv.config();

// Placeholder images - REPLACE THESE WITH YOUR ACTUAL URLs
const placeholderImage = (text) => `https://via.placeholder.com/200x150?text=${encodeURIComponent(text)}`;

const items = [
  // ⭐ STARTERS
  {
    name: "Chicken Wings",
    category: "Starters",
    price: 1200, // $12.00
    inStock: true,
    description: "Crispy chicken wings served with spicy sauce and a side of celery.",
    image:"https://www.recipetineats.com/tachyon/2024/11/New-Oreleans-chicken-wings_1.jpg" 
  },
  {
    name: "Garlic Bread",
    category: "Starters",
    price: 550, // $5.50
    inStock: true,
    description: "Toasted Italian bread with rich garlic butter and herbs.",
    image:"https://static01.nyt.com/images/2018/12/11/dining/as-garlic-bread/as-garlic-bread-googleFourByThree-v2.jpg"
  },
    {
    name: "Loaded Nachos",
    category: "Starters",
    price: 1450, // $14.50
    inStock: true,
    description: "Tortilla chips loaded with melted cheese, jalapeños, and sour cream.",
    image:"https://www.savorynothings.com/wp-content/uploads/2020/01/sheet-pan-nachos-image-1-1.jpg"
  },

  // ⭐ MAIN COURSE
  {
    name: "Grilled Chicken",
    category: "Main Course",
    price: 2500, // $25.00
    inStock: true,
    description: "Perfectly grilled chicken breast served with creamy mashed potatoes and seasonal vegetables.",
    image:"https://spiceindiaonline.com/wp-content/uploads/2021/05/Tandoori-Chicken-20.jpg"
  },
  {
    name: "Beef Steak",
    category: "Main Course",
    price: 3500, // $35.00
    inStock: true,
    description: "Juicy sirloin beef steak with a pepper sauce, served with crispy fries.",
    image:"https://delishglobe.com/wp-content/uploads/2025/06/Beef-Steaf-500x500.png"
  },
  {
    name: "Vegetable Fried Rice",
    category: "Main Course",
    price: 1500, // $15.00
    inStock: true,
    description: "Fluffy rice stir-fried with fresh vegetables and a light soy glaze.",
    image:"https://shwetainthekitchen.com/wp-content/uploads/2023/06/veg-fried-rice.jpg"
  },
    {
    name: "Cheesy Pizza",
    category: "Main Course",
    price: 1800, // $18.00
    inStock: true,
    description: "Our signature thin-crust pizza topped with a blend of four Italian cheeses.",
    image:"https://static.toiimg.com/photo/53110049.cms"
  },

  // ⭐ DRINKS
  {
    name: "Fresh Lime Juice",
    price: 400, // $4.00
    category: "Drinks",
    inStock: true,
    description: "Refreshing lime juice served chilled with mint and a hint of sugar.",
    image:"https://veganhuggs.com/wp-content/uploads/2018/07/fresh-limeade-recipe-3.jpg"
  },
  {
    name: "Mango Smoothie",
    price: 750, // $7.50
    category: "Drinks",
    inStock: true,
    description: "Thick mango smoothie made from fresh, sweet mangoes and a touch of yogurt.",
    image:"https://cdn.loveandlemons.com/wp-content/uploads/2023/05/mango-smoothie.jpg"
  },
    {
    name: "Cappuccino",
    price: 600, // $6.00
    category: "Drinks",
    inStock: true,
    description: "Espresso mixed with steamed and foamed milk, sprinkled with cocoa powder.",
    image:"https://www.acouplecooks.com/wp-content/uploads/2020/10/how-to-make-cappuccino-005.jpg"
  },

  // ⭐ DESSERTS
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 900, // $9.00
    inStock: true,
    description: "Rich, moist chocolate cake with dark chocolate fudge topping.",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnfTXs9DpaPffvPTpjsS2XrGmEqiS1PebKA&s"
  },
  {
    name: "Ice Cream Sundae",
    category: "Desserts",
    price: 600, // $6.00
    inStock: true,
    description: "Vanilla ice cream topped with chocolate syrup, whipped cream, and a cherry.",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBcmk6yP7OwA-8F5YtPwJDg6RwTYx6MM44g&s"
  }
];

async function seedDatabase() {
  try {
    // Ensure MONGO_URI is set in your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await MenuItem.deleteMany();
    // Optional: clear users if needed
    // await User.deleteMany();
    console.log("Old menu data cleared");

    // Insert new menu items
    await MenuItem.insertMany(items);
    console.log("New restaurant menu uploaded");
    
    // Optional: seed a default user
    // await User.create({
    //     firstName: 'Admin',
    //     email: 'admin@monal.com',
    //     password: 'password123' // Password will be auto-hashed by the model
    // });
    // console.log("Default user seeded");


    mongoose.disconnect();
  } catch (err) {
    console.error("Error during seeding:", err.message);
  }
}

seedDatabase();