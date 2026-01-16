import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostsWithCommentCount } from "./post.service.js";

const router = Router()

// Create Post  
router.post('/', async (req, res, next) => {
    const result = await createPost(req.body)
    return res.status(201).json({ message: "Post added successfully", result });
})

// Delete Post
router.delete('/:id', async (req, res, next) => {
    const { email }= req.body
    
    const result = await deletePost(req.params, email)
    return res.status(200).json({ message: "Post deleted successfully", result });
})

// Get All Posts 
router.get('/details', async (req, res, next) => {
    const result = await getAllPosts();
    return res.status(200).json({Posts : result})
})
router.get('/comment-count', async (req, res, next) => {
    const result = await getPostsWithCommentCount();
    return res.status(200).json({Posts : result})
})


export default router