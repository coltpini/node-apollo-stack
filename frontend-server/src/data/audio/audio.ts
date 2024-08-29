import { useQuery, gql } from '@apollo/client';

const GET_AUDIOS = gql`
  query getAudio {
    Audio {
      id
      title
      length
      rating
      info {
        ... on BookInfo {
          author
          series
        }
        ... on SongInfo {
          artist
          album
        }
      }
    }
  }
`;
export const useAudios = (query=GET_AUDIOS) => useQuery(query);



const GET_AUDIO = gql`
  query getAudioById($audioById: ID!) {
    AudioById(id: $audioById) {
      id
      title
      length
      rating
      info {
        ... on BookInfo {
          author
          series
        }
        ... on SongInfo {
          album
          artist
        }
      }
    }
  }
`;

export const useAudio = (id: string, query=GET_AUDIO) => useQuery(query, {
  variables:{
    audioById: id
  }
});