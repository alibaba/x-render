const vscode = acquireVsCodeApi();

export const vsemit = (type, body) => {
  vscode.postMessage({
    type,
    body,
  });
};

export const vson = (type, callback) => {
  window.addEventListener('message', event => {
    const message = event.data;

    if (message.type === type) {
      callback(message.body);
    }
  });
};
