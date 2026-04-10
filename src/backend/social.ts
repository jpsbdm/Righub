// social.ts – Community Social features
import { logAuditAction } from './auth';

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  reactions: Record<string, number>;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export async function createPost(userId: string, content: string): Promise<Post> {
  console.log(`User ${userId} creating post: ${content}`);
  const post: Post = {
    id: 'pid' + Math.random().toString(36).substr(2, 9),
    userId,
    content,
    createdAt: new Date(),
    reactions: {}
  };
  await logAuditAction(userId, 'CREATE_POST', { postId: post.id });
  return post;
}

export async function addComment(userId: string, postId: string, content: string): Promise<Comment> {
  console.log(`User ${userId} commenting on post ${postId}: ${content}`);
  const comment: Comment = {
    id: 'cid' + Math.random().toString(36).substr(2, 9),
    postId,
    userId,
    content,
    createdAt: new Date()
  };
  await logAuditAction(userId, 'ADD_COMMENT', { postId, commentId: comment.id });
  return comment;
}

export async function toggleReaction(userId: string, postId: string, type: string): Promise<void> {
  console.log(`User ${userId} reacted ${type} to post ${postId}`);
  await logAuditAction(userId, 'TOGGLE_REACTION', { postId, type });
}

export async function reportContent(userId: string, contentType: 'post' | 'comment', contentId: string, reason: string): Promise<void> {
  console.log(`User ${userId} reported ${contentType} ${contentId}: ${reason}`);
  await logAuditAction(userId, 'REPORT_CONTENT', { contentType, contentId, reason });
}
