"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// {
//   id: "abc-anc",
//   userName: "starksonu12",
//   bio: "I am sonu Stark",
//   email: "s@1.com",
//   followerCount: 1000,
//   followingCount: 10,
//   imageUrl: null,
//   name: "sonu kumar",
//   postsCount: 10
// }

export const UserStateContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loginUser,
        currentUser,
        setToken,
        setUser,
        setLoginUser,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => useContext(UserContext);
