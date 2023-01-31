const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        userId: ID!
        fullName: String!
        email: String!
        dateJoined: String!
        isBlocked: Boolean!
        numFollowers: Int!
        numFollowing: Int!
        numPosts: Int!
        numReactions: Int!
    }
    type Disliker {
        userId: ID!
        fullName: String!
        dateTimeDisliked: String!
        isBlocked: Boolean!
    }
    type Post {
        postId: ID!
        userId: ID!
        postBody: String!
        imageUrl: String
        parentPostId: ID
        deleted: Boolean!
        dateTime: String!
        editDateTime: String
        isRoot: Boolean!
    }
    type InappropriatePost {
        postId: ID!
        userId: ID!
        postBody: String!
        imageUrl: String
        parentPostId: ID
        deleted: Boolean!
        dateTime: String!
        editDateTime: String
        isRoot: Boolean!
        likes: Int!
        dislikes: Int!
    }
    type DayUniqueUsers {
        date: String!
        uniqueUsers: Int!
    }
    type DayNewFollowers {
        date: String!
        newFollowers: Int!
    }
    type Reaction {
        like: Int
        dislike: Int
    }
    type DailyPostReacts {
        date: String!
        # reactions is an object with keys as reaction types and values as the number of reactions of that type
        reactions: Reaction!
    }
    type PostReactionCount {
        postId: ID!
        reactionCount: Int!
        userId: ID!
        postBody: String!
        deleted: Boolean!
        dateTime: String!
        fullName: String!
    }
    type UserVisitCount {
        userId: ID!
        fullName: String!
        visitCount: Int!
    }
    type DislikeCount {
        postId: ID!
        recentDislikeCount: Int!
    }
    type SummaryStats {
        totalUsers: Int!
        totalUsersPercentageChange: Float!
        totalPageViews: Int!
        totalPageViewsPercentageChange: Float!
        totalEngagement: Int!
        totalEngagementPercentageChange: Float!
    }
    type Query {
        getUsers: [User!]!
        getPosts: [Post!]!
        getInappropriatePosts: [InappropriatePost!]!
        getHarrassedPosts: [InappropriatePost!]! # same as getInappropriatePosts
        getDayUniqueUsers(
            startDate: String!
            endDate: String!
        ): [DayUniqueUsers!]! # get number of unique users logging in per day
        getDailyPostReacts(
            startDate: String!
            endDate: String!
        ): [DailyPostReacts!]! # get number of reacts per day
        getTotalReactions: Reaction!
        getTopReactedPosts(
            reactionType: String!
            numberOfPosts: Int!
        ): [PostReactionCount!]! # get the top posts with the most reactions of the given types
        getMostVisitedUsers(numberOfUsers: Int!): [UserVisitCount!]! # get the most visited users
        getNewDailyFollowers(
            startDate: String!
            endDate: String!
            userId: ID!
        ): [DayNewFollowers!]! # get the number of new followers per day
        getSummaryStats: SummaryStats!
        getPostDislikers(postId: ID!): [Disliker!]! # get the users who disliked the given post
    }
    type Mutation {
        toggleDeletePost(postId: ID!): Post!
        toggleBlockUser(userId: ID!): User!
    }
    type Subscription {
        possibleHarassment: DislikeCount!
    }
`;

module.exports = typeDefs;
