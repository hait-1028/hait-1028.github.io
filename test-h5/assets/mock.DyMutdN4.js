// ================== 盘点执行 APP 模拟数据（任务/结果/档案，页面间共享可变单例） ==================

const taskList = [
  { id: 't1', name: '1季度资产盘点', method: '扫码盘点', users: ['超级管理员'], planRange: ['2026-03-01', '2026-03-31'], settings: { photoOnly: true, scanOnly: true }, status: '盘点中' },
  { id: 't2', name: '仓库存货专项盘点', method: 'RFID', users: ['周凯'], planRange: ['2026-05-10', '2026-05-20'], settings: { photoOnly: false, scanOnly: false }, status: '已完成' },
  { id: 't3', name: '办公设备手动盘点', method: '手动盘点', users: ['吴婷', '冯雪'], planRange: ['2026-08-01', '2026-08-15'], settings: { photoOnly: true, scanOnly: false }, status: '盘点中' },
];

function getTask(id) {
  return taskList.find((t) => t.id === id) || taskList[0];
}

// ===== 现存标准型号（新增盘盈时可选） =====
const archiveList = [
  { id: 'a1', code: 'A02010101', name: '台式计算机', category: '计算机', unit: '台', brand: '联想', model: 'ThinkCentre M75', supplier: '联想授权经销商', refPrice: 4500 },
  { id: 'a2', code: 'A02021001', name: '激光打印机', category: '打印机', unit: '台', brand: '惠普', model: 'LaserJet Pro M405', supplier: '惠普金牌服务商', refPrice: 2300 },
  { id: 'a3', code: 'A05010201', name: '办公桌椅', category: '台、桌类', unit: '套', brand: '震旦', model: 'ZD-D120', supplier: '震旦直营门店', refPrice: 1200 },
  { id: 'a4', code: 'A02010201', name: '显示器', category: '显示器', unit: '台', brand: '华为', model: 'ZQE-CBA', supplier: '华为专卖店', refPrice: 2199 },
];

// ===== 盘点结果（tab = 未盘/已盘/盘盈/盘亏/存疑；含台账基础信息供执行盘点核对） =====
function item(id, code, name, category, location, tab, extra = {}) {
  return {
    id, assetCode: code, assetName: name, category, location, tab,
    remark: '', photos: 0, tags: [], source: '',
    status: '在用', user: '', brand: '', model: '',
    ...extra,
  };
}

const uncheckedExtra = {
  u01: { user: '吴婷', brand: '震旦', model: 'ZD-D120' },
  u02: { user: '周凯' },
  u04: { user: '冯雪', brand: '华为', model: 'ZQE-CBA' },
  u06: { user: '周凯', brand: '爱普生', model: 'CB-X06' },
  u09: { brand: '惠普', model: 'LaserJet Pro M405' },
  u13: { brand: '佳能', model: 'iR-2630' },
};

const unchecked = [
  ['u01', 'ZC-2026-0004', '办公桌椅', '台、桌类', '办公室201'],
  ['u02', 'ZC-2026-0005', '会议转椅', '椅凳类', '会议室301'],
  ['u03', 'ZC-2026-0006', '空气净化器', '空气净化器', '办公室202'],
  ['u04', 'ZC-2026-0007', '显示器', '显示器', '办公室201'],
  ['u05', 'ZC-2026-0008', '空气净化器', '空气净化器', '办公室203'],
  ['u06', 'ZC-2026-0009', '投影仪', '投影仪', '会议室301'],
  ['u07', 'ZC-2026-0010', '电视', '电视', '活动室101'],
  ['u08', 'ZC-2026-0011', '电视', '电视', '活动室101'],
  ['u09', 'ZC-2026-0012', '激光打印机', '打印机', '文印室201'],
  ['u10', 'ZC-2026-0013', '显示器', '显示器', '办公室202'],
  ['u11', 'ZC-2026-0014', '激光打印机', '打印机', '财务科201'],
  ['u12', 'ZC-2026-0015', '显示器', '显示器', '办公室203'],
  ['u13', 'ZC-2026-0016', '复印机', '复印机', '文印室201'],
  ['u14', 'ZC-2026-0017', '笔记本电脑', '计算机', '办公室202'],
  ['u15', 'ZC-2026-0018', '路由器', '网络设备', '机房101'],
  ['u16', 'ZC-2026-0019', '投影仪', '投影仪', '会议室302'],
  ['u17', 'ZC-2026-0020', '办公桌椅', '台、桌类', '办公室203'],
];

const taskResults = {
  t1: [
    item('r01', 'ZC-2026-0001', '台式计算机', '计算机', '办公室201', '已盘', { remark: '扫码盘点正常', photos: 1, user: '超级管理员', brand: '联想', model: 'ThinkCentre M75' }),
    ...unchecked.map(([id, code, name, category, location]) => item(id, code, name, category, location, '未盘', uncheckedExtra[id] || {})),
    item('ry1', 'ZC-2026-0901', '显示器（未入账）', '显示器', '办公室201', '盘盈', { source: '手动录入', remark: '现场发现未入账显示器一台' }),
    item('rk1', 'ZC-2026-0002', '办公桌椅', '台、桌类', '办公室202', '盘亏', { remark: '现场未找到实物' }),
    item('rq1', 'ZC-2026-0003', '激光打印机', '打印机', '文印室201', '存疑', { tags: ['图片不清晰'], remark: '待复盘确认' }),
  ],
  t2: [
    item('s01', 'ZC-2026-0002', '办公桌椅', '台、桌类', '中心仓库', '已盘', { remark: 'RFID 批量读取' }),
    item('s02', 'ZC-2026-0005', '会议转椅', '椅凳类', '中心仓库', '已盘', { remark: 'RFID 批量读取' }),
    item('s03', 'ZC-2026-0008', '空气净化器', '空气净化器', '分仓库A', '已盘', { remark: 'RFID 批量读取' }),
  ],
  t3: [
    item('m01', 'ZC-2026-0001', '台式计算机', '计算机', '办公室201', '已盘', { remark: '实物与台账一致', photos: 1 }),
    item('m02', 'ZC-2026-0003', '激光打印机', '打印机', '文印室201', '未盘'),
    item('m03', 'ZC-2026-0014', '激光打印机', '打印机', '财务科201', '未盘'),
    item('m04', 'ZC-2026-0017', '笔记本电脑', '计算机', '办公室202', '未盘'),
  ],
};

function getTaskResults(taskId) {
  return taskResults[taskId] || [];
}

// ===== 存疑标签选项 =====
const doubtTagOptions = ['图片有误', '人员出差', '电脑在家', '图片不清晰'];

// ================== 普通用户个人资产与自主点验 ==================
const currentPersonalUser = {
  id: 'u-wang-xiaoming',
  name: '王小明',
  department: '综合科',
  role: '普通用户',
};

const personalAssetList = [
  { id: 'pa01', code: 'ZC-2026-0001', name: '台式计算机', category: '计算机', location: '北京 / 丰台区 / A单位 / 1栋 / 2层 / 办公室201', status: '在用', sn: 'SN20260101001', rfid: 'E2003412', userId: 'u-wang-xiaoming', userName: '王小明', department: '综合科' },
  { id: 'pa02', code: 'ZC-2026-0004', name: '办公桌椅', category: '台、桌类', location: '北京 / 丰台区 / A单位 / 1栋 / 2层 / 办公室201', status: '在用', sn: 'SN20260101004', rfid: 'E2003415', userId: 'u-wang-xiaoming', userName: '王小明', department: '综合科' },
  { id: 'pa03', code: 'ZC-2026-0010', name: '显示器', category: '显示器', location: '北京 / 丰台区 / A单位 / 1栋 / 2层 / 办公室201', status: '维保中', sn: '', rfid: 'E2003421', userId: 'u-wang-xiaoming', userName: '王小明', department: '综合科' },
];

const personalCheckList = [
  { id: 'pc01', assetId: 'pa01', result: '正常', remark: '设备在工位正常使用', checkedAt: '2026-08-10 09:20' },
  { id: 'pc02', assetId: 'pa02', result: '正常', remark: '', checkedAt: '2026-07-22 14:10' },
];

export { personalCheckList as a, getTask as b, currentPersonalUser as c, doubtTagOptions as d, archiveList as e, taskResults as f, getTaskResults as g, personalAssetList as p, taskList as t };
