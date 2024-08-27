import classes from "./Card.module.css";

type CardProps = {
  title: "Title";
  length: 0;
  rating: 3;
  info: {
    album: "";
    series: "";
  };
};

export const Card = ({ title, rating, info }: CardProps) => (
  <section className={classes.Card}>
    <h2>{title}</h2>
    <ul>
      <li>{rating}</li>
      <li>{length}</li>
      <li>{info.album || info.series}</li>
    </ul>
  </section>
);
