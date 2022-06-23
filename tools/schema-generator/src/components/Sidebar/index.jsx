import React from 'react';
import { useTranslation } from 'react-i18next';
import { defaultSettings } from '../../settings';
import { useStore } from '../../utils/hooks';
import Element from './Element';
import './index.less';

const Sidebar = props => {
  const { t } = useTranslation();
  const { userProps = {} } = useStore();
  const { settings } = userProps;
  const _settings = Array.isArray(settings) ? settings : defaultSettings;

  return (
    <div className="left-layout w5-l w4">
      {Array.isArray(_settings) ? (
        _settings.map((item, idx) => {
          if (item && item.show === false) {
            return null;
          }
          return (
            <div key={idx}>
              <p className="f6 b">{t(item.title, {ns: 'components'})}</p>
              <ul className="pl0">
                {Array.isArray(item.widgets) ? (
                  item.widgets
                    .filter(item => item.show !== false)
                    .map((widget, idx) => {
                      return (
                        <Element key={idx.toString()} {...props} {...widget} />
                      );
                    })
                ) : (
                  <div>{t('此处配置有误')}</div>
                )}
              </ul>
            </div>
          );
        })
      ) : (
        <div>{t('配置错误：Setting不是数组')}</div>
      )}
    </div>
  );
};

export default Sidebar;
