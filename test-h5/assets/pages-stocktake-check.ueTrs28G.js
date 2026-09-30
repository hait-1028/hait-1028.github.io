import { a as _export_sfc, r as ref, z as onLoad, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, o as openBlock, g as createVNode, S as ScrollView, k as createElementBlock, F as Fragment, l as renderList, h as index$i, j as createTextVNode, t as toDisplayString, x as index$h, q as createCommentVNode, G as navigateBack } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { b as getTask, g as getTaskResults } from './mock.DyMutdN4.js';
import { s as showToast } from './util.DsG2dHzK.js';

const _sfc_main = {
  __name: 'check',
  setup(__props) {

/**
 * 执行盘点页（全屏）
 * - 上半部分：资产台账基本信息（编号/名称/分类/位置/状态/使用人/品牌/型号），供核对实物
 * - 下半部分：盘点备注（实物与台账不符时填写说明）+ 拍照上传 + 取消/确定
 */
const taskId = ref('t1');
const task = ref(getTask('t1'));
const targets = ref([]);
const remark = ref('');
const photos = ref([]);

onLoad((opts) => {
  taskId.value = opts.id || 't1';
  task.value = getTask(taskId.value);
  const ids = (opts.ids || '').split(',').filter(Boolean);
  targets.value = getTaskResults(taskId.value).filter((r) => ids.includes(r.id));
});

// ===== 拍照上传（盘点设置：图片仅允许拍照上传） =====
function addPhoto() {
  if (photos.value.length >= 9) return showToast('最多上传 9 张照片');
  photos.value.push(`p${Date.now()}-${photos.value.length}`);
  showToast('已拍照上传');
}
function removePhoto(idx) {
  photos.value.splice(idx, 1);
}

// ===== 确定：写入盘点结果 =====
function confirm() {
  targets.value.forEach((r) => {
    r.tab = '已盘';
    r.remark = remark.value;
    r.photos = photos.value.length;
  });
  showToast(`已执行盘点 ${targets.value.length} 项资产`);
  setTimeout(() => navigateBack(), 500);
}

// ===== 取消返回 =====
function goBack() {
  navigateBack();
}

const infoRows = (item) => [
  { label: '资产分类', value: item.category },
  { label: '所在位置', value: item.location },
  { label: '资产状态', value: item.status },
  { label: '使用人', value: item.user || '—' },
  { label: '品牌', value: item.brand || '—' },
  { label: '型号', value: item.model || '—' },
];

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_scroll_view = ScrollView;
  const _component_v_uni_textarea = index$h;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, {
        title: `执行盘点（${targets.value.length} 项）`
      }, null, 8, ["title"]),
      createVNode(_component_v_uni_scroll_view, {
        class: "info",
        "scroll-y": ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(targets.value, (item) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: item.id,
              class: "info-card"
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "info-card__head" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "info-card__code" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.assetCode), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_text, { class: "info-card__name" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.assetName), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "info-card__grid" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(infoRows(item), (row) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: row.label,
                        class: "info-card__cell"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "info-card__label" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.label), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_text, { class: "info-card__value" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.value), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024))
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024))
          }), 128))
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "bottom" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "bottom__hint-row" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "bottom__hint-title" }, {
                default: withCtx(() => [
                  createTextVNode("盘点备注")
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_text, { class: "bottom__hint-text" }, {
                default: withCtx(() => [
                  createTextVNode("若盘点实物与台账信息不符，请在备注中填写说明")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_textarea, {
            modelValue: remark.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((remark).value = $event)),
            class: "bottom__textarea",
            placeholder: "请输入盘点备注（实物与台账不符时填写说明）",
            maxlength: "200"
          }, null, 8, ["modelValue"]),
          createVNode(_component_v_uni_view, { class: "bottom__photos" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(photos.value, (photo, idx) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: photo,
                  class: "bottom__photo",
                  onClick: $event => (removePhoto(idx))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_u_icon, {
                      name: "photo-camera",
                      size: "22",
                      color: "var(--ml-color-white)"
                    }),
                    createVNode(_component_v_uni_view, { class: "bottom__photo-del" }, {
                      default: withCtx(() => [
                        createVNode(_component_u_icon, {
                          name: "close",
                          size: "10",
                          color: "var(--ml-color-white)"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              }), 128)),
              (photos.value.length < 9)
                ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "bottom__photo-add",
                    onClick: addPhoto
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_u_icon, {
                        name: "camera-fill",
                        size: "24",
                        color: "var(--ml-color-text-placeholder)"
                      }),
                      createVNode(_component_v_uni_text, { class: "bottom__photo-add-text" }, {
                        default: withCtx(() => [
                          createTextVNode("拍照")
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
          (task.value.settings.photoOnly)
            ? (openBlock(), createBlock(_component_v_uni_text, {
                key: 0,
                class: "bottom__setting-hint"
              }, {
                default: withCtx(() => [
                  createTextVNode("盘点设置：图片仅允许拍照上传")
                ]),
                _: 1
              }))
            : createCommentVNode("", true),
          createVNode(_component_v_uni_view, { class: "bottom__btns" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, {
                class: "bottom__btn bottom__btn--plain",
                onClick: goBack
              }, {
                default: withCtx(() => [
                  createTextVNode("取消")
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_view, {
                class: "bottom__btn bottom__btn--primary",
                onClick: confirm
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
  }))
}
}

};
const check = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-997c841d"]]);

export { check as default };
