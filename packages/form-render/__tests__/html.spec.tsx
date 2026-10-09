import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import FormRender, { useForm } from '../src/index';
import Html from '../src/widgets/fields/html';

const options = [
  { label: 'Wood', value: 'wood' },
  {
    label: 'Plastic',
    options: [{ label: 'Polyethylene', value: 'pe' }],
  },
  {
    label: 'Metal',
    options: [{ label: 'Aluminium', value: 1 }],
  },
];

const matchMediaDescriptor = Object.getOwnPropertyDescriptor(
  window,
  'matchMedia'
);

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

afterEach(cleanup);
afterAll(() => {
  if (matchMediaDescriptor) {
    Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
  } else {
    Reflect.deleteProperty(window, 'matchMedia');
  }
});

describe('Html option labels', () => {
  it.each([
    ['flat selection', ['wood'], 'Wood'],
    ['grouped selection', ['pe'], 'Polyethylene'],
    [
      'mixed options in value order',
      [1, 'wood', 'pe'],
      'Aluminium,Wood,Polyethylene',
    ],
    ['missing selection', ['missing'], '-'],
    [
      'known and missing selections',
      ['pe', 'missing', 'wood'],
      'Polyethylene,Wood',
    ],
    ['empty selection', [], '-'],
    ['flat scalar', 'wood', 'Wood'],
    ['grouped string scalar', 'pe', 'Polyethylene'],
    ['grouped number scalar', 1, 'Aluminium'],
    ['unknown scalar', 'missing', '-'],
    ['string does not match a numeric option', ['1'], '-'],
  ])('renders %s', (_name, value, expected) => {
    const { container } = render(<Html value={value} options={options} />);
    expect(container.textContent).toBe(expected);
  });

  it('keeps array rendering without options', () => {
    const { container } = render(<Html value={['pe', 'wood']} />);
    expect(container.textContent).toBe('["pe","wood"]');
  });
});

describe('FormRender readOnly select', () => {
  it('shows grouped labels when switching a populated select to readOnly', async () => {
    const Demo = () => {
      const form = useForm();
      const [readOnly, setReadOnly] = useState(false);
      const schema = {
        type: 'object',
        properties: {
          material: {
            title: 'Material',
            type: 'array',
            widget: 'select',
            default: ['pe', 'wood'],
            readOnly,
            props: {
              mode: 'tags',
              options: [
                { label: 'Wood', value: 'wood' },
                {
                  label: 'Plastic',
                  options: [{ label: 'Polyethylene', value: 'pe' }],
                },
              ],
            },
          },
        },
      };

      return (
        <>
          <FormRender form={form} schema={schema} />
          <button onClick={() => setReadOnly(!readOnly)}>
            Toggle readOnly
          </button>
        </>
      );
    };

    const { getByRole, getByText, queryByRole } = render(<Demo />);
    expect(getByRole('combobox')).toBeInTheDocument();
    expect(getByText('Polyethylene')).toBeInTheDocument();
    expect(getByText('Wood')).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'Toggle readOnly' }));

    await waitFor(() => {
      expect(queryByRole('combobox')).not.toBeInTheDocument();
      expect(getByText('Polyethylene,Wood')).toBeInTheDocument();
    });

    fireEvent.click(getByRole('button', { name: 'Toggle readOnly' }));

    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
      expect(getByText('Polyethylene')).toBeInTheDocument();
      expect(getByText('Wood')).toBeInTheDocument();
    });
  });
});
