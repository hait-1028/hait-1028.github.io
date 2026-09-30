import { a as _export_sfc, c as computed, r as ref, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, e as __easycom_1, f as resolveDynamicComponent, o as openBlock, g as createVNode, u as unref, S as ScrollView, h as index$i, j as createTextVNode, k as createElementBlock, F as Fragment, l as renderList, t as toDisplayString, n as normalizeClass, m as navigateTo } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { p as personalAssetList, c as currentPersonalUser, t as taskList, g as getTaskResults } from './mock.DyMutdN4.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ===== 工作台摘要 =====

const _sfc_main = {
  __name: 'index',
  setup(__props) {

/**
 * 移动端工作台：以可扩展功能卡片承载“我的装备”和“资产盘点”两个独立入口。
 * 实际应用按角色权限展示对应入口，本原型同时保留两类能力用于流程评审。
 */
const personalAssetCount = computed(() => personalAssetList.filter((asset) => asset.userId === currentPersonalUser.id).length);
const stocktakeTaskCount = computed(() => taskList.length);
computed(() => taskList.filter((task) => task.status !== '已完成').length);
const pendingStocktakeAssetCount = computed(() => taskList
  .filter((task) => task.status !== '已完成')
  .reduce((total, task) => total + getTaskResults(task.id).filter((item) => item.tab === '未盘').length, 0));

// ===== 功能卡片 =====
// 后续新增 APP 功能时，继续追加卡片或 entries，不改变工作台页面结构。
const workbenchSections = computed(() => [
  {
    key: 'asset-management',
    title: '资产管理',
    entries: [
      {
        key: 'personal-assets',
        icon: 'account',
        tone: 'brand',
        iconColor: 'var(--ml-color-brand)',
        title: '我的装备',
        summary: `${personalAssetCount.value} 项 · 仅本人`,
        route: '/pages/personal/assets',
      },
      {
        key: 'stocktake-tasks',
        icon: 'scan',
        tone: 'success',
        iconColor: 'var(--ml-color-success)',
        title: '资产盘点',
        summary: `${stocktakeTaskCount.value} 个任务 · ${pendingStocktakeAssetCount.value} 项待盘`,
        route: '/pages/stocktake/tasks',
      },
    ],
  },
]);

// ===== 底部导航 =====
const activeTab = ref('workbench');
const tabbar = [
  { key: 'home', icon: 'home', name: '首页' },
  { key: 'workbench', icon: 'grid', name: '工作台' },
  { key: 'message', icon: 'bell', name: '消息' },
  { key: 'mine', icon: 'account', name: '我的' },
];

function handleEntryClick(entry) {
  navigateTo({ url: entry.route });
}

function handleTabClick(tab) {
  if (tab.key === activeTab.value) return;
  showToast(`${tab.name}入口暂未开放`);
}

return (_ctx, _cache) => {
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_scroll_view = ScrollView;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, {
        title: "资产管理",
        "show-back": false
      }, {
        right: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "navbar-more",
            onClick: _cache[0] || (_cache[0] = $event => (unref(showToast)('当前为工作台首页')))
          }, {
            default: withCtx(() => [
              createVNode(_component_u_icon, {
                name: "more-dot-fill",
                size: "20",
                color: "var(--ml-color-text-primary)"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_scroll_view, {
        class: "content",
        "scroll-y": ""
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "hero-card" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "hero-card__title" }, {
                default: withCtx(() => [
                  createTextVNode("工作台")
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_text, { class: "hero-card__desc" }, {
                default: withCtx(() => [
                  createTextVNode("按业务场景进入我的装备查看或资产盘点")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          (openBlock(true), createElementBlock(Fragment, null, renderList(workbenchSections.value, (section) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: section.key,
              class: "app-section"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "app-section__card" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "app-section__title" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(section.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_uni_view, { class: "app-section__grid" }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(section.entries, (entry) => {
                          return (openBlock(), createBlock(_component_v_uni_view, {
                            key: entry.key,
                            class: "app-entry",
                            onClick: $event => (handleEntryClick(entry))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, {
                                class: normalizeClass(["app-entry__icon", `app-entry__icon--${entry.tone}`])
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_u_icon, {
                                    name: entry.icon,
                                    size: "28",
                                    color: entry.iconColor
                                  }, null, 8, ["name", "color"])
                                ]),
                                _: 2
                              }, 1032, ["class"]),
                              createVNode(_component_v_uni_text, { class: "app-entry__title" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(entry.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_text, { class: "app-entry__summary" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(entry.summary), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]))
                        }), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024))
          }), 128)),
          createVNode(_component_v_uni_view, { class: "permission-tip" }, {
            default: withCtx(() => [
              createVNode(_component_u_icon, {
                name: "info-circle",
                size: "16",
                color: "var(--ml-color-info)"
              }),
              createVNode(_component_v_uni_text, { class: "permission-tip__text" }, {
                default: withCtx(() => [
                  createTextVNode("我的装备与资产盘点分别记录，互不改变对方业务状态。")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "tabbar" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(tabbar, (tab) => {
            return createVNode(_component_v_uni_view, {
              key: tab.key,
              class: normalizeClass(["tabbar__item", { 'tabbar__item--active': activeTab.value === tab.key }]),
              onClick: $event => (handleTabClick(tab))
            }, {
              default: withCtx(() => [
                createVNode(_component_u_icon, {
                  name: tab.icon,
                  size: "22",
                  color: activeTab.value === tab.key ? 'var(--ml-color-brand)' : 'var(--ml-color-text-placeholder)'
                }, null, 8, ["name", "color"]),
                createVNode(_component_v_uni_text, {
                  class: normalizeClass(["tabbar__name", { 'tabbar__name--active': activeTab.value === tab.key }])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(tab.name), 1)
                  ]),
                  _: 2
                }, 1032, ["class"])
              ]),
              _: 2
            }, 1032, ["class", "onClick"])
          }), 64))
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-af6603a6"]]);

export { index as default };
