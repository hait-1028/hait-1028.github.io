import { s as showToast$1 } from './index-DsfVUykM.js';

const showToast = (text = '', icon = 'none', options) => {
  showToast$1({
    title: text,
    icon,
    duration: 2000,
    mask: options?.mask ?? icon !== 'none',
  });
};

export { showToast as s };
