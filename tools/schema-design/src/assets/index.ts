import config from "./config";

const getAssets = (settings: any) => {
  const { components, ...rest  } = config;

  const componentMap: any = {};
  components.forEach((item: any, index: number) => {
    componentMap[item.componentName] = index;
  });

  Object.keys(settings).forEach((key: any)=> {
    const item = settings[key];
    const index = componentMap[item.componentName];
    if (!index && index !== 0) {
      components.push(item);
      return;
    }
    components.splice(index, 1, item);
  });

  const componentList: any = [];
  const categoryMap: any = {};

  components.forEach((item: any) => {
    let index = categoryMap[item.category];
    if (!index && index !== 0) {
      index = componentList.length;
      categoryMap[item.category] = index;
      componentList.push({
        title: item.category,
        children: []
      });
    }

    componentList[index].children.push({
      componentName: item.componentName,
      snippets: item.snippets,
      sort: {
        category: item.category,
        group: item.group,
        priority: item.priority
      }
    })
  });

  return {
    ...rest,
    components,
    componentList
  }
}

export default getAssets;