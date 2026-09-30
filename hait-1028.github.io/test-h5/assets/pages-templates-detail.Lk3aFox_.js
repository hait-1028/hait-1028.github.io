import { a as _export_sfc, r as ref, E as reactive, c as computed, z as onLoad, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, V as __easycom_1, e as __easycom_1$1, o as openBlock, g as createVNode, k as createElementBlock, F as Fragment, j as createTextVNode, h as index$i, t as toDisplayString, n as normalizeClass, Q as index$q, l as renderList, u as unref, q as createCommentVNode, R as previewImage, T as nextTick, D as showModal, G as navigateBack } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 页面参数 ======
const imageUrl = 'https://cdn.luoex.xin/legacy/jg.gzt/group1/M00/C2/B7/wKgBomnFL5mEQNEaAAAAACCRIik138.png?auth_key=1782375672-63mvA5fUPVwRnMbnG5U-0-be98bdefe02205428de43db735c3e68e';


const _sfc_main = {
  __name: 'detail',
  setup(__props) {

/**
 * 详情页模板 — 无顶部背景 / 内容右对齐
 *
 * 适用场景：信息详情、审批详情、订单详情、工单详情等详情展示页
 *
 * 页面结构：
 * ┌─────────────────────────────────────────┐
 * │  导航栏：标题 + 右侧操作（编辑/更多）      │
 * │                                          │
 * │  ┌─ 基本信息 ───────────────────────────┐│
 * │  │ 字段名              字段值            ││
 * │  │ 字段名              字段值            ││
 * │  │ 字段名              状态标签           ││
 * │  │ 字段名             [单张图片]           ││
 * │  │ 字段名   [图1][图2][图3] ...           ││  ← 横向滚动
 * │  └──────────────────────────────────────┘│
 * │  ┌─ 扩展信息 ───────────────────────────┐│
 * │  │ 字段名              字段值            ││
 * │  │ 字段名              长文本值...        ││
 * │  └──────────────────────────────────────┘│
 * │  ┌─ 附件 ───────────────────────────────┐│
 * │  │ [文件1] [文件2] [文件3]                ││
 * │  └──────────────────────────────────────┘│
 * │                                          │
 * │  [取消]                    [确认]         │ ← 底部操作（可选）
 * └──────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  头部风格（三选一）                       ║
 * ║  ├─ 紫色头部：品牌感强，适合审批/工单     ║
 * ║  ├─ 无背景：简洁，适合通用详情            ║
 * ║  └─ 大字标题+背景：运营/活动类详情        ║
 * ║                                           ║
 * ║  内容对齐（二选一）                       ║
 * ║  ├─ 左对齐：字段名较长（如"审批意见"）    ║
 * ║  └─ 右对齐：字段值较短（如状态、日期）    ║
 * ║                                           ║
 * ║  字号（可选叠加）                         ║
 * ║  └─ 敬老版：全局放大字号 + 行高          ║
 * ║    适用：老年用户或大字需求                ║
 * ╚═══════════════════════════════════════════╝
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
 *   2. 修改 detail 数据字段 → 匹配业务 Model
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 按需删减卡片或行
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const id = ref('');

// ====== 加载状态 ======
const loading = ref(true);

// ====== 详情数据 ======
// TODO(api): 从接口获取详情
const detail = reactive({
  name: '示例名称',
  code: 'NO.20260625001',
  status: '进行中',          // 状态：待处理 / 进行中 / 已完成 / 已驳回
  statusType: 'progress',   // 状态类型，对应标签色
  category: '分类一',
  creator: '张三',
  createTime: '2026-06-25 10:30',
  updateTime: '2026-06-25 14:00',
  remark: '这是一段备注信息，可以展示较长的文本内容，自动换行显示。当内容超出时可以展开查看全部。',
  attachments: [
    { name: '附件一.pdf', url: '' },
    { name: '附件二.docx', url: '' },
    { name: '附件三.jpg', url: '' },
  ],
});

// ====== 状态标签映射 ======
const statusTagClass = computed(() => {
  const map = {
    pending: 'tag--warning',
    progress: 'tag--brand',
    done: 'tag--success',
    reject: 'tag--error',
  };
  return map[detail.statusType] || '';
});

const onCancel = () => {
  showModal({
    title: '提示',
    content: '确定要取消吗？',
    confirmText: '确定',
    cancelText: '再想想',
    success: (res) => {
      if (res.confirm) {
        navigateBack();
      }
    },
  });
};

const onPreviewFile = (item) => {
  showToast(`预览: ${item.name}`);
};

// 图片预览（沿用 form.vue 的预览关闭按钮隐藏方式）
// TODO(api): 实际业务中用接口返回的图片 URL 替换
const onPreviewImage = () => {
  previewImage({
    urls: [imageUrl],
    complete: () => {
      nextTick(() => {
        const box = document.getElementById('u-a-p');
        if (box?.children?.length > 0) {
          const firstChild = box.children[0];
          if (firstChild?.children?.length > 1) {
            firstChild.children[1].style.display = 'none';
          }
        }
      });
    },
  });
};

// 横向滑动图片预览
// TODO(api): 实际业务中用接口返回的图片列表替换
const scrollImages = Array(6).fill(imageUrl);
const onPreviewScrollImage = (idx) => {
  previewImage({
    current: idx,
    urls: scrollImages,
    complete: () => {
      nextTick(() => {
        const box = document.getElementById('u-a-p');
        if (box?.children?.length > 0) {
          const firstChild = box.children[0];
          if (firstChild?.children?.length > 1) {
            firstChild.children[1].style.display = 'none';
          }
        }
      });
    },
  });
};

// ====== 初始化 ======
onLoad((options) => {
  if (options?.id) {
    id.value = options.id;
    // TODO(api): 根据 id 拉取详情
    // import { getDetailApi } from '@/api/api-manager.js'
    // const res = await getDetailApi(id.value)
    // if (res === null) return
    // Object.assign(detail, res.data)
  }
  // 模拟加载
  setTimeout(() => { loading.value = false; }, 300);
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_u_skeleton = resolveEasycom(resolveDynamicComponent("u-skeleton"), __easycom_1);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_v_uni_image = index$q;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1$1);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, { title: "详情" }),
      createVNode(_component_v_uni_view, { class: "scroll-area" }, {
        default: withCtx(() => [
          (loading.value)
            ? (openBlock(), createBlock(_component_v_uni_view, {
                key: 0,
                class: "loading-area"
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_skeleton, {
                    loading: true,
                    rows: 4,
                    title: true,
                    rowsWidth: "['100%', '80%', '60%', '100%']"
                  })
                ]),
                _: 1
              }))
            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createVNode(_component_v_uni_view, { class: "detail-card" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "detail-card__title" }, {
                      default: withCtx(() => [
                        createTextVNode("基本信息")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("名称")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.name), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("编号")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--muted" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.code), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("状态")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, {
                          class: normalizeClass(["detail-tag", statusTagClass.value])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.status), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("分类")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.category), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("名称名称名称")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value" }, {
                          default: withCtx(() => [
                            createTextVNode("少一点")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row detail-row--multiline" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("名称名称名称123")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--wrap" }, {
                          default: withCtx(() => [
                            createTextVNode("这是一段比较长的内容文字，当文字过多时会自动换行显示")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row detail-row--multiline" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("名称")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--wrap" }, {
                          default: withCtx(() => [
                            createTextVNode("这是一段比较长的内容文字，当文字过多时会自动换行显示")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("图片1")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_view, { class: "detail-row__right" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_uni_image, {
                              class: "detail-row__image",
                              src: imageUrl,
                              mode: "aspectFill",
                              onClick: onPreviewImage
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("图片列表")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_view, { class: "detail-row__right" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_uni_view, { class: "image-scroll" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_uni_view, { class: "image-scroll__inner" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(scrollImages), (url, idx) => {
                                      return (openBlock(), createBlock(_component_v_uni_image, {
                                        key: idx,
                                        class: "image-scroll__item",
                                        src: url,
                                        mode: "aspectFill",
                                        onClick: $event => (onPreviewScrollImage(idx))
                                      }, null, 8, ["src", "onClick"]))
                                    }), 128))
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
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "detail-card" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "detail-card__title" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, null, {
                          default: withCtx(() => [
                            createTextVNode("其他信息")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, {
                          class: "detail-card__action",
                          onClick: _cache[0] || (_cache[0] = $event => (unref(showToast)('操作')))
                        }, {
                          default: withCtx(() => [
                            createTextVNode("操作")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("创建人")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.creator), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("创建时间")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--muted" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.createTime), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("更新时间")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--muted" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.updateTime), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "detail-row detail-row--multiline" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                          default: withCtx(() => [
                            createTextVNode("备注")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "detail-row__value detail-row__value--wrap" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(detail.remark), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                (detail.attachments.length)
                  ? (openBlock(), createBlock(_component_v_uni_view, {
                      key: 0,
                      class: "detail-card"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_view, { class: "detail-card__title" }, {
                          default: withCtx(() => [
                            createTextVNode(" 附件 "),
                            createVNode(_component_v_uni_text, { class: "detail-card__count" }, {
                              default: withCtx(() => [
                                createTextVNode("(" + toDisplayString(detail.attachments.length) + ")", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(detail.attachments, (item, idx) => {
                          return (openBlock(), createBlock(_component_v_uni_view, {
                            key: idx,
                            class: "detail-row detail-row--clickable",
                            onClick: $event => (onPreviewFile(item))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, { class: "detail-row__label" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_u_icon, {
                                name: "arrow-right",
                                size: "14",
                                color: "var(--ml-color-brand)"
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]))
                        }), 128))
                      ]),
                      _: 1
                    }))
                  : createCommentVNode("", true)
              ], 64))
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "bottom-bar" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "bottom-bar__btn bottom-bar__btn--plain",
            onClick: onCancel
          }, {
            default: withCtx(() => [
              createTextVNode("取消")
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, {
            class: "bottom-bar__btn bottom-bar__btn--primary",
            onClick: _cache[1] || (_cache[1] = $event => (unref(showToast)('确认')))
          }, {
            default: withCtx(() => [
              createTextVNode("确认")
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
const detail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-53839309"]]);

export { detail as default };
