// @vitest-environment happy-dom
import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FormRender, { useForm } from '../src';
import locales from '../src/locales';

afterEach(cleanup);

function Demo({
  widget = 'cardList',
  labels = ['Remove alpha item', 'Remove beta item'],
  locale = 'zh-CN',
  icon = false,
  globalDeleteText,
  alphaProps = {},
  alphaSchema = {},
  onRemove,
}: {
  widget?: string;
  labels?: (string | undefined)[];
  locale?: 'zh-CN' | 'en-US';
  icon?: boolean;
  globalDeleteText?: string;
  alphaProps?: Record<string, any>;
  alphaSchema?: Record<string, any>;
  onRemove?: (...args: any[]) => void;
}) {
  const form = useForm();
  const list = (
    title: string,
    children: string | undefined,
    names: string[]
  ) => ({
    type: 'array',
    title,
    widget,
    default: names.map(name => ({ name })),
    props: {
      hideAdd: true,
      hideCopy: true,
      hideMove: true,
      ...(children === undefined ? {} : { deleteBtnProps: { children } }),
      delConfirmProps: {
        title: 'Remove this item?',
        okText: 'Confirm removal',
        cancelText: 'Keep item',
      },
    },
    items: {
      type: 'object',
      properties: { name: { title: 'Name', type: 'string' } },
    },
  });
  const alpha = list('Alpha', labels[0], ['Alpha one', 'Alpha two']);
  const beta = list('Beta', labels[1], ['Beta one']);

  return (
    <FormRender
      form={form}
      locale={locale}
      globalConfig={{ listOperate: { btnType: icon ? 'icon' : 'text' } }}
      configProvider={
        globalDeleteText
          ? ({
              locale: {
                FormRender: { ...locales[locale], delete: globalDeleteText },
              },
            } as any)
          : undefined
      }
      schema={{
        type: 'object',
        properties: {
          alpha: {
            ...alpha,
            ...alphaSchema,
            props: { ...alpha.props, ...alphaProps, onRemove },
          },
          beta,
        },
      }}
    />
  );
}

describe('list deletion labels', () => {
  it.each(['cardList', 'simpleList', 'tableList', 'drawerList', 'virtualList'])(
    '%s uses a different deletion label for each list in one form',
    async widget => {
      render(<Demo widget={widget} />);

      await waitFor(() =>
        expect(screen.getAllByText('Remove alpha item')).toHaveLength(2)
      );
      expect(screen.getAllByText('Remove beta item')).toHaveLength(1);
    }
  );

  it.each([
    ['zh-CN', /删\s*除/],
    ['en-US', 'Delete'],
  ] as const)(
    'uses the %s default for missing and empty labels',
    async (locale, label) => {
      render(<Demo locale={locale} labels={[undefined, '']} />);

      expect(await screen.findAllByText(label)).toHaveLength(3);
    }
  );

  it('uses global locale text as the fallback while retaining a per-list label', async () => {
    render(
      <Demo
        labels={['Remove alpha item', '']}
        globalDeleteText="Global remove"
      />
    );

    expect(await screen.findAllByText('Remove alpha item')).toHaveLength(2);
    expect(screen.getAllByText('Global remove')).toHaveLength(1);
  });

  it('still confirms deletion and gives onRemove the requested item and operation', async () => {
    const onRemove = vi.fn((operation: () => void, _context: any) =>
      operation()
    );
    render(<Demo onRemove={onRemove} />);
    const buttons = await screen.findAllByText('Remove alpha item');
    fireEvent.click(buttons[1].closest('button')!);
    fireEvent.click((await screen.findByText('Keep item')).closest('button')!);

    expect(onRemove).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue('Alpha two')).toBeInTheDocument();

    fireEvent.click(buttons[1].closest('button')!);
    fireEvent.click(
      (await screen.findByText('Confirm removal')).closest('button')!
    );

    await waitFor(() =>
      expect(screen.queryByDisplayValue('Alpha two')).not.toBeInTheDocument()
    );
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove.mock.calls[0][1]).toMatchObject({
      index: 1,
      data: { name: 'Alpha two' },
      schema: { title: 'Alpha' },
    });
    expect(screen.getByDisplayValue('Alpha one')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Beta one')).toBeInTheDocument();
  });

  it('keeps icon mode without showing custom text', async () => {
    const { container } = render(<Demo icon />);
    await screen.findByDisplayValue('Alpha one');

    expect(screen.queryByText('Remove alpha item')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove beta item')).not.toBeInTheDocument();
    expect(container.querySelectorAll('button .anticon-close')).toHaveLength(3);
  });

  it.each([
    { name: 'hideDelete', alphaProps: { hideDelete: true } },
    { name: 'readOnly', alphaSchema: { readOnly: true } },
    { name: 'min', alphaSchema: { min: 2 } },
  ])('retains the $name deletion restriction', async props => {
    render(<Demo {...props} />);
    await screen.findByText('Remove beta item');

    expect(screen.queryByText('Remove alpha item')).not.toBeInTheDocument();
  });

  it('keeps tab close icons without adding custom text', async () => {
    const { container } = render(<Demo widget="tabList" />);
    await screen.findByDisplayValue('Alpha one');

    expect(screen.queryByText('Remove alpha item')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove beta item')).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('.ant-tabs-tab-remove .anticon-close')
    ).toHaveLength(3);
  });
});
