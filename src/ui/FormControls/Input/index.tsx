import styles from "./index.module.scss";

type Props = React.ComponentPropsWithoutRef<"input">;

export const Input = ({ className = "", prefix, ...rest }: Props) => {
  return (
    <div className={styles.container}>
      {Boolean(prefix) && <div className={styles.prefix}>{prefix}</div>}
      <input {...rest} className={`${styles.input} ${className}`} />
    </div>
  );
};
