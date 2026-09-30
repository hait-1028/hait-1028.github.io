import { a as _export_sfc, r as ref, c as computed, z as onLoad, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, L as __easycom_5, O as __easycom_6, B as __easycom_7, o as openBlock, I as Input, l as renderList, b as createBlock, h as index$i, j as createTextVNode, t as toDisplayString, q as createCommentVNode, n as normalizeClass, D as showModal } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 页面标题（可按业务修改） ======
const pageTitle = '常用信息/事由';

// ====== 搜索 ======
const newItemMax = 200;

const editItemMax = 200;


const _sfc_main = {
  __name: 'editable-list',
  setup(__props) {

/**
 * 可编辑常用信息列表模板 — 搜索 + 列表 + 编辑/删除 + 新增输入 + 底部提交
 *
 * 适用场景：常用语/快捷回复/事由/备注预设的管理页面
 *
 * 页面结构（AI 必读）：
 * ┌──────────────────────────────────────────────┐
 * │  导航栏：标题（mc-navbar 内置返回键）           │
 * │                                              │
 * │  [搜索栏]  白色圆角卡片 + 搜索图标 + 占位文字     │
 * │                                              │
 * │  [列表区]  白色卡片 × N（每项含文本+编辑+删除）   │
 * │   常用信息文字描述              [编辑][删除]    │
 * │   常用信息文字描述文字多行...   [编辑][删除]    │
 * │                                              │
 * │  [新增输入卡片]  白色圆角卡片                   │
 * │   预设文本（textarea）                        │
 * │   0/200                                       │
 * │                                              │
 * │  [底部提交按钮]  蓝色全宽按钮（悬浮固定）         │
 * └──────────────────────────────────────────────┘
 *
 * 交互模式：
 * 1. 搜索：实时过滤列表（客户端本地过滤）
 * 2. 编辑：点击编辑图标 → 底部弹出编辑弹窗（textarea + 字数统计）
 * 3. 删除：点击删除图标 → 确认弹窗 → 从列表移除
 * 4. 新增：底部 textarea 输入 → 点击提交时合并到列表
 * 5. 提交：将当前列表（含新增项）提交到后端
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  基础模式（最通用）：                      ║
 * ║  └─ 搜索 + 列表 + 新增输入 + 提交          ║
 * ║    适用：常用语管理、快捷回复设置、事由预设 ║
 * ║                                           ║
 * ║  纯列表模式（无新增输入）：                ║
 * ║  └─ 删除搜索栏和新增输入卡片，只保留列表   ║
 * ║    适用：只读管理、纯展示+编辑+删除        ║
 * ║                                           ║
 * ║  无搜索模式：                            ║
 * ║  └─ 删除搜索栏，列表直接展示全部           ║
 * ║    适用：列表较短、无需搜索的场景          ║
 * ╚═══════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - mc-navbar 导航栏（easycom 自动注册）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)，AI 复制后替换为 @/api 调用
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名
 *   2. 按业务删减不需要的模式（如去掉搜索或新增输入）
 *   3. 修改字段名、列表数据结构、校验规则
 *   4. 替换 TODO(api) 处为 @/api 真实接口
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const searchKeyword = ref('');

// ====== 列表数据 ======
// TODO(api): 从接口获取初始列表
const itemList = ref([
  { id: 1, text: '常用信息文字描述' },
  { id: 2, text: '常用信息文字描述文字多行展示常用信息文字描述文字多行展示' },
  { id: 3, text: '常用信息文字描述' },
  { id: 4, text: '常用信息文字描述文字多行展示常用信息文字描述文字多行展示' },
  { id: 5, text: '常用信息文字描述' },
]);

// 过滤后的列表（搜索）
const filteredList = computed(() => {
  if (!searchKeyword.value.trim()) return itemList.value;
  const kw = searchKeyword.value.trim().toLowerCase();
  return itemList.value.filter((item) => item.text.toLowerCase().includes(kw));
});

// ====== 新增输入 ======
const newItemText = ref('');
const canAddNew = computed(() => newItemText.value.trim().length > 0);

// ====== 编辑弹窗 ======
const showEditPopup = ref(false);
const editItemId = ref(null);
const editItemText = ref('');
const openEditPopup = (item) => {
  editItemId.value = item.id;
  editItemText.value = item.text;
  showEditPopup.value = true;
};

const confirmEdit = () => {
  const text = editItemText.value.trim();
  if (!text) {
    showToast('请输入内容');
    return;
  }
  const idx = itemList.value.findIndex((i) => i.id === editItemId.value);
  if (idx > -1) {
    itemList.value[idx].text = text;
  }
  showEditPopup.value = false;
  editItemId.value = null;
  editItemText.value = '';
};

const cancelEdit = () => {
  showEditPopup.value = false;
  editItemId.value = null;
  editItemText.value = '';
};

// ====== 删除确认 ======
const deleteItem = (item) => {
  showModal({
    title: '提示',
    content: '确定删除该条常用信息？',
    // 原生 API 颜色参数必须传十六进制（不能用 var()），取值对应 --ml-color-error (#ff4141)
    confirmColor: '#ff4141',
    success: (res) => {
      if (res.confirm) {
        const idx = itemList.value.findIndex((i) => i.id === item.id);
        if (idx > -1) {
          itemList.value.splice(idx, 1);
        }
      }
    },
  });
};

// ====== 提交 ======
const submitting = ref(false);
const onSubmit = async () => {
  if (itemList.value.length === 0 && !newItemText.value.trim()) {
    showToast('请至少添加一条常用信息');
    return;
  }
  submitting.value = true;
  try {
    // 合并新增项到列表
    const finalList = [...itemList.value];
    if (newItemText.value.trim()) {
      const newItem = {
        id: Date.now(), // 临时 ID，提交后由后端替换
        text: newItemText.value.trim(),
      };
      finalList.push(newItem);
      // 同步更新页面列表，确保提交后立即显示新增数据
      itemList.value.push(newItem);
    }
    // TODO(api): 调用 @/api 提交完整列表
    // import { submitCommonInfoApi } from '@/api/api-manager.js'
    // const res = await submitCommonInfoApi({ list: finalList })
    // if (res === null) return
    // showToast('提交成功', 'success')
    // newItemText.value = ''
    await new Promise((resolve) => setTimeout(resolve, 600));
    showToast('提交成功', 'success');
    newItemText.value = '';
  } catch (e) {
    console.error('[EditableListTemplate] 提交失败', e);
    showToast('提交失败，请重试');
  } finally {
    submitting.value = false;
  }
};

// ====== 编辑回显（如编辑模式从其他页传入 id） ======
onLoad((options) => {
  if (options?.id) ;
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_input = Input;
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_u_textarea = resolveEasycom(resolveDynamicComponent("u-textarea"), __easycom_5);
  const _component_u_loading_icon = resolveEasycom(resolveDynamicComponent("u-loading-icon"), __easycom_6);
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: pageTitle }),
        createVNode(_component_v_uni_view, { class: "search-card" }, {
          default: withCtx(() => [
            createVNode(_component_u_icon, {
              name: "search",
              size: "16",
              color: "var(--ml-color-text-placeholder)"
            }),
            createVNode(_component_v_uni_input, {
              modelValue: searchKeyword.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchKeyword).value = $event)),
              class: "search-input",
              placeholder: "搜索内容",
              "placeholder-class": "search-placeholder"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        createVNode(_component_v_uni_view, { class: "scroll-area" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredList.value, (item) => {
              return (openBlock(), createBlock(_component_v_uni_view, {
                key: item.id,
                class: "item-card"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_view, { class: "item-row" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "item-text" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.text), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_view, { class: "item-actions" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, {
                            class: "action-btn",
                            onClick: $event => (openEditPopup(item))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_u_icon, {
                                name: "edit-pen",
                                size: "20",
                                color: "var(--ml-color-text-placeholder)"
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(_component_v_uni_view, {
                            class: "action-btn",
                            onClick: $event => (deleteItem(item))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_u_icon, {
                                name: "trash",
                                size: "20",
                                color: "var(--ml-color-text-placeholder)"
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024))
            }), 128)),
            (filteredList.value.length === 0 && searchKeyword.value.trim())
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 0,
                  class: "empty-tip"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, null, {
                      default: withCtx(() => [
                        createTextVNode("未搜索到相关内容")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            createVNode(_component_v_uni_view, { class: "input-card" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "textarea-wrapper" }, {
                  default: withCtx(() => [
                    createVNode(_component_u_textarea, {
                      modelValue: newItemText.value,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((newItemText).value = $event)),
                      maxlength: newItemMax,
                      placeholder: "预设文本",
                      border: "none",
                      autoHeight: true,
                      customStyle: { background: 'transparent' }
                    }, null, 8, ["modelValue"]),
                    createVNode(_component_v_uni_text, { class: "textarea-count" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(newItemText.value.length) + "/" + toDisplayString(newItemMax), 1)
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
        createVNode(_component_v_uni_view, { class: "submit-area" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, {
              class: normalizeClass(["submit-btn", { 'submit-btn--disabled': !canAddNew.value && itemList.value.length === 0 }]),
              onClick: onSubmit
            }, {
              default: withCtx(() => [
                (submitting.value)
                  ? (openBlock(), createBlock(_component_u_loading_icon, {
                      key: 0,
                      size: "36",
                      color: "var(--ml-color-white)"
                    }))
                  : (openBlock(), createBlock(_component_v_uni_text, { key: 1 }, {
                      default: withCtx(() => [
                        createTextVNode("提交")
                      ]),
                      _: 1
                    }))
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_u_popup, {
      show: showEditPopup.value,
      mode: "bottom",
      round: 20,
      closeOnClickOverlay: true,
      onClose: cancelEdit
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "edit-popup" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "edit-popup-title" }, {
              default: withCtx(() => [
                createTextVNode("修改常用信息")
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "edit-popup-body" }, {
              default: withCtx(() => [
                createVNode(_component_u_textarea, {
                  modelValue: editItemText.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((editItemText).value = $event)),
                  maxlength: editItemMax,
                  border: "none",
                  autoHeight: true,
                  customStyle: { background: 'transparent' }
                }, null, 8, ["modelValue"]),
                createVNode(_component_v_uni_text, { class: "edit-popup-count" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(editItemText.value.length) + "/" + toDisplayString(editItemMax), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "edit-popup-footer" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, {
                  class: "edit-popup-btn edit-popup-btn--cancel",
                  onClick: cancelEdit
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 取消 ")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, {
                  class: "edit-popup-btn edit-popup-btn--confirm",
                  onClick: confirmEdit
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 确定 ")
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
const editableList = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-d35409e9"]]);

export { editableList as default };
