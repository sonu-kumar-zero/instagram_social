"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  userName: string;
  bio: string | null;
  email: string;
  followerCount: number;
  followingCount: number;
  imageUrl: string | null;
  name: string | null;
  postsCount: number;
}

interface UserState {
  user: User;
  token: string | null;
}

const initialState: UserState = {
  user: {
    id: "",
    userName: "",
    bio: null,
    email: "",
    followerCount: 0,
    followingCount: 0,
    imageUrl: null,
    name: null,
    postsCount: 0
  },
  token: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User & { token: string | null }>) => {
      state.user = {
        id: action.payload.id,
        userName: action.payload.userName,
        bio: action.payload.bio,
        email: action.payload.email,
        followerCount: action.payload.followerCount,
        followingCount: action.payload.followingCount,
        imageUrl: action.payload.imageUrl,
        name: action.payload.name,
        postsCount: action.payload.postsCount
      };
      state.token = action.payload.token;
    }
  }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
