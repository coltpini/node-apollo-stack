import { PropsWithChildren } from "react";
import classes from "./List.module.css";

type ListProps = {
  title: "Title";
};

export const List = ({ children, title }: PropsWithChildren<ListProps>) => {
  return (
    <section className={classes.List}>
      <h2>{title}</h2>
      <ul>
        {children?.map((child) => (
          <li key={child.textContent}>{child}</li>
        ))}
      </ul>
    </section>
  );
};
