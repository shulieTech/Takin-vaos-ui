import G6 from '@antv/g6';

export const getLabelMaxLength = label => {
  const enLength = getLabelCnNum(label);
  let result = 0;
  if (!enLength) {
    result = 24;
  } else if (enLength < 6) {
    result = 16;
  } else {
    result = 10;
  }
  return result;
};

export const getLabelCnNum = label => {
  let len = 0;
  if (!label) {
    return 0;
  }
  for (let i = 0; i < label.length; i = i + 1) {
    if (label.charCodeAt(i) > 127 || label.charCodeAt(i) === 94) {
      len += 1;
    }
  }
  return len;
};

export const getEdgeType = item => {
  if (item.source === item.target) {
    return 'loop';
  }
  return 'cubic-horizontal';
  // return 'polyline';
  // return 'quadratic-label-edge';
};

export const getOffset = ({ id, source, target, edges }) => {
  const repeatList = edges.filter(
    item => item.source === source && item.target === target
  );
  /** @name 没有重复，判断是否双向调用 */
  if (repeatList.length === 1) {
    const isBoth = edges.find(
      item => item.source === target && item.target === source
    );
    if (isBoth) {
      return 50;
      // return 80;
    }
    return 0;
  }
  /** @name 重复，初始值80，累加140 */
  const index = repeatList.findIndex(item => item.id === id);
  return index * 90 + 100;
  // return index * 180 + 100;
};

/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
export const fittingString = (
  str: string = '',
  maxWidth: number,
  fontSize: number
) => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) {
      return;
    }
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};