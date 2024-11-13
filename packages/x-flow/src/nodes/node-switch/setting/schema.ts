import { TYPES } from '../../constant';

export const getSchema = (request: any) => ({
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'tableList',
      props: {
        hideMove: true,
        hideCopy: true,
        size: 'small',
        addBtnProps: {
          type: 'dashed',
          size: 'small'
        },
        actionColumnProps: {
          width: 60,
        },
      },
      items: {
        type: 'object',
        properties: {
          name: {
            title: '变量名称',
            type: 'string',
            width: 180,
            rules: [
              {
                pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: '只能包含字母、数字和下划线且以字母或划线开头',
              },
            ],
          },
          dataType: {
            title: '变量类型',
            type: 'string',
            enum: TYPES.map((el) => el.toUpperCase()),
            enumNames: TYPES,
            width: 110,
            widget: 'select',
          },
          value: {
            title: '变量值',
            type: 'string',
            widget: 'FAutoComplete',
            props: {
              placeholder: '${变量名}',
              request
            }
          }
        }
      }
    }
  }
})

export const getSwitchSchema = (nodeRequest: any) => ({
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'tableList',
      props: {
        hideMove: true,
        hideCopy: true,
        size: 'small',
        addBtnProps: {
          type: 'dashed',
        },
        actionColumnProps: {
          width: 60,
        },
      },
      items: {
        type: 'object',
        properties: {
          node: {
            title: '节点名称',
            type: 'string',
            widget: 'FAutoComplete',
            width: 280,
            required: true,
            props: {
              placeholder: '节点名称',
              request: nodeRequest
            }
          },
          expression: {
            title: '表达式',
            type: 'string',
            props: {
              placeholder: '${表达式}',
            }
          }
        }
      }
    }
  }
});