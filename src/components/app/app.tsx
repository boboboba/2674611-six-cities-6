import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import NotFoundPage from '../../pages/not-found/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Offers} from '../../types/offer.ts';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const.ts';
import LoadingScreen from '../loading-screen/loading-screen.tsx';

type AppProps = {
  offers: Offers;
}

function App({offers}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen/>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/offer/:id" element={<OfferPage/>}/>
        <Route
          path="/favorites"
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
