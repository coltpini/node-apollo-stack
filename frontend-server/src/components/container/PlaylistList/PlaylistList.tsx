import { getPlaylists } from "../../../data/Playlist/playlist";
import { Card } from "../../view/Card/Card";
import { List } from "../../view/List/List";

export const PlaylistList = () => {
  const { loading, error, data } = getPlaylists();
  console.log(loading, error, data);
  return (
    <>
      {data.data.Playlists.map((playlist) => {
        console.log(playlist);
        return <></>;
        return (
          <List title={playlist.title}>
            {playlist.audio.map((audio) => (
              <Card title={audio.title}></Card>
            ))}
          </List>
        );
      })}
    </>
  );
};
