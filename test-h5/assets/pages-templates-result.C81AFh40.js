import { a as _export_sfc, c as computed, z as onLoad, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, o as openBlock, g as createVNode, C as normalizeStyle, Q as index$q, h as index$i, j as createTextVNode, t as toDisplayString, q as createCommentVNode, a1 as reLaunch } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';

// ====== 页面配置（AI 按业务修改）======

const _sfc_main = {
  __name: 'result',
  props: {
  title: { type: String, default: '结果页标题' },
  iconType: { type: String, default: 'custom' }, // success / warning / error / info / custom
  iconUrl: { type: String, default: '' },          // custom 模式下使用图片 URL
  iconName: { type: String, default: 'checkmark-circle' }, // custom 模式下使用 u-icon 名
  mainTitle: { type: String, default: '描述文字' },
  subTitle: { type: String, default: '一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容' },
  primaryText: { type: String, default: '' },
  secondaryText: { type: String, default: '' },
  primaryUrl: { type: String, default: '/pages/index' },
  secondaryUrl: { type: String, default: '/pages/index' },
},
  setup(__props) {

/**
 * 结果页模板 — 提交/处理/状态反馈结果展示
 *
 * 适用场景：提交成功、操作完成、审批结果、空状态、异常提示等
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  导航栏：结果页标题                       │
 * │                                          │
 * │           ┌─────────────┐                │
 * │           │   自定义图标  │                │  ← 80×80rpx 圆形区域
 * │           └─────────────┘                │
 * │                                          │
 * │              描述文字                     │  ← 主标题
 * │    一段很长很长的内容文字，长文本自动换行    │  ← 副标题
 * │                                          │
 * │         [  返回首页  ]                   │  ← 主操作按钮（可选）
 * │                                          │
 * └─────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  icon 类型（props.type 控制）              ║
 * ║  ├─ 'success'：绿色对勾                    ║
 * ║  ├─ 'warning'：橙色感叹号                  ║
 * ║  ├─ 'error'：红色叉号                      ║
 * ║  ├─ 'info'：蓝色信息                       ║
 * ║  └─ 'custom'：自定义图标/图片（默认）      ║
 * ║                                           ║
 * ║  按钮模式（props 控制）                    ║
 * ║  ├─ 单按钮：primaryText + primaryAction   ║
 * ║  ├─ 双按钮：同时传入 primary + secondary  ║
 * ║  └─ 无按钮：两个都不传                    ║
 * ║                                           ║
 * ║  常见业务组合                              ║
 * ║  ├─ 提交成功：success + 单按钮"返回首页"   ║
 * ║  ├─ 操作失败：error + 双按钮"重试/返回"    ║
 * ║  └─ 空状态：info/custom + 单按钮"去添加"   ║
 * ╚═══════════════════════════════════════════╝
 *
 * AI 使用方式：
 *   result.vue 是纯组件模板，直接作为页面使用：
 *   1. 复制本文件 → 改名放入 demo/{分类}/
 *   2. 按业务设置 props：title / iconType / mainTitle / subTitle
 *   3. 按需传 primaryText + primaryUrl 或 secondaryText + secondaryUrl
 *   4. 替换 onPrimary / onSecondary 中的跳转逻辑为业务行为
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - mc-navbar 导航栏（easycom 自动注册）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 */

const props = __props;

// ====== 图标颜色/名称映射 ======
const iconConfig = computed(() => {
  const map = {
    success: { name: 'checkmark-circle', color: 'var(--ml-color-success)', bg: 'var(--ml-color-success-bg)' },
    warning: { name: 'warning', color: 'var(--ml-color-warning)', bg: 'var(--ml-color-warning-bg)' },
    error: { name: 'close-circle', color: 'var(--ml-color-error)', bg: 'var(--ml-color-error-bg)' },
    info: { name: 'info-circle', color: 'var(--ml-color-info)', bg: 'var(--ml-color-info-bg)' },
    custom: { name: props.iconName, color: 'var(--ml-color-brand)', bg: 'var(--ml-color-brand-bg)' },
  };
  return map[props.iconType] || map.custom;
});

// ====== 按钮操作 ======
const onPrimary = () => {
  reLaunch({ url: props.primaryUrl });
};

const onSecondary = () => {
  reLaunch({ url: props.secondaryUrl });
};

// ====== 初始化（支持 URL 参数）======
onLoad((options) => {
  // TODO(api): 根据 options 回填页面数据
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_image = index$q;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: __props.title }, null, 8, ["title"]),
      createVNode(_component_v_uni_view, { class: "result" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "result-icon",
            style: normalizeStyle({ background: iconConfig.value.bg })
          }, {
            default: withCtx(() => [
              (__props.iconType === 'custom' && __props.iconUrl)
                ? (openBlock(), createBlock(_component_v_uni_image, {
                    key: 0,
                    class: "result-icon__img",
                    src: __props.iconUrl,
                    mode: "aspectFit"
                  }, null, 8, ["src"]))
                : (openBlock(), createBlock(_component_u_icon, {
                    key: 1,
                    name: iconConfig.value.name,
                    size: "48",
                    color: iconConfig.value.color
                  }, null, 8, ["name", "color"]))
            ]),
            _: 1
          }, 8, ["style"]),
          createVNode(_component_v_uni_text, { class: "result-title" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(__props.mainTitle), 1)
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_text, { class: "result-subtitle" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(__props.subTitle), 1)
            ]),
            _: 1
          }),
          (__props.primaryText || __props.secondaryText)
            ? (openBlock(), createBlock(_component_v_uni_view, {
                key: 0,
                class: "result-actions"
              }, {
                default: withCtx(() => [
                  (__props.secondaryText)
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 0,
                        class: "result-btn result-btn--secondary",
                        onClick: onSecondary
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "result-btn__text result-btn__text--secondary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.secondaryText), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }))
                    : createCommentVNode("", true),
                  (__props.primaryText)
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 1,
                        class: "result-btn result-btn--primary",
                        onClick: onPrimary
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "result-btn__text" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.primaryText), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }))
                    : createCommentVNode("", true)
                ]),
                _: 1
              }))
            : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const result = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-4ef133ef"]]);

export { result as default };
