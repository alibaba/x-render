import type { Var } from '../types'
import { BlockEnum, VarType } from '../types';

export const CUSTOM_ITERATION_START_NODE = 'custom-iteration-start'


export const NODE_WIDTH = 240
export const X_OFFSET = 60
export const NODE_WIDTH_X_OFFSET = NODE_WIDTH + X_OFFSET
export const Y_OFFSET = 39
export const MAX_TREE_DEPTH = 50
export const START_INITIAL_POSITION = { x: 80, y: 282 }
export const AUTO_LAYOUT_OFFSET = {
  x: -42,
  y: 243,
}
export const ITERATION_NODE_Z_INDEX = 1
export const ITERATION_CHILDREN_Z_INDEX = 1002
export const ITERATION_PADDING = {
  top: 65,
  right: 16,
  bottom: 20,
  left: 16,
}
export const PARALLEL_LIMIT = 10
export const PARALLEL_DEPTH_LIMIT = 3

export const RETRIEVAL_OUTPUT_STRUCT = `{
  "content": "",
  "title": "",
  "url": "",
  "icon": "",
  "metadata": {
    "dataset_id": "",
    "dataset_name": "",
    "document_id": [],
    "document_name": "",
    "document_data_source_type": "",
    "segment_id": "",
    "segment_position": "",
    "segment_word_count": "",
    "segment_hit_count": "",
    "segment_index_node_hash": "",
    "score": ""
  }
}`

export const SUPPORT_OUTPUT_VARS_NODE = [
  BlockEnum.Start, BlockEnum.LLM, BlockEnum.KnowledgeRetrieval, BlockEnum.Code, BlockEnum.TemplateTransform,
  BlockEnum.HttpRequest, BlockEnum.Tool, BlockEnum.VariableAssigner, BlockEnum.VariableAggregator, BlockEnum.QuestionClassifier,
  BlockEnum.ParameterExtractor, BlockEnum.Iteration,
]

export const LLM_OUTPUT_STRUCT: Var[] = [
  {
    variable: 'text',
    type: VarType.string,
  },
]

export const KNOWLEDGE_RETRIEVAL_OUTPUT_STRUCT: Var[] = [
  {
    variable: 'result',
    type: VarType.arrayObject,
  },
]

export const TEMPLATE_TRANSFORM_OUTPUT_STRUCT: Var[] = [
  {
    variable: 'output',
    type: VarType.string,
  },
]

export const QUESTION_CLASSIFIER_OUTPUT_STRUCT = [
  {
    variable: 'class_name',
    type: VarType.string,
  },
]

export const HTTP_REQUEST_OUTPUT_STRUCT: Var[] = [
  {
    variable: 'body',
    type: VarType.string,
  },
  {
    variable: 'status_code',
    type: VarType.number,
  },
  {
    variable: 'headers',
    type: VarType.object,
  },
  {
    variable: 'files',
    type: VarType.arrayFile,
  },
]

export const TOOL_OUTPUT_STRUCT: Var[] = [
  {
    variable: 'text',
    type: VarType.string,
  },
  {
    variable: 'files',
    type: VarType.arrayFile,
  },
  {
    variable: 'json',
    type: VarType.arrayObject,
  },
]

export const PARAMETER_EXTRACTOR_COMMON_STRUCT: Var[] = [
  {
    variable: '__is_success',
    type: VarType.number,
  },
  {
    variable: '__reason',
    type: VarType.string,
  },
]

export const WORKFLOW_DATA_UPDATE = 'WORKFLOW_DATA_UPDATE'
export const CUSTOM_NODE = 'custom'
export const CUSTOM_EDGE = 'custom'
export const DSL_EXPORT_CHECK = 'DSL_EXPORT_CHECK'




export const iconSettingMap: Record<string, any> = {
  Start: {
    icon: {
      type: 'icon-start',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#17B26A'
    }
  },
  End: {
    icon: {
      type: 'icon-end',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#F79009'
    }
  },
  Code: {
    title: '代码执行',
    icon: {
      type: 'icon-code',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#2E90FA'
    }
  },
  Prompt: {
    borderColor: '#3b82f6',
    bgColor: '#f0f6fe',
    icon: 'icon-prompt',
  },
  LLM: {
    borderColor: '#15afb3',
    bgColor: '#e7f7f7',
    icon: 'icon-model',
  },
  Knowledge: {
    borderColor: '#e7365d',
    bgColor: '#fad4d7',
    icon: 'icon-knowledge',
  },
  Switch: {
    title: '条件分支',
    icon: {
      type: 'icon-switch',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#06AED4'
    }
  },
  HSF: {
    title: 'HSF 请求',
    icon: {
      type: 'icon-hsf',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#875BF7'
    }
  },
  Http: {
   title: 'Http 请求',
   icon: {
      type: 'icon-http',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#875BF7'
    }
  },
  Tool: {
    title: '工具',
    icon: {
      type: 'icon-gongju',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#2E90FA'
    }
  },
};


export const nodeConfigList = [
  { 
    title: 'Prompt',
    type: 'prompt'
  
  },
  { 
    title: 'LLM',
    type: 'llm'
  },
  { 
    title: '知识库', 
    icon: 'icon-knowledge', 
    type: 'knowledge'
  
  
  },
  { 
    title: 'Switch', 
    type: 'switch',
    icon: {
      type: 'icon-switch',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#06AED4'
    }
  },
  { 
    title: 'HSF', 
    type: 'hsf',
    icon: {
      type: 'icon-hsf',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#875BF7'
    }
  },
  { 
    title: 'Http', 
    type: 'http',
    icon: {
      type: 'icon-http',
      style: { fontSize: 14, color: '#fff' },
      bgColor: '#875BF7'
    }
  },
  { 
    title: '脚步语言', 
    type: 'group', 
    items: [
    { title: 'Groovy', icon: 'icon-groovy', type: 'groovy' },
    { title: 'Javascript', icon: 'icon-js', type: 'javascript' },
    { title: 'Pathon', icon: 'icon-pathon', type: 'pathon' },
  ]}
];

