import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, K as __easycom_3, o as openBlock, g as createVNode, k as createElementBlock, F as Fragment, l as renderList, h as index$i, j as createTextVNode, t as toDisplayString, n as normalizeClass, q as createCommentVNode } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 开关状态 ======
// TODO(api): 从接口拉取用户设置

const _sfc_main = {
  __name: 'settings',
  setup(__props) {

/**
 * 设置页模板
 *
 * 适用场景：系统设置、偏好设置、账号设置（分组列表 + 开关项 + 箭头项）
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  标准设置页                                     ║
 * ║  └─ 多个分组卡片：开关项 + 箭头项 + 退出按钮    ║
 * ║                                               ║
 * ║  仅开关页                                       ║
 * ║  └─ 只保留 toggle 类设置（无箭头跳转项）        ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 settings.vue）
 *   2. 按业务增删分组 / 开关项 / 箭头项
 *   3. 替换 TODO(api) 处为 @/api 真实接口 / 页面跳转
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const switches = ref({
  push: true,        // 消息推送
  sound: true,       // 提示音
  privacy: false,    // 私密模式
  wifiOnly: true,    // 仅 Wi-Fi 下载
});

// ====== 分组 ======
const groups = ref([
  {
    title: '通知',
    items: [
      { key: 'push', type: 'switch', name: '消息推送', bind: 'push', color: 'var(--ml-color-brand)' },
      { key: 'sound', type: 'switch', name: '提示音', bind: 'sound', color: 'var(--ml-color-success)' },
    ],
  },
  {
    title: '隐私与安全',
    items: [
      { key: 'privacy', type: 'switch', name: '私密模式', bind: 'privacy', color: 'var(--ml-color-warning)' },
      { key: 'account', type: 'arrow', name: '账号安全', color: 'var(--ml-color-brand)' },
      { key: 'password', type: 'arrow', name: '修改密码', color: 'var(--ml-color-brand)' },
    ],
  },
  {
    title: '通用',
    items: [
      { key: 'wifiOnly', type: 'switch', name: '仅 Wi-Fi 下载', bind: 'wifiOnly', color: 'var(--ml-color-info)' },
      { key: 'language', type: 'arrow', name: '语言', value: '简体中文', color: 'var(--ml-color-text-secondary)' },
      { key: 'clearCache', type: 'arrow', name: '清除缓存', value: '12.6MB', color: 'var(--ml-color-text-secondary)' },
      { key: 'about', type: 'arrow', name: '关于', color: 'var(--ml-color-text-secondary)' },
    ],
  },
]);

const onSwitch = (item, val) => {
  switches.value[item.bind] = val;
  // TODO(api): 上报设置变更
};

const onArrow = (item) => {
  if (item.key === 'about') ;
  showToast(item.name);
};

const onLogout = () => {
  // TODO(api): 退出登录
  showToast('已退出登录');
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_u_switch = resolveEasycom(resolveDynamicComponent("u-switch"), __easycom_3);
  const _component_v_uni_view = index$g;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "设置" }),
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(groups.value, (group) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: group.title,
              class: "group"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "group__title" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(group.title), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "group__card" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item, idx) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: item.key,
                        class: normalizeClass(["cell", { 'cell--last': idx === group.items.length - 1 }]),
                        onClick: $event => (item.type === 'arrow' && onArrow(item))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_u_icon, {
                            name: item.key === 'push' ? 'bell' : item.key === 'sound' ? 'volume' : item.key === 'privacy' ? 'lock' : item.key === 'account' ? 'account' : item.key === 'password' ? 'edit-pen' : item.key === 'wifiOnly' ? 'wifi' : item.key === 'language' ? 'language' : item.key === 'clearCache' ? 'trash' : 'info-circle',
                            size: "18",
                            color: item.color
                          }, null, 8, ["name", "color"]),
                          createVNode(_component_v_uni_text, { class: "cell__name" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          (item.type === 'switch')
                            ? (openBlock(), createBlock(_component_u_switch, {
                                key: 0,
                                modelValue: switches.value[item.bind],
                                activeColor: "var(--ml-color-brand)",
                                inactiveColor: "var(--ml-color-border-strong)",
                                onChange: (val) => onSwitch(item, val)
                              }, null, 8, ["modelValue", "onChange"]))
                            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                (item.value)
                                  ? (openBlock(), createBlock(_component_v_uni_text, {
                                      key: 0,
                                      class: "cell__value"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.value), 1)
                                      ]),
                                      _: 2
                                    }, 1024))
                                  : createCommentVNode("", true),
                                createVNode(_component_u_icon, {
                                  name: "arrow-right",
                                  size: "14",
                                  color: "var(--ml-color-text-placeholder)"
                                })
                              ], 64))
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
const settings = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-932c54b4"]]);

export { settings as default };
