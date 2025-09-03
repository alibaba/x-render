import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

// 修复 dayjs 生成配置中缺失的毫秒相关方法
const enhancedDayjsConfig = {
  ...dayjsGenerateConfig,
  // 添加缺失的毫秒相关方法
  getMillisecond: (date: any) => date.millisecond(),
  setMillisecond: (date: any, millisecond: number) => date.millisecond(millisecond),
};

const DatePicker: any = generatePicker(enhancedDayjsConfig);

export default DatePicker;
