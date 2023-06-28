import React from 'react';
import { Button, Modal, message, Popconfirm } from 'antd';
import type { ButtonProps, ModalProps, PopconfirmProps } from 'antd';
import createIconFont from '../utils/createIconFont';
import { combineClass, isThenable } from '../utils/common';
import { debounce as debounceFunc } from 'lodash-es';
import './index.less';
const OriginModal: any = Modal;

interface FButtonProps extends ButtonProps {
  data: any;
  content: any;
  addons: Record<string, (...params: any) => any>;
  /** 事件类型 */
  eventType: string;
  /** 传入的方法配置 */
  method?:
    | string
    | {
        [key: string]: any;
        name: string;
      };
  /** 弹窗配置 */
  modal?: ModalProps & { type?: string; request?: any };
  /** 请求配置 */
  request?: any;
  /** 图标配置 */
  iconSetting?: ButtonProps['icon'] & {
    type?: any;
    style?: React.CSSProperties;
  };
  /** 是否开启异步方法自动 loading */
  autoLoading?: boolean;
  /** loading 时的文案 */
  loadingText?: string;
  /** 气泡确认框 */
  popConfirm?: Omit<PopconfirmProps, 'onConfirm'>;
  /** 防抖配置 */
  debounce?: {
    /** 需要延迟的毫秒数 */
    wait?: number;
    /** 指定在延迟开始前调用 */
    leading?: boolean;
    /** 设置函数允许被延迟的最大值 */
    maxWait?: number;
    /** 指定在延迟结束后调用 */
    trailing?: boolean;
  };
  autoLoding: boolean;
}

const FButton: React.FC<FButtonProps> = (props) => {
  const {
    data,
    addons,
    className,
    eventType,
    content,
    method,
    modal,
    href,
    request,
    type = 'link',
    target = '_blank',
    iconSetting,
    debounce,
    popConfirm,
    autoLoading,
    loadingText,
    ...otherProps
  } = props;

  const [loading, setLoading] = React.useState(false);

  // 发送请求
  const sendRequest = async (req: any) => {
    const { api, name, params: condition, config } = req;
    const params = {
      ...addons.getRequestParams(condition, { insideData: data }),
    };
    const requestFunc = addons.getMethod(name || 'request');
    const requestConfig = addons.getRequestConfig();

    const res = (await requestFunc(api, params, config, request)) || {};
    return res[requestConfig.dataKey];
  };

  // 打开弹窗
  const openModal = (modalData?: any) => {
    const {
      type = 'info',
      children,
      width = '640px',
      centered = true,
      okText = '关闭',
      ...modalProps
    } = modal || {};
    let contentWidth = width;
    if (width === '100%') {
      contentWidth =
        (document.documentElement.clientWidth || document.body.clientWidth || 675) - 80;
    }

    OriginModal[type]({
      icon: null,
      width: contentWidth,
      centered,
      okText,
      className: 'dr-button-modal',
      ...modalProps,
      content: addons.renderer({ schema: children, data: modalData, addons }),
    });
  };

  // 打开 iframe
  const openIframe = () => {
    const windowW = (document.documentElement.clientWidth || document.body.clientWidth || 675) - 80;
    const windowH =
      (document.documentElement.clientHeight || document.body.clientHeight || 715) * 0.8;
    Modal.info({
      icon: null,
      width: windowW,
      centered: true,
      okText: '关闭',
      content: <iframe width="100%" height={windowH} src={props.href} frameBorder="0" />,
    });
  };

  const apply = async (
    func: (...params: any) => any | ((...params: any) => Promise<any>),
    ...arg: any
  ) => {
    // popConfirm 自动处理了 Promise 方法，就不用自己处理了
    if (popConfirm) {
      return await func(...arg);
    }

    // Promise 方法自动 loading
    const returnValue = func(...arg);
    if (isThenable(returnValue) && autoLoading) {
      setLoading(true);
      return returnValue.then((res: any) => {
        setLoading(false);
        return res;
      });
    } else {
      return returnValue;
    }
  };

  const handleClick = async (ev: any) => {
    // 传人外置方法，实现按钮点击事件
    if (eventType === 'method') {
      const funcName = typeof method === 'string' ? method : method?.name;
      const func = addons.getMethod(funcName);
      await apply(func, data, method);
      return;
    }

    // 通过配置 API 请求协议，实现按钮点击事件
    if (eventType === 'request') {
      await apply(sendRequest, request);
      return;
    }

    // 打开弹窗
    if (eventType === 'modal') {
      const { request } = modal || {};
      if (request) {
        const result = await apply(sendRequest, request);

        if (!result) {
          return message.error('数据异常！');
        }

        openModal(result);
      } else {
        openModal(addons.getParentData());
      }
      return;
    }

    // 打开 Iframe
    if (eventType === 'iframe') {
      openIframe();
      return;
    }
  };

  const Icon = createIconFont(addons.getConfig().iconFontUrl);
  const iconContent = <Icon type={iconSetting?.type} style={iconSetting?.style} />;
  const debounceClick = React.useCallback(debounceFunc(handleClick, debounce?.wait, debounce), [
    method,
    addons,
    request,
    eventType,
    modal,
    href,
    debounce,
  ]);

  const onClick = debounce ? debounceClick : handleClick;
  const text = content || data;

  const buttonProps: ButtonProps = {
    className: combineClass('dr-button', className),
    type,
    target,
    href: eventType === 'iframe' ? undefined : href,
    ...otherProps,
    icon: iconSetting && iconContent,
    loading,
    onClick,
  };

  if (popConfirm) {
    delete buttonProps.onClick;
  }

  const button = <Button {...buttonProps}>{loading && !!loadingText ? loadingText : text}</Button>;

  if (popConfirm) {
    return (
      <Popconfirm {...popConfirm} onConfirm={onClick}>
        {button}
      </Popconfirm>
    );
  }

  return button;
};

export default FButton;
