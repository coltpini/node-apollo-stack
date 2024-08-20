import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { audio, playlist } from './data.js';
import DataLoader from 'dataloader';

const typeDefs = `#graphql
  type BookInfo {
    book: Int
    series: String
    author: String
    narrator: String
  }

  type SongInfo {
    artist: String
    album: String
    song: Int
    composer: String
    bpm: Int
  }

  union Info = BookInfo | SongInfo

  type Audio {
    id: ID
    type: String
    title: String
    rating: Float
    length: Float
    art: String
    info: Info
    tags: [String]
  }

  type Playlist {
    id: ID
    title: String
    rating: Float
    audio: [Audio]
  }

  type Query {
    Audio: [Audio]
    Songs: [Audio]
    Books: [Audio]
    AudioByTitle(title: String!): Audio
    AudioById(id: ID!): Audio
    Playlists: [Playlist]
    PlaylistById(id: ID!): Playlist
  }

  input UpdateRatingInput {
    type: String!
    id: ID!
    rating: Float!
  }

  union Ratable = Playlist | Audio

  type UpdateRatingResponse {
    ratable: Ratable
  }

  type Mutation {
    UpdateRating(updateRatingInput: UpdateRatingInput!): UpdateRatingResponse
  }

`;

const findByAttr = (arr) => (attr) => (val) => arr.find(item => item[attr] === val);
const findById = (val, arr) => findByAttr(arr)('id')(val);

const resolvers = {
  Info: {
    __resolveType(obj){
      if(obj.book) return 'BookInfo';
      if(obj.artist) return 'SongInfo';
      return null;
    },
  },
  Ratable: {
    __resolveType(obj){
      if(obj.audio) return 'Playlist';
      if(obj.length) return 'Audio';
      return null;
    },
  },
  Playlist: {
    audio: async (parent) => {
      const audioLoader = await new DataLoader(async keys => {
        const audios = keys[0] as Array<string>;
        return [ await audios.map(id => findById(id, audio))];
      })
      return audioLoader.load(parent.audio);
    }
  },
  Query: {
    Audio: () => audio,
    Songs: () => audio.filter(item => item.type === "music"),
    Books: () => audio.filter(item => item.type === "audiobook"),
    AudioByTitle: (_, {title}) => findByAttr(audio)('title')(title),
    AudioById: (_, {id}) => findById(audio, id),
    Playlists: () => playlist,
    PlaylistById: (_, {id}) => findById(playlist, id),
  },
  Mutation: {
    UpdateRating: (_, {updateRatingInput}) => {
      const {type, id, rating} = updateRatingInput;
      const data = type === "playlist" ? playlist : audio;
      const item = findById(id, data);
      item.rating = rating;
      return {ratable: item};
    }
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