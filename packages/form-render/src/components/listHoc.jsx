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
import { isFunction, evaluateString, isObj, isNumber } from '../base/utils';
import FoldIcon from './foldIcon';
import DescriptionList, { getDescription } from './descList';

const DragHandle = SortableHandle(() => (
  <div className="fr-item-action-icon fr-move-icon">:::</div>
));

const listItemHoc = ButtonComponent =>
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

    handleDelete = () => {
      const { p = {}, name, pageSize } = this.props;
      const value = [...p.value];
      value.splice(name, 1);
      this.props.handleDeleteItem(name);
      p.onChange(p.name, value);
      // 计算页码
      const list = Array.isArray(value) ? value : [];
      const page = Math.ceil(list.length / pageSize);
      this.props.handlePageChange(page, pageSize);
    };

    render() {
      const { item, p = {}, name, fold } = this.props;
      const descProps = { ...p, index: name };
      const { options, readOnly, formData, value: rootValue } = p;
      const _options = isObj(options) ? options : {};
      const { foldable: canFold, hideIndex } = _options;
      let { hideDelete, itemButtons } = _options;

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
      const isSchemaObj = p.schema.items && p.schema.items.type == 'object';
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

          {canFold && fold && isSchemaObj ? (
            <DescriptionList {...descProps} />
          ) : (
            item
          )}
          <div className="fr-item-actions">
            {canFold && (
              <FoldIcon
                fold={fold}
                onClick={this.toggleFold}
                className="fr-item-action-icon"
              />
            )}
            {!readOnly && (
              <div className="fr-item-action-icon" onClick={this.handleDelete}>
                <img
                  style={{ height: '70%' }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAFVBMVEVHcEwyMjIzMzMzMzMzMzMyMjIzMzPB9FYmAAAABnRSTlMAwO5OlCWVPuLSAAABQklEQVRo3u2ZzQ6CMBCEQeSuHHrGn3gmRjkbjZxN9AVA0/d/BAPR2OKCU+pJZ04E2A+6hTY7GwQU1atNoh+aHYbEh9rQZABAW3KPH9uAnTMgtwFXZ0BhA27OAGUDSmfAygZUvTdHiR6gMutKGKpr13jhV+j4ZmBV3wN4D8E7id7T+MyDy4+KnSSAAAJ+ARAlrwXDPIYBubFk5a3NFQIoY9FUrb0RApjLdntvRAEauUYAAQQQQAABBBBAAAEE/CXAr+DwLnm8iy7vso+1838CaiP6hMXHolFdAzIMEIkAhfcAxqLXXrv5CwywFt3+HLfwldhvGMF9jKb3kcqnS2AeYiU/Km4aCsvtp/jzvnHFhScVLqa01DEJXQAT6eVWQ3z9t3nAlMr5KXwy0MwkOIiq83O5QITq2POfTeefwufTLKCotu7zGChb6PfVgwAAAABJRU5ErkJggg=="
                  alt="delete"
                />
              </div>
            )}
            {!readOnly && <DragHandle />}
          </div>
          {!((canFold && fold) || hideDelete || readOnly) && (
            <div className="self-end flex mb2">
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
                          p.onChange(p.name, result);
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

const fieldListHoc = (ButtonComponent, Pagination) => {
  const SortableItem = SortableElement(listItemHoc(ButtonComponent));
  return class extends React.Component {
    handleAddClick = () => {
      const { p, addUnfoldItem, pageSize } = this.props;
      const value = [...p.value];
      value.push(p.newItem);
      p.onChange(p.name, value);
      addUnfoldItem();
      // 计算页码
      const list = Array.isArray(value) ? value : [];
      const page = Math.ceil(list.length / pageSize);
      this.props.handlePageChange(page, pageSize);
    };

    onPageChange = (page, pageSize) => {
      this.props.handlePageChange(page, pageSize);
    };
    // buttons is a list, each item looks like:
    // {
    //   "text": "删除全部",
    //   "icon": "delete",
    //   "callback": "clearAll"
    // }

    render() {
      const {
        p,
        foldList = [],
        currentIndex,
        pageSize,
        handlePageChange,
        toggleFoldItem,
        handleDeleteItem,
      } = this.props;
      // prefer ui:options/buttons to ui:extraButtons, but keep both for backwards compatibility
      const { readOnly, schema = {}, extraButtons, options } = p || {};
      const _options = isObj(options) ? options : {};
      const buttons = _options.buttons || extraButtons || [];
      const { maxItems } = schema;
      const list = Array.isArray(p.value) ? p.value : [];
      const total = list.length;
      const currentPage = list.slice(
        (currentIndex - 1) * pageSize,
        currentIndex * pageSize
      );
      if (!Array.isArray(p.value)) {
        console.error(`"${p.name}"这个字段相关的schema书写错误，请检查！`);
        return null;
      }
      const canAdd = maxItems ? maxItems > list.length : true; // 当到达最大个数，新增按钮消失

      const showPagination = !!(Pagination && total > pageSize);

      return (
        <ul className="pl0 ma0">
          {currentPage.map((_, idx) => {
            const name = (currentIndex - 1) * pageSize + idx;
            return (
              <SortableItem
                key={`item-${name}`}
                index={name}
                name={name}
                p={p}
                fold={foldList[name]}
                toggleFoldItem={toggleFoldItem}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                handleDeleteItem={handleDeleteItem}
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
            );
          })}
          <div className="flex justify-between mb3">
            {showPagination ? (
              <Pagination
                size="small"
                total={total}
                pageSize={pageSize}
                showSizeChanger={showPagination}
                onChange={this.onPageChange}
                current={currentIndex}
              />
            ) : (
              <div />
            )}
            {!readOnly && (
              <div className="tr">
                {canAdd && (
                  <ButtonComponent icon="add" onClick={this.handleAddClick}>
                    新增
                  </ButtonComponent>
                )}
                {buttons &&
                  buttons.length > 0 &&
                  buttons.map((item, i) => {
                    const { icon, text, callback, ...rest } = item;
                    return (
                      <ButtonComponent
                        className="ml2"
                        icon={icon}
                        key={i.toString()}
                        onClick={() => {
                          if (callback === 'clearAll') {
                            p.onChange(p.name, []);
                            return;
                          }
                          if (callback === 'copyLast') {
                            const value = [...p.value];
                            const lastIndex = value.length - 1;
                            value.push(
                              lastIndex > -1 ? value[lastIndex] : p.newItem
                            );
                            p.onChange(p.name, value);
                            return;
                          }
                          if (typeof window[callback] === 'function') {
                            const value = [...p.value];
                            const onChange = value => p.onChange(p.name, value);
                            window[callback](
                              value,
                              onChange,
                              schema,
                              p.newItem
                            ); // eslint-disable-line
                          }
                        }}
                        {...rest}
                      >
                        {text}
                      </ButtonComponent>
                    );
                  })}
              </div>
            )}
          </div>
        </ul>
      );
    }
  };
};

export default function listHoc(ButtonComponent, Pagination) {
  const SortableList = SortableContainer(
    fieldListHoc(ButtonComponent, Pagination)
  );
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
        currentIndex: 1,
        pageSize: this.getPageSize(props),
      };
    }

    // 新添加的item默认是展开的
    addUnfoldItem = () => {
      this.setState({
        foldList: [...this.state.foldList, 0],
      });
    };

    handleDeleteItem = () => {
      const { options, value } = this.props;
      let pageSize = 10;
      if (isNumber(options.pageSize)) {
        pageSize = Number(options.pageSize);
      }
      const idx =
        Math.floor((value.length === 0 ? 0 : value.length - 2) / pageSize) + 1;
      if (this.state.currentIndex > idx) {
        this.setState({ currentIndex: idx });
      }
    };

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

    handlePageChange = (page, pageSize) => {
      this.setState({ currentIndex: page, pageSize });
    };

    getPageSize = props => {
      const { options } = props || {};
      const _options = isObj(options) ? options : {};
      let pageSize = 10;
      if (isNumber(_options.pageSize)) {
        pageSize = Number(_options.pageSize);
      }
      return pageSize;
    };

    render() {
      const { foldList, currentIndex, pageSize } = this.state;
      return (
        <SortableList
          p={this.props}
          foldList={foldList}
          currentIndex={currentIndex}
          pageSize={pageSize}
          toggleFoldItem={this.toggleFoldItem}
          addUnfoldItem={this.addUnfoldItem}
          handlePageChange={this.handlePageChange}
          handleDeleteItem={this.handleDeleteItem}
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
  };
}
