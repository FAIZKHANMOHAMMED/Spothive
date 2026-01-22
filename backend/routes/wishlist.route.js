import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addToWishlist, removeFromWishlist, getWishlist, checkWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", isAuth, addToWishlist);
wishlistRouter.post("/remove", isAuth, removeFromWishlist);
wishlistRouter.get("/get", isAuth, getWishlist);
wishlistRouter.get("/check/:listingId", isAuth, checkWishlist);

export default wishlistRouter;
