import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { isFunction, evaluateString } from '../../base/utils';
import FoldIcon from '../../components/foldIcon';
import DescriptionList, { getDescription } from '../../components/descList';
import { Button } from 'antd';

const DragHandle = SortableHandle(() => (
  <span className="fr-move-icon">:::</span>
));

const ListItem = ({ p, name, fold, toggleFoldItem, item }) => {
  useEffect(() => {
    const description = getDescription({
      schema: p.schema,
      value: p.value,
      index: name,
    });
    // 如果第一个值不为空，则收起
    // 新增的值为0，不折叠
    const hasValue = description && description[0] && description[0].text;
    if (hasValue && fold !== 0) {
      toggleFoldItem(name);
    }
  });

  const toggleFold = () => {
    toggleFoldItem(name);
  };

  const descProps = { ...p, index: name };
  const { options = {}, readonly, formData, value: rootValue } = p;
  const { foldable: canFold, hideIndex } = options;
  let { hideDelete, itemButtons } = options;

  // 判断 hideDelete 是不是函数，是的话将计算后的值赋回
  let _isFunction = isFunction(hideDelete);
  if (_isFunction) {
    // isFunction 返回为 true 则说明只可能为 string | Function
    if (typeof _isFunction === 'string') {
      hideDelete = evaluateString(_isFunction, formData, rootValue);
    } else if (typeof _isFunction === 'function') {
      hideDelete = _isFunction(formData, rootValue);
    }
  }

  // 只有当items为object时才做收起（fold）处理
  const isObj = p.schema.items && p.schema.items.type == 'object';
  let setClass =
    'fr-set ba b--black-10 hover-b--black-20 relative flex flex-column';
  if (canFold && fold) {
    setClass += ' pv12';
  } else if (p.displayType === 'row') {
    setClass += ' pt44';
  }
  return (
    <li className={setClass}>
      {hideIndex ? null : (
        <div
          className="absolute top-0 left-0 bg-blue"
          style={{
            paddingLeft: 4,
            paddingRight: 6,
            borderBottomRightRadius: 8,
            borderTopLeftRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, .36)',
            fontSize: 8,
            color: '#fff',
          }}
        >
          {name + 1}
        </div>
      )}

      {canFold && fold && isObj ? <DescriptionList {...descProps} /> : item}
      {canFold && (
        <FoldIcon
          fold={fold}
          onClick={toggleFold}
          style={{ position: 'absolute', top: 12, right: 32 }}
        />
      )}
      {!readonly && <DragHandle />}
      {!((canFold && fold) || hideDelete || readonly) && (
        <div className="self-end flex">
          <Button
            type="dashed"
            onClick={() => {
              const value = [...p.value];
              value.splice(name, 1);
              p.onChange(p.name, value);
            }}
          >
            删除
          </Button>
          {itemButtons &&
            itemButtons.length > 0 &&
            itemButtons.map((btn, idx) => {
              return (
                <Button
                  key={idx.toString()}
                  className="ml2"
                  type="dashed"
                  onClick={() => {
                    const value = [...p.value];
                    if (typeof window[btn.callback] === 'function') {
                      const result = window[btn.callback](value, name); // eslint-disable-line
                      p.onChange(p.name, result);
                    }
                  }}
                >
                  {btn.text || ''}
                </Button>
              );
            })}
        </div>
      )}
    </li>
  );
};

const SortableItem = SortableElement(ListItem);

const FieldList = ({ p, addUnfoldItem, foldList = [], toggleFoldItem }) => {
  const handleAddClick = () => {
    const value = [...p.value];
    value.push(p.newItem);
    p.onChange(p.name, value);
    addUnfoldItem();
  };
  const { options, readonly, schema = {} } = p || {};
  const { maxItems } = schema;
  const list = p.value || [];
  if (!Array.isArray(list)) {
    console.error(`"${p.name}"这个字段相关的schema书写错误，请检查！`);
    return null;
  }
  const canAdd = maxItems ? maxItems > list.length : true; // 当到达最大个数，新增按钮消失
  return (
    <ul className="pl0 ma0">
      {list.map((_, name) => (
        <SortableItem
          key={`item-${name}`}
          index={name}
          name={name}
          p={p}
          fold={foldList[name]}
          toggleFoldItem={toggleFoldItem}
          item={p.getSubField({
            name,
            value: p.value[name],
            onChange(key, val) {
              const value = [...p.value];
              value[key] = val;
              p.onChange(p.name, value);
            },
          })}
        />
      ))}
      {!readonly && (
        <div className="tr">
          {canAdd && <Button onClick={handleAddClick}>新增</Button>}
        </div>
      )}
    </ul>
  );
};

const SortableList = SortableContainer(FieldList);

const SimpleList = () => {
  const []
}

class SimpleList extends React.Component {

  constructor(props) {
    super(props);
    const len = this.props.value.length || 0;
    this.state = {
      foldList: new Array(len).fill(false) || [],
    };
  }

  // 新添加的item默认是展开的
  addUnfoldItem = () =>
    this.setState({
      foldList: [...this.state.foldList, 0],
    });

  toggleFoldItem = index => {
    const { foldList = [] } = this.state;
    foldList[index] = !foldList[index]; // TODO: need better solution for the weird behavior caused by setState being async
    this.setState({
      foldList,
    });
  };

  handleSort = ({ oldIndex, newIndex }) => {
    const { onChange, name, value } = this.props;
    onChange(name, arrayMove(value, oldIndex, newIndex));
    this.setState({
      foldList: arrayMove(this.state.foldList, oldIndex, newIndex),
    });
  };

  render() {
    const { foldList } = this.state;
    return (
      <SortableList
        p={this.props}
        foldList={foldList}
        toggleFoldItem={this.toggleFoldItem}
        addUnfoldItem={this.addUnfoldItem}
        distance={6}
        useDragHandle
        helperClass="fr-sort-help-class"
        shouldCancelStart={e =>
          e.toElement && e.toElement.className === 'fr-tooltip-container'
        }
        onSortEnd={this.handleSort}
      />
    );
  }
}

export default SimpleList;
