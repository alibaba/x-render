import React, { useRef, useState } from 'react';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { useGlobal, useStore } from '../../../utils/hooks';
import {
  copyItem,
  getKeyFromUniqueId,
  dropItem,
  isObject,
} from '../../../utils';
import './Wrapper.less';

export default function Wrapper({
  $id,
  item,
  inside = false,
  children,
  style,
}) {
  const [position, setPosition] = useState();
  const {
    flatten,
    onFlattenChange,
    selected,
    userProps,
    itemError,
  } = useStore();
  const { controlButtons, canDrag = true, canDelete = true, hideId } = userProps;
  const setGlobal = useGlobal();
  const { schema } = item;
  const { type } = schema;
  const boxRef = useRef(null);

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: 'box',
    item: { $id: inside ? 0 + $id : $id },
    canDrag: () => typeof canDrag === 'function' ? canDrag(schema) : canDrag,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'box',
    drop: async (item, monitor) => {
      // 如果 children 已经作为了 drop target，不处理
      const didDrop = monitor.didDrop();

      if (didDrop || itemError?.length) {
        return;
      }

      const [newFlatten, newId] = dropItem({
        dragId: item.$id, // 内部拖拽用dragId
        dragItem: item.dragItem, // 从左边栏过来的，用dragItem
        dropId: $id,
        position,
        flatten,
      });
      onFlattenChange(newFlatten);
      setGlobal({ selected: newId });
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        // Determine rectangle on screen
        const hoverBoundingRect =
          boxRef.current && boxRef.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        const dragOffset = monitor.getSourceClientOffset();
        // Get pixels to the top
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (inside) {
          setPosition('inside');
        } else {
          if (hoverClientY <= hoverMiddleY) {
            setPosition('up');
          }
          // Dragging upwards
          if (hoverClientY > hoverMiddleY) {
            setPosition('down');
          }
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  dragPreview(dropRef(boxRef));

  const handleClick = async e => {
    e.stopPropagation();
    if (itemError?.length) return;
    const _id = inside ? '0' + $id : $id;
    setGlobal({ selected: _id });
  };

  const deleteItem = e => {
    e.stopPropagation();
    const newFlatten = { ...flatten };
    let newSelect = '#';
    // 计算删除后新被选中的元素：
    // 1. 如果是第一个，选第二个
    // 2. 如果不是第一，选它前一个
    // 3. 如果同级元素没了，选parent
    try {
      const parent = newFlatten[$id].parent;
      const siblings = newFlatten[parent].children;
      const idx = siblings.indexOf($id);
      if (idx > 0) {
        newSelect = siblings[idx - 1];
      } else {
        newSelect = siblings[1] || parent;
      }
    } catch (error) {
      console.log('catch', error);
    }
    const _canDelete = typeof canDelete === 'function' ? canDelete(newFlatten[$id].schema) : canDelete;
    if (!_canDelete) return;
    delete newFlatten[$id];
    onFlattenChange(newFlatten);
    setGlobal({ selected: newSelect });
  };

  const handleItemCopy = async e => {
    e.stopPropagation();
    if (itemError?.length) return;
    const [newFlatten, newId] = copyItem(flatten, $id);
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  // 一些computed
  let isSelected = selected === $id && !inside;
  if (selected && selected[0] === '0') {
    isSelected = selected.substring(1) === $id && inside;
  }

  let overwriteStyle = {
    backgroundColor: '#fff',
    opacity: isDragging ? 0 : 1,
  };
  if (inside) {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      // marginLeft: 12,
      padding: '12px 12px 0',
      backgroundColor: '#f6f5f6',
    };
  } else if ($id === '#') {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      padding: 12,
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#f6f5f6',
    };
  } else if (type === 'object') {
    overwriteStyle = { ...overwriteStyle, paddingTop: 12 };
  }
  if (isActive) {
    if (inside) {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 -3px 0 red',
      };
    } else if (position === 'up') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 -3px 0 red',
      };
    } else if (position === 'down') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 3px 0 red',
      };
    }
  }
  if (isSelected) {
    overwriteStyle = {
      ...overwriteStyle,
      outline: '2px solid #409eff',
      borderColor: '#fff',
      zIndex: 1,
    };
  }
  if (style && typeof style === 'object') {
    overwriteStyle = {
      ...overwriteStyle,
      ...style,
    };
  }

  if ($id === '#' && inside) return children;

  // 展示的id
  const shownId = getKeyFromUniqueId(schema.$id);

  // 操作按钮
  const _controlButtons = Array.isArray(controlButtons)
    ? controlButtons
    : [true, true];
  const _showDefaultBtns = _controlButtons
    .filter(item => ['boolean', 'function'].includes(typeof item))
    .map(item => {
      if (typeof item === 'boolean') return item;
      return item(schema);
    });
  const _extraBtns = _controlButtons.filter(
    item => isObject(item) && (item.text || item.children)
  );
  const { length: _numOfBtns } = _showDefaultBtns
    .concat(_extraBtns)
    .filter(Boolean);

  const hasDuplicateId = Object.keys(flatten).map(key => flatten[key].schema.$id).filter(key => key === schema.$id).length > 1;

  return (
    <div
      ref={boxRef}
      style={overwriteStyle}
      className="field-wrapper relative w-100"
      onClick={handleClick}
    >
      {children}

      <div className="absolute top-0 right-1 f7">
        {!inside && $id !== '#' && !hideId && (
          <span className={hasDuplicateId ? 'red' : 'blue'}>{shownId}</span>
        )}
        {schema.hidden && (
          <span style={{ color: '#666', marginLeft: '6px' }}>[hidden]</span>
        )}
      </div>

      {!inside && $id !== '#' && isSelected && (
        <div className="pointer-move" ref={dragRef}>
          <DragOutlined />
        </div>
      )}

      {!inside && $id !== '#' && isSelected && _numOfBtns > 0 && (
        <div className="pointer-wrapper">
          {_showDefaultBtns[0] !== false && (
            <div className="pointer" onClick={deleteItem}>
              <DeleteOutlined />
            </div>
          )}
          {_showDefaultBtns[1] !== false && (
            <div className="pointer" onClick={handleItemCopy}>
              <CopyOutlined />
            </div>
          )}
          {_extraBtns.map((item, idx) => {
            return (
              <div
                key={idx.toString()}
                className="pointer"
                onClick={e => item.onClick && item.onClick(e, schema)}
              >
                {item.text || item.children}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
