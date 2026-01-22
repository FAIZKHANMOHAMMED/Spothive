import Listing from "../model/listing.model.js";

// Add review to a listing
export const addReview = async (req, res) => {
    try {
        const { listingId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;
        const userName = req.user.name;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Check if user already reviewed
        const existingReview = listing.reviews.find(
            (review) => review.user.toString() === userId.toString()
        );

        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this property" });
        }

        // Add review
        listing.reviews.push({
            user: userId,
            name: userName,
            rating: Number(rating),
            comment,
            createdAt: new Date()
        });

        // Update average rating and total reviews
        listing.totalReviews = listing.reviews.length;
        const totalRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
        listing.averageRating = (totalRating / listing.totalReviews).toFixed(1);

        await listing.save();

        res.status(200).json({ message: "Review added successfully", listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a listing
export const getReviews = async (req, res) => {
    try {
        const { listingId } = req.params;

        const listing = await Listing.findById(listingId).populate({
            path: "reviews.user",
            select: "name"
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json({
            reviews: listing.reviews,
            averageRating: listing.averageRating,
            totalReviews: listing.totalReviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete review
export const deleteReview = async (req, res) => {
    try {
        const { listingId, reviewId } = req.params;
        const userId = req.user._id;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const review = listing.reviews.id(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        listing.reviews.pull(reviewId);

        // Recalculate average rating
        if (listing.reviews.length > 0) {
            listing.totalReviews = listing.reviews.length;
            const totalRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
            listing.averageRating = (totalRating / listing.totalReviews).toFixed(1);
        } else {
            listing.totalReviews = 0;
            listing.averageRating = 0;
        }

        await listing.save();

        res.status(200).json({ message: "Review deleted successfully", listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
