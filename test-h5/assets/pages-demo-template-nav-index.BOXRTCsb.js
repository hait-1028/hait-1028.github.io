import { a as _export_sfc, b as createBlock, w as withCtx, i as index$g, o as openBlock, g as createVNode, h as index$i, j as createTextVNode, k as createElementBlock, F as Fragment, l as renderList, t as toDisplayString, m as navigateTo } from './index-DsfVUykM.js';

// 全部页面模板清单；route 对应 pages.json 中 pages/templates/{name}

const _sfc_main = {
  __name: 'index',
  setup(__props) {

const templates = [
  { name: '表单录入', route: 'pages/templates/form' },
  { name: '列表页', route: 'pages/templates/list' },
  { name: '详情页', route: 'pages/templates/detail' },
  { name: '可编辑列表', route: 'pages/templates/editable-list' },
  { name: '筛选弹窗', route: 'pages/templates/filter' },
  { name: '联系人', route: 'pages/templates/contact' },
  { name: '组织架构选人', route: 'pages/templates/contact-select' },
  { name: '操作记录', route: 'pages/templates/operation-record' },
  { name: '结果页', route: 'pages/templates/result' },
  { name: '登录注册', route: 'pages/templates/login' },
  { name: '个人中心', route: 'pages/templates/profile' },
  { name: '设置', route: 'pages/templates/settings' },
  { name: '步骤向导', route: 'pages/templates/steps' },
  { name: '首页工作台', route: 'pages/templates/tabbar-home' },
  { name: '空状态', route: 'pages/templates/empty' },
];

const go = (route) => {
  // H5 应用内跳转（直接浏览器访问或预览器 iframe 内均生效）
  navigateTo({ url: '/' + route });
};

return (_ctx, _cache) => {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "nav-header" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "nav-title" }, {
            default: withCtx(() => [
              createTextVNode("模板预览导航")
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_text, { class: "nav-sub" }, {
            default: withCtx(() => [
              createTextVNode("点击下方任意模板，跳转查看对应页面模板的渲染效果")
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "grid" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(templates, (t) => {
            return createVNode(_component_v_uni_view, {
              key: t.route,
              class: "cell",
              "hover-class": "cell-hover",
              onClick: $event => (go(t.route))
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "cell-name" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(t.name), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_text, { class: "cell-route" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(t.route), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["onClick"])
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
const index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-c7f1e3c6"]]);

export { index as default };
