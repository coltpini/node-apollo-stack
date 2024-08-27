import { usePlaylists } from "../../../data/Playlist/playlist";
import { Card } from "../../view/Card/Card";
import { List } from "../../view/List/List";

export const PlaylistList = () => {
  const { loading, error, data } = usePlaylists();
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error! {error.message}</p>;
  return (
    <>
      {data.Playlists.map((playlist) => {
        return (
          <List key={playlist.id} title={playlist.title}>
            {playlist.audio.map((audio) => (
              <Card
                key={audio.id}
                title={audio.title}
                length={audio.length}
                rating={audio.rating}
                info={audio.info}
              ></Card>
            ))}
          </List>
        );
      })}
    </>
  );
};
