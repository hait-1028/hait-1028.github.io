import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, E as reactive, z as onLoad, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, V as __easycom_1, e as __easycom_1$1, o as openBlock, g as createVNode, k as createElementBlock, F as Fragment, j as createTextVNode, l as renderList, n as normalizeClass, h as index$i, t as toDisplayString, q as createCommentVNode } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 页面参数 ======

const _sfc_main = {
  __name: 'operation-record',
  setup(__props) {

/**
 * 操作记录页模板 — 竖向时间轴
 *
 * 适用场景：审批流程记录、工单处理记录、订单状态记录、日志时间轴等
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  导航栏：标题（操作记录）                 │
 * │                                          │
 * │  ┌─ 基础时间轴 ─────────────────────────┐│
 * │  │ ● 当前步骤              2023-10-22   ││
 * │  │   辅助信息文字最多两行...             ││
 * │  │ ● 已完成步骤            2023-10-22   ││
 * │  │   辅助信息文字最多两行                ││
 * │  └──────────────────────────────────────┘│
 * │                                          │
 * │  ┌─ 多级内容时间轴 ─────────────────────┐│
 * │  │ ● 当前步骤              2023-10-22   ││
 * │  │ ┌─ 内容卡片 ────────────────────────┐││
 * │  │ │ 标题文字    描述文字多行           │││
 * │  │ │ 📄 文件名.pdf  1.2MB               │││
 * │  │ └───────────────────────────────────┘││
 * │  └──────────────────────────────────────┘│
 * └──────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  基础时间轴                               ║
 * ║  ├─ 每条仅有 标题 + 时间 + 描述            ║
 * ║  ├─ 适用：纯流程追踪、日志、状态变更记录    ║
 * ║  └─ 对应数据：records[]                   ║
 * ║                                           ║
 * ║  多级内容时间轴                            ║
 * ║  ├─ 标题下有卡片：标签-值行 + 文件附件     ║
 * ║  ├─ 适用：审批详情、带附件的流转记录        ║
 * ║  ├─ 可选 Tab 切换不同分类                  ║
 * ║  └─ 对应数据：detailRecords[]             ║
 * ╚═══════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - mc-navbar 导航栏（easycom 自动注册）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名
 *   2. 修改 records 数据字段 → 匹配业务 Model
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 按需删减基础/多级内容示例
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const id = ref('');

// ====== 加载状态 ======
const loading = ref(true);

// ====== 操作记录数据 ======
// TODO(api): 从接口获取操作记录列表
const records = reactive([
  {
    id: '1',
    title: '当前步骤',
    time: '2023-10-22 10:00',
    desc: '辅助信息文字最多两行辅助信息文字最多两行辅助信息文字最多两行辅助信息文字最多两行辅助信息文字最多两行辅助信息文字最多两行',
    status: 'current',
  },
  {
    id: '2',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '3',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '4',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '5',
    title: '已完成步骤',
    time: '2023-10-21 09:00',
    desc: '辅助信息文字最多两行辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '6',
    title: '已完成步骤',
    time: '2023-10-21 09:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '7',
    title: '已完成步骤',
    time: '2023-10-20 08:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
  {
    id: '8',
    title: '已完成步骤',
    time: '2023-10-20 08:00',
    desc: '辅助信息文字最多两行',
    status: 'completed',
  },
]);

// ====== 多级内容时间轴数据 ======
// TODO(api): 从接口获取带卡片内容的操作记录
const detailRecords = reactive([
  {
    id: '1',
    title: '当前步骤',
    time: '2023-10-22 10:00',
    status: 'current',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [
      { name: '全国机关事务管理局研讨会.pdf', size: '1.2MB', url: '' },
    ],
  },
  {
    id: '2',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    status: 'completed',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行', tag: '已退回' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [
      { name: '全国机关事务管理局研讨会.pdf', size: '1.2MB', url: '' },
    ],
  },
  {
    id: '3',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    status: 'completed',
    tag: '辅助信息文字',
    rows: [
      { label: '标题文字', value: '描述文字多行' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [
      { name: '全国机关事务管理局研讨会.pdf', size: '1.2MB', url: '' },
    ],
  },
  {
    id: '4',
    title: '已完成步骤',
    time: '2023-10-22 10:00',
    status: 'completed',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行', tag: '已退回' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [],
  },
  {
    id: '5',
    title: '已完成步骤',
    time: '2023-10-21 09:00',
    status: 'completed',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行' },
      { label: '标题文字', value: '描述文字多行描述文字多行' },
    ],
    files: [
      { name: '附件名称.pdf', size: '0.8MB', url: '' },
    ],
  },
  {
    id: '6',
    title: '已完成步骤',
    time: '2023-10-21 09:00',
    status: 'completed',
    tag: '辅助信息文字',
    rows: [
      { label: '标题文字', value: '描述文字多行', tag: '已退回' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [],
  },
  {
    id: '7',
    title: '已完成步骤',
    time: '2023-10-20 08:00',
    status: 'completed',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [
      { name: '全国机关事务管理局研讨会.pdf', size: '1.2MB', url: '' },
    ],
  },
  {
    id: '8',
    title: '已完成步骤',
    time: '2023-10-20 08:00',
    status: 'completed',
    tag: '',
    rows: [
      { label: '标题文字', value: '描述文字多行' },
      { label: '标题文字', value: '描述文字多行描述文字多行描述文字多行描述文字多行' },
    ],
    files: [],
  },
]);

// ====== Tab 切换（仅多级内容示例使用） ======
const tabs = ['操作记录', '标签页二', '标签页三'];
const activeTab = ref(0);

// ====== 状态判断 ======
const isCurrent = (status) => status === 'current';

// ====== 文件预览 ======
const onPreviewFile = (file) => {
  showToast(`预览: ${file.name}`);
};

// ====== 初始化 ======
onLoad((options) => {
  if (options?.id) {
    id.value = options.id;
    // TODO(api): 根据 id 拉取操作记录
    // import { getOperationRecordsApi } from '@/api/api-manager.js'
    // const res = await getOperationRecordsApi(id.value)
    // if (res === null) return
    // records.length = 0; records.push(...res.data)
  }
  // 模拟加载
  setTimeout(() => { loading.value = false; }, 300);
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_skeleton = resolveEasycom(resolveDynamicComponent("u-skeleton"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1$1);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "操作记录" }),
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          (loading.value)
            ? (openBlock(), createBlock(_component_v_uni_view, {
                key: 0,
                class: "loading-area"
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_skeleton, {
                    loading: true,
                    rows: 4,
                    title: true,
                    rowsWidth: "['100%', '80%', '60%', '100%']"
                  })
                ]),
                _: 1
              }))
            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createVNode(_component_v_uni_view, { class: "record-card" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "record-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("基础时间轴")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "timeline" }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(records, (item, idx) => {
                          return (openBlock(), createBlock(_component_v_uni_view, {
                            key: item.id,
                            class: normalizeClass(["timeline-item", { 'timeline-item--current': isCurrent(item.status), 'timeline-item--last': idx === records.length - 1 }])
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "timeline-node" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_view, { class: "timeline-node__outer" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_view, { class: "timeline-node__inner" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_uni_view, { class: "timeline-content" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_view, { class: "timeline-header" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_text, { class: "timeline-title" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_v_uni_text, { class: "timeline-time" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.time), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_v_uni_text, { class: "timeline-desc" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.desc), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["class"]))
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "record-card" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "record-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("多级内容时间轴")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "tab-bar" }, {
                      default: withCtx(() => [
                        (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab, idx) => {
                          return createVNode(_component_v_uni_view, {
                            key: idx,
                            class: normalizeClass(["tab-item", { 'tab-item--active': activeTab.value === idx }]),
                            onClick: $event => (activeTab.value = idx)
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
                    (activeTab.value === 0)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: "timeline"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(detailRecords, (item, idx) => {
                              return (openBlock(), createBlock(_component_v_uni_view, {
                                key: item.id,
                                class: normalizeClass(["timeline-item", { 'timeline-item--current': isCurrent(item.status), 'timeline-item--last': idx === detailRecords.length - 1 }])
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_view, { class: "timeline-node" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_view, { class: "timeline-node__outer" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_uni_view, { class: "timeline-node__inner" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_view, { class: "timeline-content" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_view, { class: "timeline-header" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_uni_view, { class: "timeline-title-wrap" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_uni_text, { class: "timeline-title" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              (item.tag)
                                                ? (openBlock(), createBlock(_component_v_uni_text, {
                                                    key: 0,
                                                    class: "timeline-title-tag"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.tag), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024))
                                                : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_v_uni_text, { class: "timeline-time" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.time), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_v_uni_view, { class: "content-card" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(item.rows, (row, rIdx) => {
                                            return (openBlock(), createBlock(_component_v_uni_view, {
                                              key: rIdx,
                                              class: normalizeClass(["content-row", { 'content-row--multiline': row.value.length > 12 }])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_uni_text, { class: "content-row__label" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(row.label), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_v_uni_view, { class: "content-row__right" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_uni_text, { class: "content-row__value" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(row.value), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    (row.tag)
                                                      ? (openBlock(), createBlock(_component_v_uni_text, {
                                                          key: 0,
                                                          class: "content-row__tag"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(row.tag), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024))
                                                      : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]))
                                          }), 128)),
                                          (item.files.length)
                                            ? (openBlock(), createBlock(_component_v_uni_view, {
                                                key: 0,
                                                class: "file-list"
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.files, (file, fIdx) => {
                                                    return (openBlock(), createBlock(_component_v_uni_view, {
                                                      key: fIdx,
                                                      class: "file-item",
                                                      onClick: $event => (onPreviewFile(file))
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_uni_view, { class: "file-item__icon" }, {
                                                          default: withCtx(() => [
                                                            createVNode(_component_u_icon, {
                                                              name: "file-text",
                                                              size: "32",
                                                              color: "var(--ml-color-brand)"
                                                            })
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(_component_v_uni_view, { class: "file-item__info" }, {
                                                          default: withCtx(() => [
                                                            createVNode(_component_v_uni_text, { class: "file-item__name" }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(file.name), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024),
                                                            createVNode(_component_v_uni_text, { class: "file-item__size" }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(file.size), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"]))
                                                  }), 128))
                                                ]),
                                                _: 2
                                              }, 1024))
                                            : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["class"]))
                            }), 128))
                          ]),
                          _: 1
                        }))
                      : (openBlock(), createBlock(_component_v_uni_view, {
                          key: 1,
                          class: "tab-empty"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_uni_text, { class: "tab-empty__text" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tabs[activeTab.value]) + "内容", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }))
                  ]),
                  _: 1
                })
              ], 64))
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const operationRecord = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-1c291b70"]]);

export { operationRecord as default };
