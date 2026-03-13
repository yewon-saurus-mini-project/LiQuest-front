export const mockArticleData = {
  post_id: 1,
  user_id: 1,
  username: "테스트사용자",
  title: "테스트 게시글입니다.",
  content: "안녕하세요.",
  created_at: "2024-01-12T11:50:22.987483+09:00",
  comments: [
    {
      comment_id: 1,
      user_id: 2,
      username: "test123",
      profile_image: "https://i.pravatar.cc/150",
      reply: 8,
      created_at: "2024-01-12T13:09:00.308330+09:00",
      comment: "첫 번째 댓글입니다.",
    },
    {
      comment_id: 2,
      user_id: 3,
      username: "test456",
      profile_image: "https://i.pravatar.cc/150",
      reply: 8,
      created_at: "2024-01-12T13:38:05.011881+09:00",
      comment: "두 번째 댓글입니다.",
    },
  ],
  image: null,
};
