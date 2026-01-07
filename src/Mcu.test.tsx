import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Mcu } from './Mcu.js';

describe('Mcu', () => {
  it('should render hello world div', () => {
    const { getByText } = render(<Mcu />);
    const divElement = getByText('Hello World');
    expect(divElement).toBeTruthy();
  });
});
