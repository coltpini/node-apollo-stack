import { PropsWithChildren } from "react";
import "./Card.css";

type CardProps = {
  title: "Title";
};

export const Card = ({ children, title }: PropsWithChildren<CardProps>) => {
  return (
    <>
      <h2>{title}</h2>

      <ul>{children}</ul>
    </>
  );
};
