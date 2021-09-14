import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';

export interface ProTableProps extends TableProps<any> {
  debug?: boolean;
  headerTitle?: string | React.ReactNode;
  toolbarRender?: () => React.ReactNode[];
  toolbarAction?: boolean;
  dataSource?: any;
  pagination?: any;
  style?: any;
  className?: string;
  columns?: ColumnsType;
  size?: any;
  pageChangeWithRequest?: boolean;
}

export interface CardListProps { }
