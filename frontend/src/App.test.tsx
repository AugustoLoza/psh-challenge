import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/index', () => () => <div>Player Stats Page</div>);

describe('App Component', () => {
  test('renders the App component', () => {
    render(
     
        <App />
   
    );

    expect(screen.getByText('Player Stats Page')).toBeInTheDocument();
  });
});
