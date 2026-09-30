import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, J as __easycom_2, o as openBlock, g as createVNode, k as createElementBlock, F as Fragment, l as renderList, C as normalizeStyle, h as index$i, j as createTextVNode, t as toDisplayString, q as createCommentVNode, u as unref, n as normalizeClass } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 顶部搜索 ======

const _sfc_main = {
  __name: 'tabbar-home',
  setup(__props) {

/**
 * 带底部 Tab 的主页 / 仪表盘 模板
 *
 * 适用场景：App 首页、工作台、仪表盘（底部 tab 导航 + 内容区聚合）
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  标准首页（最通用）                             ║
 * ║  └─ 顶部搜索 + Banner + 快捷入口网格 + 列表     ║
 * ║     + 底部 4 Tab（首页/工作台/消息/我的）        ║
 * ║                                               ║
 * ║  纯内容首页（无网格）                           ║
 * ║  └─ 顶部搜索 + Banner + 信息流列表               ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)
 * - 底部 tabbar 为固定定位，内容区需预留 bottom 安全区
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 home.vue / workbench.vue）
 *   2. 按业务调整快捷入口 / 列表 / tab 项
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const keyword = ref('');

// ====== Banner ======
// TODO(api): 拉取轮播图
const banners = ref([
  { id: 1, title: '高效协同，从这里开始', bg: 'var(--ml-color-brand)' },
  { id: 2, title: '移动办公新体验', bg: 'var(--ml-color-success)' },
]);

// ====== 快捷入口 ======
// TODO(api): 按角色配置入口
const quickEntries = ref([
  { key: 'apply', icon: 'edit-pen', name: '发起申请', color: 'var(--ml-color-brand)' },
  { key: 'approve', icon: 'checkmark-circle', name: '待审批', color: 'var(--ml-color-warning)', badge: 5 },
  { key: 'vehicle', icon: 'car', name: '用车', color: 'var(--ml-color-success)' },
  { key: 'meeting', icon: 'chat', name: '会议', color: 'var(--ml-color-info)' },
  { key: 'report', icon: 'list-dot', name: '报表', color: 'var(--ml-color-brand)' },
  { key: 'more', icon: 'more-dot-fill', name: '更多', color: 'var(--ml-color-text-secondary)' },
]);

// ====== 信息列表 ======
// TODO(api): 拉取待办 / 通知列表
const notices = ref([
  { id: 1, title: '您有一条用车申请待审批', time: '10分钟前', type: 'warning' },
  { id: 2, title: '周五全员大会通知', time: '1小时前', type: 'info' },
  { id: 3, title: '月度报表已生成', time: '昨天', type: 'success' },
]);

// ====== 底部 Tab ======
const tabbar = ref([
  { key: 'home', icon: 'home', name: '首页', color: 'var(--ml-color-brand)' },
  { key: 'workbench', icon: 'grid', name: '工作台', color: 'var(--ml-color-text-placeholder)' },
  { key: 'message', icon: 'bell', name: '消息', color: 'var(--ml-color-text-placeholder)' },
  { key: 'mine', icon: 'account', name: '我的', color: 'var(--ml-color-text-placeholder)' },
]);
const activeTab = ref('home');

const onSearch = () => showToast(`搜索：${keyword.value || '空'}`);
const onBanner = (b) => showToast(b.title);
const onQuick = (e) => showToast(e.name);
const onNotice = (n) => showToast(n.title);
const onTab = (t) => {
  activeTab.value = t.key;
  // TODO: 多 tab 页可用 uni.switchTab 切换；单页演示仅高亮
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "工作台" }),
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "search-bar",
            onClick: onSearch
          }, {
            default: withCtx(() => [
              createVNode(_component_u_icon, {
                name: "search",
                size: "16",
                color: "var(--ml-color-text-placeholder)"
              }),
              createVNode(_component_u_input, {
                modelValue: keyword.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((keyword).value = $event)),
                placeholder: "搜索应用、文件、人员",
                border: "none",
                customStyle: { padding: '0 0 0 12rpx' },
                onConfirm: onSearch
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "banner" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(banners.value, (b) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: b.id,
                  class: "banner__item",
                  style: normalizeStyle({ background: b.bg }),
                  onClick: $event => (onBanner(b))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "banner__title" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(b.title), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["style", "onClick"]))
              }), 128))
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "quick-card" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(quickEntries.value, (e) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: e.key,
                  class: "quick-item",
                  onClick: $event => (onQuick(e))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, {
                      class: "quick-item__icon",
                      style: normalizeStyle({ background: 'var(--ml-color-brand-bg)' })
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_u_icon, {
                          name: e.icon,
                          size: "24",
                          color: e.color
                        }, null, 8, ["name", "color"]),
                        (e.badge)
                          ? (openBlock(), createBlock(_component_v_uni_text, {
                              key: 0,
                              class: "quick-item__badge"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(e.badge), 1)
                              ]),
                              _: 2
                            }, 1024))
                          : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["style"]),
                    createVNode(_component_v_uni_text, { class: "quick-item__name" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(e.name), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              }), 128))
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "notice-card" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "notice-card__header" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "notice-card__title" }, {
                    default: withCtx(() => [
                      createTextVNode("待办通知")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_uni_text, {
                    class: "notice-card__more",
                    onClick: _cache[1] || (_cache[1] = $event => (unref(showToast)('查看全部')))
                  }, {
                    default: withCtx(() => [
                      createTextVNode("全部")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList(notices.value, (n) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: n.id,
                  class: "notice-item",
                  onClick: $event => (onNotice(n))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, {
                      class: normalizeClass(["notice-item__dot", `notice-item__dot--${n.type}`])
                    }, null, 8, ["class"]),
                    createVNode(_component_v_uni_view, { class: "notice-item__body" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "notice-item__title" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(n.title), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_v_uni_text, { class: "notice-item__time" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(n.time), 1)
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
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "tabbar" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(tabbar.value, (t) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: t.key,
              class: normalizeClass(["tabbar__item", { 'tabbar__item--active': activeTab.value === t.key }]),
              onClick: $event => (onTab(t))
            }, {
              default: withCtx(() => [
                createVNode(_component_u_icon, {
                  name: t.icon,
                  size: "22",
                  color: activeTab.value === t.key ? 'var(--ml-color-brand)' : 'var(--ml-color-text-placeholder)'
                }, null, 8, ["name", "color"]),
                createVNode(_component_v_uni_text, {
                  class: normalizeClass(["tabbar__name", { 'tabbar__name--active': activeTab.value === t.key }])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(t.name), 1)
                  ]),
                  _: 2
                }, 1032, ["class"])
              ]),
              _: 2
            }, 1032, ["class", "onClick"]))
          }), 128))
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const tabbarHome = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-058fed4e"]]);

export { tabbarHome as default };
