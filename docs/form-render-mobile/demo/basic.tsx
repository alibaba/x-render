import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';

const schema = {"type":"object","labelWidth":120,"displayType":"row","schemaTitle":"serialnumber_2289839","schemaName":"品牌管理","selectMenu":"745489477857710080","properties":{"serialnumber_2289839":{"title":"流水号","type":"string","widget":"serialnumber","serialnumberSetting":{"prefixRuleStatus":"PP","timeRuleStatus":"1","numberRuleStatus":"6"},"width":"50%"},"input_97681945":{"title":"品牌名称","type":"string","width":"50%"},"input_41658179":{"title":"厂家名称","type":"string","width":"50%"},"region_27251937":{"title":"地址","type":"object","widget":"cascader","width":"60%","properties":{}},"updateUserId_952182":{"title":"更新人","type":"string","widget":"updateUser"},"createUserId_2197722":{"title":"创建人","type":"string","widget":"createUser"},"createTime_4101949":{"title":"创建时间","type":"string","widget":"createTime"},"checkboxes_2557402":{"title":"多选","type":"array","widget":"checkboxes","items":{"type":"string"},"enum":["A","B","C","D"],"enumNames":["杭州","武汉","湖州","贵阳"]},"uploadImg_9363719":{"title":"图片上传","type":"array","widget":"uploadImg"},"uploadFile_3889481":{"title":"文件上传","type":"array","widget":"uploadFile"}}};


export default () => {
  const form = useForm();
  
  const onFinish = (formData: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(formData, null, 2)}</pre>,
    })
  };

  return (
    <FormRender
      schema={schema}
      form={form}
      onFinish={onFinish}
      widgets={{
        InputNumber: () => {return 1},
        Serialnumber: () => { return 1}
      }}
      footer={
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
      }
    />
  );
}
