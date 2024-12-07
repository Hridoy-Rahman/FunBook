import express from "express"
import userAuth from "../middleware/authMiddleware.js"
import { createPost, getPosts, getSinglePost } from "../controllers/postController.js";

const router = express.Router();

// create post

router.post("/create-post",userAuth,createPost)

router.post("/get-all-posts",userAuth,getPosts)

router.post("/get-single-post",userAuth,getSinglePost)

export default router;