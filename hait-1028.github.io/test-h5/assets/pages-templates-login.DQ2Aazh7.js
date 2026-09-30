import { a as _export_sfc, r as ref, E as reactive, c as computed, a2 as onUnload, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, e as __easycom_1, f as resolveDynamicComponent, J as __easycom_2, a3 as __easycom_4, o as openBlock, g as createVNode, h as index$i, j as createTextVNode, n as normalizeClass, t as toDisplayString } from './index-DsfVUykM.js';
import { s as showToast } from './util.DsG2dHzK.js';

// ====== 模式（password / code） ======

const _sfc_main = {
  __name: 'login',
  setup(__props) {

/**
 * 登录 / 注册页模板
 *
 * 适用场景：账号登录、注册、验证码登录、第三方登录入口等
 *
 * ╔═══════════════════════════════════════════════╗
 * ║  模式选择指南（AI 必读）                        ║
 * ╠═══════════════════════════════════════════════╣
 * ║  密码登录（最通用）                             ║
 * ║  └─ 手机号 + 密码，密码可显隐切换               ║
 * ║                                               ║
 * ║  验证码登录                                     ║
 * ║  └─ 手机号 + 短信验证码，带 60s 倒计时          ║
 * ║                                               ║
 * ║  第三方登录                                     ║
 * ║  └─ 微信 / Apple 等图标入口（页面底部）         ║
 * ╚═══════════════════════════════════════════════╝
 *
 * 框架约定：
 * - <script setup> + Vue 3 Composition API
 * - 响应式 API 从 'vue' 导入、生命周期从 '@dcloudio/uni-app' 导入（分两行）
 * - uview-plus 组件直接使用（已全局注册）
 * - 所有样式走 var(--ml-*) 主题变量，尺寸 rpx
 * - 数据接入处标 TODO(api)，AI 复制后替换为 @/api 调用
 *
 * AI 使用方式：
 *   1. 复制本文件 → 改名（如 login.vue / register.vue）
 *   2. 按业务选择模式（密码/验证码/第三方），删掉不匹配的字段块
 *   3. 替换 TODO(api) 处为 @/api 真实接口
 *   4. 在 pages.json 注册路由（navigationStyle: "custom"）
 */

const mode = ref('password');

// ====== 表单数据 ======
const form = reactive({
  phone: '',
  password: '',
  code: '',
});

const agreement = ref(false);

// ====== 验证码倒计时 ======
const counting = ref(0);
let timer = null;
const codeText = computed(() => (counting.value > 0 ? `${counting.value}s` : '获取验证码'));

const canSubmit = computed(() => {
  const phoneOk = /^1[3-9]\d{9}$/.test(form.phone);
  if (!phoneOk) return false;
  return mode.value === 'password' ? form.password.trim().length > 0 : form.code.trim().length > 0;
});

const switchMode = () => {
  mode.value = mode.value === 'password' ? 'code' : 'password';
};

const sendCode = () => {
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    showToast('请输入正确的手机号');
    return;
  }
  if (counting.value > 0) return;
  // TODO(api): 调用发送短信验证码接口
  counting.value = 60;
  timer = setInterval(() => {
    counting.value -= 1;
    if (counting.value <= 0) clearInterval(timer);
  }, 1000);
  showToast('验证码已发送', 'success');
};

const onSubmit = () => {
  if (!agreement.value) {
    showToast('请先阅读并同意用户协议');
    return;
  }
  if (!canSubmit.value) {
    showToast(mode.value === 'password' ? '请输入手机号和密码' : '请输入手机号和验证码');
    return;
  }
  // TODO(api): 调用登录/注册接口
  // import { loginApi } from '@/api/api-manager.js'
  // const res = await loginApi({ ...form })
  // if (res === null) return
  showToast('登录成功', 'success');
};

const onThirdParty = (type) => {
  // TODO(api): 跳转到第三方授权登录
  showToast(`跳转到${type}登录`);
};

onUnload(() => {
  if (timer) clearInterval(timer);
});

return (_ctx, _cache) => {
  const _component_v_uni_view = index$g;
  const _component_v_uni_text = index$i;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_u_input = resolveEasycom(resolveDynamicComponent("u-input"), __easycom_2);
  const _component_u_checkbox = resolveEasycom(resolveDynamicComponent("u-checkbox"), __easycom_4);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "brand" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "brand__logo" }),
          createVNode(_component_v_uni_text, { class: "brand__name" }, {
            default: withCtx(() => [
              createTextVNode("xxx")
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_text, { class: "brand__slogan" }, {
            default: withCtx(() => [
              createTextVNode("一站式移动办公平台")
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "form-card" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "mode-tabs" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, {
                class: normalizeClass(["mode-tab", { 'mode-tab--active': mode.value === 'password' }]),
                onClick: switchMode
              }, {
                default: withCtx(() => [
                  createTextVNode("密码登录")
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(_component_v_uni_text, {
                class: normalizeClass(["mode-tab", { 'mode-tab--active': mode.value === 'code' }]),
                onClick: switchMode
              }, {
                default: withCtx(() => [
                  createTextVNode("验证码登录")
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "field" }, {
            default: withCtx(() => [
              createVNode(_component_u_icon, {
                name: "phone",
                size: "18",
                color: "var(--ml-color-text-placeholder)"
              }),
              createVNode(_component_u_input, {
                modelValue: form.phone,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.phone) = $event)),
                type: "number",
                maxlength: 11,
                placeholder: "请输入手机号",
                border: "none",
                customStyle: { padding: '0 0 0 16rpx' }
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          (mode.value === 'password')
            ? (openBlock(), createBlock(_component_v_uni_view, {
                key: 0,
                class: "field"
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "lock",
                    size: "18",
                    color: "var(--ml-color-text-placeholder)"
                  }),
                  createVNode(_component_u_input, {
                    modelValue: form.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.password) = $event)),
                    password: true,
                    placeholder: "请输入密码",
                    border: "none",
                    customStyle: { padding: '0 0 0 16rpx' }
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }))
            : (openBlock(), createBlock(_component_v_uni_view, {
                key: 1,
                class: "field"
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "lock",
                    size: "18",
                    color: "var(--ml-color-text-placeholder)"
                  }),
                  createVNode(_component_u_input, {
                    modelValue: form.code,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.code) = $event)),
                    type: "number",
                    maxlength: 6,
                    placeholder: "请输入验证码",
                    border: "none",
                    customStyle: { padding: '0 0 0 16rpx' }
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_v_uni_text, {
                    class: normalizeClass(["code-btn", { 'code-btn--disabled': counting.value > 0 }]),
                    onClick: sendCode
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(codeText.value), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }))
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
              createTextVNode("登录")
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "agreement" }, {
        default: withCtx(() => [
          createVNode(_component_u_checkbox, {
            modelValue: agreement.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((agreement).value = $event)),
            activeColor: "var(--ml-color-brand)",
            shape: "circle"
          }, null, 8, ["modelValue"]),
          createVNode(_component_v_uni_text, { class: "agreement__text" }, {
            default: withCtx(() => [
              createTextVNode(" 我已阅读并同意"),
              createVNode(_component_v_uni_text, { class: "agreement__link" }, {
                default: withCtx(() => [
                  createTextVNode("《用户协议》")
                ]),
                _: 1
              }),
              createTextVNode("和"),
              createVNode(_component_v_uni_text, { class: "agreement__link" }, {
                default: withCtx(() => [
                  createTextVNode("《隐私政策》")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "third-party" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "third-party__divider" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "third-party__line" }),
              createVNode(_component_v_uni_text, { class: "third-party__title" }, {
                default: withCtx(() => [
                  createTextVNode("其他登录方式")
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_view, { class: "third-party__line" })
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "third-party__list" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, {
                class: "tp-item",
                onClick: _cache[4] || (_cache[4] = $event => (onThirdParty('微信')))
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "weixin-fill",
                    size: "28",
                    color: "var(--ml-color-success)"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_view, {
                class: "tp-item",
                onClick: _cache[5] || (_cache[5] = $event => (onThirdParty('Apple')))
              }, {
                default: withCtx(() => [
                  createVNode(_component_u_icon, {
                    name: "apple-fill",
                    size: "28",
                    color: "var(--ml-color-text-primary)"
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
  }))
}
}

};
const login = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ac98a4bd"]]);

export { login as default };
