import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./model/listing.model.js";

dotenv.config();

// Sample StaySpot listings data with correct categories
// Categories: trending, villa, farmHouse, poolHouse, rooms, flat, pg, cabin, shops
const sampleListings = [
    // VILLA LISTINGS
    {
        title: "Luxury Beachfront Villa in Goa",
        description: "Stunning 4-bedroom villa with panoramic ocean views. Features modern amenities, private pool, and direct beach access. Perfect for a luxurious getaway.",
        image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        image3: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        rent: 25000,
        city: "Goa",
        landMark: "Baga Beach",
        category: "villa",
        ratings: 4.9,
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        amenities: ["WiFi", "Pool", "Beach Access", "Air Conditioning", "Kitchen", "Free Parking", "TV", "Washing Machine"],
        highlights: ["Ocean View", "Private Pool", "Beachfront", "Luxury Interiors"]
    },
    {
        title: "Heritage Villa with Garden",
        description: "Beautiful heritage villa featuring traditional architecture, manicured gardens, and modern comforts. Ideal for family gatherings.",
        image1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        image2: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        image3: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        rent: 18000,
        city: "Udaipur",
        landMark: "City Palace",
        category: "villa",
        ratings: 4.8,
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        amenities: ["WiFi", "Garden", "Air Conditioning", "Kitchen", "Free Parking", "TV"],
        highlights: ["Heritage Property", "Garden View", "Near Palace", "Traditional Architecture"]
    },

    // FARM HOUSE LISTINGS
    {
        title: "Organic Farm Stay Experience",
        description: "Escape to this beautiful farmhouse surrounded by organic farms. Enjoy fresh produce, farm activities, and peaceful countryside living.",
        image1: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
        image2: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
        image3: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        rent: 8000,
        city: "Lonavala",
        landMark: "Tiger Point",
        category: "farmHouse",
        ratings: 4.6,
        guests: 5,
        bedrooms: 2,
        bathrooms: 2,
        amenities: ["WiFi", "Garden", "Kitchen", "Free Parking", "BBQ Grill", "Farm Activities"],
        highlights: ["Organic Farm", "Fresh Produce", "Countryside", "Nature Walks"]
    },
    {
        title: "Rustic Farmhouse Retreat",
        description: "Traditional farmhouse with rustic charm. Experience village life, organic farming, and delicious home-cooked meals.",
        image1: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
        image3: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        rent: 6500,
        city: "Karjat",
        landMark: "Kondana Caves",
        category: "farmHouse",
        ratings: 4.5,
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: ["Kitchen", "Free Parking", "Garden", "Farm Animals", "Fireplace"],
        highlights: ["Village Life", "Rustic Charm", "Home Cooked Meals", "Peaceful"]
    },

    // POOL HOUSE LISTINGS
    {
        title: "Modern Pool House with Jacuzzi",
        description: "Luxurious pool house with infinity pool and jacuzzi. Features outdoor BBQ area, sun deck, and stunning valley views.",
        image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        image3: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        rent: 35000,
        city: "Alibaug",
        landMark: "Alibaug Beach",
        category: "poolHouse",
        ratings: 4.9,
        guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        amenities: ["WiFi", "Pool", "Jacuzzi", "Air Conditioning", "Kitchen", "Free Parking", "TV", "BBQ Grill", "Sun Deck"],
        highlights: ["Infinity Pool", "Jacuzzi", "Valley View", "Premium Luxury"]
    },
    {
        title: "Tropical Pool Paradise",
        description: "Beautiful pool house surrounded by tropical gardens. Features a large swimming pool, outdoor shower, and relaxation areas.",
        image1: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        image3: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        rent: 28000,
        city: "Pondicherry",
        landMark: "Auroville",
        category: "poolHouse",
        ratings: 4.7,
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        amenities: ["WiFi", "Pool", "Air Conditioning", "Kitchen", "Free Parking", "Garden", "Outdoor Shower"],
        highlights: ["Tropical Gardens", "Large Pool", "Serene Location", "Modern Design"]
    },

    // ROOMS LISTINGS
    {
        title: "Cozy Private Room in Bandra",
        description: "Clean and comfortable private room in a shared apartment. Great location with easy access to restaurants and nightlife.",
        image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        image3: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        rent: 2500,
        city: "Mumbai",
        landMark: "Bandra West",
        category: "rooms",
        ratings: 4.3,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["WiFi", "Air Conditioning", "Shared Kitchen", "TV"],
        highlights: ["Prime Location", "Near Nightlife", "Clean", "Affordable"]
    },
    {
        title: "Spacious Room with Balcony",
        description: "Large private room with attached balcony offering city views. Includes WiFi, AC, and access to shared kitchen.",
        image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        image3: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        rent: 3000,
        city: "Bangalore",
        landMark: "Koramangala",
        category: "rooms",
        ratings: 4.4,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["WiFi", "Air Conditioning", "Balcony", "Shared Kitchen", "TV", "Work Desk"],
        highlights: ["City View", "Balcony", "Tech Hub Area", "Comfortable"]
    },

    // FLAT LISTINGS
    {
        title: "Modern 2BHK Apartment",
        description: "Fully furnished 2BHK apartment with modern amenities. Features spacious living room, modular kitchen, and parking space.",
        image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        image3: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        rent: 8000,
        city: "Pune",
        landMark: "Hinjewadi",
        category: "flat",
        ratings: 4.5,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Free Parking", "TV", "Washing Machine", "Elevator"],
        highlights: ["Fully Furnished", "Modern", "Near IT Parks", "Secure Complex"]
    },
    {
        title: "Luxury Penthouse Suite",
        description: "Stunning penthouse with 360-degree city views. Features rooftop terrace, premium interiors, and all modern amenities.",
        image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        image3: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        rent: 45000,
        city: "Mumbai",
        landMark: "Worli",
        category: "flat",
        ratings: 4.9,
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        amenities: ["WiFi", "Air Conditioning", "Kitchen", "Free Parking", "TV", "Washing Machine", "Gym", "Rooftop Terrace"],
        highlights: ["360° City View", "Penthouse", "Luxury Living", "Prime Location"]
    },

    // PG LISTINGS
    {
        title: "Premium PG for Professionals",
        description: "Well-maintained PG accommodation for working professionals. Includes meals, housekeeping, WiFi, and laundry services.",
        image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        image3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        rent: 12000,
        city: "Bangalore",
        landMark: "Electronic City",
        category: "pg",
        ratings: 4.2,
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["WiFi", "Air Conditioning", "Meals Included", "Laundry", "Housekeeping", "TV", "Power Backup"],
        highlights: ["Food Included", "Professional PG", "Housekeeping", "All Bills Included"]
    },
    {
        title: "Student-Friendly PG Near College",
        description: "Affordable PG near major colleges. Includes study room, common area, meals, and 24/7 security.",
        image1: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        image2: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        image3: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        rent: 8000,
        city: "Delhi",
        landMark: "North Campus",
        category: "pg",
        ratings: 4.0,
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["WiFi", "Meals Included", "Study Room", "Common Area", "Security", "Laundry"],
        highlights: ["Student Friendly", "Near College", "Study Room", "Budget Friendly"]
    },

    // CABINS LISTINGS
    {
        title: "Cozy Mountain Cabin",
        description: "Charming wooden cabin nestled in the mountains. Enjoy breathtaking sunrise views, a cozy fireplace, and complete tranquility.",
        image1: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
        image2: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
        image3: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        rent: 7500,
        city: "Manali",
        landMark: "Old Manali",
        category: "cabin",
        ratings: 4.7,
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: ["WiFi", "Fireplace", "Kitchen", "Free Parking", "Mountain View", "Heating"],
        highlights: ["Mountain View", "Fireplace", "Peaceful", "Wooden Cabin"]
    },
    {
        title: "Riverside Log Cabin",
        description: "Beautiful log cabin by the river. Perfect for nature lovers seeking peace and adventure in the mountains.",
        image1: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        image3: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
        rent: 5500,
        city: "Rishikesh",
        landMark: "Laxman Jhula",
        category: "cabin",
        ratings: 4.6,
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["Kitchen", "Free Parking", "River View", "Bonfire Area", "Trekking"],
        highlights: ["Riverside", "Nature", "Adventure", "Tranquil"]
    },

    // SHOPS LISTINGS
    {
        title: "Prime Location Retail Shop",
        description: "Well-maintained retail shop in a busy commercial area. Ideal for boutiques, cafes, or small businesses.",
        image1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        image2: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800",
        image3: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
        rent: 50000,
        city: "Mumbai",
        landMark: "Linking Road",
        category: "shops",
        ratings: 4.5,
        guests: 0,
        bedrooms: 0,
        bathrooms: 1,
        amenities: ["WiFi", "Air Conditioning", "Display Windows", "Storage Space", "Security"],
        highlights: ["Prime Location", "High Footfall", "Commercial Area", "Retail Space"]
    },
    {
        title: "Corner Shop in Market Area",
        description: "Spacious corner shop with good footfall. Features large display windows and storage space. Perfect for retail business.",
        image1: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800",
        image2: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        image3: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
        rent: 35000,
        city: "Delhi",
        landMark: "Connaught Place",
        category: "shops",
        ratings: 4.3,
        guests: 0,
        bedrooms: 0,
        bathrooms: 1,
        amenities: ["WiFi", "Air Conditioning", "Corner Location", "Storage", "Security"],
        highlights: ["Corner Shop", "Market Area", "Good Footfall", "Central Location"]
    },

    // TRENDING LISTINGS (Popular picks)
    {
        title: "Instagram-Famous Treehouse",
        description: "Unique treehouse that went viral! Surrounded by lush greenery with stunning views. Perfect for content creators and adventurers.",
        image1: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
        image3: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        rent: 12000,
        city: "Wayanad",
        landMark: "Vythiri",
        category: "trending",
        ratings: 4.9,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: ["WiFi", "Nature View", "Unique Stay", "Photography Spot", "Breakfast Included"],
        highlights: ["Instagram Famous", "Treehouse", "Unique Experience", "Viral Location"]
    },
    {
        title: "Floating Houseboat Experience",
        description: "Most booked houseboat in Kerala! Cruise through serene backwaters and enjoy authentic local cuisine.",
        image1: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        image2: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
        image3: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800",
        rent: 15000,
        city: "Alleppey",
        landMark: "Kerala Backwaters",
        category: "trending",
        ratings: 4.8,
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: ["WiFi", "Kitchen", "Meals Included", "Boat Cruise", "Local Cuisine", "Scenic Views"],
        highlights: ["Houseboat", "Backwaters", "Most Booked", "Authentic Kerala"]
    }
];

const seedListings = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");

        // You need a host user ID - either create one or use an existing one
        // For now, we'll create a dummy host user or you can replace this with an existing user ID
        const User = (await import("./model/user.model.js")).default;

        // Find an existing user to be the host, or create one
        let hostUser = await User.findOne();

        if (!hostUser) {
            console.log("⚠️ No users found. Creating a demo host user...");
            hostUser = await User.create({
                name: "Demo Host",
                email: "demohost@airbnb.com",
                password: "hashedpassword123", // In real scenario, this should be properly hashed
                isHost: true
            });
            console.log("✅ Demo host user created");
        }

        // Clear existing listings (optional - comment out if you want to keep existing)
        await Listing.deleteMany({});
        console.log("🗑️ Cleared existing listings");

        // Add host ID to all listings
        const listingsWithHost = sampleListings.map(listing => ({
            ...listing,
            host: hostUser._id
        }));

        // Insert all listings
        const result = await Listing.insertMany(listingsWithHost);
        console.log(`✅ Successfully seeded ${result.length} listings!`);

        // Display summary
        console.log("\n📊 Seeded Listings Summary:");
        console.log("─".repeat(50));
        result.forEach((listing, index) => {
            console.log(`${index + 1}. ${listing.title} - ₹${listing.rent}/night (${listing.city})`);
        });

        await mongoose.connection.close();
        console.log("\n✅ Database connection closed");
        process.exit(0);

    } catch (error) {
        console.error("❌ Error seeding listings:", error.message);
        process.exit(1);
    }
};

// Run the seed function
seedListings();
