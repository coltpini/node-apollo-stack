import classes from "./Card.module.css";

type CardProps = {
  title: "Title";
  details: {};
};

export const Card = ({ title, details }: CardProps) => (
  <section className={classes.Card}>
    <h2>{title}</h2>
    <ul>
      {Object.entries(details)?.map(([key, val]) => (
        <li key={key}>
          <em>{key}</em> : {val}
        </li>
      ))}
    </ul>
  </section>
);
