import { CommentModel, PostModel, UserModel } from "../../DB/model/index.js"
import { Op } from "sequelize";

// Create Bukof Comments
export const createComment = async(commentsArr) => {
    const comments = await CommentModel.bulkCreate( commentsArr );
    return comments
}

// -----------------------------------------------

// Update Comment

export const updateComment = async (id, userId, content) => {
    const comment = await CommentModel.findByPk(id)
    if (!comment) {
        throw new Error ("Comment not found")
    }
    if (comment.userId != userId) {
        throw new Error("You are not authorized to update this comment")
    }
    const updatedComment = await CommentModel.update({content}, {where:{id}})
    return updatedComment
}

// ------------------------------------------

// find OR create

export const findOrCreateComment = async (postId, userId, content) => {
    
    const [comment, created] = await CommentModel.findOrCreate({
      where: { postId, userId },
      defaults: { content },
    });
    return { comment, created };
};

//---------------------------------------------------

// Search 
export const searchComments = async (word) => {
    const comments = await CommentModel.findAndCountAll({
      where: {
        content: { [Op.like]: `%${word}%` },
      },
    });
    return comments
}

//----------------------------------------------------------

//Newest Comments
export const getNewestComments = async (postId) => {
    const comments = await CommentModel.findAll({
      where: { postId },
      limit: 3,
        order: [["createdAt", "DESC"]],
      attributes:["id", "content", "createdAt"]
    });
    return comments
}

// ----------------------------------------------

// Comment by PK
export const commentByPk = async (id) => {
    const comment = await CommentModel.findByPk(id, {
        attributes: ["id", "content"],
        include: [
            {
                model: UserModel,
                attributes:["id", "userName" , "email"]
            },
            {
                model: PostModel,
                attributes:["id" , "title" , "content"]
            }
        ]
    });
    if (!comment) {
        throw new  Error ("No comment found")
    }
    return comment
}
