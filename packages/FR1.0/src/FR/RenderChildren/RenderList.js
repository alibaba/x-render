/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import FR from '../index';
import { get } from 'lodash';
import { useStore, useSet } from '../../hooks';
import { getDataPath, getKeyFromPath, getDisplayValue } from '../../utils';
import { Button, Table, Drawer, Space } from 'antd';
import ArrowUp from '../../components/ArrowUp';
import ArrowDown from '../../components/ArrowDown';
import ErrorMessage from '../RenderField/ErrorMessage';

const FIELD_LENGTH = 200;

const RenderList = ({
  parentId,
  dataIndex = [],
  children = [],
  errorFields,
}) => {
  // console.log(parentId, dataIndex, children);
  const { formData, onItemChange, flatten } = useStore();

  // 计算 list对应的formData
  const dataPath = getDataPath(parentId, dataIndex);
  let listData;
  if (typeof dataPath === 'string') {
    // TODO: listData会有不少“窟窿”，submit 的时候，listData 需要补齐 or filter
    listData = get(formData, dataPath);
  }

  const displayList = Array.isArray(listData) ? listData : [undefined];

  const addItem = () => {
    const newList = [...displayList, undefined];
    const newIndex = newList.length - 1;
    onItemChange(dataPath, newList);
    return newIndex;
  };

  const deleteItem = idx => {
    // TODO: 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    // remark: 删除时，不存在的item需要补齐，用null
    const newList = displayList.filter((item, kdx) => kdx !== idx);
    onItemChange(dataPath, newList);
    // const itemPath = dataPath + `[${idx}]`; //TODO: 这块有问题啊，idx好像不准
  };

  //TODO1: 上线翻页要正确！！现在是错的
  const moveItemUp = idx => {
    if (idx === 0) return;
    const currentItem = displayList[idx];
    const itemAbove = displayList[idx - 1];
    const newList = displayList;
    newList[idx] = itemAbove;
    newList[idx - 1] = currentItem;
    onItemChange(dataPath, newList);
  };

  const moveItemDown = idx => {
    if (idx >= displayList.length - 1) return;
    const currentItem = displayList[idx];
    const itemBelow = displayList[idx + 1];
    const newList = displayList;
    newList[idx] = itemBelow;
    newList[idx + 1] = currentItem;
    onItemChange(dataPath, newList);
  };

  const displayProps = {
    displayList,
    dataPath,
    dataIndex,
    children,
    deleteItem,
    addItem,
    moveItemDown,
    moveItemUp,
    listData,
    flatten,
    errorFields,
  };

  // TODO: 还有其他的写法
  return <CardList {...displayProps} />;

  return <TableList {...displayProps} />;
};

export default RenderList;

const CardList = ({
  displayList = [{}],
  dataPath,
  dataIndex,
  children,
  deleteItem,
  addItem,
  moveItemDown,
  moveItemUp,
  flatten,
  errorFields,
}) => {
  const [state, setState] = useSet({
    showDrawer: false,
    currentIndex: -1,
  });

  const _infoItem = {
    schema: { type: 'object', properties: {} },
    rules: [],
    children,
  };

  const { showDrawer, currentIndex } = state;

  const dataSource = displayList.map((item, index) => ({
    ...item,
    $idx: index,
  }));

  const truncatedChildren = children.slice(0, 3); // TODO：允许调整，允许选择使用哪几个child

  const columns = truncatedChildren.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    const _dataIndex = getKeyFromPath(child);
    return {
      dataIndex: _dataIndex,
      title: schema.title,
      width: FIELD_LENGTH,
      render: (value, record) => {
        const childPath = getDataPath(child, [record.$idx]);
        const errorObj = errorFields.find(item => item.name == childPath) || {};
        //TODO: 万一error在更深的层，这个办法是find不到的，会展示那一行没有提示。可以整一行加一个红线的方式处理
        return (
          <div>
            <div>{getDisplayValue(value, schema)}</div>
            {errorObj.error && (
              <ErrorMessage message={errorObj.error} schema={schema} />
            )}
          </div>
        );
      },
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 110,
    render: (value, record, idx) => {
      const index = (value && value.$idx) || 0;
      return (
        <Space>
          <a onClick={() => openDrawer(index)}>编辑</a>
          <a onClick={() => deleteItem(index)}>删除</a>
          {/* <ArrowUp height={18} width={24} onClick={() => moveItemUp(index)} />
          <ArrowDown
            height={18}
            width={24}
            onClick={() => moveItemDown(index)}
          /> */}
        </Space>
      );
    },
  });

  const openDrawer = index => {
    setState({
      showDrawer: true,
      currentIndex: index,
    });
  };

  const closeDrawer = () => {
    setState({
      showDrawer: false,
      currentIndex: -1,
    });
  };

  const handleAdd = () => {
    const newIndex = addItem();
    openDrawer(newIndex);
  };

  return (
    <>
      <div className="w-100 mb2 tr">
        <Button type="primary" size="small" onClick={handleAdd}>
          新增
        </Button>
      </div>
      <Drawer
        width="500"
        title="编辑"
        placement="right"
        onClose={closeDrawer}
        visible={showDrawer}
      >
        <div className="fr-container">
          <FR
            // id={children[currentIndex]}
            _item={_infoItem}
            dataIndex={[...dataIndex, currentIndex]}
          />
        </div>
      </Drawer>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record, idx) => {
          const index = record && record.$idx;
          const hasError = errorFields.find(
            item => item.name.indexOf(`${dataPath}[${index}]`) > -1
          );
          return hasError ? 'fr-row-error' : '';
        }}
        rowKey="$idx"
        size="small"
        scroll={{ x: children.length * FIELD_LENGTH }}
        pagination={{ size: 'small', hideOnSinglePage: true }}
      />
    </>
  );
};

const TableList = ({
  displayList = [{}],
  dataIndex,
  children,
  deleteItem,
  addItem,
  flatten,
}) => {
  const dataSource = displayList.map((item, idx) => {
    return { index: idx };
  });

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    return {
      dataIndex: child,
      title: schema.title,
      width: FIELD_LENGTH,
      render: (value, record, index) => {
        // Check: record.index 似乎是antd自己会给的，不错哦
        const childIndex = [...dataIndex, record.index];
        return (
          <FR
            hideTitle={true}
            hideValidation={true}
            key={index.toString()}
            id={child}
            dataIndex={childIndex}
          />
        );
      },
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 120,
    render: (value, record, index) => {
      return <a onClick={() => deleteItem(index)}>删除</a>;
    },
  });

  return (
    <>
      <div className="w-100 mb2 tr">
        <Button type="primary" size="small" onClick={addItem}>
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="index"
        size="small"
        scroll={{ x: children.length * FIELD_LENGTH }}
        pagination={{ size: 'small', hideOnSinglePage: true }}
      />
    </>
  );
};

// TODO: 1. 展示有问题, 需要去具体算text的内容 2. 校验有问题，没有展开的项没有被校验到
// const ExpandList = ({
//   displayList = [{}],
//   dataIndex,
//   children,
//   deleteItem,
//   addItem,
//   listData = [],
//   childrenSchema,
// }) => {
//   const dataSource = displayList.map((item, idx) => {
//     const data = listData[idx] || {};
//     return { ...data, index: idx };
//   });

//   const columns = Object.keys(childrenSchema).map(key => {
//     const item = childrenSchema[key];
//     return {
//       dataIndex: key,
//       title: item.title,
//       render: value => value || '-', // TODO: something
//     };
//   });

//   columns.push({
//     title: '操作',
//     key: '$action',
//     render: (record, idx) => {
//       return <a onClick={() => deleteItem(idx)}>Delete</a>;
//     },
//   });

//   return (
//     <>
//       <Table
//         columns={columns}
//         dataSource={dataSource}
//         // defaultExpandAllRows
//         rowKey="index"
//         expandable={{
//           expandedRowRender: (record, idx) => {
//             const childIndex = [...dataIndex, idx];
//             return (
//               <li className={`w-100`}>
//                 {children.map((child, idx2) => {
//                   return (
//                     <FR
//                       key={idx2.toString()}
//                       id={child}
//                       dataIndex={childIndex}
//                     />
//                   );
//                 })}
//               </li>
//             );
//           },
//         }}
//       />
//       <div className="w-100">
//         <Button onClick={addItem}>addItem</Button>
//       </div>
//     </>
//   );

//   return (
//     <ul className="flex flex-wrap pl0 list">
//       {(displayList || []).map((item, idx) => {
//         const childIndex = [...dataIndex, idx];
//         return (
//           <li key={idx.toString()} className={`w-100`}>
//             {children.map((child, idx2) => {
//               return (
//                 <FR key={idx2.toString()} id={child} dataIndex={childIndex} />
//               );
//             })}
//             {Array.isArray(displayList) && displayList.length > 1 && (
//               <Button onClick={() => deleteItem(idx)}>delete</Button>
//             )}
//           </li>
//         );
//       })}
//       <div className="w-100">
//         <Button onClick={addItem}>addItem</Button>
//       </div>
//     </ul>
//   );
// };
