import Wishlist from "../model/wishlist.model.js";
import Listing from "../model/listing.model.js";

// Add to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { listingId } = req.body;
        const userId = req.user._id;

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                listings: [listingId]
            });
        } else {
            if (wishlist.listings.includes(listingId)) {
                return res.status(400).json({ message: "Already in wishlist" });
            }
            wishlist.listings.push(listingId);
            await wishlist.save();
        }

        res.status(200).json({ message: "Added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { listingId } = req.body;
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.listings = wishlist.listings.filter(
            (id) => id.toString() !== listingId
        );
        await wishlist.save();

        res.status(200).json({ message: "Removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user wishlist
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId }).populate({
            path: "listings",
            populate: {
                path: "host",
                select: "name email"
            }
        });

        if (!wishlist) {
            return res.status(200).json({ listings: [] });
        }

        res.status(200).json({ listings: wishlist.listings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if listing is in wishlist
export const checkWishlist = async (req, res) => {
    try {
        const { listingId } = req.params;
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(200).json({ inWishlist: false });
        }

        const inWishlist = wishlist.listings.includes(listingId);
        res.status(200).json({ inWishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
