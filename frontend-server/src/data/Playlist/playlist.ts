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

export const usePlaylists = () => useQuery(GET_PLAYLISTS);



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
  }
}
`;
export const usePlaylist = (id: string) => useQuery(GET_PLAYLIST, {
  variables:{
    playlistById: id
  }
});