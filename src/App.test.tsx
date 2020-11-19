import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table component', () => {
  render(<App />);
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});
