import { ChangeEvent } from "react";

import { Input, Select } from "src/ui/FormControls";

import styles from "./index.module.scss";

type Props = {
  phone: string;
  pincode: string;
  language: string;
  handleStateChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const Pin2SpeechPanel = ({
  phone,
  pincode,
  language,
  handleStateChange,
}: Props) => {
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
        id="pincode"
        type="text"
        name="pincode"
        maxLength={6}
        value={pincode}
        onChange={handleStateChange}
        prefix="PIN code"
        className={styles.inputPincode}
      />

      <Select name="language" value={language} onChange={handleStateChange}>
        <option value="de">de</option>
        <option value="en">en</option>
        <option value="es">es</option>
      </Select>
    </>
  );
};
