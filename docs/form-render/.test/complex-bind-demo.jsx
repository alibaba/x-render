/**
 * transform: true
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, message, Tag } from 'antd';
import FormRender, { useForm } from 'form-render';
import { fakeApi, delay } from './advanced/utils';
import RichTextEditor from '../../widgets/RichText/src';

const SelectableTag = ({ value, onChange, options }) => {
  const handleChange = newValue => {
    const optionsMap = {};
    options.forEach(({ label, extra }) => {
      optionsMap[label] = extra;
    });
    onChange([
      newValue,
      newValue.map(i => optionsMap[i].indexCode),
      newValue.map(i => optionsMap[i].hidIndexCodes),
    ]);
  };

  return (
    <div>
      <Tag.CheckableTag
        checked={value?.[0]?.length === options.length}
        onChange={checked => {
          if (checked) handleChange(options.map(({ label }) => label));
          else handleChange([]);
        }}
      >
        全部
      </Tag.CheckableTag>
      {options.map(({ label }) => (
        <Tag.CheckableTag
          key={label}
          checked={value?.[0]?.includes(label)}
          onChange={checked => {
            const set = new Set(value?.[0]);
            if (checked) set.add(label);
            else set.delete(label);
            handleChange(Array.from(set));
          }}
        >
          {label}
        </Tag.CheckableTag>
      ))}
    </div>
  );
};

const Demo = () => {
  const form = useForm({
    logOnMount: info => console.log('onMount', info),
  });
  const [schema, setSchema] = useState({});

  const getRemoteData = () => {
    fakeApi('xxx/getForm').then(_ => {
      form.setValues({ input1: 'hello world', select1: 'c' });
    });
  };

  const test = {
    type: 'object',
    properties: {
      产出类: {
        title: '产出类',
        type: 'any',
        widget: 'SelectableTag',
        bind: ['产出类.selected', '产出类.indexCode', '产出类.hidIndexCodes'],
        props: {
          options: [
            {
              label: '酒店数',
              extra: { indexCode: 'ft_hotel_count_hh', hidIndexCodes: [] },
            },
            {
              label: 'Hid在店间夜',
              extra: {
                indexCode: 'ft_hid_checkin_jys_hh',
                hidIndexCodes: ['ft_hid_checkin_jys_hh'],
              },
            },
            {
              label: 'Shid在店间夜',
              extra: {
                indexCode: 'ft_shid_checkin_jys_hh',
                hidIndexCodes: ['ft_shid_checkin_jys_hh'],
              },
            },
            {
              label: 'Hid在店间夜占比',
              extra: {
                indexCode: 'ft_checkin_jys_rate_hh',
                hidIndexCodes: ['ft_checkin_jys_rate_hh'],
              },
            },
            {
              label: '流失在店间夜',
              extra: {
                indexCode: 'ft_checkin_jys_delta_hh',
                hidIndexCodes: ['ft_checkin_jys_delta_hh'],
              },
            },
          ],
        },
      },
      会员类: {
        title: '会员类',
        type: 'any',
        widget: 'SelectableTag',
        bind: ['会员类.selected', '会员类.indexCode', '会员类.hidIndexCodes'],
        props: {
          options: [
            {
              label: '会员价覆盖率',
              extra: {
                indexCode: 'ft_fz_merge_cover_rate_hh',
                hidIndexCodes: ['ft_fz_merge_status_hh'],
              },
            },
            {
              label: '菲住覆盖率',
              extra: {
                indexCode: 'ft_fz_cover_rate_hh',
                hidIndexCodes: ['ft_fz_cover_status'],
              },
            },
            {
              label: '粉丝覆盖率',
              extra: {
                indexCode: 'ft_fans_price_coupon_cover_rate_hh',
                hidIndexCodes: ['ft_fans_price_coupon_status'],
              },
            },
          ],
        },
      },
      价格类: {
        title: '价格类',
        type: 'any',
        widget: 'SelectableTag',
        bind: ['价格类.selected', '价格类.indexCode', '价格类.hidIndexCodes'],
        props: {
          options: [
            {
              label: '价格lose率（hid维度）',
              extra: {
                indexCode: 'ft_hid_not_mbr_lose_rate_hh',
                hidIndexCodes: ['ft_hid_not_mbr_lose_rate_hh'],
              },
            },
            {
              label: '价格lose率（shid维度）',
              extra: {
                indexCode: 'ft_shid_not_mbr_lose_rate_hh',
                hidIndexCodes: ['ft_shid_not_mbr_lose_rate_hh'],
              },
            },
            {
              label: '自动跟价覆盖率',
              extra: {
                indexCode: 'ft_auto_follow_price_cover_rate_hh',
                hidIndexCodes: [],
              },
            },
            {
              label: '自动跟价酒店lose率',
              extra: { indexCode: 'ft_auto_follow_lose_hh', hidIndexCodes: [] },
            },
            {
              label: '热销房型自动跟价覆盖率',
              extra: {
                indexCode: 'ft_auto_follow_price_hot_cover_rate_hh',
                hidIndexCodes: ['ft_auto_follow_price_hot_cover_rate_hh'],
              },
            },
            {
              label: '热销房型可售率（hid维度）',
              extra: {
                indexCode: 'ft_hid_hot_qwks_ratio_hh',
                hidIndexCodes: ['ft_hid_hot_qwks_ratio_hh'],
              },
            },
          ],
        },
      },
      库存类: {
        title: '库存类',
        type: 'any',
        widget: 'SelectableTag',
        bind: ['库存类.selected', '库存类.indexCode', '库存类.hidIndexCodes'],
        props: {
          options: [
            {
              label: '可售率GAP',
              extra: {
                indexCode: 'ft_hid_qwks_gap_hh',
                hidIndexCodes: ['ft_hid_qwks_gap_hh'],
              },
            },
            {
              label: '热销房型可售率（shid维度）',
              extra: {
                indexCode: 'ft_shid_hot_qwks_ratio_hh',
                hidIndexCodes: ['ft_shid_hot_qwks_ratio_hh'],
              },
            },
            {
              label: '酒店关房房型数量',
              extra: {
                indexCode: 'ft_hid_close_cnt_hh',
                hidIndexCodes: ['ft_hid_close_cnt_hh'],
              },
            },
            {
              label: '酒店关房率',
              extra: {
                indexCode: 'ft_hid_close_rate_hh',
                hidIndexCodes: ['ft_hid_close_rate_hh'],
              },
            },
            {
              label: '自动跟房覆盖率',
              extra: {
                indexCode: 'ft_auto_follow_price_cover_rate_hh',
                hidIndexCodes: ['ft_auto_follow_price_status_hh'],
              },
            },
            {
              label: '自动跟房间夜占比-在店',
              extra: {
                indexCode: 'ft_auto_follow_jys_rate_hh',
                hidIndexCodes: ['ft_auto_follow_jys_rate_hh'],
              },
            },
            {
              label: '自动调房酒店可售率',
              extra: {
                indexCode: 'ft_auto_follow_hot_qwks_rate_hh',
                hidIndexCodes: [],
              },
            },
            {
              label: '协保覆盖酒店数',
              extra: {
                indexCode: 'ft_allot_cover_hotel_cnt_hh',
                hidIndexCodes: ['ft_is_allot_cover_hh'],
              },
            },
            {
              label: '协保覆盖率',
              extra: {
                indexCode: 'ft_allot_cover_rate_hh',
                hidIndexCodes: ['ft_is_allot_cover_hh'],
              },
            },
            {
              label: '热销协保有效剩余数',
              extra: {
                indexCode: 'ft_hot_remain_allot_quota_hh',
                hidIndexCodes: ['ft_hot_remain_allot_quota_hh'],
              },
            },
            {
              label: '协保间夜',
              extra: {
                indexCode: 'ft_allot_jys_hh',
                hidIndexCodes: ['ft_allot_jys_hh'],
              },
            },
            {
              label: '协保间夜占比',
              extra: {
                indexCode: 'ft_allot_jys_rate_hh',
                hidIndexCodes: ['ft_allot_jys_rate_hh'],
              },
            },
            {
              label: '热销房型协保得房率',
              extra: {
                indexCode: 'ft_hot_allot_room_rate_hh',
                hidIndexCodes: ['ft_hot_allot_room_rate_hh'],
              },
            },
            {
              label: '不可售库存数',
              extra: {
                indexCode: 'ft_hot_not_ks_quota_cnt_hh',
                hidIndexCodes: ['ft_hot_not_ks_quota_cnt_hh'],
              },
            },
          ],
        },
      },
      工单类: {
        title: '工单类',
        type: 'any',
        widget: 'SelectableTag',
        bind: ['工单类.selected', '工单类.indexCode', '工单类.hidIndexCodes'],
        props: {
          options: [
            {
              label: '全量工单处理率',
              extra: {
                indexCode: 'ft_task_hdl_rate_hh',
                hidIndexCodes: ['ft_task_not_hdl_cnt_hh'],
              },
            },
            {
              label: '全量工单追回率',
              extra: {
                indexCode: 'ft_task_succ_rate_hh',
                hidIndexCodes: ['ft_task_not_hdl_cnt_hh'],
              },
            },
            {
              label: '价格工单处理率',
              extra: {
                indexCode: 'ft_price_task_hdl_rate_hh',
                hidIndexCodes: ['ft_price_task_not_hdl_cnt_hh'],
              },
            },
            {
              label: '价格工单追回率',
              extra: {
                indexCode: 'ft_price_task_succ_rate_hh',
                hidIndexCodes: ['ft_price_task_not_hdl_cnt_hh'],
              },
            },
            {
              label: '库存工单处理率',
              extra: {
                indexCode: 'ft_quota_task_hdl_rate_hh',
                hidIndexCodes: ['ft_quota_task_not_hdl_cnt_hh'],
              },
            },
            {
              label: '库存工单追回率',
              extra: {
                indexCode: 'ft_quota_task_succ_rate_hh',
                hidIndexCodes: ['ft_quota_task_not_hdl_cnt_hh'],
              },
            },
          ],
        },
      },
    },
  };

  useEffect(() => {
    setSchema(test);
  }, []);

  const onMount = () => {
    console.log(
      form,
      form.setValues({
        产出类: {
          selected: ['Hid在店间夜', 'Shid在店间夜'],
          indexCode: ['ft_hid_checkin_jys_hh', 'ft_shid_checkin_jys_hh'],
          hidIndexCodes: [
            ['ft_hid_checkin_jys_hh'],
            ['ft_shid_checkin_jys_hh'],
          ],
        },
      }),
      'onMount'
    );
    // form.setValues({ a: 1 });
  };

  const onFinish = (data, errors) => {
    console.log(data, 'data');
    if (errors.length > 0) {
      message.error(
        '校验未通过：' + JSON.stringify(errors.map(item => item.name))
      );
    } else {
      fakeApi('xxx/submit', data).then(_ => message.success('提交成功！'));
    }
  };

  const onValuesChange = (a, b) => {
    console.log(a, b);
  };

  return (
    <div>
      <FormRender
        debug
        form={form}
        schema={schema}
        widgets={{
          richText: RichTextEditor,
          SelectableTag,
        }}
        debug
        theme="1"
        onMount={onMount}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      />
      <Space>
        <Button onClick={getRemoteData}>加载服务端数据</Button>
        <Button type="primary" onClick={form.submit}>
          提交（见console）
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
