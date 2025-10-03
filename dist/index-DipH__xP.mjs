import { defineComponent, resolveComponent, createElementBlock, openBlock, createElementVNode, createVNode, withCtx, createTextVNode, toDisplayString, unref, Fragment, renderList, normalizeClass } from "vue";
import { u as useI18n, F as Footer } from "./index-CV0rKLaB.mjs";
const _hoisted_1$2 = { class: "mt-10 flex space-x-4" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HomePage",
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", null, [
        _cache[0] || (_cache[0] = createElementVNode("h1", { class: "antialiased font-extrabold text-4xl leading-8 sm:text-5xl lg:text-6xl tracking-tight sm:leading-16" }, " Section UI ", -1)),
        _cache[1] || (_cache[1] = createElementVNode("p", { class: "m-0 mt-10 text-lg opacity-75 leading-6 font-medium" }, " Component library for VUE 3 using UnoCSS, most components are using daisyUI styles. ", -1)),
        createElementVNode("div", _hoisted_1$2, [
          createVNode(_component_btn, {
            tag: "RouterLink",
            to: "/section/started",
            size: "md"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("home.started")), 1)
            ]),
            _: 1
          }),
          createVNode(_component_btn, {
            tag: "RouterLink",
            to: "/section/button",
            variant: "outline",
            size: "md"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("home.components")), 1)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "my-14" };
const _hoisted_2 = { class: "flex flex-wrap my-20 gap-15" };
const _hoisted_3 = { class: "flex w-full justify-between" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HomeExample",
  setup(__props) {
    const themes = [
      "theme-blue",
      "theme-teal",
      "theme-rose",
      "theme-violet",
      "theme-orange"
    ];
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_tgl = resolveComponent("tgl");
      const _component_ckb = resolveComponent("ckb");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(themes, (theme) => {
            return createElementVNode("div", {
              class: normalizeClass([[theme], "shadow-sm h-auto border rounded-lg flex flex-wrap gap-3 (w-60 px-5 py-9) md:(w-48 px-6 py-7)"])
            }, [
              createElementVNode("div", _hoisted_3, [
                createVNode(_component_btn, {
                  circle: "",
                  size: "xs"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "xmark",
                      regular: "",
                      xl: ""
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_tgl, { checked: "" }),
                createVNode(_component_ckb, { checked: "" })
              ]),
              createVNode(_component_btn, {
                size: "sm",
                class: "w-full"
              }, {
                default: withCtx(() => [..._cache[0] || (_cache[0] = [
                  createTextVNode(" Primary ", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_btn, {
                size: "sm",
                variant: "transparent",
                class: "w-full"
              }, {
                default: withCtx(() => [..._cache[1] || (_cache[1] = [
                  createTextVNode(" Transparent ", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_btn, {
                size: "sm",
                variant: "outline",
                class: "w-full"
              }, {
                default: withCtx(() => [..._cache[2] || (_cache[2] = [
                  createTextVNode(" Outline ", -1)
                ])]),
                _: 1
              })
            ], 2);
          }), 64))
        ])
      ]);
    };
  }
});
const _hoisted_1 = { class: "flex-auto px-8 lg:px-36 w-full pt-25" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$2),
        createVNode(_sfc_main$1),
        createVNode(Footer)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DipH__xP.mjs.map
