import { ChangeEvent } from "react";

import { Input } from "src/ui/FormControls";

import styles from "./index.module.scss";

type Props = {
  phone: string;
  handleStateChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const NumberInsightPanel = ({ phone, handleStateChange }: Props) => {
  return (
    <Input
      type="text"
      name="phone"
      value={phone}
      onChange={handleStateChange}
      placeholder="Phone number (E.164)"
      maxLength={18}
      className={styles.inputPhone}
    />
  );
};
