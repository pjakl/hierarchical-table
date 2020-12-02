import userEvent from '@testing-library/user-event';
import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from './App';
import data from './sample-data.json';

test('should render table when data are uploaded', async () => {

  render(<App />);
  const inputEl = screen.getByTestId('fileUpload');

  const file = new File([JSON.stringify(data)], 'example.json', {
    type: 'text/plain'
  })
  act(() => {
    userEvent.upload(inputEl, file);
  });

  expect(await screen.findByRole('table')).toBeInTheDocument();
  expect(await screen.findByText('Identification number')).toBeInTheDocument();
});
