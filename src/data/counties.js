/**
 * 县区列表，作为唯一数据源
 * key: 用于路由和内部逻辑
 * label: 用于界面显示
 */
export const countyOptions = [
  { key: 'tunxi', label: '屯溪区' },
  { key: 'xiuning', label: '休宁县' },
  { key: 'huangshan', label: '黄山区' },
  { key: 'shexian', label: '歙县' },
  { key: 'huizhou', label: '徽州区' },
  { key: 'yixian', label: '黟县' },
  { key: 'qimen', label: '祁门县' }
];

/**
 * 将县区列表转换为 键-标签 映射，方便查找
 * @returns {Object.<string, string>}
 */
export const countyMap = countyOptions.reduce((acc, curr) => {
  acc[curr.key] = curr.label;
  return acc;
}, {});