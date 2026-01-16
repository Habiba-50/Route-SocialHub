import { CommentModel } from './comment.model.js';
import { PostModel } from './post.model.js';
import { UserModel } from './user.model.js';


PostModel.hasMany(CommentModel, { foreignKey: "postId" });
CommentModel.belongsTo(PostModel, { foreignKey: "postId" });
PostModel.belongsTo(UserModel, { foreignKey: "userId" });


export { PostModel, UserModel, CommentModel };