import { a as _export_sfc, r as ref, c as computed, E as reactive, H as watch, z as onLoad, k as createElementBlock, g as createVNode, w as withCtx, F as Fragment, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, J as __easycom_2, e as __easycom_1, K as __easycom_3, L as __easycom_5, M as __easycom_8, N as __easycom_9, O as __easycom_6, P as __easycom_11, o as openBlock, j as createTextVNode, h as index$i, n as normalizeClass, t as toDisplayString, u as unref, l as renderList, b as createBlock, q as createCommentVNode, Q as index$q, p as withModifiers, R as previewImage, T as nextTick, U as chooseImage, G as navigateBack } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== Props（编辑模式传 id） ======
const contentMax = 500;
const imageMax = 5;
const textMax = 200;

// ====== 紧急程度选项 ======

const _sfc_main = {
  __name: 'form',
  props: {
  id: { type: String, default: '' },
},
  setup(__props) {

/**
 * 表单页模板 — 行内左右布局 + 长文本 + 图片上传
 *
 * 适用场景：新增/编辑表单、信息录入、申请提交、工单创建等
 *
 * 涵盖字段模式（AI 复制后按需保留/删减）：
 * ┌──────────────────────────────────────────────┐
 * │  导航栏：标题（mc-navbar 内置返回键）           │
 * │                                              │
 * │  [卡片：行内左右布局]                          │
 * │  Row 1  标签文字             请输入文字        │  input
 * │  Row 2  开始时间      请选择        →         │  日期选择
 * │  Row 3  标签文字      请选择        →         │  picker
 * │  Row 4  * 标签文字          请输入文字        │  input(必填)
 * │  Row 5  标签文字(单位)       请输入文字        │  input+单位
 * │  Row 6  标签文字 [?]        请输入文字         │  input+帮助
 * │  Row 7  标签文字      0天 0小时 0分           │  时间组合
 * │  Row 8  标签文字      [操作] [操作]           │  操作按钮
 * │  Row 9  标签文字      [标签] [标签]           │  标签选择
 * │  Row 10 u-switch      匿名提交               │  开关(标签在右)
 * │                                              │
 * │  [卡片：textara 长文本]                        │
 * │  * 内容描述   textarea + 字数统计              │
 * │                                              │
 * │  [卡片：图片上传 3 列网格]                     │
 * │  图片   x/5    支持 jpg/png 格式              │
 * │                                              │
 * │  [卡片：u-radio-group 横排单选]                │
 * │                                              │
 * │  底部提交按钮（全宽，必填未填时半透明）          │
 * └──────────────────────────────────────────────┘
 *
 * ╔═══════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                  ║
 * ╠═══════════════════════════════════════════╣
 * ║  基础行内左右（最通用）                   ║
 * ║  └─ Row 1~10：标签左 + 内容右，一行一项   ║
 * ║    适用：普通表单、信息录入                ║
 * ║                                           ║
 * ║  长文本 + 图片                            ║
 * ║  └─ textarea 卡片 + 图片上传 3 列网格     ║
 * ║    适用：含描述、附件的新增/编辑页         ║
 * ║                                           ║
 * ║  垂直卡片布局                             ║
 * ║  └─ 标签在上、输入框在下，换行排列         ║
 * ║    适用：字段名较长的表单                  ║
 * ║                                           ║
 * ║  卡片右对齐                               ║
 * ║  └─ 整行右对齐，标签和输入紧凑排列        ║
 * ║    适用：紧凑型信息展示+编辑               ║
 * ║                                           ║
 * ║  全屏录入                                 ║
 * ║  └─ 导航栏右侧"保存"按钮，全屏大输入区    ║
 * ║    适用：长文本录入（如备注、说明）         ║
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
 *   2. 按业务删减不需要的字段（整段删除 .form-row 块即可）
 *   3. 修改字段名 + 校验规则 + 提交逻辑
 *   4. 替换 TODO(api) 处为 @/api 真实接口
 *   5. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const props = __props;

// ====== 选择器显示控制 ======
const showTypePicker = ref(false);

// ====== 选项数据 ======
// TODO(api): 从接口获取选项列表
const typeOptions = ['选项一', '选项二', '选项三', '选项四'];

const typeDisplay = computed(() => {
  // u-picker 返回的是选中值（字符串），直接用作展示
  return form.type || '';
});

// 选择器索引（用于回传后端时可能需要）
computed(() => {
  return typeOptions.indexOf(form.type);
});

// ====== 标签数据 ======
// TODO(api): 从接口获取标签列表
const tagList = ref(['标签A', '标签B', '标签C', '标签D']);
const selectedTags = ref([]);

const toggleTag = (tag) => {
  const idx = selectedTags.value.indexOf(tag);
  if (idx > -1) {
    selectedTags.value.splice(idx, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const isTagSelected = (tag) => selectedTags.value.includes(tag);

// ====== 开始时间选择 ======
const showStartTimePicker = ref(false);
const startTimeValue = reactive({ year: 2026, month: 1, day: 1 });
const startTimeDisplay = computed(() => {
  if (!startTimeValue.year) return '';
  const y = startTimeValue.year;
  const m = String(startTimeValue.month).padStart(2, '0');
  const d = String(startTimeValue.day).padStart(2, '0');
  return `${y}-${m}-${d}`;
});

const startYearOptions = Array.from({ length: 11 }, (_, i) => `${2020 + i}年`);
const startMonthOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
const startDayOptions = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);
const startTimeColumns = [startYearOptions, startMonthOptions, startDayOptions];

const onStartTimeConfirm = (e) => {
  startTimeValue.year = parseInt(e.value[0]) || 2026;
  startTimeValue.month = parseInt(e.value[1]) || 1;
  startTimeValue.day = parseInt(e.value[2]) || 1;
  form.startTime = startTimeDisplay.value;
  showStartTimePicker.value = false;
};

// ====== 时长选择 ======
const showTimePicker = ref(false);
const timeValue = reactive({ day: 0, hour: 0, minute: 0 });
const timeDisplay = computed(() => `${timeValue.day}天 ${timeValue.hour}小时 ${timeValue.minute}分`);

// 时间选择器列数据（弹框内带单位，存储时去单位取数字）
const dayOptions = Array.from({ length: 31 }, (_, i) => `${i}天`);
const hourOptions = Array.from({ length: 24 }, (_, i) => `${i}小时`);
const minuteOptions = Array.from({ length: 60 }, (_, i) => `${i}分`);
const timeColumns = [dayOptions, hourOptions, minuteOptions];

const onTimeConfirm = (e) => {
  // 弹框返回带单位字符串如 "5天"，解析取数字部分
  timeValue.day = parseInt(e.value[0]) || 0;
  timeValue.hour = parseInt(e.value[1]) || 0;
  timeValue.minute = parseInt(e.value[2]) || 0;
  showTimePicker.value = false;
};

// ====== 表单数据 ======
const form = reactive({
  text1: '',             // 普通输入
  type: '',              // 选择器索引
  text2: '',             // 必填输入
  text3: '',             // 带单位输入
  text4: '',             // 带帮助输入
  content: '',           // 内容描述（textarea 必填）
  images: [],            // 图片 [{ url }]
  startTime: '',         // 开始时间（由选择器回填）
  urgency: 'normal',     // 紧急程度
  phone: '',             // 联系方式
  anonymous: false,      // 匿名提交
});

// ====== 字数/数量限制 ======
const urgencyOptions = [
  { label: '普通', value: 'normal' },
  { label: '紧急', value: 'urgent' },
];

// ====== 表单校验 ======
const errors = reactive({
  text1: '',
  type: '',
  text2: '',
  text3: '',
  text4: '',
  content: '',
  phone: '',
});

const validate = () => {
  let valid = true;
  Object.keys(errors).forEach((k) => (errors[k] = ''));

  if (!form.text2.trim()) {
    errors.text2 = '请输入必填内容';
    valid = false;
  }
  if (!form.content.trim()) {
    errors.content = '请输入内容描述';
    valid = false;
  }
  if (form.phone && !/^1[3-9]\d{9}$/.test(form.phone)) {
    errors.phone = '请输入正确的手机号';
    valid = false;
  }
  return valid;
};

// ====== 选择器回调 ======
const onTypeConfirm = (e) => {
  form.type = e.value[0];
  showTypePicker.value = false;
};

// ====== 图片功能 ======
const chooseImage$1 = () => {
  const remaining = imageMax - form.images.length;
  if (remaining <= 0) {
    showToast(`最多上传${imageMax}张图片`);
    return;
  }
  chooseImage({
    count: remaining,
    sizeType: ['compressed'],
    success: (res) => {
      // TODO(api): 上传到服务端获取 url
      res.tempFilePaths.forEach((path) => {
        form.images.push({ url: path });
      });
    },
  });
};

const deleteImage = (index) => {
  form.images.splice(index, 1);
};

const previewImage$1 = (index) => {
  const urls = form.images.map((v) => v.url);
  previewImage({
    current: index,
    urls,
    complete: () => {
      // H5 端隐藏预览关闭按钮，避免被刘海遮挡
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

// ====== 提交 ======
const submitting = ref(false);
const hasDirty = ref(false);
const canSubmit = computed(() => form.text2.trim() && form.content.trim());

watch(
  () => ({ ...form }),
  () => { hasDirty.value = true; },
  { deep: true },
);

const onSubmit = async () => {
  if (!validate()) {
    const firstErr = Object.values(errors).find((e) => e);
    showToast(firstErr || '请完善表单信息');
    return;
  }
  submitting.value = true;
  try {
    // TODO(api): 调用 @/api 提交
    // import { submitFormApi } from '@/api/api-manager.js'
    // const res = await submitFormApi({ ...form, id: props.id, tags: selectedTags.value, time: timeValue })
    // if (res === null) return
    // showToast('提交成功', 'success')
    // hasDirty.value = false
    // setTimeout(() => uni.navigateBack(), 800)
    setTimeout(() => {
      showToast('提交成功', 'success');
      hasDirty.value = false;
      setTimeout(() => navigateBack(), 800);
    }, 600);
  } catch (e) {
    console.error('[FormTemplate] 提交失败', e);
    showToast('提交失败，请重试');
  } finally {
    submitting.value = false;
  }
};

// ====== 操作按钮 ======
const onActionA = () => { showToast('操作A'); };
const onActionB = () => { showToast('操作B'); };

// ====== 编辑回显 ======
onLoad((options) => {
  if (options?.id || props.id) ;
});

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_u_switch = resolveEasycom(resolveDynamicComponent("u-switch"), __easycom_3);
  const _component_u_textarea = resolveEasycom(resolveDynamicComponent("u-textarea"), __easycom_5);
  const _component_v_uni_image = index$q;
  const _component_u_radio = resolveEasycom(resolveDynamicComponent("u-radio"), __easycom_8);
  const _component_u_radio_group = resolveEasycom(resolveDynamicComponent("u-radio-group"), __easycom_9);
  const _component_u_loading_icon = resolveEasycom(resolveDynamicComponent("u-loading-icon"), __easycom_6);
  const _component_u_picker = resolveEasycom(resolveDynamicComponent("u-picker"), __easycom_11);

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_uni_view, { class: "page" }, {
      default: withCtx(() => [
        createVNode(_component_mc_navbar, { title: "表单模板" }),
        createVNode(_component_v_uni_view, { class: "scroll-area" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, {
              class: "field-card field-card--rows",
              style: {"margin-top":"20rpx"}
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "card-section-title" }, {
                  default: withCtx(() => [
                    createTextVNode("标签文字")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: form.text1,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.text1) = $event)),
                      maxlength: textMax,
                      placeholder: "请输入文字",
                      border: "none",
                      inputAlign: "right",
                      customStyle: { padding: '0', textAlign: 'right' }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("开始时间")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, {
                      class: "form-row-right form-row-right--clickable",
                      onClick: _cache[1] || (_cache[1] = $event => (showStartTimePicker.value = true))
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, {
                          class: normalizeClass(["form-row-value", { 'form-row-value--placeholder': !startTimeValue.year }])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(startTimeDisplay.value || '请选择'), 1)
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        createVNode(_component_u_icon, {
                          name: "arrow-right",
                          size: "14",
                          color: "var(--ml-color-text-placeholder)"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, {
                      class: "form-row-right form-row-right--clickable",
                      onClick: _cache[2] || (_cache[2] = $event => (showTypePicker.value = true))
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, {
                          class: normalizeClass(["form-row-value", { 'form-row-value--placeholder': !typeDisplay.value }])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(typeDisplay.value || '请选择'), 1)
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        createVNode(_component_u_icon, {
                          name: "arrow-right",
                          size: "14",
                          color: "var(--ml-color-text-placeholder)"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "required-star" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, null, {
                          default: withCtx(() => [
                            createTextVNode("标签文字")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: form.text2,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.text2) = $event)),
                      maxlength: textMax,
                      placeholder: "请输入文字",
                      border: "none",
                      inputAlign: "right",
                      customStyle: { padding: '0', textAlign: 'right' }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode(" 标签文字"),
                        createVNode(_component_v_uni_text, { class: "label-unit" }, {
                          default: withCtx(() => [
                            createTextVNode("(单位)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: form.text3,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.text3) = $event)),
                      maxlength: textMax,
                      placeholder: "请输入文字",
                      border: "none",
                      inputAlign: "right",
                      customStyle: { padding: '0', textAlign: 'right' }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, null, {
                          default: withCtx(() => [
                            createTextVNode("标签文字")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_u_icon, {
                          name: "question-circle",
                          size: "14",
                          color: "var(--ml-color-text-placeholder)",
                          customStyle: { marginLeft: '8rpx' },
                          onClick: _cache[5] || (_cache[5] = $event => (unref(showToast)('这是帮助说明文字')))
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_input, {
                      modelValue: form.text4,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.text4) = $event)),
                      maxlength: textMax,
                      placeholder: "请输入文字",
                      border: "none",
                      inputAlign: "right",
                      customStyle: { padding: '0', textAlign: 'right' }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, {
                      class: "form-row-right form-row-right--clickable",
                      onClick: _cache[7] || (_cache[7] = $event => (showTimePicker.value = true))
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "form-row-value" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(timeDisplay.value), 1)
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
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "form-row-right" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, {
                          class: "action-link",
                          onClick: onActionA
                        }, {
                          default: withCtx(() => [
                            createTextVNode("操作")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, {
                          class: "action-link",
                          onClick: onActionB
                        }, {
                          default: withCtx(() => [
                            createTextVNode("操作")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row form-row--multiline" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("标签文字")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_view, { class: "form-row-tags" }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(tagList.value, (tag) => {
                          return (openBlock(), createBlock(_component_v_uni_text, {
                            key: tag,
                            class: normalizeClass(["tag-chip", { 'tag-chip--active': isTagSelected(tag) }]),
                            onClick: $event => (toggleTag(tag))
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tag), 1)
                            ]),
                            _: 2
                          }, 1032, ["class", "onClick"]))
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "form-row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "form-row-label" }, {
                      default: withCtx(() => [
                        createTextVNode("匿名提交")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_u_switch, {
                      modelValue: form.anonymous,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((form.anonymous) = $event)),
                      activeColor: "var(--ml-color-brand)",
                      inactiveColor: "var(--ml-color-border-strong)"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            (errors.text1)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 0,
                  class: "card-error-tip"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(errors.text1), 1)
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            (errors.type)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 1,
                  class: "card-error-tip"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(errors.type), 1)
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            (errors.text2)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 2,
                  class: "card-error-tip"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(errors.text2), 1)
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            (errors.text3)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 3,
                  class: "card-error-tip"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(errors.text3), 1)
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            (errors.text4)
              ? (openBlock(), createBlock(_component_v_uni_view, {
                  key: 4,
                  class: "card-error-tip"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(errors.text4), 1)
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            createVNode(_component_v_uni_view, { class: "field-card" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "field-header" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "field-label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "required-star" }, {
                          default: withCtx(() => [
                            createTextVNode("*")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_uni_text, { class: "label-text" }, {
                          default: withCtx(() => [
                            createTextVNode("内容描述")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "textarea-wrapper" }, {
                  default: withCtx(() => [
                    createVNode(_component_u_textarea, {
                      modelValue: form.content,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((form.content) = $event)),
                      maxlength: contentMax,
                      placeholder: "输入具体且详细的描述有助于更好地解决问题~",
                      border: "none",
                      autoHeight: true,
                      customStyle: { background: 'transparent' }
                    }, null, 8, ["modelValue"]),
                    createVNode(_component_v_uni_text, { class: "textarea-count" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(form.content.length) + "/" + toDisplayString(contentMax), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                (errors.content)
                  ? (openBlock(), createBlock(_component_v_uni_text, {
                      key: 0,
                      class: "error-tip"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(errors.content), 1)
                      ]),
                      _: 1
                    }))
                  : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "field-card" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "field-header" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "field-label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "label-text" }, {
                          default: withCtx(() => [
                            createTextVNode("图片")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "field-counter" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(form.images.length) + "/" + toDisplayString(imageMax), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_text, { class: "upload-tip" }, {
                  default: withCtx(() => [
                    createTextVNode("支持 jpg、png 格式，单张不超过 10MB")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_uni_view, { class: "image-grid" }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(form.images, (item, idx) => {
                      return (openBlock(), createBlock(_component_v_uni_view, {
                        key: idx,
                        class: "image-cell",
                        onClick: $event => (previewImage$1(idx))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_image, {
                            class: "image-thumb",
                            src: item.url,
                            mode: "aspectFill"
                          }, null, 8, ["src"]),
                          createVNode(_component_v_uni_view, {
                            class: "image-delete-btn",
                            onClick: withModifiers($event => (deleteImage(idx)), ["stop"])
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, { class: "image-delete-icon" }, {
                                default: withCtx(() => [
                                  createTextVNode("×")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    }), 128)),
                    (form.images.length < imageMax)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: "image-add-cell",
                          onClick: chooseImage$1
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_uni_view, { class: "image-add-h" }),
                            createVNode(_component_v_uni_view, { class: "image-add-v" })
                          ]),
                          _: 1
                        }))
                      : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_component_v_uni_view, { class: "field-card" }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "field-header" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "field-label" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, { class: "label-text" }, {
                          default: withCtx(() => [
                            createTextVNode("紧急程度")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_u_radio_group, {
                  modelValue: form.urgency,
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((form.urgency) = $event)),
                  placement: "row"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(urgencyOptions, (item) => {
                      return createVNode(_component_u_radio, {
                        key: item.value,
                        label: item.label,
                        name: item.value,
                        customStyle: { marginRight: '48rpx' },
                        activeColor: "var(--ml-color-brand)",
                        labelColor: "var(--ml-color-text-primary)"
                      }, null, 8, ["label", "name"])
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_v_uni_view, { class: "submit-area" }, {
          default: withCtx(() => [
            createVNode(_component_v_uni_view, {
              class: normalizeClass(["submit-btn", { 'submit-btn--disabled': !canSubmit.value }]),
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
    createVNode(_component_u_picker, {
      show: showTypePicker.value,
      columns: [typeOptions],
      title: "请选择",
      onConfirm: onTypeConfirm,
      onCancel: _cache[11] || (_cache[11] = $event => (showTypePicker.value = false)),
      onClose: _cache[12] || (_cache[12] = $event => (showTypePicker.value = false))
    }, null, 8, ["show", "columns"]),
    createVNode(_component_u_picker, {
      show: showStartTimePicker.value,
      columns: startTimeColumns,
      title: "选择开始时间",
      onConfirm: onStartTimeConfirm,
      onCancel: _cache[13] || (_cache[13] = $event => (showStartTimePicker.value = false)),
      onClose: _cache[14] || (_cache[14] = $event => (showStartTimePicker.value = false))
    }, null, 8, ["show"]),
    createVNode(_component_u_picker, {
      show: showTimePicker.value,
      columns: timeColumns,
      title: "选择时长",
      onConfirm: onTimeConfirm,
      onCancel: _cache[15] || (_cache[15] = $event => (showTimePicker.value = false)),
      onClose: _cache[16] || (_cache[16] = $event => (showTimePicker.value = false))
    }, null, 8, ["show"])
  ], 64))
}
}

};
const form = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-16e6e0a1"]]);

export { form as default };
