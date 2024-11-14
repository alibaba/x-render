import { useEffect, useRef, useState } from 'react';
import ReactJson from 'react-json-view';
import {
  Button,
  Collapse,
  Drawer,
  Flex,
  message,
  Select,
  Space,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import saveAs from 'file-saver';
import FormRender, { useForm } from 'form-render';
import * as XLSX from 'xlsx';
import { getUrlParams } from '@/utils';
import api from '@/apis';
import ExpandInput from '@/components/ExpandInput';
import IconView from '@/components/IconView';
import { useFlow } from '@/hooks/useWorkFlow';
import { transformData } from '@/pages/WorkflowDetail/DebugModal/util';
import CustomHtml from '../CustomHtml';
import './index.less';

interface IDebugDrawerProp {
  visible: boolean;
  onClose: () => void;
  item: any;
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
  const { onClose, visible, item } = props;
  const [activeKey, setActiveKey] = useState('single');
  const [historyItem, setHistoryItem] = useState<any>(null);
  const [historyOptions, setHistoryOptions] = useState<any>([]);
  const form = useForm();
  const { id: detailId } = getUrlParams();
  const [activeTab, setActiveTab] = useState('output');
  const { handleDebugOk, handleBatchDebugOk, flowList } = useFlow();
  const [outputResult, setOutputResult] = useState<any>();
  const [flowsResult, setFlowsResult] = useState<any>([]);

  const fileData = useRef<any>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const initInputList = (item?.data?.list || []).map((item: any) => {
    return {
      ...item,
      value: '',
    };
  });

  useEffect(() => {
    form.setValues({
      list: initInputList || [],
    });

    return () => {
      form.resetFields();
    };
  }, [item]);
  useEffect(() => {
    if (visible) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getHistory();
    }
  }, [visible]);
  useEffect(() => {
    const currentHistory = historyOptions.find(
      (item: any) => item.value === historyItem,
    );
    // input字段修改，如果有历史记录，需要将历史记录的值填充到input中
    const list = initInputList.map((item: any) => {
      const current = currentHistory?.inputs?.find(
        (i: any) => i.name === item.name,
      );
      return {
        ...item,
        value: current?.value,
      };
    });

    form.setValues({
      list,
    });
  }, [historyOptions, historyItem]);
  const getHistory = async () => {
    if (!detailId) return;
    const data = await api.workFlow.getDebugHistoryRecord({
      flowId: detailId,
      pageable: {
        current: 1,
        pageSize: 10,
      },
    });
    if (data.success) {
      setHistoryOptions(
        data.data.list.map((item: any, index: number) => {
          return {
            label: `调试记录${index + 1}: ${item.gmtCreate}`,
            value: item.id,
            ...item,
          };
        }),
      );
      setHistoryItem(data.data.list?.[0]?.id);
    }
  };
  const handleHistoryChange = (value: any) => {
    setHistoryItem(value);
  };
  // 批量
  const handleDownload = async () => {
    const inputs = item?.data.list;
    let data = [inputs.map((i) => `${i.name}|${i.dataType}`)];
    let ws = XLSX.utils.aoa_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    let wbOut = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array',
    });
    saveAs(
      new Blob([wbOut], { type: 'application/octet-stream' }),
      'workflow_batch_test.xlsx',
    );
  };
  const handleBeforeUpload: UploadProps['beforeUpload'] = async (item) => {
    let newFileList = [...fileList, item];
    if (newFileList.length > 1) {
      message.error('一次最多上传一个文件');
      return false;
    }

    try {
      setUploading(true);
      const uploadPromises = newFileList.map(async (file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const arrayBuffer = event.target?.result;
          if (!arrayBuffer) return;
          const data = new Uint8Array(arrayBuffer as ArrayBuffer);
          const workbook = XLSX.read(data, {
            type: 'array',
          });

          // 默认处理第一个工作表
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          fileData.current = transformData(json as any);
          setUploading(false);
          console.log(fileData.current, json);
        };
        reader.readAsArrayBuffer(file);
        return {
          file,
        };
      });

      const uploadResults = await Promise.allSettled(uploadPromises);
      uploadResults.forEach(({ status, value }: any) => {
        if (status === 'fulfilled') {
          const { file, url } = value;
          file.status = 'done';
          file.url = url;
        } else if (status === 'rejected') {
          message.error('Failed to upload file:', value.reason);
        }
      });
    } catch (error) {
      console.error('Failed to upload files:', error);
    }

    setFileList(newFileList);
    return false;
  };
  const uploadProps = {
    accept: '.xlsx',
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: handleBeforeUpload,
  };

  const handleOk = async () => {
    if (activeKey === 'single') {
      const formData = await form.validateFields();
      setLoading(true);
      await handleDebugOk(formData, true, {
        successCb: (res: any) => {
          console.log(323, res, flowList);
          if (res.taskCode === 'Output') {
            setOutputResult(res.output);
          }
          flowList.forEach((item: any) => {
            if (item.code === res.taskCode) {
              item.result = res.output;
            }
          });
          setLoading(false);
        },
        errorCb: (err: any) => {
          console.log(31221 + 'rr', err);
          setLoading(false);
        },
      });
    } else {
      setLoading(true);
      await handleBatchDebugOk(fileData.current);
      setLoading(false);
    }
  };
  const traceItems = flowList.map((item: any) => {
    return {
      key: item.code,
      label: item.name,
      children: (
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
            src={{}}
            name={null}
            style={{ height: '100%', overflow: 'auto' }}
          />
        </Flex>
      ),
    };
  });
  const singleOutItems = [
    {
      key: 'output',
      label: '结果',
      children: (
        <ReactJson
          src={{}}
          name={null}
          style={{ height: '100%', overflow: 'auto' }}
        />
      ),
    },
    {
      key: 'log',
      label: '追踪',
      children: (
        <>
          <Collapse items={traceItems} />
        </>
      ),
    },
  ];
  const items = [
    {
      key: 'single',
      label: '单次验证',
      children: (
        <>
          <Flex justify="space-between">
            <div></div>
            <Select
              style={{ width: 280 }}
              placeholder="调试记录"
              options={historyOptions}
              value={historyItem}
              onChange={handleHistoryChange}
              allowClear
            ></Select>
          </Flex>
          <FormRender
            schema={schema}
            form={form}
            style={{ marginTop: 12 }}
            widgets={{
              Html: (props: any) => <CustomHtml {...props} showEllipsis />,
              ExpandInput,
            }}
          />
        </>
      ),
    },
    {
      key: 'batch',
      label: '批量测试',
      children: (
        <Flex
          style={{
            padding: '80px 0',
            border: '1px solid #d9d9d9',
            marginBottom: 20,
            borderRadius: 8,
          }}
          justify="center"
        >
          <Space style={{ alignItems: 'flex-start' }}>
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              下载模板
            </Button>
            <Upload {...uploadProps} fileList={fileList}>
              <Button loading={uploading} icon={<UploadOutlined />}>
                上传文件
              </Button>
            </Upload>
          </Space>
        </Flex>
      ),
    },
  ];
  const handleModalClose = () => {
    if (onClose) {
      form.resetFields();
      fileData.current = null;
      setFileList([]);
      onClose();
    }
  };

  return (
    <Drawer
      rootClassName="debug-flow-panel"
      open={visible}
      width={700}
      mask={false}
      onClose={handleModalClose}
      title={
        <Flex justify="space-between">
          <div>流程调试</div>
          <IconView
            type="icon-remove"
            style={{ fontSize: 14 }}
            onClick={handleModalClose}
          />
        </Flex>
      }
    >
      <Tabs activeKey={activeKey} items={items} onChange={setActiveKey} />
      <Flex>
        <Button
          type="primary"
          style={{ width: '100%' }}
          loading={loading}
          onClick={handleOk}
        >
          开始运行
        </Button>
      </Flex>
      {activeKey === 'single' && !loading && outputResult && (
        <Tabs
          activeKey={activeTab}
          items={singleOutItems}
          onChange={setActiveTab}
        />
      )}
    </Drawer>
  );
};
export default NodeDebugDrawer;
