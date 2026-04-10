import { createTopic, addReply, moderateTopic } from '../../src/backend/forum';

describe('Community Forum Module', () => {
  const userId = 'uid123';
  const categoryId = 'cat1';

  it('should create a new topic', async () => {
    const topic = await createTopic(userId, categoryId, 'Inverter recommendations?', 'Looking for a good 2000W inverter.', ['electrical', 'inverter']);
    expect(topic.title).toBe('Inverter recommendations?');
    expect(topic.tags).toContain('electrical');
  });

  it('should add a reply to a topic', async () => {
    const topicId = 'tid123';
    const reply = await addReply(userId, topicId, 'I use the Victron Phoenix, it is great!');
    expect(reply.topicId).toBe(topicId);
    expect(reply.content).toContain('Victron');
  });

  it('should allow moderation actions', async () => {
    await expect(moderateTopic(userId, 'tid123', 'pin')).resolves.not.toThrow();
  });
});
