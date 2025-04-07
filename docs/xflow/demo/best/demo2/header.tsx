import React ,{ FC } from 'react';
import './index.less';

const Header: FC<{ data: any }> = ({ data }) => {
  //  const container = (document.getElementById('xflow-container') as HTMLElement);
  return (
    <div>
      <div className="process-header-card">
        <img
          src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png"
          style={{ width: '22px' }}
        />
        <span style={{ fontSize: '23px', fontWeight: 600, marginLeft: '5px' }}>
          XFlow
        </span>
      </div>
    </div>
  );
};

export default Header;
