import { Router } from "express";
import { 
    getAllBoats,
    getBoat,
    getTypeBoats,
    searchBoats,
    likedBoats,
    delLikedBoat
} from "../Controller/boatController.js";
import {
     getUser,
     signUp,
     login
 } from "../Controller/logController.js";
 import { hashPasswordMiddleware } from "../Auth/auth.js";


const router = Router();

// Routes for all boats
router.get("/rental", getAllBoats);
router.get("/rental/:id", getBoat);
router.get("/rentalType/:type", getTypeBoats);
router.post("/rental", searchBoats);
router.post("/my-rental", likedBoats);
router.delete("/my-rental/:id", delLikedBoat);

// Routes for user
router.get("/username", getUser);
router.post("/signup",hashPasswordMiddleware, signUp);
router.post("/login", hashPasswordMiddleware, login);



export default router;