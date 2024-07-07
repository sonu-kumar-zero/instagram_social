enum ProfileType {
  PUBLIC,
  PRIVATE
}

export interface UserType {
  id: string;
  userName: string;
  bio: string | null;
  email: string;
  followerCount: number;
  followingCount: number;
  imageUrl: string | null;
  name: string | null;
  postsCount: number;
  profileType: string;
  userDefaultSavedId: string;
}

export interface PostUrl {
  id: string;
  postId: string;
  url: string;
  index: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostType {
  id: string;
  userId: string;
  description: string;
  likesCount: number;
  commentCount: number;
  viewsCount: number;
  postUrlCount: number;
  typeOfPost: string;
  isCommentEnable: boolean;
  isLikeVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  postUrls: PostUrl[];
  user: UserType;
}

export interface CommentType {
  id: string;
  postId: string;
  userId: string;
  commentText?: string | null;
  commentCount: number;
  likesCount: number;
  commentType: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  parentCommentId: string | null;
}

export interface FollowingUserType {
  id: string;
  followerId: string;
  followingId: string;
  following: {
    imageUrl: string | null;
    name: string | null;
    userName: string;
  };
}

export interface FollowerUserType {
  id: string;
  followerId: string;
  followingId: string;
  isAccepted: boolean;
  follower: {
    imageUrl: string | null;
    name: string | null;
    userName: string;
  };
}

export interface ReelType {
  id: string;
  postId: string;
  url: string;
  index: number;
  type: string;
  likesCount: number;
  viewsCount: number;
  reelLength: number;
  reelAvgWatch: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  post: ReelPostType;
}

export interface ReelPostType {
  id: string;
  userId: string;
  description: string;
  likesCount: number;
  commentCount: number;
  viewsCount: number;
  postUrlCount: number;
  typeOfPost: string;
  isCommentEnable: boolean;
  isLikeVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: ReelUser;
}

interface ReelUser {
  id: string;
  userName: string;
  name: string | null;
  email: string;
  password: string;
  imageUrl: string | null;
  bio: string | null;
  followerCount: number;
  followingCount: number;
  postsCount: number;
  profileType: string;
  createdAt: Date;
  updatedAt: Date;
  userDefaultSavedId: string;
}

export interface SavedPostsFamilyType {
  id: string;
  givenName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  posts: SavedPostsFamilyChildType[];
}

interface SavedPostsFamilyChildType {
  id: string;
  userSavedId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  post: SavedPostsFamilyChildPostType;
}

export interface SavedPostsFamilyChildPostType {
  id: string;
  userId: string;
  description: string;
  likesCount: number;
  commentCount: number;
  viewsCount: number;
  postUrlCount: number;
  typeOfPost: string;
  isCommentEnable: boolean;
  isLikeVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  postUrls: PostURL[];
}

interface PostURL {
  id: string;
  postId: string;
  url: string;
  index: number;
  type: string;
  reelLikeCount: number;
  reelViewCount: number;
  reelLength: number;
  reelAvgWatch: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReelCommentType {
  id: string;
  reelId: string;
  userId: string;
  commentText: string;
  commentCount: number;
  likesCount: number;
  commentType: string;
  createdAt: Date;
  updatedAt: Date;
  parentReelCommentId: null;
  user: ReelUser;
}
