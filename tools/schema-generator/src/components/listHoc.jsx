/**
 * Created by Tw93 on 2019-12-01.
 * 抽离高阶列表组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { isFunction, evaluateString } from '../utils';
import FoldIcon from './foldIcon';
import DescriptionList, { getDescription } from './descList';

const DragHandle = SortableHandle(() => (
  <span className="fr-move-icon">:::</span>
));

const listItemHoc = (ButtonComponent) =>
  class extends React.Component {
    componentDidMount() {
      const { p = {}, name, fold } = this.props;
      const description = getDescription({
        schema: p.schema,
        value: p.value,
        index: name,
      });
      // 如果第一个值不为空，则收起
      // 新增的值为0，不折叠
      const hasValue = description && description[0] && description[0].text;
      if (hasValue && fold !== 0) {
        this.props.toggleFoldItem(name);
      }
    }

    toggleFold = () => {
      this.props.toggleFoldItem(this.props.name);
    };

    render() {
      const { item, p = {}, name, fold } = this.props;
      const descProps = { ...p, index: name };
      const { options = {}, readonly, formData, value: rootValue } = p;
      const { foldable: canFold } = options;
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
          {canFold && fold && isObj ? <DescriptionList {...descProps} /> : item}
          {canFold && (
            <FoldIcon
              fold={fold}
              onClick={this.toggleFold}
              style={{ position: 'absolute', top: 12, right: 32 }}
            />
          )}
          {!readonly && <DragHandle />}
          {!((canFold && fold) || hideDelete || readonly) && (
            <div className="self-end flex">
              <ButtonComponent
                type="dashed"
                icon="delete"
                onClick={() => {
                  const value = [...p.value];
                  value.splice(name, 1);
                  p.onChange(value);
                }}
              >
                删除
              </ButtonComponent>
              {itemButtons &&
                itemButtons.length > 0 &&
                itemButtons.map((btn, idx) => {
                  return (
                    <ButtonComponent
                      key={idx.toString()}
                      className="ml2"
                      type="dashed"
                      icon={btn.icon}
                      onClick={() => {
                        const value = [...p.value];
                        if (typeof window[btn.callback] === 'function') {
                          const result = window[btn.callback](value, name); // eslint-disable-line
                          p.onChange(result);
                        }
                      }}
                    >
                      {btn.text || ''}
                    </ButtonComponent>
                  );
                })}
            </div>
          )}
        </li>
      );
    }
  };

const fieldListHoc = (ButtonComponent) => {
  const SortableItem = SortableElement(listItemHoc(ButtonComponent));
  return class extends React.Component {
    handleAddClick = () => {
      const { p, addUnfoldItem } = this.props;
      const value = [...p.value];
      value.push(p.newItem);
      p.onChange(value);
      addUnfoldItem();
    };
    // buttons is a list, each item looks like:
    // {
    //   "text": "删除全部",
    //   "icon": "delete",
    //   "callback": "clearAll"
    // }

    render() {
      const { p, foldList = [], toggleFoldItem } = this.props;
      const { options = {}, extraButtons = {} } = p || {};
      // prefer ui:options/buttons to ui:extraButtons, but keep both for backwards compatibility
      const buttons = options.buttons || extraButtons || [];
      const { readonly, schema = {} } = p;
      const { maxItems } = schema;
      const list = p.value || [];
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
              })}
            />
          ))}
          {!readonly && (
            <div className="tr">
              {canAdd && (
                <ButtonComponent icon="add" onClick={this.handleAddClick}>
                  新增
                </ButtonComponent>
              )}
              {buttons &&
                buttons.length > 0 &&
                buttons.map((item, i) => (
                  <ButtonComponent
                    className="ml2"
                    icon={item.icon}
                    key={i.toString()}
                    onClick={() => {
                      if (item.callback === 'clearAll') {
                        p.onChange([]);
                        return;
                      }
                      if (item.callback === 'copyLast') {
                        const value = [...p.value];
                        const lastIndex = value.length - 1;
                        value.push(
                          lastIndex > -1 ? value[lastIndex] : p.newItem
                        );
                        p.onChange(value);
                        return;
                      }
                      if (typeof window[item.callback] === 'function') {
                        const value = [...p.value];
                        const onChange = (value) => p.onChange(value);
                        window[item.callback](value, onChange, p.newItem); // eslint-disable-line
                      }
                    }}
                  >
                    {item.text}
                  </ButtonComponent>
                ))}
            </div>
          )}
        </ul>
      );
    }
  };
};

export default function listHoc(ButtonComponent) {
  const SortableList = SortableContainer(fieldListHoc(ButtonComponent));
  return class extends React.Component {
    static propTypes = {
      value: PropTypes.array,
    };

    static defaultProps = {
      value: [],
    };

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

    toggleFoldItem = (index) => {
      const { foldList = [] } = this.state;
      foldList[index] = !foldList[index]; // TODO: need better solution for the weird behavior caused by setState being async
      this.setState({
        foldList,
      });
    };

    handleSort = ({ oldIndex, newIndex }) => {
      const { onChange, name, value } = this.props;
      onChange(arrayMove(value, oldIndex, newIndex));
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
          shouldCancelStart={(e) =>
            e.toElement && e.toElement.className === 'fr-tooltip-container'
          }
          onSortEnd={this.handleSort}
        />
      );
    }
  };
}
