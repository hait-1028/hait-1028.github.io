import { a as _export_sfc, r as ref, y as onShow, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, f as resolveDynamicComponent, e as __easycom_1, o as openBlock, g as createVNode, S as ScrollView, k as createElementBlock, F as Fragment, l as renderList, u as unref, h as index$i, j as createTextVNode, t as toDisplayString, n as normalizeClass, m as navigateTo } from './index-DsfVUykM.js';
import { _ as __easycom_0 } from './mc-navbar.BGo_4rK1.js';
import { t as taskList, g as getTaskResults } from './mock.DyMutdN4.js';

// ===== 任务进度（已盘/总数） =====

const _sfc_main = {
  __name: 'tasks',
  setup(__props) {

/**
 * 盘点任务列表页（APP 落地页）
 * - 展示 Web 端创建的盘点任务，点击进入执行页
 * - 任务卡：状态标签 + 任务名称 + 盘点方式 + 盘点人/计划时间/进度
 */
const refreshFlag = ref(0);
onShow(() => { refreshFlag.value += 1; });

function taskProgress(taskId) {
  const results = getTaskResults(taskId);
  return { done: results.filter((r) => r.tab !== '未盘').length, total: results.length };
}

const goExecute = (task) => {
  navigateTo({ url: `/pages/stocktake/execute?id=${task.id}` });
};

return (_ctx, _cache) => {
  const _component_mc_navbar = resolveEasycom(resolveDynamicComponent("mc-navbar"), __easycom_0);
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_icon = resolveEasycom(resolveDynamicComponent("u-icon"), __easycom_1);
  const _component_v_uni_scroll_view = ScrollView;

  return (openBlock(), createBlock(_component_v_uni_view, { class: "page" }, {
    default: withCtx(() => [
      createVNode(_component_mc_navbar, {
        title: "盘点任务",
        "show-back": false
      }),
      createVNode(_component_v_uni_scroll_view, {
        class: "task-list",
        "scroll-y": ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(taskList), (task) => {
            return (openBlock(), createBlock(_component_v_uni_view, {
              key: task.id + '-' + refreshFlag.value,
              class: "task-card",
              onClick: $event => (goExecute(task))
            }, {
              default: withCtx(() => [
                createVNode(_component_v_uni_view, { class: "task-card__head" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__name" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.name), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_uni_text, {
                      class: normalizeClass(["task-card__status", task.status === '已完成' ? 'task-card__status--done' : 'task-card__status--doing'])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.status), 1)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "task-card__method" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__method-text" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.method), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "task-card__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__label" }, {
                      default: withCtx(() => [
                        createTextVNode("盘点人")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "task-card__value" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.users.join('、')), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "task-card__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__label" }, {
                      default: withCtx(() => [
                        createTextVNode("计划盘点时间")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "task-card__value" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.planRange[0]) + " ~ " + toDisplayString(task.planRange[1]), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "task-card__row" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__label" }, {
                      default: withCtx(() => [
                        createTextVNode("盘点进度")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_uni_text, { class: "task-card__value task-card__value--progress" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(taskProgress(task.id).done) + "/" + toDisplayString(taskProgress(task.id).total), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_v_uni_view, { class: "task-card__foot" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_text, { class: "task-card__go" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(task.status === '已完成' ? '查看结果' : '执行盘点'), 1)
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
                }, 1024)
              ]),
              _: 2
            }, 1032, ["onClick"]))
          }), 128))
        ]),
        _: 1
      })
    ]),
    _: 1
  }))
}
}

};
const tasks = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5fa7d814"]]);

export { tasks as default };
