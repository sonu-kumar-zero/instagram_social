export const searchUserByUser = `
  query getTodoByUser($userName: String!){
    getUserByuserName(userName: $userName) {
      userName,
      followerCount,
      followingCount,
      imageUrl,
      id,
      postsCount,
      profileType
      bio,
      name
    }
  }
  `;

export const getAllFollowersOfUserByUserId = `
  query GetAllFollowersByUserId($getAllFollowersByUserIdId: ID!) {
    getAllFollowersByUserId(id: $getAllFollowersByUserIdId) {
      id
      followerId
      followingId
      isAccepted
      user {
        imageUrl
        name
        userName
      }
    }
  }
  `;

export const getAllFollowingOfUserByUserId = `
  query GetAllFollowingByUsetId($getAllFollowingByUsetIdId: ID!) {
    getAllFollowingByUsetId(id: $getAllFollowingByUsetIdId) {
      followerId
      followingId
      id
      user {
        name
        userName
        imageUrl
      }
    }
  }
`;
