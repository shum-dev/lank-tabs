import styles from "./index.module.scss";

type Props = React.ComponentPropsWithoutRef<"select">;

export const Select = ({ children, className = "", ...rest }: Props) => {
  return (
    <select {...rest} className={`${styles.select} ${className}`}>
      {children}
    </select>
  );
};
