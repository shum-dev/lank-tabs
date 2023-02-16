import { ReactNode } from "react";
import styles from "./index.module.scss";

type Props = {
  color?: "primary" | "secondary";
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = ({
  className = "",
  children,
  color = "primary",
  icon: Icon,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`${styles.button} ${className} ${
        color === "secondary" ? styles.colorSecondary : styles.colorPrimary
      }`}
    >
      {Boolean(Icon) && Icon}
      {children}
    </button>
  );
};
