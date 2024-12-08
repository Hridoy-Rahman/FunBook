import express from "express"
import userAuth from "../middleware/authMiddleware.js"
import { createPost, getComments, getPosts, getSinglePost, getUserPost } from "../controllers/postController.js";

const router = express.Router();

// create post
router.post("/create-post",userAuth,createPost)

router.post("/get-all-posts",userAuth,getPosts)

router.post("/get-single-post",userAuth,getSinglePost)


router.post("/get-user-post",userAuth,getUserPost)
router.post("/get-comments",userAuth,getComments)

export default router;