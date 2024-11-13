import { AnyObject } from 'antd/es/_util/type';
import { Node } from '@antv/x6';
import { ICard, colorMap } from './constant';

const getItemStatus = (item: ICard) => {
  const { debugging, result } = item;
  let status = 'default';

  if (debugging) {
    status = 'running';
  } else if (result?.error) {
    status = 'failed';
  } else if (result) {
    status = 'success';
  }
  return status;
};
interface ICell extends Node {
  code: string;
}

export const getInitGraphData = (inputItem: ICard, outputItem: ICard) => [
  {
    id: inputItem._id,
    code: inputItem.code,
    shape: 'dag-node',
    x: 290,
    y: 110,
    data: {
      label: inputItem.code,
      status: 'default',
      borderColor: '#5e606a',
      icon: 'icon-input',
    },
    ports: [
      {
        id: `${inputItem._id}-bottom-port`,
        group: 'bottom',
      },
    ],
  },
  {
    id: outputItem._id,
    // code后端需要
    code: outputItem.code,
    shape: 'dag-node',
    x: 290,
    y: 110 + 120,
    data: {
      label: outputItem.code,
      status: 'default',
      borderColor: '#5e606a',
      icon: 'icon-output',
    },
    ports: [
      {
        id: `${outputItem._id}-top-port`,
        group: 'top',
      },
    ],
  },
];

export class GraphNode {
  // 图数据的增删改查
  cells: ICell[];
  instance: any;

  constructor(cells: ICell[], instance?: any) {
    this.cells = cells;
    this.instance = instance;
  }
  addCell(node: ICard, flowList: ICard[]) {
    const graphCells = this.cells;
    const outputIndex = graphCells.findIndex(
      (el: any) => el.id.toLowerCase() === 'output',
    );
    const output = graphCells.splice(outputIndex, 1)[0];
    graphCells.push({
      id: node._id || node.code,
      code: node.code,
      shape: 'dag-node',
      x: flowList.length % 2 === 1 ? 300 : 280,
      y: 110 + 120 * flowList.length,
      data: {
        label: node.code,
        status: getItemStatus(node),
        borderColor: colorMap[node.type]?.borderColor,
        icon: colorMap[node.type]?.icon,
      },
      ports: {
        items: [
          {
            id: `${node._id}-top-port`,
            group: 'top',
          },
          {
            id: `${node._id}-bottom-port`,
            group: 'bottom',
          },
        ],
      },
    });
    if (!output) return;
    output.y = 110 + 120 * (flowList.length + 1);
    graphCells.push(output);
  }
  addCells(nodes: ICard[], flowList: ICard[]) {
    nodes.forEach((node, index) => {
      this.addCell(
        node,
        flowList.slice(0, flowList.length - nodes.length + index + 1),
      );
    });
  }
  removeCell(node: ICard) {
    this.instance.removeCell(node._id);
  }
  updateCellLabel(node: ICard, val: string) {
    const graphCells = this.cells;
    const index = graphCells.findIndex((el: any) => el.id === node._id);
    graphCells[index].data.label = val;
    graphCells[index].code = val;
  }

  updateCellStatus(node: ICard, status: string) {
    // const graphCells = this.cells;
    // const index = graphCells.findIndex(
    //   (el: any) => el.id === node._id || el.code === node._id,
    // );
    // if (index !== -1) {
    //   graphCells[index].data.status = status;
    // }
    const curNode = this.instance.getCellById(node._id);
    if (!curNode) {
      console.log('err,cannot find node');
      return;
    }
    const data = curNode.getData();
    curNode.setData({
      ...data,
      status,
    });
  }

  updateAllCellStatus(status: string) {
    const graphCells = this.cells;

    graphCells.forEach((el: any) => {
      if (el.shape === 'dag-node' && el.id !== 'Input' && el.id !== 'Output') {
        el.data.status = status;
      }
    });
  }
  getCell() {
    return this.cells;
  }
}

export const generateGraphByNodes = (devVersion: any) => {
  // 根据 nodes 生成图表节点
  const graphIns = new GraphNode([]);
  const nodes = devVersion.nodes || [];

  nodes.forEach((item: any, index: number) => {
    graphIns.addCell(item, new Array(index));
  });
  let graphCells = graphIns.getCell();
  const inputNode = graphCells.find(
    (item: any) => item.id.toLowerCase() === 'input',
  ) as any;
  const outputNode = graphCells.find(
    (item: any) => item.id.toLowerCase() === 'output',
  ) as any;
  if (outputNode) {
    outputNode.ports.items = outputNode.ports.items.filter((el: any) => {
      return el.group !== 'bottom';
    });
  }
  if (inputNode) {
    inputNode.y = graphCells?.[0].y - 120;
    inputNode.ports.items = inputNode.ports.items.filter((el: any) => {
      return el.group !== 'top';
    });

    graphCells = graphCells.filter(
      (item: any) => item.id.toLowerCase() !== 'input',
    );
    graphCells.unshift(inputNode);
  }
  return graphCells;
};

type IMap = AnyObject;
const typeMap: IMap = {
  string: 'STRING',
  number: 'INTEGER',
  object: 'OBJECT',
  array: 'ARRAY',
  boolean: 'BOOLEAN',
};
const getParamType = (param: any) => {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
};
export const formatObj2Arr = (obj: any) => {
  return Object.entries(obj).map((item) => {
    return {
      name: item[0] === 'undefined' ? '' : item[0],
      value: item[1] ?? '',
      dataType: typeMap[getParamType(item[1])] ?? 'STRING',
    };
  });
};

export const formatArr2Obj = (arr: any) => {
  return arr.reduce((pre: AnyObject, cur: { name: string; value: string }) => {
    pre[cur.name] = cur.value;
    return pre;
  }, {});
};

export function extractFencedCodeBlock(text: string, language: string) {
  const regex = new RegExp(`\`\`\`${language}([^]*?)\`\`\``, 'gi');
  let match;
  let results = [];

  while ((match = regex.exec(text)) !== null) {
    results.push(match[1].trim());
  }

  return results.length > 0 ? results.join('\n') : text;
}

export function typewriter(
  text: string,
  callback: (text: string) => void,
  typingSpeed = 30,
) {
  let currentIndex = -1;
  let currentText = '';

  const type = () => {
    if (currentIndex < text.length - 1) {
      currentIndex++;
      currentText += text[currentIndex];
      callback(currentText);
      setTimeout(type, typingSpeed);
    }
  };

  type();
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isNodeConnected(edges: any, nodeId: string) {
  return edges.some((edge: any) => {
    const source = edge.source.cell;
    const target = edge.target.cell;
    return source === nodeId || target === nodeId;
  });
}
