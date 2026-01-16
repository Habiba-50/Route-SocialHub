import { Router } from "express";
import {
    commentByPk,
  createComment,
  findOrCreateComment,
  getNewestComments,
  searchComments,
  updateComment,
} from "./comment.service.js";

const router = Router();

// Create Comments
router.post("/", async (req, res, next) => {
  console.log(req.body.comments);
  const commentsArr = req.body.comments;
  console.log(commentsArr);

  const result = await createComment(commentsArr);
  return res.status(201).json({ message: "Comments created", result });
});

// -------------------------------------------------------

// Update
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  const result = await updateComment(id, userId, content);
  return res.status(200).json({ message: "Comment updated successfully" });
});

// -----------------------------------------------

// find - or - create
router.post("/find-or-create", async (req, res, next) => {
  const { postId, userId, content } = req.body;
  console.log(postId, userId, content);

  if (!postId || !userId || !content) {
    return res
      .status(400)
      .json({ message: "postId, userId, and content are required" });
  }

  const result = await findOrCreateComment(postId, userId, content);
  return res.status(201).json({ result });
});

// -------------------------------------

// Search by word

router.get("/search", async (req, res, next) => {
    let { word } = req.query
    console.log(word);
    
    
    const result = await searchComments(word)
    return res.status(200).json({ result });
})

// ----------------------------------------------------

// Get Newest Comments
router.get("/newest/:postId", async (req, res, next) => {
    const { postId } = req.params
    const result = await getNewestComments(postId)
    return res.status(200).json({ result });
})

// ------------------------------------------

// Get specifi comment with details
router.get("/details/:id", async (req, res, next) => {
    const { id } = req.params
    const result = await commentByPk(id)
    return res.status(200).json({ result });
})

export default router;
