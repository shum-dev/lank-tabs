import { TryApiTabs } from "./components/TryApiTabs";

import styles from "./App.module.scss";

function App() {
  return (
    <section className={styles.app}>
      <h1 className={styles.heading}>Try the API</h1>
      <TryApiTabs />
    </section>
  );
}

export default App;
