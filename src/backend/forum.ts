// forum.ts – Community Forum features
import { logAuditAction } from './auth';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export interface ForumReply {
  id: string;
  topicId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export async function createTopic(userId: string, categoryId: string, title: string, content: string, tags: string[] = []): Promise<ForumTopic> {
  console.log(`User ${userId} creating topic in ${categoryId}: ${title}`);
  const topic: ForumTopic = {
    id: 'tid' + Math.random().toString(36).substr(2, 9),
    categoryId,
    userId,
    title,
    content,
    tags,
    createdAt: new Date()
  };
  await logAuditAction(userId, 'CREATE_FORUM_TOPIC', { topicId: topic.id });
  return topic;
}

export async function addReply(userId: string, topicId: string, content: string): Promise<ForumReply> {
  console.log(`User ${userId} replying to topic ${topicId}`);
  const reply: ForumReply = {
    id: 'rid' + Math.random().toString(36).substr(2, 9),
    topicId,
    userId,
    content,
    createdAt: new Date()
  };
  await logAuditAction(userId, 'ADD_FORUM_REPLY', { topicId, replyId: reply.id });
  return reply;
}

export async function moderateTopic(userId: string, topicId: string, action: 'pin' | 'lock' | 'delete'): Promise<void> {
  console.log(`Moderator ${userId} performing ${action} on topic ${topicId}`);
  await logAuditAction(userId, 'MODERATE_FORUM_TOPIC', { topicId, action });
}
