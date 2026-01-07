import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Mcu } from './Mcu.js';

describe('Mcu', () => {
  it('should render hello world div', () => {
    render(<Mcu />);
    const divElement = screen.getByText('Hello World');
    expect(divElement).toBeInTheDocument();
  });
});
