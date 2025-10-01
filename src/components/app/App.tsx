import MainPage from '../../pages/main/MainPage.tsx';

type AppProps = {
  offersCount: number;
}

function App({offersCount} : AppProps) : JSX.Element {
  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;
