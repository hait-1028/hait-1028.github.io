import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, E as reactive, c as computed, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, W as __easycom_5, o as openBlock, h as index$i, j as createTextVNode, b as createBlock, l as renderList, t as toDisplayString, q as createCommentVNode, p as withModifiers, n as normalizeClass, Q as index$q } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 弹框显示控制 ======

const _sfc_main = {
  __name: 'filter',
  setup(__props) {

/**
 * 筛选页模板 — 底部弹框 + 多类目 + 时间区间
 *
 * 适用场景：列表筛选、搜索结果过滤、商品筛选等需要多维度筛选的场景
 *
 * 弹框结构：
 * ┌─────────────────────────────────────────┐
 * │  页面内容（列表等）                       │
 * │                                          │
 * │  点击"筛选"按钮 → 底部弹框滑出             │
 * │  ┌─────────────────────────────────────┐ │
 * │  │  筛选                         [×]    │ │ ← 弹框标题
 * │  │  ┌─ 状态 ──────────────────────────┐│ │
 * │  │  │ [全部] [待处理] [进行中] [已完成]││ │
 * │  │  └────────────────────────────────┘│ │
 * │  │  ┌─ 类型（多选）───────────────────┐│ │
 * │  │  │ [类型A] [类型B] [类型C] [类型D] ││ │
 * │  │  │ [类型E] [类型F]                 ││ │
 * │  │  └────────────────────────────────┘│ │
 * │  │  ┌─ 图标筛选 ─────────────────────┐│ │
 * │  │  │ [🔲全部] [⭐类型A] [❤类型B]     ││ │
 * │  │  │ [👍类型C] [🔒类型D] [🚗类型E]  ││ │
 * │  │  └────────────────────────────────┘│ │
 * │  │  ┌─ 时间 ─────────────────────────┐│ │
 * │  │  │ 开始时间  请选择          →    ││ │
 * │  │  │ 结束时间  请选择          →    ││ │
 * │  │  └────────────────────────────────┘│ │
 * │  │  [重置]           [确定]  │ │ ← 弹框底部固定
 * │  └─────────────────────────────────────┘ │
 * └─────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  chip（标签芯片）                         ║
 * ║  ├─ 单选：状态、紧急程度 等互斥选项       ║
 * ║  ├─ 多选（multiple: true）：类型、标签    ║
 * ║  └─ 适用：大部分筛选场景，最常用          ║
 * ║                                           ║
 * ║  icon-chip（图标芯片）                    ║
 * ║  ├─ 标签前带图标（uview-icon 或图片）    ║
 * ║  ├─ 单选模式                             ║
 * ║  └─ 适用：可视化分类，如车辆类型、品类    ║
 * ║                                           ║
 * ║  date-range（日期区间）                   ║
 * ║  ├─ 开始时间 + 结束时间，双选择器         ║
 * ║  └─ 适用：时间范围筛选                    ║
 * ║                                           ║
 * ║  组合使用：根据需求拼装 section 类型      ║
 * ║  示例：状态(chip) + 类型(icon-chip)       ║
 * ║      + 时间(date-range)                   ║
 * ╚═══════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 *
 * AI 使用方式：
 *   1. 复制弹框部分到业务页面
 *   2. 修改 filterSections 数据 → 匹配业务筛选维度
 *   3. 修改 onConfirm 中的 TODO 逻辑
 *   4. 在列表页添加触发按钮调用 showFilter = true
 */

const showFilter = ref(false);

// 已确认的筛选条件（显示在页面上）
const confirmedFilters = ref([]);

// ====== 筛选数据 ======
// TODO(api): 从接口获取筛选项配置
const filterSections = reactive([
  {
    title: '状态',
    key: 'status',
    type: 'chip',
    options: [
      { label: '全部', value: '' },
      { label: '待处理', value: 'pending' },
      { label: '进行中', value: 'progress' },
      { label: '已完成', value: 'done' },
    ],
    selected: '',
  },
  {
    title: '类型',
    key: 'category',
    type: 'chip',
    multiple: true,
    options: [
      { label: '类型A', value: 'a' },
      { label: '类型B', value: 'b' },
      { label: '类型C', value: 'c' },
      { label: '类型D', value: 'd' },
      { label: '类型E', value: 'e' },
      { label: '类型F', value: 'f' },
    ],
    selected: [],
  },
  {
    title: '优先级',
    key: 'priority',
    type: 'chip',
    options: [
      { label: '全部', value: '' },
      { label: '低', value: 'low' },
      { label: '中', value: 'mid' },
      { label: '高', value: 'high' },
      { label: '紧急', value: 'urgent' },
    ],
    selected: '',
  },
  {
    title: '更多筛选',
    key: 'more',
    type: 'chip',
    multiple: true,
    options: [
      { label: '选项1', value: 'opt1' },
      { label: '选项2', value: 'opt2' },
      { label: '选项3', value: 'opt3' },
      { label: '选项4', value: 'opt4' },
      { label: '选项5', value: 'opt5' },
    ],
    selected: [],
  },
  {
    title: '图标筛选',
    key: 'iconType',
    type: 'icon-chip',
    // TODO(api): icon 支持 uview-plus 图标名（name）或图片 URL（url），优先 url
    options: [
      { label: '全部', value: '', icon: { name: 'grid' } },
      { label: '类型A', value: 'icon-a', icon: { name: 'star' } },
      { label: '类型B', value: 'icon-b', icon: { name: 'heart' } },
      { label: '类型C', value: 'icon-c', icon: { name: 'thumb-up' } },
      { label: '类型D', value: 'icon-d', icon: { name: 'lock' } },
      { label: '类型E', value: 'icon-e', icon: { name: 'car' } },
      { label: '类型F', value: 'icon-f', icon: { name: 'calendar' } },
    ],
    selected: '',
  },
  {
    title: '时间',
    key: 'time',
    type: 'date-range',
    startDate: '',
    endDate: '',
  },
]);

// ====== 日期选择器 ======
const showStartDate = ref(false);
const showEndDate = ref(false);

// u-datetime-picker :value 用秒级时间戳（Number），:defaultIndex 用 [年, 月-1, 日] 确保滚轮定位
const todayDate = () => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() }; };
const todayDateObj = todayDate();
const startDateValue = ref(Number(new Date(todayDateObj.y, todayDateObj.m - 1, todayDateObj.d).getTime()));
const endDateValue = ref(Number(new Date(todayDateObj.y, todayDateObj.m - 1, todayDateObj.d).getTime()));
// defaultIndex: u-datetime-picker 的滚轮默认索引，[年索引, 月索引(0-11), 日索引]
const startDefaultIndex = ref([todayDateObj.y, todayDateObj.m - 1, todayDateObj.d]);
const endDefaultIndex = ref([todayDateObj.y, todayDateObj.m - 1, todayDateObj.d]);

// 存储的时间戳（秒级）转可读日期
const formatTimestamp = (ts) => {
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const startDateDisplay = computed(() => {
  if (!filterSections[4].startDate) return '';
  return formatTimestamp(filterSections[4].startDate);
});

const endDateDisplay = computed(() => {
  if (!filterSections[4].endDate) return '';
  return formatTimestamp(filterSections[4].endDate);
});

const onStartDateConfirm = (e) => {
  const raw = (typeof e === 'object' ? e.value : e) || startDateValue.value;
  const ms = Number(raw);
  filterSections[4].startDate = Math.floor(ms / 1000);
  startDateValue.value = ms;
  // 更新 defaultIndex 以便下次打开滚轮定位到选中日期
  const d = new Date(ms);
  startDefaultIndex.value = [d.getFullYear(), d.getMonth(), d.getDate()];
  showStartDate.value = false;
};

const onEndDateConfirm = (e) => {
  const raw = (typeof e === 'object' ? e.value : e) || endDateValue.value;
  const ms = Number(raw);
  filterSections[4].endDate = Math.floor(ms / 1000);
  endDateValue.value = ms;
  const d = new Date(ms);
  endDefaultIndex.value = [d.getFullYear(), d.getMonth(), d.getDate()];
  showEndDate.value = false;
};

// ====== 筛选操作 ======
const selectChip = (sectionIdx, val) => {
  const section = filterSections[sectionIdx];
  if (section.multiple) {
    const idx = section.selected.indexOf(val);
    if (idx > -1) section.selected.splice(idx, 1);
    else section.selected.push(val);
  } else {
    section.selected = val;
  }
};

const isChipSelected = (sectionIdx, val) => {
  const section = filterSections[sectionIdx];
  return section.multiple ? section.selected.includes(val) : section.selected === val;
};

// 重置
const onReset = () => {
  filterSections.forEach((s) => {
    if (s.type === 'date-range') {
      s.startDate = '';
      s.endDate = '';
    } else if (s.multiple) {
      s.selected = [];
    } else {
      s.selected = '';
    }
  });
  // 日期选择器默认值回到今天
  const td = todayDate();
  const tdMs = new Date(td.y, td.m - 1, td.d).getTime();
  startDateValue.value = tdMs;
  endDateValue.value = tdMs;
  startDefaultIndex.value = [td.y, td.m - 1, td.d];
  endDefaultIndex.value = [td.y, td.m - 1, td.d];
  confirmedFilters.value = [];
};

// 确认
const onConfirm = () => {
  // 收集已选的筛选项用于页面展示
  const chips = [];
  filterSections.forEach((s) => {
    if (s.type === 'date-range') {
      if (s.startDate) chips.push({ label: startDateDisplay.value, key: s.key });
      if (s.endDate) chips.push({ label: endDateDisplay.value, key: s.key });
    } else if (s.multiple) {
      s.selected.forEach((val) => {
        const opt = s.options.find((o) => o.value === val);
        if (opt && opt.value) chips.push({ label: opt.label, key: s.key });
      });
    } else {
      // 单选：始终回显当前选中的项（包括"全部"）
      const sel = s.selected;
      const opt = s.options.find((o) => o.value === sel);
      if (opt) chips.push({ label: opt.label, key: s.key });
    }
  });
  confirmedFilters.value = chips;
  showFilter.value = false;
  // TODO(api): 将筛选参数传给列表页刷新数据
  showToast('筛选已应用');
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_image = index$q;
  const _component_u_datetime_picker = resolveEasycom(resolveDynamicComponent("u-datetime-picker"), __easycom_5);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: "列表页" }),
        createVNode(_component_v_uni_view, { class: "demo-content" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_text, { class: "demo-text" }, {
              default: withCtx(() => [
                createTextVNode("这里是列表页内容区域")
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_text, { class: "demo-text-sub" }, {
              default: withCtx(() => [
                createTextVNode("点击下方按钮打开筛选弹框")
              ]),
              _: 1
            }),
            (confirmedFilters.value.length)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 0,
                  class: "confirmed-tags"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(confirmedFilters.value, (chip, ci) => {
                      return (openBlock(), createBlock(_component_v_uni_text, {
                        key: ci,
                        class: "confirmed-tag"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(chip.label), 1)
                        ]),
                        _: 2
                      }, 1024))
                    }), 128))
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_v_uni_view, {
          class: "demo-trigger",
          onClick: _cache[0] || (_cache[0] = $event => (showFilter.value = true))
        }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_text, null, {
              default: withCtx(() => [
                createTextVNode("打开筛选")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        (showFilter.value)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 0,
              class: "filter-overlay",
              onClick: _cache[5] || (_cache[5] = $event => (showFilter.value = false))
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "filter-popup",
                  onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "filter-popup__header" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "filter-popup__title" }, {
                          default: withCtx(() => [
                            createTextVNode("筛选")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, {
                          class: "filter-popup__close",
                          onClick: _cache[1] || (_cache[1] = $event => (showFilter.value = false))
                        }, {
                          default: withCtx(() => [
                            createTextVNode("×")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "filter-popup__body" }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(filterSections, (section, si) => {
                          return (openBlock(), createBlock(_component_v_uni_view, {
                            key: si,
                            class: "filter-card"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "filter-card__title" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(section.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              (section.type === 'chip')
                                ? (openBlock(), createBlock(_component_v_uni_view, {
                                    key: 0,
                                    class: "chip-group"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(section.options, (opt) => {
                                        return (openBlock(), createBlock(_component_v_uni_text, {
                                          key: opt.value,
                                          class: normalizeClass(["chip", { 'chip--active': isChipSelected(si, opt.value) }]),
                                          onClick: $event => (selectChip(si, opt.value))
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(opt.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class", "onClick"]))
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024))
                                : (section.type === 'icon-chip')
                                  ? (openBlock(), createBlock(_component_v_uni_view, {
                                      key: 1,
                                      class: "icon-chip-group"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(section.options, (opt) => {
                                          return (openBlock(), createBlock(_component_v_uni_view, {
                                            key: opt.value,
                                            class: normalizeClass(["icon-chip", { 'icon-chip--active': isChipSelected(si, opt.value) }]),
                                            onClick: $event => (selectChip(si, opt.value))
                                          }, {
                                            default: withCtx(() => [
                                              (opt.icon?.name)
                                                ? (openBlock(), createBlock(_component_u_icon, {
                                                    key: 0,
                                                    name: opt.icon.name,
                                                    size: "20",
                                                    color: isChipSelected(si, opt.value) ? 'var(--ml-color-brand)' : 'var(--ml-color-text-secondary)'
                                                  }, null, 8, ["name", "color"]))
                                                : (opt.icon?.url)
                                                  ? (openBlock(), createBlock(_component_v_uni_image, {
                                                      key: 1,
                                                      src: opt.icon.url,
                                                      class: "icon-chip__img",
                                                      mode: "aspectFit"
                                                    }, null, 8, ["src"]))
                                                  : createCommentVNode("", true),
                                              createVNode(_component_v_uni_text, { class: "icon-chip__label" }, {
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
                                    }, 1024))
                                  : createCommentVNode("", true),
                              (section.type === 'date-range')
                                ? (openBlock(), createBlock(_component_v_uni_view, {
                                    key: 2,
                                    class: "date-range"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_view, {
                                        class: "date-range__row",
                                        onClick: _cache[2] || (_cache[2] = $event => (showStartDate.value = true))
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_uni_text, { class: "date-range__label" }, {
                                            default: withCtx(() => [
                                              createTextVNode("开始时间")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_uni_view, { class: "date-range__right" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_uni_text, {
                                                class: normalizeClass(["date-range__value", { 'date-range__value--placeholder': !startDateDisplay.value }])
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(startDateDisplay.value || '请选择'), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["class"]),
                                              createVNode(_component_u_icon, {
                                                name: "arrow-right",
                                                size: "14",
                                                color: "var(--ml-color-text-placeholder)"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_uni_view, {
                                        class: "date-range__row",
                                        onClick: _cache[3] || (_cache[3] = $event => (showEndDate.value = true))
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_uni_text, { class: "date-range__label" }, {
                                            default: withCtx(() => [
                                              createTextVNode("结束时间")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_uni_view, { class: "date-range__right" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_uni_text, {
                                                class: normalizeClass(["date-range__value", { 'date-range__value--placeholder': !endDateDisplay.value }])
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(endDateDisplay.value || '请选择'), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["class"]),
                                              createVNode(_component_u_icon, {
                                                name: "arrow-right",
                                                size: "14",
                                                color: "var(--ml-color-text-placeholder)"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }))
                                : createCommentVNode("", true)
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
                          class: "filter-popup__btn filter-popup__btn--plain",
                          onClick: onReset
                        }, {
                          default: withCtx(() => [
                            createTextVNode("重置")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_view, {
                          class: "filter-popup__btn filter-popup__btn--primary",
                          onClick: onConfirm
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 确定 ")
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
            }))
          : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createVNode(_component_u_datetime_picker, {
      show: showStartDate.value,
      value: startDateValue.value,
      defaultIndex: startDefaultIndex.value,
      mode: "date",
      title: "选择开始时间",
      onConfirm: onStartDateConfirm,
      onCancel: _cache[6] || (_cache[6] = $event => (showStartDate.value = false)),
      onClose: _cache[7] || (_cache[7] = $event => (showStartDate.value = false))
    }, null, 8, ["show", "value", "defaultIndex"]),
    createVNode(_component_u_datetime_picker, {
      show: showEndDate.value,
      value: endDateValue.value,
      defaultIndex: endDefaultIndex.value,
      mode: "date",
      title: "选择结束时间",
      onConfirm: onEndDateConfirm,
      onCancel: _cache[8] || (_cache[8] = $event => (showEndDate.value = false)),
      onClose: _cache[9] || (_cache[9] = $event => (showEndDate.value = false))
    }, null, 8, ["show", "value", "defaultIndex"])
  ], 64))
}
}

};
const filter = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5eb962ce"]]);

export { filter as default };
