import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OfferCard } from './offer-card';
import { Offer } from '../../types/offer';
import {Provider} from 'react-redux';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  isFavorite: true,
  isPremium: true,
  rating: 4.8,
  previewImage: 'img/apartment-01.jpg',
};
const mockStore = configureMockStore();

describe('Component: OfferCard', () => {
  const store = mockStore({
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: null
    },
    [NameSpace.Offers]: {
      offers: [],
      currentOffer: null,
      nearbyOffers: [],
      isLoading: false,
      favoriteOffers: []
    }
  });
  it('should render correctly for cities card type', () => {
    render(
      <Provider store={store}>

        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful & luxurious apartment at great location')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should render correctly for near-places card type', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="near-places" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful & luxurious apartment at great location')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render correctly for favorites card type', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="favorites" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful & luxurious apartment at great location')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should show premium mark when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={premiumOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not show premium mark when offer is not premium', () => {
    const nonPremiumOffer = { ...mockOffer, isPremium: false };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={nonPremiumOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should show active bookmark button when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={favoriteOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should not show active bookmark button when offer is not favorite', () => {
    const nonFavoriteOffer = { ...mockOffer, isFavorite: false };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={nonFavoriteOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render correct image dimensions for favorites card type', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="favorites" />
        </BrowserRouter>
      </Provider>
    );

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });

  it('should render correct image dimensions for cities card type', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should have correct link to offer page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    const link = screen.getByRole('link', { name: /Beautiful & luxurious apartment at great location/i });
    expect(link).toHaveAttribute('href', '/offer/1');
  });

  it('should apply correct CSS classes for different card types', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard offer={mockOffer} cardType="cities" />
        </BrowserRouter>
      </Provider>
    );

    const article = container.querySelector('article');
    expect(article).toHaveClass('cities__card');
  });
});
