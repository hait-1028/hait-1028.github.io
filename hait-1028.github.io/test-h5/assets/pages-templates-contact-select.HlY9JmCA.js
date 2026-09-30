import { a as _export_sfc, r as ref, c as computed, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, J as __easycom_2, A as __easycom_5, Z as __easycom_6, o as openBlock, g as createVNode, h as index$i, j as createTextVNode, q as createCommentVNode, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, t as toDisplayString, a0 as $emit, G as navigateBack } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 组织架构数据 ======
// TODO(api): 从接口获取部门树

const _sfc_main = {
  __name: 'contact-select',
  setup(__props) {

/**
 * 添加本单位联系人模板 — 搜索 + 组织架构树形选人 + 勾选提交
 *
 * 适用场景：从组织架构中选择本单位人员（树形部门导航 → 勾选成员）
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  ← 添加本单位联系人                       │
 * │  ┌─────────────────────────────────────┐│
 * │  │ [🔍 搜索]（灰底圆角条）              ││
 * │  └─────────────────────────────────────┘│
 * │  全部 > 技术部 > 前端组                   │ ← 面包屑，点击回退上级
 * │  ┌─────────────────────────────────────┐│
 * │  │  ⭕ [王] 王五  前端组·高工  138...  ││ ← 勾选圈 + 头像 + 姓名/部门 + 手机号
 * │  │  ✅ [赵] 赵六  前端组·前端  138...  ││
 * │  │  ⭕ [孙] 孙七  前端组·测试  138...  ││
 * │  │  ...                                 ││
 * │  └─────────────────────────────────────┘│
 * │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
 * │          已选 2 人      [提交]            │ ← 底部固定
 * └─────────────────────────────────────────┘
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - mc-navbar 导航栏（easycom 自动注册）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名
 *   2. 修改 departments 数据源 → 匹配业务组织架构接口
 *   3. 修改 members → 匹配业务成员接口
 *   4. 修改 onSubmit → 提交已选成员的业务逻辑
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */
const deptTree = [
  {
    id: 'all', name: '全部', parentId: null, children: [
      { id: 'dept-tech', name: '技术部', parentId: 'all', children: [
        { id: 'dept-frontend', name: '前端组', parentId: 'dept-tech' },
        { id: 'dept-backend', name: '后端组', parentId: 'dept-tech' },
        { id: 'dept-qa', name: '测试组', parentId: 'dept-tech' },
      ]},
      { id: 'dept-product', name: '产品部', parentId: 'all' },
      { id: 'dept-design', name: '设计部', parentId: 'all' },
      { id: 'dept-hr', name: '人力资源部', parentId: 'all' },
    ]
  },
];

// 扁平查找
const findDept = (id) => {
  const walk = (list) => {
    for (const d of list) {
      if (d.id === id) return d;
      if (d.children) {
        const r = walk(d.children);
        if (r) return r;
      }
    }
    return null;
  };
  return walk(deptTree);
};

// ====== 分类栈（面包屑） ======
const categoryStack = ref([deptTree[0]]);

const currentDept = computed(() => categoryStack.value[categoryStack.value.length - 1]);

computed(() => categoryStack.value.map((d) => d.name).join(' > '));

const subCategories = computed(() => currentDept.value.children || []);

const onEnterDept = (deptId) => {
  const dept = findDept(deptId);
  if (dept) {
    categoryStack.value.push(dept);
    searchKeyword.value = '';
    showSearchInput.value = false;
  }
};

const onBreadcrumbClick = (index) => {
  if (index < categoryStack.value.length - 1) {
    categoryStack.value = categoryStack.value.slice(0, index + 1);
    searchKeyword.value = '';
    showSearchInput.value = false;
  }
};

// ====== 成员数据 ======
// TODO(api): 从接口获取当前部门成员
const allMembers = ref([
  { id: 201, name: '王五', dept: '技术部/前端组', position: '高级工程师', avatar: '', phone: '138****0101', selected: false, deptId: 'dept-frontend' },
  { id: 202, name: '赵六', dept: '技术部/前端组', position: '前端开发', avatar: '', phone: '138****0202', selected: false, deptId: 'dept-frontend' },
  { id: 203, name: '孙七', dept: '技术部/前端组', position: '测试工程师', avatar: '', phone: '138****0303', selected: false, deptId: 'dept-frontend' },
  { id: 204, name: '周八', dept: '技术部/后端组', position: '架构师', avatar: '', phone: '138****0404', selected: false, deptId: 'dept-backend' },
  { id: 205, name: '吴九', dept: '技术部/后端组', position: '后端开发', avatar: '', phone: '138****0505', selected: false, deptId: 'dept-backend' },
  { id: 206, name: '郑十', dept: '产品部', position: '产品经理', avatar: '', phone: '138****0606', selected: false, deptId: 'dept-product' },
]);

// 过滤：当前部门成员 + 搜索关键词
const members = computed(() => {
  let list = allMembers.value;
  if (currentDept.value.id !== 'all') {
    list = list.filter((m) => m.deptId === currentDept.value.id);
  }
  if (searchKeyword.value) {
    const kw = searchKeyword.value;
    list = list.filter((m) => m.name.includes(kw) || m.phone.includes(kw));
  }
  return list;
});

const getInitial = (name) => (name || '').charAt(0);

// ====== 搜索 ======
const searchKeyword = ref('');
const showSearchInput = ref(false);

const onSearchTap = () => {
  showSearchInput.value = true;
};

const closeSearch = () => {
  showSearchInput.value = false;
  searchKeyword.value = '';
};

// ====== 选择成员 ======
const toggleMember = (member) => {
  member.selected = !member.selected;
};

const selectedCount = computed(() => allMembers.value.filter((m) => m.selected).length);

// ====== 提交 ======
const onSubmit = () => {
  const selected = allMembers.value.filter((m) => m.selected);
  if (!selected.length) {
    showToast('请至少选择一个联系人');
    return;
  }
  // 通过全局事件将已选联系人传回联系人列表页
  $emit('contactSelected', selected.map((m) => ({
    id: m.id,
    name: m.name,
    dept: m.dept,
    position: m.position,
    avatar: m.avatar,
    phone: m.phone,
    selected: false, // 重置为未选中
  })));
  navigateBack();
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_u_empty = resolveEasycom(resolveDynamicComponent("u-empty"), __easycom_5);
  const _component_u_avatar = resolveEasycom(resolveDynamicComponent("u-avatar"), __easycom_6);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "添加本单位联系人" }),
      (!showSearchInput.value)
        ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 0,
            class: "search-bar"
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, {
                class: "search-input",
                onClick: onSearchTap
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "search",
                    size: "18",
                    color: "var(--ml-color-text-placeholder)"
                  }),
                  createVNode(_component_v_uni_text, { class: "search-input__placeholder" }, {
                    default: withCtx(() => [
                      createTextVNode("搜索")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }))
        : createCommentVNode("", true),
      (showSearchInput.value)
        ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 1,
            class: "search-active"
          }, {
            default: withCtx(() => [
              createVNode(_component_u_input, {
                modelValue: searchKeyword.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchKeyword).value = $event)),
                placeholder: "搜索",
                focus: true,
                clearable: true,
                customStyle: { background: 'var(--ml-color-bg-page)', borderRadius: 'var(--ml-radius-md)' }
              }, {
                prefix: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "search",
                    size: "18",
                    color: "var(--ml-color-text-placeholder)"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "customStyle"]),
              createVNode(_component_v_uni_text, {
                class: "search-active__cancel",
                onClick: closeSearch
              }, {
                default: withCtx(() => [
                  createTextVNode("取消")
                ]),
                _: 1
              })
            ]),
            _: 1
          }))
        : createCommentVNode("", true),
      createVNode(_component_v_uni_view, { class: "breadcrumb" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(categoryStack.value, (c, i) => {
            return (openBlock(), createBlock(_component_v_uni_text, {
              key: c.id,
              class: normalizeClass(["breadcrumb__item", { 'breadcrumb__item--current': i === categoryStack.value.length - 1 }]),
              onClick: $event => (onBreadcrumbClick(i))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(c.name) + " ", 1),
                (i < categoryStack.value.length - 1)
                  ? (openBlock(), createBlock(_component_v_uni_text, {
                      key: 0,
                      class: "breadcrumb__sep"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" > ")
                      ]),
                      _: 1
                    }))
                  : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["class", "onClick"]))
          }), 128))
        ]),
        _: 1
      }),
      (subCategories.value.length)
        ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 2,
            class: "category-list"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(subCategories.value, (cat) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: cat.id,
                  class: "category-item",
                  onClick: $event => (onEnterDept(cat.id))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "category-item__name" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(cat.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_u_icon, {
                      name: "arrow-right",
                      size: "16",
                      color: "var(--ml-color-text-placeholder)"
                    })
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              }), 128))
            ]),
            _: 1
          }))
        : createCommentVNode("", true),
      createVNode(_component_v_uni_view, { class: "member-section" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "member-section__header" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "member-section__title" }, {
                default: withCtx(() => [
                  createTextVNode("成员")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          (members.value.length === 0)
            ? (openBlock(), createBlock(_component_u_empty, {
                key: 0,
                text: "暂无成员",
                mode: "list",
                marginTop: 80
              }))
            : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(members.value, (m) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: m.id,
              class: "member-card",
              onClick: $event => (toggleMember(m))
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: normalizeClass(["member-card__check", { 'member-card__check--active': m.selected }])
                }, {
                  default: withCtx(() => [
                    (m.selected)
                      ? (openBlock(), createBlock(_component_v_uni_text, {
                          key: 0,
                          class: "member-card__check-icon"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("✓")
                          ]),
                          _: 1
                        }))
                      : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["class"]),
                createVNode(_component_v_uni_view, { class: "member-card__avatar" }, {
                  default: withCtx(() => [
                    (m.avatar)
                      ? (openBlock(), createBlock(_component_u_avatar, {
                          key: 0,
                          src: m.avatar,
                          size: "40",
                          shape: "circle"
                        }, null, 8, ["src"]))
                      : (openBlock(), createBlock(_component_v_uni_text, {
                          key: 1,
                          class: "member-card__avatar-text"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getInitial(m.name)), 1)
                          ]),
                          _: 2
                        }, 1024))
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "member-card__info" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "member-card__name" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(m.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_uni_text, { class: "member-card__dept" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(m.dept) + " · " + toDisplayString(m.position), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_text, { class: "member-card__phone" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(m.phone), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["onClick"]))
          }), 128)),
          createVNode(_component_v_uni_view, { class: "member-section__spacer" })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "bottom-bar" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "bottom-bar__count" }, {
            default: withCtx(() => [
              createTextVNode("已选 " + toDisplayString(selectedCount.value) + " 人", 1)
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, {
            class: "bottom-bar__submit",
            onClick: onSubmit
          }, {
            default: withCtx(() => [
              createTextVNode("提交")
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
const contactSelect = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-761249e4"]]);

export { contactSelect as default };
