import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';

export interface ProTableProps<RecordType extends object = any> extends TableProps<RecordType> {
  debug?: boolean;
  headerTitle?: string | React.ReactNode;
  toolbarRender?: () => React.ReactNode[];
  toolbarAction?: boolean;
  pageChangeWithRequest?: boolean;
}

export interface CardListProps { }
