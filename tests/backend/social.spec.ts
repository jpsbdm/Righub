import { createPost, addComment, toggleReaction, reportContent } from '../../src/backend/social';

describe('Community Social Module', () => {
  const userId = 'uid123';

  it('should create a new post', async () => {
    const content = 'Hello RigHub!';
    const post = await createPost(userId, content);
    expect(post.content).toBe(content);
    expect(post.userId).toBe(userId);
  });

  it('should add a comment to a post', async () => {
    const postId = 'pid123';
    const comment = await addComment(userId, postId, 'Great setup!');
    expect(comment.postId).toBe(postId);
    expect(comment.content).toBe('Great setup!');
  });

  it('should toggle a reaction', async () => {
    await expect(toggleReaction(userId, 'pid123', 'like')).resolves.not.toThrow();
  });

  it('should report content', async () => {
    await expect(reportContent(userId, 'post', 'pid123', 'Inappropriate')).resolves.not.toThrow();
  });
});
