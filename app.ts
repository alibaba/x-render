window.publicPath = '/';

if (location.origin.includes('gitee')) {
  location.href = 'https://xrender.fun/';
}

if (location.origin.includes('alibaba')) {
  window.publicPath = '/x-render/';
}
