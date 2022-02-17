import React from 'react';
import { defaultSettings } from '../../settings';
import { useStore } from '../../utils/hooks';
import Element from './Element';
import './index.less';

const Sidebar = props => {
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
              <p className="f6 b">{item.title}</p>
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
                  <div>There is an error in the configuration</div>
                )}
              </ul>
            </div>
          );
        })
      ) : (
        <div>Configuration error: Setting is not an array</div>
      )}
    </div>
  );
};

export default Sidebar;
