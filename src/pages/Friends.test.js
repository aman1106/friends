import { render, screen, cleanup } from '@testing-library/react';
import Friends from './Friends';


afterEach(() => {
  cleanup()
});

test('friends should have 0 or more element', () => {
  render(<Friends />);
  const cardElement = screen.queryByTestId('friend-card');
  expect(cardElement >= 0).toBeTruthy();
});

test('page numbers should be 0 or more', () => {
  render(<Friends />);
  const pageContainerElement = screen.getByTestId('page-numbers');
  const pageElement = screen.queryByTestId('pages');
  expect(pageContainerElement).toBeInTheDocument();
  expect(pageElement >= 0).toBeTruthy();
});

test('input element is required', () => {
  render(<Friends />);
  const element = screen.getByPlaceholderText("Enter your friend's name");
  expect(element).toHaveClass('required');
});
