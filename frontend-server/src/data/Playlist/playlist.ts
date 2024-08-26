import { useQuery, gql } from '@apollo/client';

const GET_PLAYLISTS = gql`
  query GetPlaylists {
    Playlists {
      id
      rating
      title
      audio {
        title
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

export const getPlaylists = () => useQuery(GET_PLAYLISTS);



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
export const getPlaylist = (id: string) => useQuery(GET_PLAYLIST, {
  variables:{
    playlistById: id
  }
});