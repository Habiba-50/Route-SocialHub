import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";

export class Comment extends Model {}

export const CommentModel = Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "C_id",
    },

    content: {
      type: DataTypes.TEXT,
    },
    

    userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "C_AuthorId",
        },
    
    postId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "C_PostId",
        },
    
  },
  {
    sequelize,
  }
);

CommentModel.belongsTo(UserModel, { foreignKey: "userId" });

CommentModel.belongsTo(PostModel, { foreignKey: "postId" });



