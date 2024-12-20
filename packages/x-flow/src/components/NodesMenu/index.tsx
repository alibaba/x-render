import React, { forwardRef, Ref, useContext, useMemo } from 'react';
import { Popover, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ConfigContext } from '../../models/context';
import { useSet } from '../../utils/hooks';
import createIconFont from '../../utils/createIconFont';
import { TNodeMenu } from '../../types';
import './index.less';

// 检索节点
const searchNodeList = (query: string, list: any[]) => {
  if (!query) {
    return list;
  }
  const searchTerm = query.toLowerCase();

  function searchList(nodes: any, preResult = []) {
    if (nodes.length === 0) {
      return preResult;
    }

    const [currentNode, ...restNodes] = nodes;
    let result: any = [...preResult];

    if (currentNode.title.toLowerCase().includes(searchTerm)) {
      result.push(currentNode);
    } else if (currentNode?.type === '_group' && currentNode.items) {
      const matchingItems = searchList(currentNode.items);
      if (matchingItems.length > 0) {
        result.push({ ...currentNode, items: matchingItems });
      }
    }
    return searchList(restNodes, result);
  }
  return searchList(list);
};

// 悬浮菜单项详细描述
export const MenuTooltip = ({ icon, title, description, iconFontUrl, iconSvg }: any) => {
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <div className='xflow-node-menu-tooltip'>
      <div className='icon-box-max' style={{ background: icon?.bgColor || '#F79009', marginRight: '8px' }}>
        {iconSvg ? iconSvg :<IconBox type={icon?.type} style={{ color: '#fff', fontSize: 13, ...icon?.style }} />}
      </div>
      <div className='title'>
        {title}
      </div>
      <div className='description'>
        {description}
      </div>
    </div>
  )
};

// 节点菜单项
const MenuItem = (props: any) => {

  const { title, type, icon, onClick, iconFontUrl, iconSvg } = props;
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <Popover
      key={type}
      content={<MenuTooltip {...props} />}
      placement='right'
      arrow={false}
      getPopupContainer={() => document.getElementById('xflow-container') as HTMLElement}
    >
      <div
        className='menu-item'
        onClick={onClick(type)}
      >
        <span className='icon-box' style={{ background: icon?.bgColor || '#F79009', marginRight: '8px' }}>
          {iconSvg ? iconSvg :
            <IconBox
            type={icon?.type}
            style={{ color: '#fff', fontSize: 13 }}
            />}
        </span>
        <span>{title}</span>
      </div>
    </Popover>
  );
};

// 过滤 hidden 节点
const filterHiddenMenu = (list: any) => {
  return (list || []).filter((item: any) => !item.hidden)
}

/**
 *
 * 节点菜单List
 *
 */
const NodesMenu = (props: TNodeMenu, ref: Ref<HTMLDivElement>) => {
  const { items, showSearch, onClick } = props;
  const { iconFontUrl } = useContext(ConfigContext);

  const [state, setState] = useSet({
    menuList: [...items]
  });
  const { menuList } = state;

  const handleItemClick = (type: string) => (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    onClick({ type });
  }

  const handleSearch = (ev: any) => {
    setState({ menuList: searchNodeList(ev.target.value, items) })
  };

  return (
    <div className='xflow-node-menu' ref={ref}>
      {!!showSearch && (
        <div style={{ margin: '5px 9px 9px' }}>
          <Input
            placeholder='搜索节点'
            onChange={handleSearch}
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
            style={{ width: '100%' }}
          />
        </div>
      )}
      <div>
        {filterHiddenMenu(menuList).map((item: any, index: number) => item.type === '_group' ? (
          <div key={`${item.type}-${index}`}>
            <div className='menu-group-title'>{item.title}</div>
            {filterHiddenMenu(item.items).map((data: any, index: number) => (
              <MenuItem
                iconFontUrl={iconFontUrl}
                {...data}
                onClick={handleItemClick}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div key={`${item.type}-${index}`}>
            <MenuItem
              iconFontUrl={iconFontUrl}
              {...item}
              onClick={handleItemClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(NodesMenu);
