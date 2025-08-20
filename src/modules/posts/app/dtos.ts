export interface CreatePostDTO {
  title: string;
  url: string;
  authorId: string;
}

export interface UpvotePostDTO {
  postId: string;
  memberId: string;
}
