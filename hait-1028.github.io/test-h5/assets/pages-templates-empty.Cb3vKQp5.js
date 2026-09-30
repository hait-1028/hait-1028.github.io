import { a as _export_sfc, r as ref, c as computed, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, e as __easycom_1, f as resolveDynamicComponent, o as openBlock, g as createVNode, h as index$i, j as createTextVNode, t as toDisplayString } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// type: empty | error | network

const _sfc_main = {
  __name: 'empty',
  setup(__props) {

/**
 * 空状态页模板
 *
 * 适用场景：列表无数据、加载失败、网络异常、搜索无结果等占位反馈
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  无数据（默认）                                 ║
 * ║  └─ 图标 + 标题 + 描述 + 主操作按钮             ║
 * ║                                               ║
 * ║  加载失败 / 网络异常                            ║
 * ║  └─ 错误图标 + 重试按钮                         ║
 * ║                                               ║
 * ║  仅提示（无按钮）                               ║
 * ║  └─ 图标 + 标题 + 描述，无操作                  ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - type 控制图标与配色：empty / error / network
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 empty.vue / empty-state.vue）
 *   2. 通过 :type 切换 empty/error/network 三种形态
 *   3. 按需调整标题 / 描述 / 按钮文案（不想要按钮时删掉 action 区）
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const type = ref('empty');

const config = computed(() => {
  const map = {
    empty: { icon: 'email', title: '暂无数据', desc: '当前没有相关内容，换个筛选条件试试吧', btn: '去添加' },
    error: { icon: 'error-circle', title: '加载失败', desc: '数据加载出错，请稍后重试', btn: '重新加载' },
    network: { icon: 'wifi-off', title: '网络异常', desc: '请检查网络连接后重试', btn: '刷新' },
  };
  return map[type.value] || map.empty;
});

const onAction = () => {
  // TODO(api): 根据 type 执行对应操作（新增 / 重试 / 刷新）
  showToast(config.value.btn);
};

return (_ctx, _cache) => {
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "empty" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "empty__icon" }, {
            default: withCtx(() => [
              createVNode(_component_u_icon, {
                name: config.value.icon,
                size: "80",
                color: "var(--ml-color-text-placeholder)"
              }, null, 8, ["name"])
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_text, { class: "empty__title" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(config.value.title), 1)
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_text, { class: "empty__desc" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(config.value.desc), 1)
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, {
            class: "empty__action",
            onClick: onAction
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "empty__action-text" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(config.value.btn), 1)
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
}
}

};
const empty = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-e6210402"]]);

export { empty as default };
