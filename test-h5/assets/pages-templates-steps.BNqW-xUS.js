import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, c as computed, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, o as openBlock, g as createVNode, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, h as index$i, j as createTextVNode, t as toDisplayString, q as createCommentVNode } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 步骤定义 ======
// TODO(api): 按业务配置步骤

const _sfc_main = {
  __name: 'steps',
  setup(__props) {

/**
 * 步骤向导 / 进度 模板
 *
 * 适用场景：多步表单、申请流程、实名认证、下单流程等分步引导
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  横向步骤条（最通用）                           ║
 * ║  └─ 顶部步骤指示器 + 单步内容 + 上一步/下一步   ║
 * ║                                               ║
 * ║  纵向时间轴步骤                                 ║
 * ║  └─ 左侧竖线节点 + 右侧内容（适合已完成的流程） ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 steps.vue / wizard.vue）
 *   2. 按业务增删 steps 步骤、修改每步内容
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const steps = ref([
  { key: 'base', title: '基本信息', desc: '填写申请人基础资料' },
  { key: 'detail', title: '详细内容', desc: '补充申请明细' },
  { key: 'confirm', title: '确认提交', desc: '核对并提交审批' },
]);

const current = ref(0);
const isFirst = computed(() => current.value === 0);
const isLast = computed(() => current.value === steps.value.length - 1);

// 步骤状态：0 已完成 / 1 进行中 / 2 未开始
const statusOf = (idx) => {
  if (idx < current.value) return 0;
  if (idx === current.value) return 1;
  return 2;
};

const prev = () => {
  if (!isFirst.value) current.value -= 1;
};
const next = () => {
  if (isLast.value) {
    // TODO(api): 提交完整流程
    showToast('流程提交成功', 'success');
    return;
  }
  current.value += 1;
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "步骤向导" }),
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "stepper" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(steps.value, (s, idx) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: s.key,
                  class: normalizeClass(["stepper__node", `stepper__node--${statusOf(idx)}`])
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "stepper__circle" }, {
                      default: withCtx(() => [
                        (statusOf(idx) === 0)
                          ? (openBlock(), createBlock(_component_u_icon, {
                              key: 0,
                              name: "checkmark",
                              size: "16",
                              color: "var(--ml-color-white)"
                            }))
                          : (openBlock(), createBlock(_component_v_uni_text, {
                              key: 1,
                              class: "stepper__index"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(idx + 1), 1)
                              ]),
                              _: 2
                            }, 1024))
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_uni_text, { class: "stepper__title" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(s.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    (idx < steps.value.length - 1)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: normalizeClass(["stepper__line", { 'stepper__line--done': statusOf(idx) === 0 }])
                        }, null, 8, ["class"]))
                      : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["class"]))
              }), 128))
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "step-content" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "step-content__title" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(steps.value[current.value].title), 1)
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_text, { class: "step-content__desc" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(steps.value[current.value].desc), 1)
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_view, { class: "step-content__placeholder" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "step-content__ph-text" }, {
                    default: withCtx(() => [
                      createTextVNode("第 " + toDisplayString(current.value + 1) + " 步内容区（在此放置本步骤的表单/信息）", 1)
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
      }),
      createVNode(_component_v_uni_view, { class: "footer" }, {
        default: withCtx(() => [
          (!isFirst.value)
            ? (openBlock(), createBlock(_component_v_uni_view, {
                key: 0,
                class: "footer__btn footer__btn--plain",
                onClick: prev
              }, {
                default: withCtx(() => [
                  createTextVNode("上一步")
                ]),
                _: 1
              }))
            : createCommentVNode("", true),
          createVNode(_component_v_uni_view, {
            class: "footer__btn footer__btn--primary",
            onClick: next
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(isLast.value ? '提交' : '下一步'), 1)
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
const steps = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-6de84266"]]);

export { steps as default };
