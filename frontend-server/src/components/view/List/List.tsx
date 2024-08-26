import { PropsWithChildren } from "react";
import "./List.css";

type ListProps = {
  title: "Title";
};

export const List = ({ children, title }: PropsWithChildren<ListProps>) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </>
  );
};
