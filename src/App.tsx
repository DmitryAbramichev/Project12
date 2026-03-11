import { AppShell } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

function App() {
  return (
    <AppShell header={{ height: 70 }}>
      <Header />
      <Main />
    </AppShell>
  );
}

export default App;