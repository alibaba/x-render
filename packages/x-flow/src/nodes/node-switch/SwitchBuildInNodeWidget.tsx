import { Space,Typography } from 'antd';
import React, { memo } from 'react';

export default memo((props: any) => {
  const { data } = props;
  return <Space direction='vertical' size={19} style={{width:"100%"}}>
    {(data?.switchData || [])?.map(item => <Typography.Text style={{ width: '100%', backgroundColor:'#f2f4f7'}} ellipsis={{tooltip:item?.value}}>
      {item?.value}
    </Typography.Text>)}
  </Space>
});
