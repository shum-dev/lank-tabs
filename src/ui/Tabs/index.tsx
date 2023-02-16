import { useState, ReactNode, useCallback } from "react";

import styles from "./index.module.scss";

type TabNavItemProps<T> = {
  title: T;
  className?: string;
};

type TabPanelProps<T> = {
  id: T;
  children: ReactNode;
  className?: string;
};

export function useTabs<T extends string>(initialState: T) {
  const [activeTab, setActiveTab] = useState<T>(initialState);

  const TabNavItem = useCallback(
    ({ title, className = "" }: TabNavItemProps<T>) => {
      const handleClick = () => {
        setActiveTab(title);
      };

      return (
        <button
          onClick={handleClick}
          className={`${styles.tabNavItem} ${className} ${
            activeTab === title ? "active" : ""
          }`}
        >
          {title}
        </button>
      );
    },
    [activeTab]
  );

  const TabPanel = useCallback(
    ({ id, children }: TabPanelProps<T>) => {
      const isActive = id === activeTab;
      return isActive ? <>{children}</> : null;
    },
    [activeTab]
  );

  return {
    activeTab,
    TabPanel,
    TabNavItem,
  };
}
