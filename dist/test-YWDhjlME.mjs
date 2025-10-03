import { defineComponent, ref, resolveComponent, createElementBlock, openBlock, Fragment, createVNode, withCtx, createElementVNode } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test",
  setup(__props) {
    const isShow = ref(false);
    function showDrawer() {
      isShow.value = !isShow.value;
      console.log(isShow.value);
    }
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Drawer = resolveComponent("Drawer");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_btn, {
          onClick: showDrawer,
          clean: "",
          type: "button",
          size: "xl",
          class: "items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10"
        }, {
          default: withCtx(() => [
            createVNode(_component_icn, {
              name: "user",
              regular: "",
              xl: ""
            })
          ]),
          _: 1
        }),
        createVNode(_component_Drawer, {
          title: "Drawer",
          isShow: isShow.value
        }, {
          default: withCtx(() => [..._cache[0] || (_cache[0] = [
            createElementVNode("h1", null, "test", -1),
            createElementVNode("h1", null, "test", -1),
            createElementVNode("h1", null, "test", -1)
          ])]),
          _: 1
        }, 8, ["isShow"])
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=test-YWDhjlME.mjs.map
