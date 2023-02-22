import React from 'react';
import { Dropdown, Button } from 'antd';
import { usePrefersColor } from 'dumi';
import { createFromIconfontCN } from '@ant-design/icons';

const themes = [
  {
    key: 'light',
    label: 'Light',
    icon: 'icon-Daytimemode',
  },
  {
    key: 'dark',
    label: 'Dark',
    icon: 'icon-nightmode',
  },
  {
    key: 'auto',
    label: 'System',
    icon: 'icon-computer',
  },
];

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/a/font_3889511_s7v69kz4pz.js',
});

const ThemeSwitch: React.FC = () => {
  const [theme, preferTheme, changeTheme] = usePrefersColor();

  const { icon } = themes.find(i => i.key === preferTheme) || {};

  const getIconName = (name: string) => {
    return name + `${theme === 'dark' ? '-dark' : ''}`;
  };

  return (
    <Dropdown
      menu={{
        items: themes.map(i => ({
          label: i.label,
          key: i.key,
          icon: (
            <IconFont type={getIconName(i.icon)} style={{ fontSize: 20 }} />
          ),
          onClick: () => changeTheme(i.key as 'light' | 'dark' | 'auto'),
        })),
      }}
    >
      <Button
        type="text"
        icon={
          icon && <IconFont type={getIconName(icon)} style={{ fontSize: 22 }} />
        }
      />
    </Dropdown>
  );
};

export default ThemeSwitch;
