

import { Sequelize } from "sequelize";
import { PostModel, UserModel, CommentModel } from "../../DB/model/index.js";

// Create Post
export const createPost = async (inputs) => {
    
    const { title, content, userId } = inputs
    // console.log({ title, content, userId });
    
    PostModel.beforeCreate(async (post, options) => {
      const finduser = await UserModel.findByPk(userId);
      if (!finduser) {
        throw new Error("User not found");
        }
    });

    const post = await PostModel.create({ title, content, userId });

    return post   
}


// ----------------------------------------------------

// Delete Post
export const deletePost = async (inputs , email) => {
  const {id } = inputs;
  
  
    const findpost = await PostModel.findByPk(id);
    console.log(findpost);
    
    if (!findpost) {
      throw new Error("Post not found");
    } else {
        const {userId} = findpost
        const author = await UserModel.findByPk(userId);
        console.log(author.email);
        console.log(email);
        
        if (author.email !== email) {
          throw new Error("You are not authoreized to delete this post ");
        } else {
            const post = await PostModel.destroy({ where: { id } });
            return post;
        }
        
    }
  
   
  
};

// ----------------------------------------------------

// Get All Posts in details

export const getAllPosts = async () => {
    const posts = await PostModel.findAll({
        attributes: ["id", "title"],
        include: [
            {
                model: UserModel,
                attributes: ["id", "userName"],
            },
            {
                model: CommentModel,
                attributes: ["id", "content"],
            },
        ],
    });

    return posts;
}

// -------------------------------------------------

//Posts With CommentCount

export const getPostsWithCommentCount = async () => {
  const posts = await PostModel.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("Comments.C_id")), "commentCount"],
    ],
    include: [
        {
            model: CommentModel,
            attributes: [],
        },
    ],
    group: ["Post.P_id"], 
  });

  return posts;
}

