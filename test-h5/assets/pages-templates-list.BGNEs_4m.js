import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, E as reactive, c as computed, z as onLoad, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, J as __easycom_2, e as __easycom_1, A as __easycom_5, O as __easycom_6, B as __easycom_7, o as openBlock, l as renderList, n as normalizeClass, h as index$i, j as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode, S as ScrollView, C as normalizeStyle, p as withModifiers } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 页面参数 ======
const pageSize = 10;


const _sfc_main = {
  __name: 'list',
  setup(__props) {

/**
 * 列表页模板 — Tab + 搜索 + 筛选 + 多字段排序 + 卡片列表 + 下拉刷新 + 上拉加载
 *
 * 适用场景：订单列表、客户列表、工单列表、审批列表等
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  导航栏：标题                             │
 * │  ← 左右滑动切 Tab ─────────────────────→ │
 * │  [Tab 1＝] [Tab 2] [Tab 3]                │  ← 等分、无下划线
 * │  ┌─ 搜索 + 筛选按钮 ─────────────────────┐│
 * │  │ [🔍 搜索内容]              [筛选]     ││
 * │  └──────────────────────────────────────┘│
 * │  ┌─ 排序栏（白色背景）───────────────────┐│
 * │  │ [预约时间 ▲▼]  [车辆数 ▲▼]            ││  ← 多字段、三态切换
 * │  └──────────────────────────────────────┘│
 * │                                          │
 * │  ┌─ 列表卡片 ──────────────────────────┐│
 * │  │ NO.20240806...           [待派车]    ││  ← 标题行 + 状态标签
 * │  │ [企业客户] [客户下单]                 ││  ← 业务标签
 * │  │ 客户名称        这里是客户名称...     ││  ← 字段行
 * │  │ 用车人          周文文                ││
 * │  │ 车辆数          3辆                   ││
 * │  │ 预约开始时间    2025-11-23 17:15:00   ││
 * │  │ 客户经理        李经理                ││
 * │  │ ─────────────────────────────────── ││
 * │  │              [重新派车] [确认完成]    ││  ← 底部操作按钮（可选）
 * │  └──────────────────────────────────────┘│
 * │                                          │
 * │  ● 下拉刷新 → 回到顶部重新加载            │
 * │  ● 上拉触底 → 加载下一页（无更多时停止）  │
 * │  ● 空数据 → <u-empty> 暂无数据           │
 * └─────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  功能清单（全部可选，按需删减）            ║
 * ║  ├─ Tab 切换：点击 + 左右滑动            ║
 * ║  ├─ 搜索：关键词匹配多字段               ║
 * ║  ├─ 筛选：底部弹框 + 标签芯片            ║
 * ║  ├─ 排序：多字段三态切换（null/asc/desc） ║
 * ║  ├─ 卡片操作按钮：每条独立配置            ║
 * ║  ├─ 下拉刷新：scroll-view refresher      ║
 * ║  ├─ 上拉加载：scroll-view scrolltolower  ║
 * ║  └─ 空状态：<u-empty>                   ║
 * ╚═══════════════════════════════════════════╝
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名放入 demo/{分类}/
 *   2. 修改 listData 字段 → 匹配业务 Model
 *   3. 按需删减 tabs / sortFields / actions 配置
 *   4. 替换 TODO(api) 处为 @/api 真实接口
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - mc-navbar 导航栏（easycom 自动注册）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 */

const pageTitle = ref('客户订单');

// ====== Tab 切换（可选）======
const tabs = ['企业包车', '企业自驾', '企业长租'];
const activeTab = ref(0);
const onTabChange = (idx) => {
  if (idx === activeTab.value || idx < 0 || idx >= tabs.length) return;
  activeTab.value = idx;
  // TODO(api): 根据分类切换重新拉取列表
  loadList(true);
};

// 左右滑动切换 Tab
const touchStartX = ref(0);
const onTouchStart = (e) => { touchStartX.value = e.touches[0].clientX; };
const onTouchEnd = (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX.value;
  if (Math.abs(delta) > 100) {
    onTabChange(delta < 0 ? activeTab.value + 1 : activeTab.value - 1);
  }
};

// ====== 搜索 ======
const searchKeyword = ref('');
const onSearch = () => {
  // TODO(api): 触发搜索
  loadList(true);
};

// ====== 筛选弹框（底部弹框 + 标签芯片） ======
const showFilter = ref(false);
const filterSections = reactive([
  {
    title: '状态',
    key: 'status',
    type: 'chip',
    options: [
      { label: '全部', value: '' },
      { label: '待派车', value: 'pending' },
      { label: '已派车', value: 'dispatched' },
      { label: '服务中', value: 'serving' },
      { label: '已完成', value: 'completed' },
    ],
    selected: '',
  },
]);

computed(() => {
  const sec = filterSections[0];
  if (!sec.selected) return '全部';
  const opt = sec.options.find((o) => o.value === sec.selected);
  return opt ? opt.label : '全部';
});

const onFilterOpen = () => { showFilter.value = true; };

const onFilterReset = () => {
  filterSections.forEach((s) => { s.selected = s.multiple ? [] : ''; });
};

const onFilterConfirm = () => {
  showFilter.value = false;
  // TODO(api): 根据 filterSections 的选中值重新拉取列表
  loadList(true);
};

const onFilterClose = () => { showFilter.value = false; };

// ====== 排序（可选，支持多字段）======
const sortFields = ref([
  { key: 'appointTime', label: '预约开始时间', order: null },
  { key: 'vehicleCount', label: '车辆数', order: null },
]);
const onSortToggle = (field) => {
  // 切换当前字段：null → 'asc' → 'desc' → null
  if (field.order === null) {
    field.order = 'asc';
  } else if (field.order === 'asc') {
    field.order = 'desc';
  } else {
    field.order = null;
  }
  // 重置其他字段
  sortFields.value.forEach((f) => {
    if (f.key !== field.key) f.order = null;
  });
  // TODO(api): 触发排序
  loadList(true);
};

// ====== 列表数据 ======
const listData = ref([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
const statusMap = {
  pending: { text: '待派车', color: 'var(--ml-color-warning)' },
  dispatched: { text: '已派车', color: 'var(--ml-color-brand)' },
  serving: { text: '服务中', color: 'var(--ml-color-success)' },
  completed: { text: '已完成', color: 'var(--ml-color-text-secondary)' },
};

// 模拟数据池（不同 Tab 不同数据）
const names = ['周文文', '李明', '王小燕', '张三', '赵六', '刘洋', '陈静', '孙伟', '黄丽', '林峰', '吴芳', '郑刚', '马超', '徐蕾', '何亮', '杨帆', '丁磊', '胡霞', '朱敏', '唐新'];
const managers = ['李经理', '王经理', '张经理', '赵经理', '陈经理', '刘主管', '孙主管', '黄主管', '林主管', '吴主管'];
const companies = ['中科美络股份有限公司', '腾讯科技有限公司', '华为技术有限公司', '阿里巴巴集团', '百度在线网络技术公司', '美团点评', '滴滴出行', '字节跳动', '网易集团', '京东方科技'];
const vehicleCounts = ['1辆', '2辆', '3辆', '4辆', '5辆', '6辆', '7辆', '8辆'];

const tabTags = [
  { customerType: ['企业客户', 'VIP客户', '集团客户'], orderType: ['客户下单', '企业下单', '批量下单'] },
  { customerType: ['个人客户', 'VIP客户'], orderType: ['自驾下单', '预约下单'] },
  { customerType: ['长期客户', '企业客户', '年约客户'], orderType: ['长租下单', '续租下单', '年约续租'] },
];

const generateMockData = (tabIdx, pageNum) => {
  const tags = tabTags[tabIdx];
  const base = tabIdx * 1000 + pageNum * 100;
  return Array.from({ length: pageSize }, (_, i) => {
    const idx = base + i;
    const date = new Date(2025, 10, 20 + Math.floor(idx / 3), 8 + (idx % 12), (idx * 7) % 60, 0);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00`;
    const longName = Math.random() > 0.7 ? `${companies[idx % 10]}总部运营服务中心\n${companies[(idx + 3) % 10]}分公司` : companies[idx % 10];
    const status = ['pending', 'dispatched', 'serving', 'completed'][idx % 4];
    const actionMap = {
      pending: [
        { label: '取消订单', primary: false, handler: (item) => showToast(`取消: ${item.orderNo}`) },
        { label: '立即派车', primary: true, handler: (item) => showToast(`派车: ${item.orderNo}`) },
      ],
      dispatched: [
        { label: '开始服务', primary: true, handler: (item) => showToast(`开始服务: ${item.orderNo}`) },
      ],
      serving: [
        { label: '结束服务', primary: true, handler: (item) => showToast(`结束服务: ${item.orderNo}`) },
      ],
      completed: [
        { label: '查看详情', primary: false, handler: (item) => showToast(`详情: ${item.orderNo}`) },
      ],
    };
    return {
      id: `tab${tabIdx}-${pageNum}-${i}`,
      orderNo: `NO.${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(idx + 1000).slice(1)}`,
      status,
      customerType: tags.customerType[idx % tags.customerType.length],
      orderType: tags.orderType[idx % tags.orderType.length],
      customerName: longName,
      userName: names[idx % 20],
      vehicleCount: vehicleCounts[idx % vehicleCounts.length],
      appointTime: dateStr,
      manager: managers[idx % managers.length],
      actions: actionMap[status] || [],
    };
  });
};

// TODO(api): 替换为真实接口
const loadList = async (refresh = false) => {
  if (loading.value) return;
  loading.value = true;
  if (refresh) {
    page.value = 1;
    finished.value = false;
  }

  // 模拟数据（按 Tab 生成，再按搜索+筛选过滤）
  setTimeout(() => {
    const rawData = generateMockData(activeTab.value, page.value);

    // 搜索过滤
    const keyword = searchKeyword.value.trim().toLowerCase();
    const filtered = keyword
      ? rawData.filter((item) =>
          item.orderNo.toLowerCase().includes(keyword) ||
          item.customerName.toLowerCase().includes(keyword) ||
          item.userName.toLowerCase().includes(keyword) ||
          item.manager.toLowerCase().includes(keyword)
        )
      : rawData;

    // 状态筛选
    const statusFilter = filterSections[0].selected;
    let finalData = statusFilter
      ? filtered.filter((item) => item.status === statusFilter)
      : filtered;

    // 排序（取第一个激活的排序字段）
    const activeSort = sortFields.value.find((f) => f.order);
    if (activeSort) {
      finalData = [...finalData].sort((a, b) => {
        let vA = a[activeSort.key];
        let vB = b[activeSort.key];
        // 时间字段转时间戳，数字字段直接比较
        if (activeSort.key.includes('Time') || activeSort.key.includes('Date')) {
          vA = new Date(vA).getTime();
          vB = new Date(vB).getTime();
        } else {
          vA = parseInt(vA) || 0;
          vB = parseInt(vB) || 0;
        }
        return activeSort.order === 'asc' ? vA - vB : vB - vA;
      });
    }

    if (refresh) {
      listData.value = finalData;
    } else {
      listData.value.push(...finalData);
    }

    // 搜索结果为空时直接 finished
    if ((keyword || statusFilter) && finalData.length === 0) {
      finished.value = true;
    } else if (page.value >= 4) {
      finished.value = true;
    }
    page.value += 1;
    loading.value = false;
    refresherTriggered.value = false;
  }, 300);
};

// 下拉刷新（scroll-view refresher）
const refresherTriggered = ref(false);
const onRefresh = () => {
  refresherTriggered.value = true;
  loadList(true);
};

// 触底加载更多（scroll-view @scrolltolower）
const onLoadMore = () => {
  if (!finished.value && !loading.value) {
    loadList(false);
  }
};

// 初始化
onLoad(() => {
  loadList(true);
});

const onItemClick = (item) => {
  // TODO: 跳转详情
  showToast(`点击: ${item.orderNo}`);
};

const onTagClick = (tag) => {
  // TODO: 标签点击
  showToast(tag);
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_u_empty = resolveEasycom(resolveDynamicComponent("u-empty"), __easycom_5);
  const _component_u_loading_icon = resolveEasycom(resolveDynamicComponent("u-loading-icon"), __easycom_6);
  const _component_v_uni_scroll_view = ScrollView;
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: pageTitle.value }, null, 8, ["title"]),
        createVNode(_component_v_uni_view, {
          class: "list-page",
          onTouchstart: onTouchStart,
          onTouchend: onTouchEnd
        }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "tab-bar" }, {
              default: withCtx(() => [
                (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab, idx) => {
                  return createVNode(_component_v_uni_view, {
                    key: idx,
                    class: normalizeClass(["tab-item", { 'tab-item--active': activeTab.value === idx }]),
                    onClick: $event => (onTabChange(idx))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "tab-item__text" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tab), 1)
                        ]),
                        _: 2
                      }, 1024),
                      (activeTab.value === idx)
                        ? (openBlock(), createBlock(_component_v_uni_view, {
                            key: 0,
                            class: "tab-item__line"
                          }))
                        : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class", "onClick"])
                }), 64))
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "search-bar" }, {
              default: withCtx(() => [
                createVNode(_component_u_input, {
                  modelValue: searchKeyword.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchKeyword).value = $event)),
                  placeholder: "搜索内容",
                  prefixIcon: "search",
                  prefixIconStyle: "color: var(--ml-color-text-placeholder)",
                  customStyle: { background: 'var(--ml-color-bg-page)', borderRadius: 'var(--ml-radius-md)' },
                  onConfirm: onSearch
                }, null, 8, ["modelValue", "customStyle"]),
                createVNode(_component_v_uni_view, {
                  class: "filter-btn",
                  onClick: onFilterOpen
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "filter-btn__text" }, {
                      default: withCtx(() => [
                        createTextVNode("筛选")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "sort-wrap" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "sort-bars" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(sortFields.value, (field) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: field.key,
                        class: "sort-bar",
                        onClick: $event => (onSortToggle(field))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "sort-bar__text" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(field.label), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_view, { class: "sort-bar__arrows" }, {
                            default: withCtx(() => [
                              createVNode(_component_u_icon, {
                                name: "arrow-up-fill",
                                size: "7",
                                color: field.order === 'asc' ? 'var(--ml-color-brand)' : 'var(--ml-color-text-placeholder)'
                              }, null, 8, ["color"]),
                              createVNode(_component_u_icon, {
                                name: "arrow-down-fill",
                                size: "7",
                                color: field.order === 'desc' ? 'var(--ml-color-brand)' : 'var(--ml-color-text-placeholder)'
                              }, null, 8, ["color"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_scroll_view, {
              class: "list-container",
              "scroll-y": "",
              "refresher-enabled": true,
              "refresher-triggered": refresherTriggered.value,
              onRefresherrefresh: onRefresh,
              onScrolltolower: onLoadMore
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "list-content" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(listData.value, (item) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: item.id,
                        class: "list-card",
                        onClick: $event => (onItemClick(item))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, { class: "card-header" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, { class: "card-header__no" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.orderNo), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_text, {
                                class: "card-header__status",
                                style: normalizeStyle({ color: statusMap[item.status].color })
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(statusMap[item.status].text), 1)
                                ]),
                                _: 2
                              }, 1032, ["style"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_view, { class: "card-tags" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, {
                                class: "tag tag--blue",
                                onClick: withModifiers($event => (onTagClick(item.customerType)), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.customerType), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(_component_v_uni_text, {
                                class: "tag tag--green",
                                onClick: withModifiers($event => (onTagClick(item.orderType)), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.orderType), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_view, { class: "card-rows" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "card-row" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "card-row__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("客户名称")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "card-row__value card-row__value--multiline" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.customerName), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "card-row" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "card-row__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("用车人")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "card-row__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.userName), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "card-row" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "card-row__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("车辆数")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "card-row__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.vehicleCount), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "card-row" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "card-row__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("预约开始时间")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "card-row__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.appointTime), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "card-row" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "card-row__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("客户经理")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "card-row__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.manager), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          (item.actions && item.actions.length)
                            ? (openBlock(), createBlock(_component_v_uni_view, {
                                key: 0,
                                class: "card-actions"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.actions, (action, aIdx) => {
                                    return (openBlock(), createBlock(_component_v_uni_view, {
                                      key: aIdx,
                                      class: normalizeClass(["card-action-btn", { 'card-action-btn--primary': action.primary }]),
                                      onClick: withModifiers($event => (action.handler(item)), ["stop"])
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_uni_text, { class: "card-action-btn__text" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(action.label), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "onClick"]))
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024))
                            : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    }), 128)),
                    (!loading.value && listData.value.length === 0)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: "empty-state"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_u_empty, {
                              text: "暂无数据",
                              mode: "list",
                              marginTop: 80
                            })
                          ]),
                          _: 1
                        }))
                      : createCommentVNode("", true),
                    (loading.value)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 1,
                          class: "loading-more"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_u_loading_icon, {
                              size: "16",
                              color: "var(--ml-color-brand)"
                            }),
                            createVNode(_component_v_uni_text, { class: "loading-more__text" }, {
                              default: withCtx(() => [
                                createTextVNode("加载中...")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }))
                      : (finished.value && listData.value.length > 0)
                        ? (openBlock(), createBlock(_component_v_uni_view, {
                            key: 2,
                            class: "loading-more"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, { class: "loading-more__text" }, {
                                default: withCtx(() => [
                                  createTextVNode("没有更多了")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }))
                        : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["refresher-triggered"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_u_popup, {
      show: showFilter.value,
      mode: "bottom",
      round: 16,
      onClose: onFilterClose
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "filter-popup" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "filter-popup__header" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "filter-popup__title" }, {
                  default: withCtx(() => [
                    createTextVNode("筛选")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "filter-popup__close",
                  onClick: onFilterClose
                }, {
                  default: withCtx(() => [
                    createVNode(_component_u_icon, {
                      name: "close",
                      size: "18",
                      color: "var(--ml-color-text-primary)"
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "filter-popup__body" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filterSections, (section) => {
                  return (openBlock(), createBlock(_component_v_uni_view, {
                    key: section.key,
                    class: "filter-section"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "filter-section__title" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(section.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_view, { class: "filter-chips" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(section.options, (opt) => {
                            return (openBlock(), createBlock(_component_v_uni_view, {
                              key: opt.value,
                              class: normalizeClass(["filter-chip", { 'filter-chip--active': section.selected === opt.value }]),
                              onClick: $event => (section.selected = section.selected === opt.value ? '' : opt.value)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_uni_text, { class: "filter-chip__text" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(opt.label), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["class", "onClick"]))
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024))
                }), 128))
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "filter-popup__footer" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "filter-popup__reset",
                  onClick: onFilterReset
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "filter-popup__reset-text" }, {
                      default: withCtx(() => [
                        createTextVNode("重置")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "filter-popup__submit",
                  onClick: onFilterConfirm
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "filter-popup__submit-text" }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["show"])
  ], 64))
}
}

};
const list = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-64ea4397"]]);

export { list as default };
