import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { a as _export_sfc, r as ref, c as computed, k as createElementBlock, g as createVNode, w as withCtx, b as createBlock, p as withModifiers, q as createCommentVNode, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, o as openBlock, S as ScrollView, j as createTextVNode, t as toDisplayString, u as unref, h as index$i, I as Input, l as renderList, v as index$x, n as normalizeClass, x as index$h } from './index-DsfVUykM.js';
import { p as personalAssetList, c as currentPersonalUser, a as personalCheckList } from './mock.DyMutdN4.js';
import { s as showToast } from './util.DsG2dHzK.js';

const _sfc_main = {
  __name: 'assets',
  setup(__props) {

/**
 * 普通用户个人资产页：只读查看本人资产，并提交个人点验事实。
 * 选择“列表 + 卡片详情 + 底部点验面板”作为移动端列表业务模板。
 */
const keyword = ref('');
const showCheckSheet = ref(false);
const selectedAsset = ref(null);
const checkResult = ref('正常');
const checkRemark = ref('');
const checkRecords = ref([...personalCheckList]);
const checkOptions = ['正常', '位置不符', '未找到', '信息异常'];

const visibleAssets = computed(() => {
  const normalized = keyword.value.trim().toLowerCase();
  return personalAssetList
    .filter((asset) => asset.userId === currentPersonalUser.id)
    .filter((asset) => {
      if (!normalized) return true;
      return [asset.code, asset.name, asset.category, asset.location].some((value) => value.toLowerCase().includes(normalized));
    });
});

const checkedCount = computed(() => new Set(checkRecords.value.filter((record) => visibleAssets.value.some((asset) => asset.id === record.assetId)).map((record) => record.assetId)).size);

const getLastCheck = (assetId) => checkRecords.value.find((record) => record.assetId === assetId);

const openCheck = (asset) => {
  selectedAsset.value = asset;
  checkResult.value = '正常';
  checkRemark.value = '';
  showCheckSheet.value = true;
};

const closeCheck = () => {
  showCheckSheet.value = false;
  selectedAsset.value = null;
};

const submitCheck = () => {
  if (!selectedAsset.value || !checkResult.value) {
    showToast('请选择点验结果');
    return;
  }
  if (checkRemark.value.trim().length > 200) {
    showToast('备注不能超过200字');
    return;
  }
  checkRecords.value.unshift({
    id: `pc-${Date.now()}`,
    assetId: selectedAsset.value.id,
    result: checkResult.value,
    remark: checkRemark.value.trim(),
    checkedAt: '2026-08-13 10:30',
  });
  showToast('点验已提交', 'success');
  closeCheck();
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_input = Input;
  const _component_v_uni_button = index$x;
  const _component_v_uni_scroll_view = ScrollView;
  const _component_v_uni_textarea = index$h;

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, {
          title: "我的资产",
          "show-back": false
        }),
        createVNode(_component_v_uni_scroll_view, {
          class: "content",
          "scroll-y": ""
        }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "profile-card" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "profile-card__avatar" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(currentPersonalUser).name.slice(0, 1)), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "profile-card__info" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "profile-card__name-line" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "profile-card__name" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(currentPersonalUser).name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "profile-card__role" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(currentPersonalUser).role), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "profile-card__department" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(currentPersonalUser).department) + " · 仅展示本人名下资产", 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "summary-grid" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "summary-item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "summary-item__value" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(visibleAssets.value.length), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "summary-item__label" }, {
                      default: withCtx(() => [
                        createTextVNode("我的资产")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "summary-item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "summary-item__value summary-item__value--brand" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(checkedCount.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "summary-item__label" }, {
                      default: withCtx(() => [
                        createTextVNode("已点验")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "summary-item" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "summary-item__value summary-item__value--warning" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(visibleAssets.value.length - checkedCount.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "summary-item__label" }, {
                      default: withCtx(() => [
                        createTextVNode("待点验")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "search-box" }, {
              default: withCtx(() => [
                createVNode(_component_u_icon, {
                  name: "search",
                  size: "18",
                  color: "var(--ml-color-text-placeholder)"
                }),
                createVNode(_component_v_uni_input, {
                  modelValue: keyword.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((keyword).value = $event)),
                  class: "search-box__input",
                  placeholder: "搜索资产名称、编号或位置"
                }, null, 8, ["modelValue"]),
                (keyword.value)
                  ? (openBlock(), createBlock(_component_v_uni_text, {
                      key: 0,
                      class: "search-box__clear",
                      onClick: _cache[1] || (_cache[1] = $event => (keyword.value = ''))
                    }, {
                      default: withCtx(() => [
                        createTextVNode("清除")
                      ]),
                      _: 1
                    }))
                  : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "section-head" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_text, { class: "section-head__title" }, {
                  default: withCtx(() => [
                    createTextVNode("资产列表")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_text, { class: "section-head__hint" }, {
                  default: withCtx(() => [
                    createTextVNode("共 " + toDisplayString(visibleAssets.value.length) + " 项", 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            (visibleAssets.value.length)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 0,
                  class: "asset-list"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(visibleAssets.value, (asset) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: asset.id,
                        class: "asset-card"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, { class: "asset-card__head" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "asset-card__name" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(asset.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_v_uni_text, { class: "asset-card__code" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(asset.code), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_text, { class: "asset-card__status" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(asset.status), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_view, { class: "asset-card__grid" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "asset-card__field" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "asset-card__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("资产分类")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "asset-card__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(asset.category), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "asset-card__field" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "asset-card__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("当前位置")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "asset-card__value asset-card__value--location" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(asset.location), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_view, { class: "asset-card__field" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "asset-card__label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("SN / RFID")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "asset-card__value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(asset.sn || '未录入') + " / " + toDisplayString(asset.rfid || '未录入'), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_uni_view, { class: "asset-card__foot" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "asset-card__last-check" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "asset-card__last-label" }, {
                                    default: withCtx(() => [
                                      createTextVNode("最近点验")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "asset-card__last-value" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(getLastCheck(asset.id)?.result || '待点验'), 1),
                                      (getLastCheck(asset.id))
                                        ? (openBlock(), createBlock(_component_v_uni_text, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(" · " + toDisplayString(getLastCheck(asset.id).checkedAt), 1)
                                            ]),
                                            _: 2
                                          }, 1024))
                                        : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_v_uni_button, {
                                class: "check-button",
                                onClick: withModifiers($event => (openCheck(asset)), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("点验")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024))
                    }), 128))
                  ]),
                  _: 1
                }))
              : (openBlock(), createBlock(_component_v_uni_view, {
                  key: 1,
                  class: "empty-state"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_u_icon, {
                      name: "search",
                      size: "34",
                      color: "var(--ml-color-text-placeholder)"
                    }),
                    createVNode(_component_v_uni_text, { class: "empty-state__title" }, {
                      default: withCtx(() => [
                        createTextVNode("未找到匹配资产")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "empty-state__desc" }, {
                      default: withCtx(() => [
                        createTextVNode("请清除关键词后重新查看本人名下资产")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }))
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    (showCheckSheet.value)
      ? (openBlock(), createBlock(_component_v_uni_view, {
          key: 0,
          class: "sheet-mask",
          onClick: withModifiers(closeCheck, ["self"])
        }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, { class: "check-sheet" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "check-sheet__head" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "check-sheet__title" }, {
                          default: withCtx(() => [
                            createTextVNode("资产点验")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "check-sheet__asset" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(selectedAsset.value?.name) + " · " + toDisplayString(selectedAsset.value?.code), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_icon, {
                      name: "close",
                      size: "20",
                      color: "var(--ml-color-text-secondary)",
                      onClick: closeCheck
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "check-sheet__location" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "check-sheet__label" }, {
                      default: withCtx(() => [
                        createTextVNode("当前登记位置")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "check-sheet__value" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(selectedAsset.value?.location), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_text, { class: "check-sheet__section-title" }, {
                  default: withCtx(() => [
                    createTextVNode("请选择点验结果")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "result-grid" }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(checkOptions, (option) => {
                      return createVNode(_component_v_uni_view, {
                        key: option,
                        class: normalizeClass(["result-option", { 'result-option--active': checkResult.value === option }]),
                        onClick: $event => (checkResult.value = option)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_u_icon, {
                            name: checkResult.value === option ? 'checkmark-circle-fill' : 'circle',
                            size: "18",
                            color: checkResult.value === option ? 'var(--ml-color-brand)' : 'var(--ml-color-text-placeholder)'
                          }, null, 8, ["name", "color"]),
                          createVNode(_component_v_uni_text, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(option), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["class", "onClick"])
                    }), 64))
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "remark-box" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_textarea, {
                      modelValue: checkRemark.value,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((checkRemark).value = $event)),
                      class: "remark-box__input",
                      maxlength: "200",
                      placeholder: "补充点验备注（选填）"
                    }, null, 8, ["modelValue"]),
                    createVNode(_component_v_uni_text, { class: "remark-box__count" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(checkRemark.value.length) + "/200", 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_button, {
                  class: "submit-button",
                  onClick: submitCheck
                }, {
                  default: withCtx(() => [
                    createTextVNode("提交点验")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }))
      : createCommentVNode("", true)
  ], 64))
}
}

};
const assets = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-1814d029"]]);

export { assets as default };
