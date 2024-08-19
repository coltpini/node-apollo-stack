import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { audio, playlist } from './data.js';
import DataLoader from 'dataloader';

const typeDefs = `#graphql

  type Audio {
    id: ID
    title: String
  }

  type Query {
    Audio: [Audio]
    AudioById(id: ID!): Audio
  }
`;

const resolvers = {
  Query: {
    Audio: () => audio,
    AudioById: (_, {id}) => audio.find(item => item.id === id ),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);