import express from "express"
import userAuth from "../middleware/authMiddleware.js"
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

// create post

router.post("/create-post",userAuth,createPost)
router.post("/get-post",userAuth,getPosts)

export default router;