import { useQuery, gql } from '@apollo/client';

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    Playlists {
      id
      rating
      title
      audio {
        id
        title
        length
        rating
          info {
            ... on BookInfo {
              series
              author
            }
            ... on SongInfo {
              artist
              album
            }
          }
      }
    }
  }
`;
export const usePlaylists = (query=GET_PLAYLISTS) => useQuery(query);



const GET_PLAYLIST = gql`
  query GetPlaylist($playlistById: ID!) {
    PlaylistById(id: $playlistById) {
      audio {
      info {
        ... on SongInfo {
          album
          artist
        }
        ... on BookInfo {
          author
          series
          book
        }
      }
    }
    title
    id
  }
}
`;
export const usePlaylist = (id: string, query=GET_PLAYLIST) => useQuery(query, {
  variables:{
    playlistById: id
  }
});