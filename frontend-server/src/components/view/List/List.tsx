import classes from "./List.module.css";

type ListProps = {
  title: string;
  children?: React.ReactNode[];
};

export const List = ({ children, title }: ListProps) => {
  return (
    <section className={classes.List}>
      <h2>{title}</h2>
      <ol>
        {children?.map((child: any) => (
          <li key={child.textContent || child}>{child}</li>
        ))}
      </ol>
    </section>
  );
};
