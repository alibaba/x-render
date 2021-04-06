import React, { useRef, useState } from 'react';
import './Wrapper.css';
import { useGlobal, useStore } from '../hooks';
import { copyItem, getKeyFromUniqueId, dropItem } from '../utils';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';

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
    onItemChange,
    onFlattenChange,
    selected,
    hovering,
  } = useStore();
  const setGlobal = useGlobal();
  const { schema } = item;
  const { type } = schema;
  const boxRef = useRef(null);

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    item: { type: 'box', $id: inside ? 0 + $id : $id },
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

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      // 如果children已经作为了drop target，不处理
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      console.log(item.dragItem, 'tems');
      const [newFlatten, newId] = dropItem({
        dragId: item.$id, // 内部拖拽用dragId
        dragItem: item.dragItem, // 从左边栏过来的，用dragItem
        dropId: $id,
        position,
        flatten,
      });
      onFlattenChange(newFlatten);
      setGlobal({ selected: newId });
      return;
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

  const handleClick = e => {
    e.stopPropagation();
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
    delete newFlatten[$id];
    onFlattenChange(newFlatten);
    setGlobal({ selected: newSelect });
  };

  const handleItemCopy = e => {
    e.stopPropagation();
    const [newFlatten, newId] = copyItem(flatten, $id);
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  const handleMouseEnter = () => {
    // setGlobal({ hovering: inside ? '0' + $id : $id });
  };

  const handleMouseLeave = () => {
    // TODO: 如何写hoverLeave
    // let hoverItem = '';
    // if (hovering && hovering[0] === '0') {
    //   hoverItem = $id;
    // } else {
    //   hoverItem = $id.split;
    // }
  };

  // 一些computed
  let isSelected = selected === $id && !inside;
  if (selected && selected[0] === '0') {
    isSelected = selected.substring(1) === $id && inside;
  }

  const hoverId = inside ? '0' + $id : $id;

  let overwriteStyle = {
    backgroundColor: hovering === hoverId ? '#ecf5ff' : '#fff',
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
  let shownId = schema && schema.$id && getKeyFromUniqueId(schema.$id);
  if (shownId === '#') shownId = ''; // 根元素不展示了

  return (
    <div
      ref={boxRef}
      style={overwriteStyle}
      className={`field-wrapper relative w-100`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!inside && isSelected && $id !== '#' && (
        <div
          style={{
            position: 'absolute',
            top: -2,
            left: -2,
            height: 24,
            width: 24,
            backgroundColor: '#409eff',
            padding: '2px 0 0 4px',
            cursor: 'move',
          }}
          ref={dragRef}
        >
          <DragOutlined style={{ color: '#fff' }} />
        </div>
      )}
      {!inside && (
        <div className="absolute top-0 right-1 blue f7">{shownId}</div>
      )}
      {children}

      {isSelected && !inside && $id !== '#' && (
        <div
          style={{
            position: 'absolute',
            zIndex: 20,
            bottom: -2,
            right: -2,
            height: 24,
            width: 54,
            borderTopLeftRadius: 8,
            background: '#409eff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="pointer" onClick={deleteItem}>
            <DeleteOutlined
              style={{
                height: 16,
                width: 16,
                margin: '0 8px 0 12px',
                color: '#fff',
              }}
            />
          </div>
          <div className="pointer" onClick={handleItemCopy}>
            <CopyOutlined
              style={{
                height: 16,
                width: 16,
                marginRight: 12,
                color: '#fff',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
