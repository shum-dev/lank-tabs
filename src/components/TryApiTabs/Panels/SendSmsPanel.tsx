import { ChangeEvent } from "react";

import { Input } from "src/ui/FormControls";

import styles from "./index.module.scss";

type Props = {
  phone: string;
  text: string;
  handleStateChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const SendSmsPanel = ({ phone, text, handleStateChange }: Props) => {
  return (
    <>
      <Input
        type="text"
        name="phone"
        value={phone}
        onChange={handleStateChange}
        placeholder="Phone number (E.164)"
        maxLength={18}
        className={styles.inputPhone}
      />

      <Input
        type="text"
        name="text"
        value={text}
        onChange={handleStateChange}
        placeholder="Text message"
      />
    </>
  );
};
