import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addReview, getReviews, deleteReview } from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/add/:listingId", isAuth, addReview);
reviewRouter.get("/get/:listingId", getReviews);
reviewRouter.delete("/delete/:listingId/:reviewId", isAuth, deleteReview);

export default reviewRouter;
