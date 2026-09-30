import { a as _export_sfc, r as ref, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, e as __easycom_1, f as resolveDynamicComponent, o as openBlock, g as createVNode, Q as index$q, h as index$i, j as createTextVNode, t as toDisplayString, k as createElementBlock, F as Fragment, l as renderList, C as normalizeStyle } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 用户信息 ======
// TODO(api): 拉取当前登录用户信息

const _sfc_main = {
  __name: 'profile',
  setup(__props) {

/**
 * 个人中心 / 我的 页模板
 *
 * 适用场景：用户主页、个人中心、我的（信息展示 + 功能入口聚合）
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  标准个人中心                                   ║
 * ║  └─ 用户信息头 + 数据卡片 + 功能九宫格 + 列表项  ║
 * ║                                               ║
 * ║  简化版（仅信息+列表）                          ║
 * ║  └─ 用户信息头 + 分组列表，无九宫格              ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 mine.vue / user-center.vue）
 *   2. 按需删减数据卡片项 / 九宫格项 / 列表项
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const user = ref({
  avatar: '',
  name: '张三',
  role: '研发工程师',
  phone: '138****8888',
});

// ====== 数据卡片 ======
// TODO(api): 拉取各项统计数据
const stats = ref([
  { key: 'order', label: '我的订单', value: 12 },
  { key: 'todo', label: '待办', value: 3 },
  { key: 'approve', label: '待审批', value: 5 },
  { key: 'favorite', label: '收藏', value: 28 },
]);

// ====== 功能九宫格 ======
// TODO(api): 按业务配置功能入口
const entries = ref([
  { key: 'order', icon: 'order', name: '我的订单', color: 'var(--ml-color-brand)' },
  { key: 'approve', icon: 'checkmark-circle', name: '审批', color: 'var(--ml-color-success)' },
  { key: 'vehicle', icon: 'car', name: '用车', color: 'var(--ml-color-warning)' },
  { key: 'meeting', icon: 'chat', name: '会议', color: 'var(--ml-color-info)' },
  { key: 'file', icon: 'file-text', name: '文件', color: 'var(--ml-color-brand)' },
  { key: 'report', icon: 'list-dot', name: '报表', color: 'var(--ml-color-success)' },
  { key: 'message', icon: 'bell', name: '消息', color: 'var(--ml-color-warning)' },
  { key: 'more', icon: 'more-dot-fill', name: '更多', color: 'var(--ml-color-text-secondary)' },
]);

// ====== 列表项 ======
const listGroups = ref([
  {
    title: '账号',
    items: [
      { key: 'profile', icon: 'account', name: '个人资料', color: 'var(--ml-color-brand)' },
      { key: 'security', icon: 'lock', name: '账号安全', color: 'var(--ml-color-success)' },
    ],
  },
  {
    title: '服务',
    items: [
      { key: 'setting', icon: 'setting', name: '设置', color: 'var(--ml-color-text-secondary)' },
      { key: 'about', icon: 'info-circle', name: '关于我们', color: 'var(--ml-color-text-secondary)' },
      { key: 'service', icon: 'kefu-ermai', name: '联系客服', color: 'var(--ml-color-text-secondary)' },
    ],
  },
]);

const onStat = (item) => showToast(`查看${item.label}`);
const onEntry = (item) => showToast(`进入${item.name}`);
const onItem = (item) => {
  if (item.key === 'setting') ;
  showToast(item.name);
};
const onLogout = () => {
  // TODO(api): 退出登录并跳转到登录页
  showToast('已退出登录');
};

return (_ctx, _cache) => {
  const _component_v_uni_image = index$q;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "user-header" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "user-header__avatar" }, {
                default: withCtx(() => [
                  (user.value.avatar)
                    ? (openBlock(), createBlock(_component_v_uni_image, {
                        key: 0,
                        src: user.value.avatar,
                        mode: "aspectFill",
                        class: "user-header__avatar-img"
                      }, null, 8, ["src"]))
                    : (openBlock(), createBlock(_component_u_icon, {
                        key: 1,
                        name: "account-fill",
                        size: "48",
                        color: "var(--ml-color-white)"
                      }))
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_view, { class: "user-header__info" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "user-header__name" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(user.value.name), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_uni_text, { class: "user-header__role" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(user.value.role) + " · " + toDisplayString(user.value.phone), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_u_icon, {
                name: "arrow-right",
                size: "16",
                color: "var(--ml-color-white)",
                onClick: _cache[0] || (_cache[0] = $event => (onItem({ key: 'profile', name: '个人资料' })))
              })
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "stat-card" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(stats.value, (item) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: item.key,
                  class: "stat-item",
                  onClick: $event => (onStat(item))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "stat-item__value" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.value), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_uni_text, { class: "stat-item__label" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.label), 1)
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
          createVNode(_component_v_uni_view, { class: "entry-card" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(entries.value, (item) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: item.key,
                  class: "entry-item",
                  onClick: $event => (onEntry(item))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, {
                      class: "entry-item__icon",
                      style: normalizeStyle({ background: 'var(--ml-color-brand-bg)' })
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_u_icon, {
                          name: item.icon,
                          size: "26",
                          color: item.color
                        }, null, 8, ["name", "color"])
                      ]),
                      _: 2
                    }, 1032, ["style"]),
                    createVNode(_component_v_uni_text, { class: "entry-item__name" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.name), 1)
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
          (openBlock(true), createElementBlock(Fragment, null, renderList(listGroups.value, (group) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: group.title,
              class: "list-group"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "list-group__title" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(group.title), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "list-group__card" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: item.key,
                        class: "list-cell",
                        onClick: $event => (onItem(item))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_u_icon, {
                            name: item.icon,
                            size: "18",
                            color: item.color
                          }, null, 8, ["name", "color"]),
                          createVNode(_component_v_uni_text, { class: "list-cell__name" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_u_icon, {
                            name: "arrow-right",
                            size: "14",
                            color: "var(--ml-color-text-placeholder)"
                          })
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024))
          }), 128)),
          createVNode(_component_v_uni_view, {
            class: "logout-btn",
            onClick: onLogout
          }, {
            default: withCtx(() => [
              createTextVNode("退出登录")
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const profile = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ba440e64"]]);

export { profile as default };
