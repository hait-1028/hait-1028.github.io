import { a as _export_sfc, o as openBlock, b as createBlock, w as withCtx, g as createVNode, i as index$g, h as index$i, j as createTextVNode, q as createCommentVNode, t as toDisplayString, a4 as renderSlot, G as navigateBack } from './index-DsfVUykM.js';

const _sfc_main = {
  __name: 'mc-navbar',
  props: {
  title: { type: String, default: '' },
  showBack: { type: Boolean, default: true },
},
  setup(__props) {

/**
 * 通用导航栏组件
 * - showBack 控制返回键显示，默认 true（显示），传入 false 可隐藏
 * - 三等分布局（左/中/右），标题始终居中，不与返回键重叠
 */


const handleBack = () => {
  navigateBack();
};

return (_ctx, _cache) => {
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "mc-navbar" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "mc-navbar__status-bar" }),
      createVNode(_component_v_uni_view, { class: "mc-navbar__content" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "mc-navbar__left" }, {
            default: withCtx(() => [
              (__props.showBack)
                ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "mc-navbar__back",
                    onClick: handleBack
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "mc-navbar__back-icon" }, {
                        default: withCtx(() => [
                          createTextVNode("‹")
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
          createVNode(_component_v_uni_view, { class: "mc-navbar__title" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(__props.title), 1)
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "mc-navbar__right" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "right", {}, undefined, true)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  }))
}
}

};
const __easycom_0 = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-1a5d2e49"]]);

export { __easycom_0 as _ };
