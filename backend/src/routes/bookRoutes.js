import express from "express";
import Book from "../models/Book.js";
import protectRoute from "../middlaware/auth.middleware.js";

const router = express.Router();


// create book
router.post("/",protectRoute, async (req, res) => {
    try {
        const { title, caption, rating,image } = req.body;
        
        if (!title || !caption || !rating || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image)
        const imageUrl = uploadResponse.secure_url

        // save to the database
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            user: req.user._id
        })

        await newBook.save();

        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        console.log("Error creating book", error);
        res.status(500).json({ message: "Error creating book" });
    }
})




export default router