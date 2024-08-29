import { usePlaylists } from "../../../data/Playlist/playlist";
import { minToHrsAndMins } from "../../../utils/conversion";
import { Card } from "../../view/Card/Card";
import { List } from "../../view/List/List";

const hrsAndMinToString = ({ min, hr }: { min: number; hr: number }) =>
  `${hr || 0}:${min || 0}`;

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
                details={{
                  length: hrsAndMinToString(minToHrsAndMins(audio.length)),
                  rating: audio.rating,
                  info: audio.info.album || audio.info.series,
                }}
              ></Card>
            ))}
          </List>
        );
      })}
    </>
  );
};
