import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./user.model.js";
import { CommentModel } from "./comment.model.js";

export class Post extends Model {}

export const PostModel = Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "P_id",
    },

    title: {
      type: DataTypes.STRING,
    },

    content: {
      type: DataTypes.TEXT,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "P_AuthorId",
      
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: "P_CommentId",
      
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "Posts",
    timestamps: true,
    paranoid: true,
  }
);

// PostModel.belongsTo(UserModel, {
//   foreignKey: {
//     name: "userId",
//     allowNull: false,
//   },
// });

// PostModel.hasMany(CommentModel, {
//   foreignKey: "commentId",
    
// });

// PostModel.hasMany(CommentModel, { foreignKey: "commentId" });
