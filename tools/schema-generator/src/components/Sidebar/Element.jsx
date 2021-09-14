import React from 'react';
import { nanoid } from 'nanoid';
import { useDrag } from 'react-dnd';
import { addItem } from '../../utils';
import { useGlobal, useStore } from '../../utils/hooks';
import './Element.less';

const Element = ({ text, name, schema, icon, fixedName }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'box',
    item: {
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
      $id: fixedName ? `#/${name}` : `#/${name}_${nanoid(6)}`,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const setGlobal = useGlobal();
  const { selected, flatten, itemError, onFlattenChange } = useStore();

  const handleElementClick = async () => {
    if (itemError?.length) return;
    if (selected && !flatten[selected]) {
      setGlobal({ selected: '#' });
      return;
    }
    const { newId, newFlatten } = addItem({ selected, name, schema, flatten, fixedName });
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  return (
    <div ref={dragRef}>
      <WidgetUI text={text} icon={icon} onClick={handleElementClick} />
    </div>
  );
};

export default Element;

// 目前没有用icon，但是可以补上
const WidgetUI = ({ onClick, text, icon }) => {
  return (
    <li className="left-item" onClick={onClick}>
      {text}
    </li>
  );
};
