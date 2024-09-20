import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { User } from "./users.js";
import { Todo } from "./todos.js";

async function startServer() {
  const app = express();

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean
      userId: ID!
      user: User
    }

    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUserById(id: ID!): User
    }
    `,

    resolvers: {
      Todo: {
        user: async (todo) => User.find((e) => e.id === todo.userId),
      },
      Query: {
        getTodos: () => Todo,
        getAllUsers: () => User,
        getUserById: async (parent, { id }) => User.find((e) => e.id === id),
      },
    },
  });

  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server is listining of port 8000");
  });
}

startServer();
