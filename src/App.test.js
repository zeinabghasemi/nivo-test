import { render, screen } from '@testing-library/react';
import App from './App';
import Button from '@mui/material/Button';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
