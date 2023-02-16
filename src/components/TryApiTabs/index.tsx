import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";

import {
  NumberInsightPanel,
  Pin2SpeechPanel,
  SendSmsPanel,
} from "src/components/TryApiTabs/Panels";

import { useTabs } from "src/ui/Tabs";
import { Button } from "src/ui/Button";
import { CopyIcon } from "src/ui/icons";

import { delay } from "src/utils/delay";

import styles from "./index.module.scss";

type Tabs = "Number Insight" | "PIN 2 Speech" | "Send an SMS";
type FormField = "phone" | "pincode" | "language" | "text";

const TABS_LIST: Tabs[] = ["Number Insight", "PIN 2 Speech", "Send an SMS"];

const URL_MAP: Record<Tabs, string> = {
  "Number Insight": "insight/hlr",
  "PIN 2 Speech": "calls/p2s",
  "Send an SMS": "sms",
};

type Props = {
  user: string;
  phone: string;
  pincode: string;
  language: string;
  text: string;
};

export const TryApiTabs = ({ user, phone, pincode, language, text }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentSchema, setCurrentSchema] = useState<FormField[]>([]);

  const [state, setState] = useState({
    user,
    phone,
    pincode,
    language,
    text,
  });

  const { TabNavItem, TabPanel, activeTab } = useTabs<Tabs>("Number Insight");

  useEffect(() => {
    if (formRef.current) {
      const formElements = formRef.current.elements;

      const inputElements = [...formElements].filter(
        (element) => element.tagName !== "BUTTON"
      ) as HTMLInputElement[];

      const mappedElements = inputElements.map((element) => {
        return element.name;
      }) as FormField[];

      setCurrentSchema(mappedElements);
    }
  }, [formRef.current, activeTab]);

  useEffect(() => {
    setError("");
  }, [activeTab]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const data = new FormData(e.target as HTMLFormElement);
    await delay();
    setIsLoading(false);
    setError(
      `Error: This feature is not implemented yet.\nData to send: \n ${JSON.stringify(
        Object.fromEntries(data),
        null,
        2
      )}`
    );
  };

  const handleStateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isText = e.target.name === "text";
    setState({
      ...state,
      [e.target.name]: isText ? `"${e.target.value}"` : e.target.value,
    });
  };

  const handleCopy = () => {
    const curlCommand = `curl -XPOST https://api.boomware.com/v1/${
      URL_MAP[activeTab]
    } \\\n  -u ${state.user} \\\n${currentSchema
      .map(
        (name, index, { length }) =>
          `  -d ${name}=${state[name]} ${index === length - 1 ? "" : "\\\n"}`
      )
      .join("")}`;

    navigator.clipboard.writeText(curlCommand).then(
      () => {
        alert(`copied to clipboard: \n ${curlCommand}`);
      },
      () => {
        alert("copy failed");
      }
    );
  };

  return (
    <div className={styles.container}>
      <ul className={styles.tabsNav}>
        {TABS_LIST.map((tabName) => (
          <li key={tabName}>
            <TabNavItem title={tabName} />
          </li>
        ))}
      </ul>

      <div className={styles.tabsContent}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <TabPanel id="Number Insight">
            <NumberInsightPanel
              phone={state.phone}
              handleStateChange={handleStateChange}
            />
          </TabPanel>

          <TabPanel id="PIN 2 Speech">
            <Pin2SpeechPanel
              language={state.language}
              phone={state.phone}
              pincode={state.pincode}
              handleStateChange={handleStateChange}
            />
          </TabPanel>

          <TabPanel id="Send an SMS">
            <SendSmsPanel
              phone={state.phone}
              text={state.text.slice(1, -1)}
              handleStateChange={handleStateChange}
            />
          </TabPanel>

          <Button>{isLoading ? "Requesting..." : "Request"}</Button>
        </form>
      </div>

      <div className={styles.clipboardBlock}>
        <pre className={styles.codeBlock}>
          curl -XPOST{" "}
          <span className={styles.black}>
            https://api.boomware.com/v1/{URL_MAP[activeTab]}
          </span>{" "}
          \ <br />
          -u <span className={styles.mask}>{state.user}</span> \ <br />
          {currentSchema.map((name, index, { length }) => (
            <div key={name}>
              -d <span className={styles.black}>{`${name}=`}</span>
              <span className={styles.blue}>{state[name]}</span>{" "}
              {index === length - 1 ? null : "\\"}
            </div>
          ))}
        </pre>

        <Button
          onClick={handleCopy}
          color="secondary"
          icon={<CopyIcon width={15} />}
        >
          Copy
        </Button>
      </div>

      {Boolean(error) && <pre className={styles.errorBlock}>{error}</pre>}
    </div>
  );
};

TryApiTabs.defaultProps = {
  user: "opkm762seqc2cac75c46sdr40d532dfh:xxxxxxxx",
  phone: "+79256607711",
  pincode: "0000",
  language: "en",
  text: "",
};
