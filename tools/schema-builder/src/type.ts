interface TProperties {
  [key: string]: any;
}

interface TLogo {
  title?: string;
  image?: string;
  href?: string;
}

interface TSchema {
  "type": "object",
  "properties": TProperties
}

interface TToolBtn {
  text: string;
  order: number;
  onClick: (schema: TSchema) => void;
}

export interface TSchemaBuilder {
  logo?: TLogo;
  importBtn?: boolean;
  exportBtn?: boolean;
  clearBtn?: boolean | TToolBtn;
  saveBtn?: boolean | TToolBtn;
  pubBtn?: boolean | TToolBtn;
  extraBtns?: TToolBtn[];
  defaultValue?: TSchema;
  widgets?: any;
  settings?: any;
  onMount?: () => void;
  [key: string]: any
}