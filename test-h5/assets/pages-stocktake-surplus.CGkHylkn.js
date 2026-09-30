import { a as _export_sfc, r as ref, z as onLoad, E as reactive, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, B as __easycom_7, o as openBlock, S as ScrollView, h as index$i, j as createTextVNode, I as Input, x as index$h, l as renderList, u as unref, b as createBlock, t as toDisplayString, G as navigateBack } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { e as archiveList, f as taskResults } from './mock.DyMutdN4.js';
import { s as showToast } from './util.DsG2dHzK.js';

const _sfc_main = {
  __name: 'surplus',
  setup(__props) {

/**
 * 新增盘盈页
 * - 手动录入盘盈资产：*资产名称、*数量、*资产编号、分类、品牌、型号、供应商、单位、参考单价、备注
 * - 可选择现存标准型号快速带入，带入后仍支持手动编辑
 * - 盘盈盘亏只作为记录，不改变库存
 */
const taskId = ref('t1');
onLoad((opts) => { taskId.value = opts.id || 't1'; });

// ===== 表单 =====
const form = reactive({
  name: '',
  quantity: '1',
  code: '',
  category: '',
  brand: '',
  model: '',
  supplier: '',
  unit: '',
  refPrice: '',
  remark: '',
});
const fromArchive = ref(false);

// ===== 标准型号选择弹层 =====
const showArchive = ref(false);
function pickArchive(archive) {
  form.name = archive.name;
  form.code = archive.code;
  form.category = archive.category;
  form.brand = archive.brand;
  form.model = archive.model;
  form.supplier = archive.supplier;
  form.unit = archive.unit;
  form.refPrice = String(archive.refPrice);
  fromArchive.value = true;
  showArchive.value = false;
  showToast(`已带入标准型号：${archive.name}`);
}
function onInput() {
  fromArchive.value = false;
}

// ===== 提交 =====
function submit() {
  if (!form.name.trim()) return showToast('请输入资产名称');
  if (!form.quantity || Number(form.quantity) < 1) return showToast('请输入数量');
  if (!form.code.trim()) return showToast('请输入资产编号');
  if (!taskResults[taskId.value]) taskResults[taskId.value] = [];
  taskResults[taskId.value].push({
    id: `ry${Date.now()}`,
    assetCode: form.code.trim(),
    assetName: form.name.trim(),
    category: form.category || '未分类',
    location: '—',
    tab: '盘盈',
    remark: form.remark,
    photos: 0,
    tags: [],
    source: fromArchive.value ? '档案带入' : '手动录入',
    quantity: Number(form.quantity),
    brand: form.brand,
    model: form.model,
    supplier: form.supplier,
    unit: form.unit,
    refPrice: form.refPrice,
  });
  showToast('盘盈登记成功');
  setTimeout(() => navigateBack(), 600);
}

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_input = Input;
  const _component_v_uni_textarea = index$h;
  const _component_v_uni_scroll_view = ScrollView;
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: "新增盘盈" }),
        createVNode(_component_v_uni_scroll_view, {
          class: "body",
          "scroll-y": ""
        }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "tip" }, {
              default: withCtx(() => [
                createVNode(_component_u_icon, {
                  name: "info-circle",
                  size: "14",
                  color: "var(--ml-color-brand)"
                }),
                createVNode(_component_v_uni_text, { class: "tip__text" }, {
                  default: withCtx(() => [
                    createTextVNode("可选择现存标准型号带入，也支持手动编辑；盘盈盘亏只作为记录，不改变库存。")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, {
              class: "archive-entry",
              onClick: _cache[0] || (_cache[0] = $event => (showArchive.value = true))
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "archive-entry__left" }, {
                  default: withCtx(() => [
                    createVNode(_component_u_icon, {
                      name: "file-text",
                      size: "18",
                      color: "var(--ml-color-brand)"
                    }),
                    createVNode(_component_v_uni_text, { class: "archive-entry__text" }, {
                      default: withCtx(() => [
                        createTextVNode("从现存标准型号选择")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_u_icon, {
                  name: "arrow-right",
                  size: "14",
                  color: "var(--ml-color-text-placeholder)"
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "form" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "form__required" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createTextVNode("资产名称")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.name,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.name) = $event)),
                      class: "form__input",
                      placeholder: "请输入资产名称",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "form__required" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createTextVNode("数量")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.quantity,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.quantity) = $event)),
                      class: "form__input",
                      type: "number",
                      placeholder: "请输入数量",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "form__required" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createTextVNode("资产编号")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.code,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.code) = $event)),
                      class: "form__input",
                      placeholder: "请输入资产编号",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("资产分类")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.category,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.category) = $event)),
                      class: "form__input",
                      placeholder: "请输入资产分类",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("品牌")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.brand,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.brand) = $event)),
                      class: "form__input",
                      placeholder: "请输入品牌",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("型号")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.model,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.model) = $event)),
                      class: "form__input",
                      placeholder: "请输入型号",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("供应商")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.supplier,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.supplier) = $event)),
                      class: "form__input",
                      placeholder: "请输入供应商",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("单位")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.unit,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((form.unit) = $event)),
                      class: "form__input",
                      placeholder: "请输入单位",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("参考单价（元）")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_input, {
                      modelValue: form.refPrice,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((form.refPrice) = $event)),
                      class: "form__input",
                      type: "digit",
                      placeholder: "请输入参考单价",
                      onInput: onInput
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form__row form__row--column" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form__label" }, {
                      default: withCtx(() => [
                        createTextVNode("备注")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_textarea, {
                      modelValue: form.remark,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((form.remark) = $event)),
                      class: "form__textarea",
                      placeholder: "请输入备注",
                      maxlength: "200"
                    }, null, 8, ["modelValue"])
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
            createVNode(_component_v_uni_view, {
              class: "footer__btn",
              onClick: submit
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
    }),
    createVNode(_component_u_popup, {
      show: showArchive.value,
      mode: "bottom",
      round: "16",
      onClose: _cache[12] || (_cache[12] = $event => (showArchive.value = false))
    }, {
      default: withCtx(() => [
        createVNode(_component_v_uni_view, { class: "sheet" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "sheet__title" }, {
              default: withCtx(() => [
                createTextVNode("选择标准型号")
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_scroll_view, {
              class: "sheet__list",
              "scroll-y": ""
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(archiveList), (archive) => {
                  return (openBlock(), createBlock(_component_v_uni_view, {
                    key: archive.id,
                    class: "sheet__item",
                    onClick: $event => (pickArchive(archive))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_view, { class: "sheet__item-head" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "sheet__item-name" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(archive.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_text, { class: "sheet__item-code" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(archive.code), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_v_uni_text, { class: "sheet__item-meta" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(archive.category) + "｜" + toDisplayString(archive.brand) + " " + toDisplayString(archive.model) + "｜" + toDisplayString(archive.supplier), 1)
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
            createVNode(_component_v_uni_view, {
              class: "sheet__cancel",
              onClick: _cache[11] || (_cache[11] = $event => (showArchive.value = false))
            }, {
              default: withCtx(() => [
                createTextVNode("取消")
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
const surplus = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-37263f3f"]]);

export { surplus as default };
