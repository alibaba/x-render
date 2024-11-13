
import { useCallback, useState, useRef } from 'react';
import { Popover, Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
import { useShallow } from 'zustand/react/shallow';
import { useClickAway } from 'ahooks';
import { useSet } from '../../utils/hooks';
import IconView from '../../components/IconView';
import useStore from '../../store';
import './index.less';

const items: any['items'] = [
  {
    key: 'node',
    label: '节点',
  },
  {
    key: 'tools',
    label: '工具',
  }
];

const filterNodeList = (query: string, _nodeList: any[]) => {
  if (!query) {
    return _nodeList;
  }
  const searchTerm = query.toLowerCase();

  function searchNodes(nodes: any, results = []) {
    if (nodes.length === 0) {
      return results;
    }

    const [currentNode, ...restNodes] = nodes;
    let newResults: any = [...results];

    if (currentNode.title.toLowerCase().includes(searchTerm)) {
      newResults.push(currentNode);
    } else if (currentNode.type === 'group' && currentNode.items) {
      const matchingItems = searchNodes(currentNode.items);
      if (matchingItems.length > 0) {
        newResults.push({ ...currentNode, items: matchingItems });
      }
    }

    return searchNodes(restNodes, newResults);
  }

  return searchNodes(_nodeList);
};

const NodeInfo = ({ icon, title, description }: any) => {
  return (
    <div className='node-info-tooltip'>
      <div className='icon-box-max' style={{ background: icon.bgColor, marginRight: '8px' }}>
        <IconView type={icon.type} style={{ color: '#fff', fontSize: 13, ...icon?.style }} />
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

const SelectNodeView = ({ onCreate, nodeMenus, containerRef }: any) => {

  const [state, setState] = useSet({
    nodeType: 'node',
    nodeList: [...nodeMenus]
  });
  const { nodeType, nodeList } = state;

  const handleSearchCange = (ev: any) => {
    if (nodeType === 'node') {
      setState({ nodeList: filterNodeList(ev.target.value, nodeMenus)})
    } else if (nodeType === 'tools') {
      // todo 可能要调用接口查询了
    }
  };

  return (
    <div className='fai-reactflow-addblock' ref={containerRef}>
      <div style={{ margin: '0 5px' }}>
        <Input
          placeholder={`搜索${nodeType === 'node' ? '节点' : '工具'}`}
          onChange={handleSearchCange}
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <Tabs 
          defaultActiveKey='node' 
          items={items}
          size='small'
          onChange={type => setState({ nodeType: type })}
          style={{ padding: '0 5px' }}
        />
        {nodeType === 'node' ? (
          <div>
            {nodeList.map((item: any) => item.type === 'group' ? (
              <div key={item.type}>
                <div>{item.title}</div>
                {item.items.map(({ icon, title }: any, index: number) => (
                  <div key={index} className='node-item' onClick={(ev: any) => onCreate(ev, item.type)}>
                    <IconView type={icon.type} style={{ fontSize: 20 }} />
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <Popover title={<NodeInfo {...item}/>} placement='right' arrow={false} key={item.type}>
                <div className='node-item' onClick={(ev: any) => onCreate(ev, item.type)}>
                  <span className='icon-box' style={{ background: item.icon.bgColor, marginRight: '8px' }}>
                    <IconView type={item.icon.type} style={{ color: '#fff', fontSize: 13, ...item?.icon?.smallStyle }} />
                  </span>
                  <span>{item.title}</span>
                </div>
              </Popover>
            ))}
          </div>
        ) : (
          <div>工具数据</div>
        )}
      </div>
    </div>
  )
};

export default (props: any) => {
  const { addNode, children, placement='top' } = props;

  const ref = useRef<HTMLButtonElement>(null);
  const closeRef: any = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const {
    nodeMenus,
  } = useStore(
    useShallow((state) => ({
      nodeMenus: state.nodeMenus,
    }))
  );

  useClickAway(() => {
    if (closeRef.current) {
      setOpen(false);
      closeRef.current = false;
    }
  }, ref);

  const handAddNode = useCallback<any>((ev: any, type: any) => {
    ev.stopPropagation(); // 阻止事件冒泡
    addNode({ node: type });
    setOpen(false);
  }, []);

  return (
    <Popover
      content={<SelectNodeView onCreate={handAddNode} nodeMenus={nodeMenus} containerRef={ref}/>} 
      zIndex={1000}
      trigger='click'
      arrow={false}
      open={open}
      overlayInnerStyle={{ padding: '12px 6px' }}
      placement={placement}
      onOpenChange={() => {
        setTimeout(() => {
          closeRef.current = true;
          setOpen(true);
        }, 50)
      }}
    >
      {children}
    </Popover>
  );
}