import { a as _export_sfc, r as ref, c as computed, z as onLoad, y as onShow, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, A as __easycom_5, B as __easycom_7, o as openBlock, h as index$i, j as createTextVNode, t as toDisplayString, n as normalizeClass, C as normalizeStyle, l as renderList, b as createBlock, q as createCommentVNode, I as Input, S as ScrollView, p as withModifiers, x as index$h, u as unref, m as navigateTo, D as showModal } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { b as getTask, g as getTaskResults, d as doubtTagOptions } from './mock.DyMutdN4.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ===== 任务与结果（mock 单例，surplus 页写入后 onShow 重载） =====

const _sfc_main = {
  __name: 'execute',
  setup(__props) {

/**
 * 盘点执行页
 * - 顶部：任务名称 / 资产数量 / 计划盘点时间 / 盘点单进度
 * - 资产列表 5 tab：未盘 / 已盘 / 盘盈 / 盘亏 / 存疑
 * - 底部主按钮：扫码盘点、新增盘盈；更多折叠五项批量操作
 * - 批量执行盘点（备注+照片）、批量标记盘亏（备注）、批量标记存疑（标签+备注）、
 *   批量删除盘盈、清除已操作结果（保留任务单）
 */
const taskId = ref('t1');
const task = ref(getTask('t1'));
const results = ref([]);
const isTaskCompleted = computed(() => task.value?.status === '已完成');
const canOperate = computed(() => !isTaskCompleted.value);

onLoad((opts) => {
  taskId.value = opts.id || 't1';
  task.value = getTask(taskId.value);
});
onShow(() => {
  results.value = getTaskResults(taskId.value);
  // 从全屏执行盘点页返回：退出批量模式并切到已盘查看结果
  if (pendingCheck.value) {
    pendingCheck.value = false;
    exitMode();
    activeTab.value = '已盘';
  }
});

// ===== Tab 与搜索 =====
const tabs = ['未盘', '已盘', '盘盈', '盘亏', '存疑'];
const activeTab = ref('未盘');
const keyword = ref('');
const tabCount = (tab) => results.value.filter((r) => r.tab === tab).length;

const list = computed(() =>
  results.value.filter((r) => {
    if (r.tab !== activeTab.value) return false;
    if (!keyword.value) return true;
    const kw = keyword.value.trim();
    return r.assetName.includes(kw) || r.assetCode.includes(kw);
  })
);

// ===== 进度统计 =====
const totalCount = computed(() => results.value.length);
const doneCount = computed(() => results.value.filter((r) => r.tab !== '未盘').length);
const percent = computed(() => (totalCount.value ? Math.round((doneCount.value / totalCount.value) * 100) : 0));

// ===== 批量选择模式 =====
const selectMode = ref(''); // execute | loss | doubt | delSurplus
const selectedIds = ref([]);
const modeMeta = {
  execute: { title: '批量执行盘点', tab: '未盘' },
  loss: { title: '批量标记盘亏', tab: '未盘' },
  doubt: { title: '批量标记存疑', tab: '已盘' },
  delSurplus: { title: '批量删除盘盈', tab: '盘盈' },
};

function startMode(mode) {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  showMore.value = false;
  selectMode.value = mode;
  selectedIds.value = [];
  activeTab.value = modeMeta[mode].tab;
}
function exitMode() {
  selectMode.value = '';
  selectedIds.value = [];
}
function onCardClick(item) {
  if (!selectMode.value) return;
  const idx = selectedIds.value.indexOf(item.id);
  if (idx > -1) selectedIds.value.splice(idx, 1);
  else selectedIds.value.push(item.id);
}
function confirmMode() {
  if (!selectedIds.value.length) return showToast('请先选择资产');
  if (selectMode.value === 'execute') goCheck(selectedIds.value);
  else if (selectMode.value === 'loss') openLossSheet(selectedIds.value);
  else if (selectMode.value === 'doubt') openDoubtSheet(selectedIds.value);
  else if (selectMode.value === 'delSurplus') deleteSurplus(selectedIds.value);
}

// ===== 更多弹层 =====
const showMore = ref(false);
const moreActions = [
  { key: 'execute', label: '批量执行盘点' },
  { key: 'loss', label: '批量标记盘亏' },
  { key: 'doubt', label: '批量标记存疑' },
  { key: 'delSurplus', label: '批量删除盘盈' },
  { key: 'clearResults', label: '清除已操作结果', danger: true },
];
function onMoreAction(action) {
  showMore.value = false;
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  if (action.key === 'clearResults') clearResults();
  else startMode(action.key);
}

// ===== 执行盘点（全屏页：上半核对台账信息，下半备注/拍照） =====
const pendingCheck = ref(false);
function goCheck(targetIds) {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  pendingCheck.value = true;
  navigateTo({ url: `/pages/stocktake/check?id=${taskId.value}&ids=${targetIds.join(',')}` });
}
function singleExecute(item) {
  goCheck([item.id]);
}

// ===== 标记盘亏备注弹层 =====
const lossSheet = ref({ show: false, targets: [] });
const lossRemark = ref('');

function openLossSheet(targets) {
  lossRemark.value = '';
  lossSheet.value = { show: true, targets };
}
function confirmLossSheet() {
  const { targets } = lossSheet.value;
  results.value.forEach((r) => {
    if (!targets.includes(r.id)) return;
    r.tab = '盘亏';
    r.remark = lossRemark.value || '现场未找到实物，标记盘亏';
  });
  lossSheet.value.show = false;
  exitMode();
  activeTab.value = '盘亏';
  showToast(`已标记盘亏 ${targets.length} 项资产`);
}

// ===== 存疑弹层（标签单选 + 备注 0/200） =====
const doubtSheet = ref({ show: false, targets: [] });
const doubtTag = ref('');
const doubtRemark = ref('');

function openDoubtSheet(targets) {
  doubtTag.value = '';
  doubtRemark.value = '';
  doubtSheet.value = { show: true, targets };
}
function toggleDoubtTag(tag) {
  doubtTag.value = doubtTag.value === tag ? '' : tag;
}
function confirmDoubtSheet() {
  if (!doubtTag.value && !doubtRemark.value) return showToast('请选择存疑标签或输入存疑备注');
  const { targets } = doubtSheet.value;
  results.value.forEach((r) => {
    if (!targets.includes(r.id)) return;
    r.tab = '存疑';
    r.tags = doubtTag.value ? [doubtTag.value] : [];
    r.remark = doubtRemark.value;
  });
  doubtSheet.value.show = false;
  exitMode();
  activeTab.value = '存疑';
  showToast(`已标记存疑 ${targets.length} 项资产`);
}

// ===== 批量删除盘盈 =====
function deleteSurplus(ids) {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  showModal({
    title: '批量删除盘盈',
    content: `确定删除选中的 ${ids.length} 项盘盈资产吗？`,
    confirmColor: '#ff4141',
    success: (res) => {
      if (!res.confirm) return;
      for (let i = results.value.length - 1; i >= 0; i -= 1) {
        if (ids.includes(results.value[i].id)) results.value.splice(i, 1);
      }
      exitMode();
      showToast('已删除盘盈记录');
    },
  });
}

// ===== 清除已操作结果（保留任务单） =====
function clearResults() {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  showModal({
    title: '清除已操作结果',
    content: '将清除本次已操作的盘点结果，保留任务单，是否继续？',
    confirmColor: '#ff4141',
    success: (res) => {
      if (!res.confirm) return;
      for (let i = results.value.length - 1; i >= 0; i -= 1) {
        const r = results.value[i];
        if (r.tab === '盘盈') {
          results.value.splice(i, 1);
        } else {
          r.tab = '未盘';
          r.remark = '';
          r.photos = 0;
          r.tags = [];
        }
      }
      activeTab.value = '未盘';
       showToast('已清除盘点结果，任务单保留');
    },
  });
}

// ===== 扫码盘点（模拟扫描第一条未盘资产的二维码） =====
function onScan() {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  const target = results.value.find((r) => r.tab === '未盘');
  if (!target) return showToast('暂无待盘资产');
  target.tab = '已盘';
  target.remark = '扫码盘点正常';
  showToast(`扫码成功：${target.assetName}`);
}

// ===== 新增盘盈 =====
function goSurplus() {
  if (!canOperate.value) return showToast('任务已完成，无法继续操作');
  navigateTo({ url: `/pages/stocktake/surplus?id=${taskId.value}` });
}

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_input = Input;
  const _component_u_empty = resolveEasycom(resolveDynamicComponent("u-empty"), __easycom_5);
  const _component_v_uni_scroll_view = ScrollView;
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);
  const _component_v_uni_textarea = index$h;

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: "执行盘点" }),
        createVNode(_component_v_uni_view, { class: "task-head" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "task-head__title-row" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "task-head__name" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(task.value.name), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_text, {
                  class: normalizeClass(["task-head__status", task.value.status === '已完成' ? 'task-head__status--done' : 'task-head__status--doing'])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(task.value.status), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "task-head__stats" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "stat" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "stat__num" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(totalCount.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "stat__label" }, {
                      default: withCtx(() => [
                        createTextVNode("资产数量")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "stat" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "stat__num" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(doneCount.value) + "/" + toDisplayString(totalCount.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "stat__label" }, {
                      default: withCtx(() => [
                        createTextVNode("盘点单进度")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "stat" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "stat__num stat__num--time" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.value.planRange[0]) + " ~ " + toDisplayString(task.value.planRange[1]), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "stat__label" }, {
                      default: withCtx(() => [
                        createTextVNode("计划盘点时间")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "task-head__progress" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "task-head__progress-bar",
                  style: normalizeStyle({ width: percent.value + '%' })
                }, null, 8, ["style"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_v_uni_view, { class: "tabs" }, {
          default: withCtx(() => [
            (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
              return createVNode(_component_v_uni_view, {
                key: tab,
                class: normalizeClass(["tabs__item", { 'tabs__item--active': activeTab.value === tab }]),
                onClick: $event => (activeTab.value = tab)
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(tab), 1)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_v_uni_text, { class: "tabs__count" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(tabCount(tab)), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["class", "onClick"])
            }), 64))
          ]),
          _: 1
        }),
        (selectMode.value)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 0,
              class: "mode-banner"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "mode-banner__text" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(modeMeta[selectMode.value].title) + "：请勾选资产（已选 " + toDisplayString(selectedIds.value.length) + " 项）", 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }))
          : createCommentVNode("", true),
        createVNode(_component_v_uni_view, { class: "search" }, {
          default: withCtx(() => [
            createVNode(_component_u_icon, {
              name: "search",
              size: "16",
              color: "var(--ml-color-text-placeholder)"
            }),
            createVNode(_component_v_uni_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((keyword).value = $event)),
              class: "search__input",
              placeholder: "搜索资产名称 / 资产编号",
              "placeholder-class": "search__placeholder"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        createVNode(_component_v_uni_scroll_view, {
          class: "list",
          "scroll-y": ""
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
              return (openBlock(), createBlock(_component_v_uni_view, {
                key: item.id,
                class: normalizeClass(["asset-card", { 'asset-card--selected': selectedIds.value.includes(item.id) }]),
                onClick: $event => (onCardClick(item))
              }, {
                default: withCtx(() => [
                  (selectMode.value)
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 0,
                        class: "asset-card__check"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, {
                            class: normalizeClass(["asset-card__check-circle", { 'asset-card__check-circle--on': selectedIds.value.includes(item.id) }])
                          }, {
                            default: withCtx(() => [
                              (selectedIds.value.includes(item.id))
                                ? (openBlock(), createBlock(_component_u_icon, {
                                    key: 0,
                                    name: "checkbox-mark",
                                    size: "14",
                                    color: "var(--ml-color-white)"
                                  }))
                                : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024))
                    : createCommentVNode("", true),
                  createVNode(_component_v_uni_view, { class: "asset-card__main" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_view, { class: "asset-card__head" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "asset-card__code" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.assetCode), 1)
                            ]),
                            _: 2
                          }, 1024),
                          (item.tab === '盘盈')
                            ? (openBlock(), createBlock(_component_v_uni_text, {
                                key: 0,
                                class: "asset-card__tag asset-card__tag--brand"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.source || '盘盈'), 1)
                                ]),
                                _: 2
                              }, 1024))
                            : createCommentVNode("", true),
                          (item.tab === '盘亏')
                            ? (openBlock(), createBlock(_component_v_uni_text, {
                                key: 1,
                                class: "asset-card__tag asset-card__tag--error"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("盘亏")
                                ]),
                                _: 1
                              }))
                            : createCommentVNode("", true),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(item.tags, (tag) => {
                            return (openBlock(), createBlock(_component_v_uni_text, {
                              key: tag,
                              class: "asset-card__tag asset-card__tag--warning"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tag), 1)
                              ]),
                              _: 2
                            }, 1024))
                          }), 128))
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_text, { class: "asset-card__name" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.assetName), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_text, { class: "asset-card__meta" }, {
                        default: withCtx(() => [
                          createTextVNode("分类：" + toDisplayString(item.category) + "｜位置：" + toDisplayString(item.location), 1)
                        ]),
                        _: 2
                      }, 1024),
                      (item.remark)
                        ? (openBlock(), createBlock(_component_v_uni_text, {
                            key: 0,
                            class: "asset-card__remark"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("备注：" + toDisplayString(item.remark), 1)
                            ]),
                            _: 2
                          }, 1024))
                        : createCommentVNode("", true),
                      (item.photos)
                        ? (openBlock(), createBlock(_component_v_uni_view, {
                            key: 1,
                            class: "asset-card__photos"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_u_icon, {
                                name: "photo-camera",
                                size: "13",
                                color: "var(--ml-color-text-tertiary)"
                              }),
                              createVNode(_component_v_uni_text, { class: "asset-card__photos-text" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.photos) + " 张照片", 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))
                        : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024),
                  (!selectMode.value && item.tab === '未盘')
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 1,
                        class: "asset-card__action",
                        onClick: withModifiers($event => (singleExecute(item)), ["stop"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("执行盘点")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["class", "onClick"]))
            }), 128)),
            (!list.value.length)
              ? (openBlock(), createBlock(_component_u_empty, {
                  key: 0,
                  mode: "list",
                  text: `暂无${activeTab.value}资产`,
                  marginTop: "120"
                }, null, 8, ["text"]))
              : createCommentVNode("", true),
            createVNode(_component_v_uni_view, { class: "list__bottom-space" })
          ]),
          _: 1
        }),
        (isTaskCompleted.value)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 1,
              class: "footer footer--readonly"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "footer__readonly-text" }, {
                  default: withCtx(() => [
                    createTextVNode("任务已完成，无法继续采集")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }))
          : (openBlock(), createBlock(_component_v_uni_view, {
              key: 2,
              class: "footer"
            }, {
              default: withCtx(() => [
                (selectMode.value)
                  ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createVNode(_component_v_uni_view, {
                        class: "footer__btn footer__btn--plain",
                        onClick: exitMode
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_view, {
                        class: normalizeClass(["footer__btn footer__btn--primary", { 'footer__btn--disabled': !selectedIds.value.length }]),
                        onClick: confirmMode
                      }, {
                        default: withCtx(() => [
                          createTextVNode("确定（" + toDisplayString(selectedIds.value.length) + "）", 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ], 64))
                  : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createVNode(_component_v_uni_view, {
                        class: "footer__btn footer__btn--plain",
                        onClick: _cache[1] || (_cache[1] = $event => (showMore.value = true))
                      }, {
                        default: withCtx(() => [
                          createTextVNode("更多")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_view, {
                        class: "footer__btn footer__btn--plain",
                        onClick: goSurplus
                      }, {
                        default: withCtx(() => [
                          createTextVNode("新增盘盈")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_view, {
                        class: "footer__btn footer__btn--primary",
                        onClick: onScan
                      }, {
                        default: withCtx(() => [
                          createTextVNode("扫码盘点")
                        ]),
                        _: 1
                      })
                    ], 64))
              ]),
              _: 1
            }))
      ]),
      _: 1
    }),
    createVNode(_component_u_popup, {
      show: showMore.value && !isTaskCompleted.value,
      mode: "bottom",
      round: "16",
      onClose: _cache[3] || (_cache[3] = $event => (showMore.value = false))
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "sheet" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "sheet__title" }, {
              default: withCtx(() => [
                createTextVNode("更多操作")
              ]),
              _: 1
            }),
            (openBlock(), createElementBlock(Fragment, null, renderList(moreActions, (action) => {
              return createVNode(_component_v_uni_view, {
                key: action.key,
                class: "sheet__action",
                onClick: $event => (onMoreAction(action))
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, {
                    class: normalizeClass(["sheet__action-text", { 'sheet__action-text--danger': action.danger }])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["class"]),
                  createVNode(_component_u_icon, {
                    name: "arrow-right",
                    size: "14",
                    color: "var(--ml-color-text-placeholder)"
                  })
                ]),
                _: 2
              }, 1032, ["onClick"])
            }), 64)),
            createVNode(_component_v_uni_view, {
              class: "sheet__cancel",
              onClick: _cache[2] || (_cache[2] = $event => (showMore.value = false))
            }, {
              default: withCtx(() => [
                createTextVNode("取消")
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["show"]),
    createVNode(_component_u_popup, {
      show: lossSheet.value.show,
      mode: "bottom",
      round: "16",
      onClose: _cache[6] || (_cache[6] = $event => (lossSheet.value.show = false))
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "sheet" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "sheet__title" }, {
              default: withCtx(() => [
                createTextVNode("标记盘亏（" + toDisplayString(lossSheet.value.targets.length) + " 项）", 1)
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_textarea, {
              modelValue: lossRemark.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((lossRemark).value = $event)),
              class: "sheet__textarea",
              placeholder: "请输入盘亏备注",
              maxlength: "200"
            }, null, 8, ["modelValue"]),
            createVNode(_component_v_uni_view, { class: "sheet__btns" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "sheet__btn sheet__btn--plain",
                  onClick: _cache[5] || (_cache[5] = $event => (lossSheet.value.show = false))
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "sheet__btn sheet__btn--primary",
                  onClick: confirmLossSheet
                }, {
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
    }, 8, ["show"]),
    createVNode(_component_u_popup, {
      show: doubtSheet.value.show,
      mode: "bottom",
      round: "16",
      onClose: _cache[9] || (_cache[9] = $event => (doubtSheet.value.show = false))
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "sheet" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "sheet__title" }, {
              default: withCtx(() => [
                createTextVNode("标记存疑（" + toDisplayString(doubtSheet.value.targets.length) + " 项）", 1)
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "sheet__tags" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(doubtTagOptions), (tag) => {
                  return (openBlock(), createBlock(_component_v_uni_view, {
                    key: tag,
                    class: normalizeClass(["sheet__tag", { 'sheet__tag--active': doubtTag.value === tag }]),
                    onClick: $event => (toggleDoubtTag(tag))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(tag), 1)
                    ]),
                    _: 2
                  }, 1032, ["class", "onClick"]))
                }), 128))
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_textarea, {
              modelValue: doubtRemark.value,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((doubtRemark).value = $event)),
              class: "sheet__textarea",
              placeholder: "请输入存疑备注",
              maxlength: "200"
            }, null, 8, ["modelValue"]),
            createVNode(_component_v_uni_text, { class: "sheet__counter" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(doubtRemark.value.length) + "/200", 1)
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "sheet__btns" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "sheet__btn sheet__btn--plain",
                  onClick: _cache[8] || (_cache[8] = $event => (doubtSheet.value.show = false))
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "sheet__btn sheet__btn--primary",
                  onClick: confirmDoubtSheet
                }, {
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
    }, 8, ["show"])
  ], 64))
}
}

};
const execute = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2cf5034b"]]);

export { execute as default };
