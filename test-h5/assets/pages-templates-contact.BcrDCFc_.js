import { a as _export_sfc, r as ref, E as reactive, c as computed, $ as $on, X as onUnmounted, Y as $off, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, J as __easycom_2, A as __easycom_5, Z as __easycom_6, B as __easycom_7, o as openBlock, b as createBlock, h as index$i, j as createTextVNode, q as createCommentVNode, l as renderList, t as toDisplayString, n as normalizeClass, m as navigateTo, D as showModal } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 联系人数据 ======
// TODO(api): 从接口获取已添加的联系人列表

const _sfc_main = {
  __name: 'contact',
  setup(__props) {

/**
 * 联系人列表模板 — 搜索 + 添加按钮 + 已选列表 + 全选提交
 *
 * 适用场景：添加审批人、选择抄送人、选择参会人员等需要从组织架构选人的场景
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  导航栏：联系人                           │
 * │  ┌─────────────────────────────────────┐│
 * │  │ [🔍 搜索联系人]（灰底圆角条）         ││  ← 点击展开输入框+取消
 * │  └─────────────────────────────────────┘│
 * │  [添加本单位联系人]  [添加外部联系人]      │ ← 至少一个存在
 * │  ┌─────────────────────────────────────┐│
 * │  │ [头像] 张三      技术部·工程师  [×]  ││
 * │  │ [头像] 李四      产品部·产品经理 [×] ││
 * │  │ [头像] 王五      设计部·UI设计   [×] ││
 * │  │ ...                                 ││
 * │  └─────────────────────────────────────┘│
 * │  ┌─────────────────────────────────────┐│
 * │  │  □ 全选    已选 2 人      [提交]     ││ ← 底部固定
 * │  └─────────────────────────────────────┘│
 * └─────────────────────────────────────────┘
 *
 * 点击「添加外部联系人」→ 底部弹框：
 * ┌─ 添加其他联系人              [×] ─┐
 * │  *姓名                             │
 * │  ────────────────────────          │
 * │  *手机号                           │
 * │  ────────────────────────          │
 * │                                    │
 * │  [取消]          [确定]             │
 * └────────────────────────────────────┘
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
 *   2. 修改 contacts 数据源 → 匹配业务接口
 *   3. 修改 addButtons → 控制添加按钮显隐
 *   4. 修改 onSubmit → 提交已选联系人的业务逻辑
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */
const contacts = ref([
  { id: 1, name: '张三', dept: '技术部', position: '工程师', avatar: '', phone: '138****0001', selected: false },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', avatar: '', phone: '138****0002', selected: false },
  { id: 3, name: '王五', dept: '技术部/前端组', position: '高级工程师', avatar: '', phone: '138****0003', selected: false },
  { id: 4, name: '赵六', dept: '技术部/后端组', position: '架构师', avatar: '', phone: '138****0004', selected: false },
  { id: 5, name: '孙七', dept: '设计部', position: 'UI设计师', avatar: '', phone: '138****0005', selected: false },
]);

// 联系人首字母
const getInitial = (name) => (name || '').charAt(0);

// ====== 添加按钮 ======
// TODO(api): 控制显隐，至少保留一个
const addButtons = ref([
  { label: '添加本单位联系人', type: 'internal', visible: true },
  { label: '添加外部联系人', type: 'external', visible: true },
]);

const onAddContact = (type) => {
  if (type === 'internal') {
    navigateTo({ url: '/pages/templates/contact-select' });
  } else {
    // 外部联系人 → 底部弹框手动输入
    showAddPopup.value = true;
  }
};

// ====== 底部弹框：添加其他联系人（手动输入） ======
const showAddPopup = ref(false);
const addForm = reactive({ name: '', phone: '', remark: '' });
let idCounter = 100;

const onAddConfirm = () => {
  if (!addForm.name.trim()) {
    showToast('请输入联系人姓名');
    return;
  }
  if (!addForm.phone.trim()) {
    showToast('请输入联系人手机号');
    return;
  }
  if (!/^1\d{10}$/.test(addForm.phone.trim())) {
    showToast('请输入正确的手机号');
    return;
  }
  // 添加到列表首位
  contacts.value.unshift({
    id: idCounter++,
    name: addForm.name.trim(),
    dept: '外部',
    position: '',
    avatar: '',
    phone: addForm.phone.trim(),
    selected: false,
  });
  showToast('已添加');
  showAddPopup.value = false;
  addForm.name = '';
  addForm.phone = '';
};

const onAddCancel = () => {
  showAddPopup.value = false;
  addForm.name = '';
  addForm.phone = '';
  addForm.remark = '';
};

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

const filteredContacts = computed(() => {
  if (!searchKeyword.value) return contacts.value;
  return contacts.value.filter(
    (c) => c.name.includes(searchKeyword.value) || c.dept.includes(searchKeyword.value) || c.phone.includes(searchKeyword.value),
  );
});

// ====== 选中 / 全选 ======
const isAllSelected = computed(() => {
  if (!filteredContacts.value.length) return false;
  return filteredContacts.value.every((c) => c.selected);
});

const selectedCount = computed(() => contacts.value.filter((c) => c.selected).length);

const toggleAll = () => {
  const target = !isAllSelected.value;
  filteredContacts.value.forEach((c) => {
    c.selected = target;
  });
};

const toggleSelect = (contact) => {
  contact.selected = !contact.selected;
};

// ====== 删除联系人 ======
const onRemove = (contact) => {
  showModal({
    title: '提示',
    content: `确定移除「${contact.name}」吗？`,
    confirmText: '确定',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        const idx = contacts.value.findIndex((c) => c.id === contact.id);
        if (idx > -1) {
          contacts.value.splice(idx, 1);
          showToast('已移除');
        }
      }
    },
  });
};

// ====== 提交 ======
const onSubmit = () => {
  const selected = contacts.value.filter((c) => c.selected);
  if (!selected.length) {
    showToast('请至少选择一个联系人');
    return;
  }
  // TODO(api): 提交已选联系人
  // emit('confirm', selected)
  showToast(`已提交 ${selected.length} 位联系人`);
};

// 接收选人页面返回的已选联系人（setup 时注册一次，unmounted 时清理）
const contactSelectHandler = (selectedList) => {
  selectedList.forEach((person) => {
    if (!contacts.value.some((c) => c.id === person.id)) {
      contacts.value.unshift(person);
    }
  });
};
$on('contactSelected', contactSelectHandler);
onUnmounted(() => {
  $off('contactSelected', contactSelectHandler);
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_u_empty = resolveEasycom(resolveDynamicComponent("u-empty"), __easycom_5);
  const _component_u_avatar = resolveEasycom(resolveDynamicComponent("u-avatar"), __easycom_6);
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: "联系人" }),
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
                        createTextVNode("搜索联系人")
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
                  placeholder: "搜索联系人",
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
        (addButtons.value.filter((b) => b.visible).length)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 2,
              class: "add-btns"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(addButtons.value.filter((b) => b.visible), (btn) => {
                  return (openBlock(), createBlock(_component_v_uni_view, {
                    key: btn.type,
                    class: "add-btn",
                    onClick: $event => (onAddContact(btn.type))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_u_icon, {
                        name: "plus",
                        size: "18",
                        color: "var(--ml-color-brand)"
                      }),
                      createVNode(_component_v_uni_text, { class: "add-btn__text" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(btn.label), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                }), 128))
              ]),
              _: 1
            }))
          : createCommentVNode("", true),
        (contacts.value.length)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 3,
              class: "list-header"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "list-header__text" }, {
                  default: withCtx(() => [
                    createTextVNode("已添加联系人（" + toDisplayString(contacts.value.length) + "）", 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }))
          : createCommentVNode("", true),
        createVNode(_component_v_uni_view, { class: "contact-list" }, {
          default: withCtx(() => [
            (!contacts.value.length)
              ? (openBlock(), createBlock(_component_u_empty, {
                  key: 0,
                  text: "暂无联系人，请点击上方按钮添加",
                  mode: "list",
                  marginTop: 120
                }))
              : (searchKeyword.value && !filteredContacts.value.length)
                ? (openBlock(), createBlock(_component_u_empty, {
                    key: 1,
                    text: "暂无搜索结果",
                    mode: "search",
                    marginTop: 120
                  }))
                : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredContacts.value, (contact) => {
              return (openBlock(), createBlock(_component_v_uni_view, {
                key: contact.id,
                class: "contact-card"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_view, {
                    class: "contact-card__main",
                    onClick: $event => (toggleSelect(contact))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_view, {
                        class: normalizeClass(["contact-card__check", { 'contact-card__check--active': contact.selected }])
                      }, {
                        default: withCtx(() => [
                          (contact.selected)
                            ? (openBlock(), createBlock(_component_v_uni_text, {
                                key: 0,
                                class: "contact-card__check-icon"
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
                      createVNode(_component_v_uni_view, { class: "contact-card__avatar" }, {
                        default: withCtx(() => [
                          (contact.avatar)
                            ? (openBlock(), createBlock(_component_u_avatar, {
                                key: 0,
                                src: contact.avatar,
                                size: "40",
                                shape: "circle"
                              }, null, 8, ["src"]))
                            : (openBlock(), createBlock(_component_v_uni_text, {
                                key: 1,
                                class: "contact-card__avatar-text"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getInitial(contact.name)), 1)
                                ]),
                                _: 2
                              }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_view, { class: "contact-card__info" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "contact-card__name" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(contact.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_text, { class: "contact-card__dept" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(contact.dept) + " · " + toDisplayString(contact.position), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_v_uni_view, {
                    class: "contact-card__remove",
                    onClick: $event => (onRemove(contact))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_u_icon, {
                        name: "close",
                        size: "16",
                        color: "var(--ml-color-text-placeholder)"
                      })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 2
              }, 1024))
            }), 128))
          ]),
          _: 1
        }),
        (contacts.value.length)
          ? (openBlock(), createBlock(_component_v_uni_view, {
              key: 4,
              class: "bottom-bar"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "bottom-bar__left",
                  onClick: toggleAll
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, {
                      class: normalizeClass(["bottom-bar__check", { 'bottom-bar__check--active': isAllSelected.value }])
                    }, {
                      default: withCtx(() => [
                        (isAllSelected.value)
                          ? (openBlock(), createBlock(_component_v_uni_text, {
                              key: 0,
                              class: "bottom-bar__check-icon"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("✓")
                              ]),
                              _: 1
                            }))
                          : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createVNode(_component_v_uni_text, { class: "bottom-bar__all" }, {
                      default: withCtx(() => [
                        createTextVNode("全选")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
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
            }))
          : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createVNode(_component_u_popup, {
      show: showAddPopup.value,
      mode: "bottom",
      round: "24",
      safeAreaInsetBottom: true,
      onClose: onAddCancel
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "add-popup" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "add-popup__header" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "add-popup__title" }, {
                  default: withCtx(() => [
                    createTextVNode("添加其他联系人")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "add-popup__close",
                  onClick: onAddCancel
                }, {
                  default: withCtx(() => [
                    createVNode(_component_u_icon, {
                      name: "close",
                      size: "20",
                      color: "var(--ml-color-text-secondary)"
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "add-popup__body" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "add-popup__item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "add-popup__label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "add-popup__required" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createTextVNode("姓名")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: addForm.name,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((addForm.name) = $event)),
                      placeholder: "请输入姓名",
                      border: "none",
                      clearable: false,
                      customStyle: { flex: 1 }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "add-popup__item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "add-popup__label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "add-popup__required" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createTextVNode("手机号")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: addForm.phone,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((addForm.phone) = $event)),
                      placeholder: "请输入手机号",
                      border: "none",
                      clearable: false,
                      type: "number",
                      maxlength: "11",
                      customStyle: { flex: 1 }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "add-popup__item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "add-popup__label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: addForm.remark,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((addForm.remark) = $event)),
                      placeholder: "请输入文字",
                      border: "none",
                      clearable: false,
                      customStyle: { flex: 1 }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "add-popup__footer" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "add-popup__btn add-popup__btn--cancel",
                  onClick: onAddCancel
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "add-popup__btn add-popup__btn--confirm",
                  onClick: onAddConfirm
                }, {
                  default: withCtx(() => [
                    createTextVNode("确定")
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
    }, 8, ["show"])
  ], 64))
}
}

};
const contact = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3fd43902"]]);

export { contact as default };
