import React from 'react';
import { useGlobal, useStore } from '../hooks';
import { addItem } from '../utils';
import nanoid from 'nanoid';
import { useDrag } from 'react-dnd';
import './Element.css';

const Element = ({ text, name, schema, icon }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'box',
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
      $id: `#/${name}_${nanoid(6)}`,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const setGlobal = useGlobal();
  const { selected, flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    const { newId, newFlatten } = addItem({ selected, name, schema, flatten });
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
