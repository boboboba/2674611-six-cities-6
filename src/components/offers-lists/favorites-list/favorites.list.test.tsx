import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { Offer } from '../../../types/offer';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';

const mockGroupedOffers: Record<string, Offer[]> = {
  'Paris': [
    {
      id: '1',
      title: 'Paris Offer 1',
      type: 'apartment',
      price: 100,
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      rating: 4.5,
      previewImage: 'img1.jpg'
    },
    {
      id: '2',
      title: 'Paris Offer 2',
      type: 'house',
      price: 200,
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 4.0,
      previewImage: 'img2.jpg'
    }
  ],
  'Cologne': [
    {
      id: '3',
      title: 'Cologne Offer',
      type: 'room',
      price: 80,
      city: { name: 'Cologne', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 3.5,
      previewImage: 'img3.jpg'
    }
  ]
};
const mockStore = configureMockStore();
describe('Component: FavoritesList', () => {
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
  it('should render grouped offers by city', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Cologne Offer')).toBeInTheDocument();
  });

  it('should render empty list when no grouped offers', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={{}} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.queryByText('Cologne')).not.toBeInTheDocument();
  });

  it('should render correct number of city sections', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    const citySections = screen.getAllByRole('listitem');
    expect(citySections).toHaveLength(2);
  });

  it('should render offers for each city', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    const parisOffers = screen.getAllByText(/Paris Offer/);
    expect(parisOffers).toHaveLength(2);

    const cologneOffers = screen.getAllByText(/Cologne Offer/);
    expect(cologneOffers).toHaveLength(1);
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    const list = container.querySelector('.favorites__list');
    expect(list).toBeInTheDocument();

    const cityItems = container.querySelectorAll('.favorites__locations-items');
    expect(cityItems).toHaveLength(2);

    const places = container.querySelectorAll('.favorites__places');
    expect(places).toHaveLength(2);
  });

  it('should pass correct cardType to OfferCard components', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    const offerCards = container.querySelectorAll('article');
    offerCards.forEach((card) => {
      expect(card).toHaveClass('favorites__card');
    });
  });

  it('should render city names as links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList groupedOffers={mockGroupedOffers} />
        </MemoryRouter>
      </Provider>
    );

    const cityLinks = screen.getAllByRole('link', { name: /Paris|Cologne/ });
    const filteredLinks = cityLinks.filter((link) =>
      link.className.includes('locations__item-link')
    );

    expect(filteredLinks).toHaveLength(2);

    filteredLinks.forEach((link) => {
      expect(link).toHaveClass('locations__item-link');
      expect(link).toHaveAttribute('href', '#');
    });
  });
});
