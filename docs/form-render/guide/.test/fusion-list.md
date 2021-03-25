## 0.8.9

长列表会自动分页, 可通过 `ui:options/pageSize` 来控制每页展示数量

```jsx
import React from 'react';
import FR from '../demo/FR/index.jsx';
import json from '../demo/new-feature/pagination.json';

export default () => <FR schema={json} />;
```