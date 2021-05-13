import React, { useState, useEffect, useRef, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';

const VirtualTable = (props) => {
  const { columns, scroll, options } = props;
  const { height = 66 } = options || {};

  const gridRef = useRef();
  const [tableWidth, setTableWidth] = useState(0);

  const mergedColumns = useMemo(() => {
    if (!tableWidth) {
      return [];
    }
    const widthColumnCount = columns.filter(({ width }) => !width).length || 1;
    const sumColumnWidth = columns.reduce((acc, cur) => {
      return acc + (Number(cur.width) || 0);
    }, 0);

    // 最后一列不定宽
    delete columns?.[columns?.length - 1].width;
    return columns.map((column) => {
      if (column.width) {
        return column;
      }
      const width = Math.max(
        Math.floor((tableWidth - sumColumnWidth) / widthColumnCount),
        200
      );
      return {
        ...column,
        width
      };
    });
  }, [tableWidth, columns]);

  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      }
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData,
    { scrollbarSize, ref, onScroll }
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * height;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          const columnWidth = totalHeight > scroll.y && index === mergedColumns.length - 1
            ? (width) - scrollbarSize - 1
            : (width);

          return columnWidth;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => height}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft });
        }}
      >
         {({ columnIndex, rowIndex, style }) => {
          const record = rawData[rowIndex];
          let content = record[mergedColumns[columnIndex].dataIndex];
          if ('render' in mergedColumns[columnIndex]) {
            content = mergedColumns[columnIndex].render(content, record, rowIndex);
          }

          let clz = 'virtual-table-cell';
          if (columnIndex === mergedColumns.length - 1) {
            clz = `${clz} virtual-table-cell-last`
          }
          return (
            <div className={clz} style={style}>
              {content}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList
        }}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
