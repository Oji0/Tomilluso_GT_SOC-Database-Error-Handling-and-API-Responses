let comments = [];
let nextCommentId = 1;

export const getAllComments = () => comments;

export const getCommentsByPostId = (postId) =>
  comments.filter(comment => comment.postId === postId);

export const createComment = (postId, text) => {
  const newComment = { id: nextCommentId++, text, postId };
  comments.push(newComment);
  return newComment;
};
