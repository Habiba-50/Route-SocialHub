import { Router } from 'express'
import { signup } from './user.service.js';
import { checkUser , checkUserEmail , checkUserId} from './user.service.js';
const router = Router(); 

// Create a new user
router.post("/signup", async (req, res, next) => {
    const result = await signup(req.body)
    return res.status(201).json({ message: "User added successfully", result })
})


// Create or update based on PK
router.put("/:id", async (req, res, next) => {
    const { id } = req.params.id;
  const result = await checkUser(req.body,id);
  return res.status(201).json({ message: "User Updated or Created successfully", result });
});

// find a user by email
router.get("/by-email", async (req, res, next) => {
    const { email } = req.query
    console.log(email);
    
    const result = await checkUserEmail(email)
      return res
        .status(200)
        .json({ result });

});

// Retrieve a user by their PK
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  
  
  const result = await checkUserId(id)
  return res.status(200).json({ result });

})

export default router