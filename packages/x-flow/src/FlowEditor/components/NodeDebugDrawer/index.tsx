import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { Alert, Button, Drawer, Flex } from 'antd';
import FormRender, { useForm } from 'form-render';
import { cloneDeep } from 'lodash';
import ExpandInput from '@/components/ExpandInput';
import IconView from '@/components/IconView';
import { useFlow } from '../../../../../hooks/useWorkFlow';
import CustomHtml from '../CustomHtml';
import './index.less';

interface IDebugDrawerProp {
  visible: boolean;
  onClose: () => void;
  title: string;
  node: any;
}
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      type: 'array',
      widget: 'tableList',
      readOnly: true,

      items: {
        type: 'object',
        properties: {
          name: {
            title: '名称',
            type: 'string',
            widget: 'html',
            width: 140,
            props: {
              width: 100,
            },
          },
          dataType: {
            title: '类型',
            type: 'string',
            widget: 'html',
            width: 80,
          },
          value: {
            title: '值',
            type: 'string',
            widget: 'ExpandInput',
            placeholder: '请输入常量',
            // required: true,
          },
        },
      },
    },
  },
};
const NodeDebugDrawer = (props: IDebugDrawerProp) => {
  const { visible, onClose, title, node } = props;
  const form = useForm();
  const [debugging, setDebugging] = useState(false);
  const [debugData, setDebugData] = useState<any>();

  const { handleDebugOk } = useFlow();
  useEffect(() => {
    const inputData = cloneDeep(node);

    if (inputData?.list) {
      inputData.list = inputData.list.map((item: any) => {
        return {
          ...item,
          value: '',
        };
      });
    }
    form.setValues({
      list: inputData?.list || [],
    });
    return () => {
      form.resetFields();
    };
  }, [node]);

  const handleOk = async () => {
    const formData = await form.validateFields();

    setDebugging(true);
    await handleDebugOk({ ...formData, code: node.code }, false, {
      successCb: (res: any) => {
        if (res.taskCode === node.code) {
          setDebugData(res?.output || {});
        }
        setDebugging(false);
      },
      errorCb: (err: any) => {
        setDebugData(err);
        setDebugging(false);
      },
    });
  };
  return (
    <Drawer
      rootClassName="debug-node-panel"
      open={visible}
      width={700}
      mask={false}
      onClose={onClose}
      title={
        <Flex justify="space-between">
          <div>{`测试 ${title}`}</div>
          <IconView
            type="icon-remove"
            style={{ fontSize: 14 }}
            onClick={onClose}
          />
        </Flex>
      }
    >
      <Alert
        message="参数赋值仅用于当前调试运行，不会影响线上运行时的赋值，请勿输入$[yyyymmdd]等时间表达式"
        type="warning"
        showIcon
      />
      <FormRender
        schema={schema}
        form={form}
        style={{ marginTop: 12 }}
        widgets={{
          Html: (props: any) => <CustomHtml {...props} showEllipsis />,
          ExpandInput,
        }}
      />
      <Flex>
        <Button
          type="primary"
          style={{ width: '100%' }}
          loading={debugging}
          onClick={handleOk}
        >
          开始运行
        </Button>
      </Flex>
      {!debugging && debugData && (
        <Flex
          style={{
            padding: '12px 16px',
            background: '#F2F4F7',
            borderRadius: 8,
            marginTop: 20,
          }}
          vertical
        >
          <p style={{ fontSize: 14, fontWeight: 500 }}>输出结果：</p>
          <ReactJson
            src={debugData}
            name={null}
            style={{ height: '100%', overflow: 'auto' }}
          />
        </Flex>
      )}
    </Drawer>
  );
};
export default NodeDebugDrawer;
