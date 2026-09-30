const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pages-demo-template-nav-index.BOXRTCsb.js","assets/index-DsfVUykM.js","assets/index-eOoLLR1H.css","assets/index-DHrfyVxR.css","assets/pages-demo-workbench-index.Q9ifD9H2.js","assets/mc-navbar.BGo_4rK1.js","assets/mc-navbar-CcYM1CQT.css","assets/mock.DyMutdN4.js","assets/util.DsG2dHzK.js","assets/index-C1Wg5-iw.css"])))=>i.map(i=>d[i]);
import { a as _export_sfc, c as computed, r as ref, z as onLoad, b as createBlock, w as withCtx, i as index$g, d as resolveEasycom, O as __easycom_6, f as resolveDynamicComponent, A as __easycom_5, B as __easycom_7, o as openBlock, g as createVNode, h as index$i, j as createTextVNode, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, t as toDisplayString, q as createCommentVNode, S as ScrollView, _ as __vitePreload, s as showToast, T as nextTick } from './index-DsfVUykM.js';
import { b5 as fetchDocManifest, b6 as renderMarkdown, b7 as renderMermaidIn, b8 as fetchDocContent } from './markdown-manager.C2BSpKoz.js';

const categoryName = '移动端工作台';

const __vite_glob_1_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  categoryName
}, Symbol.toStringTag, { value: 'Module' }));

const pages = [{"path":"pages/demo/workbench/index","style":{"navigationBarTitleText":"工作台","navigationStyle":"custom"}},{"path":"pages/personal/assets","style":{"navigationBarTitleText":"我的资产","navigationStyle":"custom"}},{"path":"pages/stocktake/tasks","style":{"navigationBarTitleText":"盘点任务","navigationStyle":"custom"}},{"path":"pages/stocktake/execute","style":{"navigationBarTitleText":"执行盘点","navigationStyle":"custom"}},{"path":"pages/stocktake/surplus","style":{"navigationBarTitleText":"新增盘盈","navigationStyle":"custom"}},{"path":"pages/stocktake/check","style":{"navigationBarTitleText":"执行盘点","navigationStyle":"custom"}},{"path":"pages/index","style":{"navigationStyle":"custom"}},{"path":"pages/prd-view/index","style":{"navigationStyle":"custom"}},{"path":"pages/templates/form","style":{"navigationBarTitleText":"表单模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/detail","style":{"navigationBarTitleText":"详情模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/filter","style":{"navigationBarTitleText":"筛选模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/contact","style":{"navigationBarTitleText":"联系人模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/contact-select","style":{"navigationBarTitleText":"添加本单位联系人模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/operation-record","style":{"navigationBarTitleText":"操作记录模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/result","style":{"navigationBarTitleText":"结果页模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/list","style":{"navigationBarTitleText":"列表页模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/editable-list","style":{"navigationBarTitleText":"常用信息编辑页模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/empty","style":{"navigationBarTitleText":"空状态模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/login","style":{"navigationBarTitleText":"登录模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/profile","style":{"navigationBarTitleText":"个人中心模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/settings","style":{"navigationBarTitleText":"设置模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/steps","style":{"navigationBarTitleText":"步骤向导模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/templates/tabbar-home","style":{"navigationBarTitleText":"首页/工作台模板","navigationStyle":"custom","menuHidden":true}},{"path":"pages/demo/template-nav/index","style":{"navigationBarTitleText":"模板预览导航","navigationStyle":"custom","menuHidden":true}}];
const pagesConfig = {
  pages};

/**
 * 自动扫描 src/pages/demo/ 下的所有页面
 * 约定：src/pages/demo/{分类}/{页面名}.vue
 * - 分类中文名：从 demo/{分类}/meta.js 的 categoryName 读取
 * - 页面中文名：从 pages.json 的 navigationBarTitleText 读取
 * - 菜单隐藏：pages.json 中 style.menuHidden: true 的页面不在菜单显示（如详情页等二级页面）
 * - 菜单结构：可折叠分类（箭头+分类名+数量）+ 下方功能项
 * 新增页面只需创建 .vue 文件 + meta.js + 注册 pages.json，菜单自动更新
 */

// 扫描页面文件

const _sfc_main = {
  __name: 'index',
  setup(__props) {

const pageModules = /* #__PURE__ */ Object.assign({"./demo/template-nav/index.vue": () => __vitePreload(() => import('./pages-demo-template-nav-index.BOXRTCsb.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0),"./demo/workbench/index.vue": () => __vitePreload(() => import('./pages-demo-workbench-index.Q9ifD9H2.js'),true              ?__vite__mapDeps([4,1,2,5,6,7,8,9]):void 0)});
// 扫描分类配置（eager 模式，构建时读取）
const categoryModules = /* #__PURE__ */ Object.assign({"./demo/workbench/meta.js": __vite_glob_1_0});

// 分类中文名映射
const categoryNames = {};
Object.entries(categoryModules).forEach(([path, module]) => {
  const match = path.match(/\.\/demo\/([^/]+)\/meta\.js/);
  if (match && module.categoryName) {
    categoryNames[match[1]] = module.categoryName;
  }
});

// 页面信息映射（从 pages.json 读取：中文名 + 是否隐藏）
const pageInfoMap = {};
pagesConfig.pages.forEach((page) => {
  pageInfoMap[page.path] = {
    title: page.style?.navigationBarTitleText || page.path,
    menuHidden: page.style?.menuHidden || false,
  };
});

// 解析扫描结果，生成菜单数据（可折叠分类 + 功能项）
const menuData = computed(() => {
  const groups = {};
  Object.keys(pageModules).forEach((filePath) => {
    // filePath 格式：./demo/basic/button.vue
    const normalized = filePath.replace(/^\.\//, '');
    const parts = normalized.split('/');
    // 至少需要 demo/分类/页面.vue 三级
    if (parts.length < 3) return;

    const category = parts[1];
    const fileName = parts[parts.length - 1].replace(/\.vue$/, '');
    const route = `pages/${normalized.replace(/\.vue$/, '')}`;

    // 从 pages.json 读取页面信息
    const pageInfo = pageInfoMap[route];
    // 菜单隐藏的页面（如详情页）不显示在菜单中
    if (pageInfo?.menuHidden) return;

    if (!groups[category]) groups[category] = [];
    // 页面名优先从 pages.json 读取，找不到用文件名
    const pageName = pageInfo?.title || fileName;
    groups[category].push({ name: pageName, route });
  });
  const result = Object.entries(groups)
    .map(([category, items]) => ({
      category,
      categoryName: categoryNames[category] || category,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  return result;
});

// 当前选中的页面路由
const currentRoute = ref('');
// 设备外壳类型：'phone'（手机壳）| 'pad'（平板壳），用于在预览器上切换展示形态
const deviceType = ref('phone');
// PAD 横竖屏：'portrait'（竖屏）| 'landscape'（横屏），仅 PAD 模式生效
const padOrientation = ref('landscape');
// iframe 地址：根据设备类型注入 liuhai 参数——手机有刘海(20px)，PAD 无刘海(0px)
const iframeSrc = computed(() => {
  if (!currentRoute.value) return '';
  const liuhai = deviceType.value === 'pad' ? 0 : 20;
  return `?liuhai=${liuhai}#/${currentRoute.value}`;
});
// 展开的分类
const expandedCategories = ref({});

const toggleCategory = (category) => {
  expandedCategories.value[category] = !expandedCategories.value[category];
};

const selectPage = (route) => {
  currentRoute.value = route;
};

onLoad(async () => {
  // 加载 PRD manifest
  try {
    prdManifest.value = await fetchDocManifest();
  } catch (e) {
    console.warn('[IndexPage] 加载 PRD manifest 失败:', e);
  }
  // 默认展开第一个分类并选中第一个页面
  if (menuData.value.length > 0) {
    const first = menuData.value[0];
    expandedCategories.value[first.category] = true;
    if (first.items.length > 0) {
      selectPage(first.items[0].route);
    }
  }
});

// ====== PRD 弹框相关 ======

// PRD manifest（异步加载，构建期由 gen-prd.mjs 生成）
const prdManifest = ref(null);

// 从 manifest 构建 route → { prdFile, title } 的查找表
const prdMappingMap = computed(() => {
  const map = {};
  if (!prdManifest.value?.mapping) return map;
  const m = prdManifest.value.mapping;
  const tree = prdManifest.value.tree || [];
  // 从 tree 中提取 filePath → title 的映射
  const titleMap = {};
  for (const cat of tree) {
    for (const item of cat.children || []) {
      titleMap[item.filePath] = item.title;
    }
  }
  for (const [route, files] of Object.entries(m)) {
    if (Array.isArray(files) && files.length > 0) {
      const normalizedRoute = route.startsWith('/') ? route.slice(1) : route;
      map[normalizedRoute] = {
        files: files.map(fp => ({
          prdFile: fp,
          title: titleMap[fp] || fp,
        })),
      };
    }
  }
  return map;
});

// 异步获取 PRD 内容
const getPrdContent = async (relPath) => {
  if (!relPath) return null;
  try {
    return await fetchDocContent(relPath);
  } catch {
    return null;
  }
};

/**
 * 从页面路由提取业务分类名
 * 'pages/demo/test/fuel-reimbursement' → '测试'
 */
const extractCategory = (route) => {
  const parts = route.split('/');
  // 格式: pages/demo/{category}/{page}
  const demoIdx = parts.indexOf('demo');
  if (demoIdx !== -1 && parts.length > demoIdx + 2) {
    return parts[demoIdx + 1];
  }
  return '';
};

// 弹框状态
const prdPopupVisible = ref(false);
const activePrdIndex = ref(0); // 当前激活的文档索引
const prdMode = ref('detail'); // 'detail' | 'center'
const prdRoute = ref('');
const prdLoading = ref(true);
const prdError = ref('');
const prdHtml = ref('');
const tocVisible = ref(true);
const activeTocIdx = ref(-1); // 当前高亮的目录项索引（用索引避免同名章节串味）
let tocScrollLock = false; // 点击目录平滑滚动期间，锁定滚动联动，避免高亮被中途覆盖
let tocScrollTimer = null;

// 当前 PRD 信息
const currentPrdInfo = computed(() => {
  if (!prdRoute.value) return null;
  const info = prdMappingMap.value[prdRoute.value];
  if (!info || !info.files?.length) return null;
  return info.files[activePrdIndex.value] || info.files[0];
});

// 所有 PRD 列表（含分类信息）
const allPrdsList = computed(() => {
  return Object.entries(prdMappingMap.value).map(([route, info]) => {
    const category = extractCategory(route);
    const firstFile = info.files?.[0];
    return {
      route,
      prdFile: firstFile?.prdFile || '',
      title: firstFile?.title || route,
      files: info.files || [],
      category,
      categoryName: categoryNames[category] || category,
      hasFile: !!(info.files?.length),
    };
  });
});

// 按业务分类分组的 PRD 列表（用于文档中心展示）
const prdsByCategory = computed(() => {
  const groups = {};
  allPrdsList.value.forEach((item) => {
    const key = item.category || '__unknown__';
    if (!groups[key]) groups[key] = { categoryName: item.categoryName, items: [] };
    groups[key].items.push(item);
  });
  return Object.entries(groups)
    .map(([category, group]) => ({
      category,
      categoryName: group.categoryName,
      items: group.items,
    }))
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName));
});

// 当前选中页面的 PRD 篇数（1:1 映射，有则1篇，无则0篇）
const prdCount = computed(() => {
  const info = prdMappingMap.value[prdRoute.value];
  return info?.files?.length || 0;
});

// 目录列表（从 rendered HTML 提取 h2/h3，用 marked 生成的真实 id）
const tocList = computed(() => {
  if (!prdHtml.value || prdMode.value !== 'detail') return [];
  const tempEl = document.createElement('div');
  tempEl.innerHTML = prdHtml.value;
  const headings = tempEl.querySelectorAll('h2, h3');
  const list = [];
  headings.forEach((h) => {
    const text = h.textContent.trim();
    if (!text) return;
    // 使用 marked 渲染后 h 标签上的真实 id，无 id 则回退到手动推导
    const id = h.getAttribute('id') || text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, '');
    list.push({
      level: h.tagName === 'H2' ? 2 : 3,
      text,
      id,
    });
  });
  return list;
});

// 加载并渲染 PRD
const loadPrdContent = async () => {
  prdLoading.value = true;
  prdError.value = '';
  prdHtml.value = '';
  activeTocIdx.value = -1; // 切换/加载文档时重置目录高亮

  try {
    if (prdMode.value === 'center') {
      // 文档中心模式无需渲染单个文档
      prdLoading.value = false;
      return;
    }

    const info = currentPrdInfo.value;
    if (!info || !info.prdFile) {
      prdError.value = '未找到该页面的关联文档';
      prdLoading.value = false;
      return;
    }

    const rawContent = await getPrdContent(info.prdFile);
    if (!rawContent) {
      prdError.value = `文档文件 "${info.prdFile}" 不存在`;
      prdLoading.value = false;
      return;
    }

    const prdDir = info.prdFile.split('/').slice(0, -1).join('/');
    prdHtml.value = renderMarkdown(rawContent, prdDir);

    // 关键：先关闭 loading，使 v-else 详情分支（含 .prd-modal__body-markdown）真正挂载进 DOM。
    // 否则此刻仍在 loading 分支，容器不存在，renderMermaidIn 查不到节点会静默跳过，
    // 等 finally 关掉 loading 后内容才出现，但 mermaid 已不会再被触发渲染。
    prdLoading.value = false;
    // 渲染后滚动到顶部
    await nextTick();
    const mdContainer = document.querySelector('.prd-modal__body-markdown');
    if (mdContainer) mdContainer.scrollTop = 0;
    await renderMermaidIn(mdContainer); // 渲染 mermaid 流程图（异步，等注入完成）
    updateActiveToc(); // 初始化目录高亮（置顶时高亮首项）
  } catch (err) {
    console.error('[IndexPage] 渲染 PRD 失败', err);
    prdError.value = '文档渲染失败';
  } finally {
    prdLoading.value = false;
  }
};

// 打开 PRD 弹框 — 单个页面
const openPrdModal = async (route) => {
  prdRoute.value = route || '';
  prdMode.value = 'detail';
  activePrdIndex.value = 0;
  prdPopupVisible.value = true;
  await loadPrdContent();
};

// 切换到指定文档索引
const switchPrdTab = async (index) => {
  activePrdIndex.value = index;
  await loadPrdContent();
};

// 关闭弹框
const closePrdModal = () => {
  prdPopupVisible.value = false;
};

// 切换到某个 PRD 详情
const switchToPrdDetail = async (route) => {
  prdRoute.value = route;
  prdMode.value = 'detail';
  await loadPrdContent();
};

// 复制文件名
const copyFileName = () => {
  const info = currentPrdInfo.value;
  if (!info) return;
  const text = info.prdFile;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast({ title: '已复制', icon: 'success' });
    });
  } else {
    // fallback
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast({ title: '已复制', icon: 'success' });
  }
};

// 新标签页打开文档中心页（H5 hash 路由：/#/pages/prd-view/index）
const openDocCenterNewTab = () => {
  const base = location.origin + location.pathname;
  window.open(`${base}#/pages/prd-view/index`, '_blank');
};

// 在文档中心打开（新标签页，传递当前文档路径）
const openInDocCenterPage = () => {
  const filePath = currentPrdInfo.value?.prdFile || '';
  closePrdModal();
  const base = location.origin + location.pathname;
  const query = filePath ? `?file=${encodeURIComponent(filePath)}` : '';
  window.open(`${base}#/pages/prd-view/index${query}`, '_blank');
};

// 根据内容滚动位置，反向计算当前应高亮的目录项（scroll spy）
const updateActiveToc = () => {
  const container = document.querySelector('.prd-modal__body-markdown');
  if (!container || !tocList.value.length) return;
  const containerTop = container.getBoundingClientRect().top;
  const threshold = containerTop + 12; // 标题顶越过容器顶下方 12px 即视为"已到达"
  let active = 0;
  for (let i = 0; i < tocList.value.length; i++) {
    const item = tocList.value[i];
    let el = container.querySelector(`#${CSS.escape(item.id)}`);
    if (!el && item.text) {
      const headings = container.querySelectorAll('h2, h3');
      for (const h of headings) {
        if (h.textContent.trim() === item.text) { el = h; break; }
      }
    }
    if (el && el.getBoundingClientRect().top <= threshold) {
      active = i; // 仍在该阈值之上/之内，继续向后找最后一个越过阈值的标题
    } else {
      break; // 标题按文档顺序排列，一旦未越过即可停止
    }
  }
  activeTocIdx.value = active;
};

// 内容区滚动时联动目录高亮（点击平滑滚动锁定期内不触发，避免高亮被覆盖）
const onContentScroll = () => {
  if (tocScrollLock) return;
  updateActiveToc();
};

// 点击目录跳转到对应章节
const scrollToTocItem = (id, text, idx = -1) => {
  const container = document.querySelector('.prd-modal__body-markdown');
  if (!container) return;

  // 优先按 id 查找 marked 渲染的标题
  let el = container.querySelector(`#${CSS.escape(id)}`);
  // 回退：按文本内容匹配标题
  if (!el && text) {
    const headings = container.querySelectorAll('h2, h3');
    headings.forEach((h) => {
      if (h.textContent.trim() === text) el = h;
    });
  }

  if (el) {
    activeTocIdx.value = idx; // 立即高亮当前点击项
    tocScrollLock = true; // 锁定滚动联动，平滑滚动结束后再放开
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearTimeout(tocScrollTimer);
    tocScrollTimer = setTimeout(() => {
      tocScrollLock = false;
      updateActiveToc(); // 滚动结束后以真实位置校准高亮
    }, 400);
  }
};

// ====== 操作栏按钮 ======

// 从 iframe 获取当前实际页面路由（iframe 内导航后 currentRoute 可能已过期）
const getIframeRoute = () => {
  try {
    const iframe = document.querySelector('.phone-iframe');
    if (iframe && iframe.contentWindow) {
      const hash = iframe.contentWindow.location.hash;
      if (hash.startsWith('#/pages/')) {
        return hash.slice(2).split('?')[0];
      }
    }
  } catch (e) {
    // 跨域或不可访问时忽略，回退到 currentRoute
  }
  return null;
};

const onLinkDoc = () => {
  const iframeRoute = getIframeRoute();
  const route = iframeRoute || currentRoute.value;
  if (!route) {
    console.log('[IndexPage] 关联文档：未选择页面');
    return;
  }
  console.log('[IndexPage] 关联文档路由:', route, iframeRoute ? '(来自iframe)' : '(来自侧边栏)');
  openPrdModal(route);
};

const onDocCenter = () => {
  openDocCenterNewTab();
};

return (_ctx, _cache) => {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_u_loading_icon = resolveEasycom(resolveDynamicComponent("u-loading-icon"), __easycom_6);
  const _component_u_empty = resolveEasycom(resolveDynamicComponent("u-empty"), __easycom_5);
  const _component_v_uni_scroll_view = ScrollView;
  const _component_u_popup = resolveEasycom(resolveDynamicComponent("u-popup"), __easycom_7);

  return (openBlock(), createBlock(_component_v_uni_view, { class: "preview-container" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "action-bar" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "action-bar__title" }, {
            default: withCtx(() => [
              createTextVNode("文档管理")
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "action-bar__btns" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, {
                class: "action-btn",
                onClick: onLinkDoc
              }, {
                default: withCtx(() => [
                  createTextVNode("关联文档")
                ]),
                _: 1
              }),
              createVNode(_component_v_uni_text, {
                class: "action-btn",
                onClick: onDocCenter
              }, {
                default: withCtx(() => [
                  createTextVNode("文档中心")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_v_uni_view, { class: "sidebar" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "sidebar-header" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "sidebar-title" }, {
                default: withCtx(() => [
                  createTextVNode("页面预览器")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_v_uni_view, { class: "menu-list" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(menuData.value, (group) => {
                return (openBlock(), createBlock(_component_v_uni_view, {
                  key: group.category,
                  class: "menu-group"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, {
                      class: "menu-category",
                      onClick: $event => (toggleCategory(group.category))
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_uni_text, {
                          class: normalizeClass(["category-arrow", { expanded: expandedCategories.value[group.category] }])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("▶")
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(_component_v_uni_text, { class: "category-name" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(group.categoryName), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_v_uni_text, { class: "category-count" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(group.items.length), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    (expandedCategories.value[group.category])
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: "menu-items"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item) => {
                              return (openBlock(), createBlock(_component_v_uni_view, {
                                key: item.route,
                                class: normalizeClass(["menu-item", { active: currentRoute.value === item.route }]),
                                onClick: $event => (selectPage(item.route))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["class", "onClick"]))
                            }), 128))
                          ]),
                          _: 2
                        }, 1024))
                      : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024))
              }), 128)),
              (menuData.value.length === 0)
                ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "empty-tip"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, null, {
                        default: withCtx(() => [
                          createTextVNode("暂无页面")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_text, { class: "empty-desc" }, {
                        default: withCtx(() => [
                          createTextVNode("在 src/pages/demo/ 下创建分类目录和页面")
                        ]),
                        _: 1
                      })
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
      createVNode(_component_v_uni_view, { class: "preview-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "device-stage",
            style: { '--stage-reserve': '64px' }
          }, {
            default: withCtx(() => [
              false
                ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "device-controls"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_view, { class: "device-switch" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, {
                            class: normalizeClass(["device-switch__item", { active: deviceType.value === 'phone' }]),
                            onClick: _cache[0] || (_cache[0] = $event => (deviceType.value = 'phone'))
                          }, {
                            default: withCtx(() => [
                              createTextVNode("手机")
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(_component_v_uni_view, {
                            class: normalizeClass(["device-switch__item", { active: deviceType.value === 'pad' }]),
                            onClick: _cache[1] || (_cache[1] = $event => {deviceType.value = 'pad'; padOrientation.value = 'landscape';})
                          }, {
                            default: withCtx(() => [
                              createTextVNode("PAD")
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ]),
                        _: 1
                      }),
                      (deviceType.value === 'pad')
                        ? (openBlock(), createBlock(_component_v_uni_view, {
                            key: 0,
                            class: "orientation-switch"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, {
                                class: normalizeClass(["orientation-switch__item", { active: padOrientation.value === 'landscape' }]),
                                onClick: _cache[2] || (_cache[2] = $event => (padOrientation.value = 'landscape'))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("横屏")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              createVNode(_component_v_uni_view, {
                                class: normalizeClass(["orientation-switch__item", { active: padOrientation.value === 'portrait' }]),
                                onClick: _cache[3] || (_cache[3] = $event => (padOrientation.value = 'portrait'))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("竖屏")
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ]),
                            _: 1
                          }))
                        : createCommentVNode("", true)
                    ]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              createVNode(_component_v_uni_view, {
                class: normalizeClass(["phone-frame", {
            'phone-frame--pad': deviceType.value === 'pad',
            'phone-frame--landscape': deviceType.value === 'pad' && padOrientation.value === 'landscape',
          }])
              }, {
                default: withCtx(() => [
                  (deviceType.value === 'phone')
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 0,
                        class: "phone-notch"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_view, { class: "phone-speaker" })
                        ]),
                        _: 1
                      }))
                    : createCommentVNode("", true),
                  createVNode(_component_v_uni_view, { class: "phone-screen" }, {
                    default: withCtx(() => [
                      (currentRoute.value)
                        ? (openBlock(), createElementBlock("iframe", {
                            key: iframeSrc.value,
                            src: iframeSrc.value,
                            class: "phone-iframe",
                            frameborder: "0"
                          }, null, 8, ["src"]))
                        : (openBlock(), createBlock(_component_v_uni_view, {
                            key: 1,
                            class: "phone-placeholder"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_text, { class: "placeholder-text" }, {
                                default: withCtx(() => [
                                  createTextVNode("请选择左侧菜单查看页面")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }))
                    ]),
                    _: 1
                  }),
                  (deviceType.value === 'phone')
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 1,
                        class: "phone-home-bar"
                      }))
                    : createCommentVNode("", true)
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
        show: prdPopupVisible.value,
        mode: "center",
        round: 12,
        "close-on-click-overlay": false,
        onClose: closePrdModal
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "prd-modal" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "prd-modal__header" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_view, { class: "prd-modal__header-left" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "prd-modal__title" }, {
                        default: withCtx(() => [
                          createTextVNode("关联文档")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_text, { class: "prd-modal__count" }, {
                        default: withCtx(() => [
                          createTextVNode("共" + toDisplayString(prdCount.value) + "篇", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_uni_view, { class: "prd-modal__header-right" }, {
                    default: withCtx(() => [
                      (prdMode.value === 'detail' && currentPrdInfo.value)
                        ? (openBlock(), createBlock(_component_v_uni_text, {
                            key: 0,
                            class: "prd-modal__action-btn",
                            onClick: copyFileName
                          }, {
                            default: withCtx(() => [
                              createTextVNode("复制文件名")
                            ]),
                            _: 1
                          }))
                        : createCommentVNode("", true),
                      createVNode(_component_v_uni_view, {
                        class: "prd-modal__primary-btn",
                        onClick: openInDocCenterPage
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, null, {
                            default: withCtx(() => [
                              createTextVNode("在文档中心打开")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_uni_text, {
                        class: "prd-modal__close",
                        onClick: closePrdModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("×")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              (prdCount.value > 1)
                ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "prd-modal__tabs"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(prdMappingMap.value[prdRoute.value]?.files || [], (file, idx) => {
                        return (openBlock(), createBlock(_component_v_uni_view, {
                          key: idx,
                          class: normalizeClass(["prd-modal__tab", { 'prd-modal__tab--active': idx === activePrdIndex.value }]),
                          onClick: $event => (switchPrdTab(idx))
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_uni_text, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(file.title), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["class", "onClick"]))
                      }), 128))
                    ]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              createVNode(_component_v_uni_view, { class: "prd-modal__body" }, {
                default: withCtx(() => [
                  (prdLoading.value)
                    ? (openBlock(), createBlock(_component_v_uni_view, {
                        key: 0,
                        class: "prd-modal__loading"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_u_loading_icon, {
                            type: "spinner",
                            size: "48",
                            color: "var(--ml-color-brand)"
                          }),
                          createVNode(_component_v_uni_text, { class: "prd-modal__loading-text" }, {
                            default: withCtx(() => [
                              createTextVNode("加载文档中...")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }))
                    : (prdError.value)
                      ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 1,
                          class: "prd-modal__error"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_u_empty, {
                              mode: "list",
                              text: prdError.value
                            }, null, 8, ["text"])
                          ]),
                          _: 1
                        }))
                      : (prdMode.value === 'center')
                        ? (openBlock(), createBlock(_component_v_uni_view, {
                            key: 2,
                            class: "prd-modal__center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_uni_view, { class: "prd-modal__center-header" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_uni_text, { class: "prd-modal__center-title" }, {
                                    default: withCtx(() => [
                                      createTextVNode("文档中心")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_uni_text, { class: "prd-modal__center-subtitle" }, {
                                    default: withCtx(() => [
                                      createTextVNode("共 " + toDisplayString(allPrdsList.value.length) + " 份 PRD 文档", 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              (allPrdsList.value.length === 0)
                                ? (openBlock(), createBlock(_component_v_uni_view, {
                                    key: 0,
                                    class: "prd-modal__center-empty"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_u_empty, {
                                        mode: "data",
                                        text: "暂无 PRD 文档"
                                      })
                                    ]),
                                    _: 1
                                  }))
                                : (openBlock(), createBlock(_component_v_uni_view, {
                                    key: 1,
                                    class: "prd-modal__center-groups"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(prdsByCategory.value, (group) => {
                                        return (openBlock(), createBlock(_component_v_uni_view, {
                                          key: group.category,
                                          class: "prd-modal__center-group"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_uni_view, { class: "prd-modal__center-group-title" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_uni_text, { class: "prd-modal__center-group-name" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(group.categoryName), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_v_uni_text, { class: "prd-modal__center-group-count" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(group.items.length) + " 篇", 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_v_uni_view, { class: "prd-modal__center-list" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item) => {
                                                  return (openBlock(), createBlock(_component_v_uni_view, {
                                                    key: item.route,
                                                    class: "prd-modal__center-item",
                                                    onClick: $event => (switchToPrdDetail(item.route))
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_uni_view, { class: "prd-modal__center-item-info" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_v_uni_text, { class: "prd-modal__center-item-title" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(_component_v_uni_text, { class: "prd-modal__center-item-route" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.route), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_v_uni_view, { class: "prd-modal__center-item-status" }, {
                                                        default: withCtx(() => [
                                                          (item.hasFile)
                                                            ? (openBlock(), createBlock(_component_v_uni_text, {
                                                                key: 0,
                                                                class: "prd-modal__status-tag prd-modal__status-tag--ok"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("已就绪")
                                                                ]),
                                                                _: 1
                                                              }))
                                                            : (openBlock(), createBlock(_component_v_uni_text, {
                                                                key: 1,
                                                                class: "prd-modal__status-tag prd-modal__status-tag--warn"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("缺失文件")
                                                                ]),
                                                                _: 1
                                                              }))
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"]))
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
                                  }))
                            ]),
                            _: 1
                          }))
                        : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                            createVNode(_component_v_uni_view, { class: "prd-modal__body-content" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_uni_scroll_view, {
                                  "scroll-y": "",
                                  class: "prd-modal__body-markdown",
                                  onScroll: onContentScroll
                                }, {
                                  default: withCtx(() => [
                                    (currentPrdInfo.value)
                                      ? (openBlock(), createBlock(_component_v_uni_view, {
                                          key: 0,
                                          class: "prd-modal__doc-title-wrap"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_uni_text, { class: "prd-modal__doc-title" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(currentPrdInfo.value.title) + " PRD", 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }))
                                      : createCommentVNode("", true),
                                    createVNode(_component_v_uni_view, {
                                      class: "prd-markdown-body",
                                      innerHTML: prdHtml.value
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            (tocVisible.value && tocList.value.length > 0)
                              ? (openBlock(), createBlock(_component_v_uni_view, {
                                  key: 0,
                                  class: "prd-modal__toc"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_uni_view, { class: "prd-modal__toc-header" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_uni_text, { class: "prd-modal__toc-title" }, {
                                          default: withCtx(() => [
                                            createTextVNode("目录")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_uni_text, {
                                          class: "prd-modal__toc-toggle",
                                          onClick: _cache[4] || (_cache[4] = $event => (tocVisible.value = false))
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("»")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_uni_scroll_view, {
                                      "scroll-y": "",
                                      class: "prd-modal__toc-list"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(tocList.value, (item, idx) => {
                                          return (openBlock(), createBlock(_component_v_uni_view, {
                                            key: idx,
                                            class: normalizeClass(["prd-modal__toc-item", { 'prd-modal__toc-item--h3': item.level === 3, 'is-active': idx === activeTocIdx.value }]),
                                            onClick: $event => (scrollToTocItem(item.id, item.text, idx))
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.text), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class", "onClick"]))
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }))
                              : (!tocVisible.value && tocList.value.length > 0)
                                ? (openBlock(), createBlock(_component_v_uni_view, {
                                    key: 1,
                                    class: "prd-modal__toc-collapsed",
                                    onClick: _cache[5] || (_cache[5] = $event => (tocVisible.value = true))
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_text, { class: "prd-modal__toc-collapsed-text" }, {
                                        default: withCtx(() => [
                                          createTextVNode("目录 «")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }))
                                : createCommentVNode("", true)
                          ], 64))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["show"])
    ]),
    _: 1
  }))
}
}

};
const index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-cdf9ee90"]]);

export { index as default };
