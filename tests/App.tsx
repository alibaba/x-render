import React from 'react';

export default ({ list }) => {
  return (
    <ul>
      {list.map(
        item =>
          item > 5 && (
            <li className="item" key={item}>
              {item}
            </li>
          )
      )}
    </ul>
  );
};
