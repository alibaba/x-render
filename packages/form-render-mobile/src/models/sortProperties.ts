export default (properties, orderKey = 'order') => {
  const orderHash = new Map();
  // order不为数字的数据
  const unsortedList = [];
  const insert = item => {
    const [, value] = item;
    if (typeof value[orderKey] !== 'number') {
      unsortedList.push(item);
      return;
    }
    if (orderHash.has(value[orderKey])) {
      orderHash.get(value[orderKey]).push(item);
    } else {
      orderHash.set(value[orderKey], [item]);
    }
  };

  properties.forEach(item => insert(item));
  const sortedList = Array.from(orderHash.entries())
    .sort(([order1], [order2]) => order1 - order2) // order值越小越靠前
    .flatMap(([, items]) => items);
  return sortedList.concat(unsortedList);
}