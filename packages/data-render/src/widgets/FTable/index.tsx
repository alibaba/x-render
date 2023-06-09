import React from 'react';
import SimpleTable from '../components/BaseTable';
import RequestTable from '../components/RequestTable';
import detalColumn from './detalColumn';
import FTitle from '../FTitle';

/**
 *
 * 自定义-Table
 */
const FTable = (props: any) => {
  const {
    title,
    data,
    column,
    template,
    request,
    addons,
    titleStyle,
    repeatIndex,
    rowSelection,
    style,
    ...otherProps
  } = props;

  const renderFRender = (value: any, schema: any) => {
    return addons.renderer({ schema, data: value, addons });
  };

  const columnMap = detalColumn(column, { addons, template, renderFRender, repeatIndex });

  // if (rowSelection) {
  //   otherProps.rowSelection = addons('getAppHelperParams', rowSelection);
  // }

  return (
    <>
      {title && <FTitle data={title} style={titleStyle} />}
      {!request && (
        <SimpleTable
          style={{
            marginBottom: title ? '16px' : 0,
            ...style,
          }}
          {...otherProps}
          data={data}
          column={columnMap}
          fRender={renderFRender}
        />
      )}
      {request && (
        <RequestTable
          {...otherProps}
          style={{
            marginBottom: title ? '16px' : 0,
            ...style,
          }}
          request={request}
          addons={addons}
          column={columnMap}
          fRender={renderFRender}
        />
      )}
    </>
  );
};

export default FTable;
