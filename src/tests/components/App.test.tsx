import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { App } from '../../App';
import { mockSuccessfulFetch } from '../mocks/api-mocks';

// Mock audioUtils to prevent audio-related errors in tests
jest.mock('../../utils', () => ({
  audioUtils: {
    playGong: jest.fn(),
  },
}));

const renderAndWaitForApp = async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Microsoft Word Feature Gong/i, level: 1 })).toBeInTheDocument();
  });
};

describe('Main App Component', () => {
  beforeEach(() => {
    global.fetch = mockSuccessfulFetch();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing', async () => {
    await renderAndWaitForApp();
  });

  test('displays main heading', async () => {
    await renderAndWaitForApp();
    
    expect(screen.getByRole('heading', { name: /Microsoft Word Feature Gong/i, level: 1 })).toBeInTheDocument();
  });

  test('displays instructions for striking the gong', async () => {
    await renderAndWaitForApp();
    
    expect(screen.getByText(/Strike the gong to celebrate your latest feature release!/i)).toBeInTheDocument();
  });

  test('renders gong component', async () => {
    await renderAndWaitForApp();
    
    expect(screen.getByRole('button', { name: /Strike the celebration gong/i })).toBeInTheDocument();
  });

  test('displays hit count stats', async () => {
    await renderAndWaitForApp();
    
    expect(screen.getByText(/Feature Celebrations/i)).toBeInTheDocument();
  });
});
