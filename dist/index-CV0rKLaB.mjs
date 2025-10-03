import { defineComponent, computed, createBlock, openBlock, resolveDynamicComponent, normalizeClass, withCtx, createElementBlock, createCommentVNode, renderSlot, ref, createElementVNode, toDisplayString as toDisplayString$1, withDirectives, vModelCheckbox, onMounted, nextTick, normalizeStyle, resolveComponent, createVNode, vShow, Transition as Transition$1, Fragment, renderList, reactive, toRefs, unref, createApp, watch, onBeforeUnmount, withModifiers, createTextVNode, getCurrentInstance, inject, shallowRef, onUnmounted, effectScope, isRef, h, Text, useSlots } from "vue";
import { useRoute, createRouter, createWebHistory } from "vue-router";
const _hoisted_1$w = {
  key: 0,
  class: "btn-loading-icon animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
};
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    tag: { type: String, default: "button", required: false },
    color: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary", "success", "warning", "error"].includes(value);
      }
    },
    type: {
      type: String,
      default: "button",
      require: false,
      validator: (value) => {
        return ["button", "submit", "reset"].includes(value);
      }
    },
    loading: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    variant: {
      type: String,
      default: "default",
      required: false,
      validator: (value) => {
        return ["default", "outline", "transparent", "link"].includes(value);
      }
    },
    pills: { type: Boolean, default: false, required: false },
    circle: { type: Boolean, default: false, required: false },
    active: { type: Boolean, default: false, required: false },
    clean: { type: Boolean, default: false, required: false },
    item: { type: Boolean, default: false, required: false },
    sm: { type: String, required: false },
    // responsive sm
    md: { type: String, required: false },
    // responsive md
    lg: { type: String, required: false },
    // responsive lg
    xl: { type: String, required: false }
    // responsive xl
  },
  setup(__props) {
    const props = __props;
    const computedType = computed(() => {
      if (props.tag === "input" || props.tag === "button")
        return props.type;
      return null;
    });
    const baseClasses = computed(() => {
      if (props.clean || props.item) {
        return "bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-pointer";
      }
      return [
        // 基础样式 - 重置浏览器默认样式
        "border-none outline-none bg-transparent",
        "font-semibold inline-flex items-center justify-center select-none relative overflow-hidden",
        // 动画和过渡 + 自定义动画类
        "transition-all duration-200 ease-out transform scale-100 btn-animate btn-ripple",
        "hover:scale-105 hover:shadow-lg",
        "active:scale-95 active:duration-100",
        // 圆角 - 修复为正确的UnoCSS语法
        props.pills ? "rounded-full" : props.circle ? "rounded-full" : "rounded-$rounded-btn"
      ].filter(Boolean).join(" ");
    });
    const sizeClasses = computed(() => {
      if (props.clean || props.item) return "";
      const sizes = {
        xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
        sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
        md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
        lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
        xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
      };
      return sizes[props.size] || sizes.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean || props.item) return "";
      const variants = {
        default: (color) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
        outline: (color) => `text-${color} border-2 border-${color} border-solid bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
        transparent: (color) => `text-${color} bg-transparent hover:bg-${color}/10`,
        link: (color) => `text-${color} bg-transparent hover:underline`
      };
      const variantFn = variants[props.variant];
      const result = variantFn ? variantFn(props.color) : "";
      return result;
    });
    const stateClasses = computed(() => {
      const classes = [];
      if (props.disabled) {
        classes.push("cursor-not-allowed opacity-60 bg-base-100/70 border-base-100/50 text-base-content/80 transform-none!");
      }
      if (props.loading) {
        classes.push("cursor-wait");
      }
      if (props.active) {
        classes.push("scale-95");
      }
      return classes.join(" ");
    });
    const responsiveClasses = computed(() => {
      const classes = [];
      if (props.sm) {
        const size = props.sm;
        classes.push(`sm:${responsiveSizes[size]}`);
      }
      if (props.md) {
        const size = props.md;
        classes.push(`md:${responsiveSizes[size]}`);
      }
      if (props.lg) {
        const size = props.lg;
        classes.push(`lg:${responsiveSizes[size]}`);
      }
      if (props.xl) {
        const size = props.xl;
        classes.push(`xl:${responsiveSizes[size]}`);
      }
      return classes.join(" ");
    });
    const responsiveSizes = {
      xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
      sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
      md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
      lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
      xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
    };
    const buttonClasses = computed(() => {
      return [
        baseClasses.value,
        sizeClasses.value,
        colorVariantClasses.value,
        stateClasses.value,
        responsiveClasses.value
      ].filter(Boolean).join(" ");
    });
    const handleClick = (event) => {
      if (props.disabled || props.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(props.tag), {
        disabled: props.disabled || props.loading,
        type: computedType.value,
        class: normalizeClass(buttonClasses.value),
        onClick: handleClick
      }, {
        default: withCtx(() => [
          props.loading ? (openBlock(), createElementBlock("div", _hoisted_1$w)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["disabled", "type", "class"]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-8cb75963"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "Label",
  props: {
    color: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary", "success", "error", "warning"].includes(value);
      }
    },
    disabled: { type: Boolean, default: false, required: false },
    loading: { type: Boolean, default: false, required: false },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    variant: {
      type: String,
      default: "default",
      required: false,
      validator: (value) => {
        return ["default", "outline", "transparent", "link"].includes(value);
      }
    },
    pills: { type: Boolean, default: false, required: false },
    circle: { type: Boolean, default: false, required: false },
    active: { type: Boolean, default: false, required: false },
    // remove all styles from button
    clean: { type: Boolean, default: false, required: false },
    item: { type: Boolean, default: false, required: false },
    sm: { type: String, required: false },
    // responsive sm
    md: { type: String, required: false },
    // responsive md
    lg: { type: String, required: false },
    // responsive lg
    xl: { type: String, required: false }
    // responsive xl
  },
  setup(__props) {
    const props = __props;
    const baseClasses = computed(() => {
      if (props.clean || props.item) {
        return "bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-pointer";
      }
      return [
        // 基础样式 - 重置浏览器默认样式
        "border-none outline-none",
        "font-semibold inline-flex items-center justify-center select-none relative overflow-hidden",
        // 确保没有边框
        // 动画和过渡 + 自定义动画类
        "transition-all duration-200 ease-out transform scale-100 lab-animate",
        "hover:scale-105 active:scale-95",
        // 圆角
        props.pills ? "rounded-full" : props.circle ? "rounded-full" : "rounded-$rounded-lab"
      ].filter(Boolean).join(" ");
    });
    const sizeClasses = computed(() => {
      if (props.clean || props.item) return "";
      const sizes = {
        xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
        sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
        md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
        lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
        xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
      };
      return sizes[props.size] || sizes.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean || props.item) return "";
      const variants = {
        default: (color) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
        outline: (color) => `text-${color} border-2 border-${color} border-solid bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
        transparent: (color) => `text-${color} bg-transparent hover:bg-${color}/10`,
        link: (color) => `text-${color} bg-transparent hover:underline`
      };
      const variantFn = variants[props.variant];
      const result = variantFn ? variantFn(props.color) : "";
      return result;
    });
    const stateClasses = computed(() => {
      const classes = [];
      if (props.disabled) {
        classes.push("cursor-not-allowed pointer-events-none opacity-70");
      }
      if (props.loading) {
        classes.push("pointer-events-none");
      }
      if (props.active) {
        classes.push("scale-95");
      }
      return classes.join(" ");
    });
    const responsiveClasses = computed(() => {
      const classes = [];
      if (props.sm) {
        const size = props.sm;
        classes.push(`sm:${responsiveSizes[size]}`);
      }
      if (props.md) {
        const size = props.md;
        classes.push(`md:${responsiveSizes[size]}`);
      }
      if (props.lg) {
        const size = props.lg;
        classes.push(`lg:${responsiveSizes[size]}`);
      }
      if (props.xl) {
        const size = props.xl;
        classes.push(`xl:${responsiveSizes[size]}`);
      }
      return classes.join(" ");
    });
    const responsiveSizes = {
      xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
      sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
      md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
      lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
      xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
    };
    const labelClasses = computed(() => {
      return [
        baseClasses.value,
        sizeClasses.value,
        colorVariantClasses.value,
        stateClasses.value,
        responsiveClasses.value
      ].filter(Boolean).join(" ");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent("button"), {
        disabled: props.disabled || props.loading,
        class: normalizeClass(labelClasses.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["disabled", "class"]);
    };
  }
});
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-791b1ff8"]]);
const _hoisted_1$v = ["value", "name", "placeholder", "type", "disabled"];
const _hoisted_2$b = ["textContent"];
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    modelValue: { type: [String, Number], required: false },
    direction: { type: String, default: "row", required: false },
    label: { type: String, required: false },
    labelWidth: { type: String, default: "w-4/9", required: false },
    placeholder: { type: String, required: false },
    type: { type: String, default: "text", required: false },
    name: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    bordered: { type: Boolean, default: true, required: false },
    ghost: { type: Boolean, default: false, required: false },
    color: {
      type: String,
      default: "default",
      required: false,
      validator: (value) => {
        return ["default", "primary", "secondary", "success", "error", "warning"].includes(value);
      }
    },
    error: { type: String, required: false },
    pills: { type: Boolean, default: false, required: false },
    circle: { type: Boolean, default: false, required: false },
    clean: { type: Boolean, default: false, required: false },
    loading: { type: Boolean, default: false, required: false },
    // 响应式尺寸
    sm: { type: String, required: false },
    md: { type: String, required: false },
    lg: { type: String, required: false },
    xl: { type: String, required: false }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const inputText = ref(null);
    const isError = ref(props.error || false);
    const emit = __emit;
    const input = (e) => {
      emit("update:modelValue", e.target.value);
    };
    const baseClasses = computed(() => {
      if (props.clean) {
        return "bg-transparent border-none p-0 m-0 font-inherit text-inherit w-full";
      }
      return [
        "bg-base-100 transition-all duration-200 ease-in-out",
        "outline-none focus:outline-1 focus:outline-base-gray-300 focus:outline-offset-1",
        "min-w-0 flex-shrink-0",
        // 防止溢出
        // 圆角
        props.pills ? "rounded-full" : props.circle ? "rounded-full" : "rounded-$rounded-btn"
      ].filter(Boolean).join(" ");
    });
    const sizeClasses = computed(() => {
      if (props.clean) return "";
      const sizes = {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-xl"
      };
      return sizes[props.size] || sizes.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean) return "";
      const variants = {
        default: () => props.bordered ? "border border-base-gray-300/60" : "",
        primary: () => props.bordered ? "border border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2" : "",
        secondary: () => props.bordered ? "border border-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2" : "",
        success: () => props.bordered ? "border border-success focus:outline-2 focus:outline-success focus:outline-offset-2" : "",
        error: () => props.bordered ? "border border-error focus:outline-2 focus:outline-error focus:outline-offset-2" : "",
        warning: () => props.bordered ? "border border-warning focus:outline-2 focus:outline-warning focus:outline-offset-2" : ""
      };
      const variantFn = variants[props.color];
      return variantFn ? variantFn() : "";
    });
    const stateClasses = computed(() => {
      const classes = [];
      if (props.ghost) {
        classes.push("bg-transparent");
      }
      if (props.disabled) {
        classes.push("cursor-not-allowed pointer-events-none bg-base-100/70 border-base-100/50 text-base-content/80");
      }
      if (props.loading) {
        classes.push("pointer-events-none");
      }
      if (isError.value) {
        classes.push("border-error focus:outline-2 focus:outline-error focus:outline-offset-2");
      }
      return classes.join(" ");
    });
    const responsiveClasses = computed(() => {
      const classes = [];
      if (props.sm) {
        const size = props.sm;
        classes.push(`sm:${responsiveSizes[size]}`);
      }
      if (props.md) {
        const size = props.md;
        classes.push(`md:${responsiveSizes[size]}`);
      }
      if (props.lg) {
        const size = props.lg;
        classes.push(`lg:${responsiveSizes[size]}`);
      }
      if (props.xl) {
        const size = props.xl;
        classes.push(`xl:${responsiveSizes[size]}`);
      }
      return classes.join(" ");
    });
    const responsiveSizes = {
      xs: "h-6 px-2 text-xs",
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-5 text-base",
      xl: "h-14 px-6 text-xl"
    };
    const inputClasses = computed(() => {
      return [
        baseClasses.value,
        sizeClasses.value,
        colorVariantClasses.value,
        stateClasses.value,
        responsiveClasses.value
      ].filter(Boolean).join(" ");
    });
    const containerClasses = computed(() => {
      const classes = ["w-full"];
      if (props.label) {
        classes.push(props.direction);
      }
      return classes.join(" ");
    });
    const labelClasses = computed(() => {
      return [
        "select-none py-2 px-1",
        props.label ? props.labelWidth : ""
      ].filter(Boolean).join(" ");
    });
    const validationClasses = computed(() => {
      return "text-error text-xs mt-2 ml-1";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(labelClasses.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass(`text-${__props.size}`)
          }, toDisplayString$1(__props.label), 3)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("input", {
          ref_key: "inputText",
          ref: inputText,
          value: __props.modelValue,
          onInput: input,
          name: __props.name,
          placeholder: __props.placeholder,
          type: __props.type,
          disabled: __props.disabled || __props.loading,
          class: normalizeClass(inputClasses.value)
        }, null, 42, _hoisted_1$v),
        isError.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(validationClasses.value),
          textContent: toDisplayString$1(__props.error)
        }, null, 10, _hoisted_2$b)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-ce64b9ed"]]);
const _hoisted_1$u = ["disabled"];
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  props: {
    color: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary", "success", "error", "warning"].includes(value);
      }
    },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    disabled: { type: Boolean, default: false, required: false },
    checked: { type: Boolean, default: false, required: false }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const isChecked = computed({
      get: () => props.checked,
      set: (val) => emits("change", val)
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        type: "checkbox",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isChecked.value = $event),
        disabled: __props.disabled,
        class: normalizeClass(["ckb", [
          `ckb-${__props.color}`,
          `ckb-${__props.size}`
        ]])
      }, null, 10, _hoisted_1$u)), [
        [vModelCheckbox, isChecked.value]
      ]);
    };
  }
});
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-cd5cc613"]]);
const _hoisted_1$t = ["disabled"];
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  props: {
    checked: { type: Boolean, default: false, required: true },
    color: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary", "success", "error", "warning"].includes(value);
      }
    },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    disabled: { type: Boolean, default: false, required: false }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const isChecked = computed({
      get: () => props.checked,
      set: (val) => emits("change", val)
    });
    const baseClasses = computed(() => {
      return [
        "appearance-none",
        "cursor-pointer",
        "border",
        "border-solid",
        "border-gray-300",
        "bg-gray-300/60",
        "rounded-full",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "inline-block",
        "relative",
        "focus-visible:outline-2",
        "focus-visible:outline-primary",
        "focus-visible:outline-offset-2"
      ].join(" ");
    });
    const sizeClasses = computed(() => {
      const sizes = {
        xs: "w-6 h-4",
        sm: "w-8 h-5",
        md: "w-12 h-6",
        lg: "w-16 h-8",
        xl: "w-20 h-10"
      };
      return sizes[props.size] || sizes.md;
    });
    const colorClasses = computed(() => {
      if (!props.checked) return "";
      const colors = {
        primary: "border-primary bg-primary text-primary",
        secondary: "border-secondary bg-secondary text-secondary",
        success: "border-success bg-success text-success",
        error: "border-error bg-error text-error",
        warning: "border-warning bg-warning text-warning"
      };
      return colors[props.color] || colors.primary;
    });
    const stateClasses = computed(() => {
      const classes = [];
      if (props.disabled) {
        classes.push("cursor-not-allowed border-transparent bg-gray-300/20");
      }
      return classes.join(" ");
    });
    const toggleClasses = computed(() => {
      return [
        baseClasses.value,
        sizeClasses.value,
        colorClasses.value,
        stateClasses.value
      ].filter(Boolean).join(" ");
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        type: "checkbox",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isChecked.value = $event),
        disabled: __props.disabled,
        class: normalizeClass(toggleClasses.value)
      }, null, 10, _hoisted_1$t)), [
        [vModelCheckbox, isChecked.value]
      ]);
    };
  }
});
const Toggle = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-bca215d5"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  props: {
    name: { type: String, default: "", required: true },
    beat: { type: Boolean, default: false, required: false },
    fade: { type: Boolean, default: false, required: false },
    beatfade: { type: Boolean, default: false, required: false },
    bounce: { type: Boolean, default: false, required: false },
    flip: { type: Boolean, default: false, required: false },
    shake: { type: Boolean, default: false, required: false },
    spin: { type: Boolean, default: false, required: false },
    spinpulse: { type: Boolean, default: false, required: false },
    xs: { type: Boolean, required: false },
    sm: { type: Boolean, required: false },
    lg: { type: Boolean, required: false },
    xl: { type: Boolean, required: false },
    duotone: { type: Boolean, required: false },
    solid: { type: Boolean, required: false },
    regular: { type: Boolean, required: false },
    light: { type: Boolean, required: false },
    thin: { type: Boolean, required: false },
    brand: { type: Boolean, required: false },
    kit: { type: Boolean, required: false },
    // 颜色属性
    color: {
      type: String,
      default: "",
      required: false,
      validator: (value) => {
        return ["", "primary", "secondary", "success", "warning", "error", "info", "base", "neutral"].includes(value);
      }
    },
    // 自定义颜色值
    customColor: { type: String, default: "", required: false },
    // 透明度
    opacity: { type: Number, default: 1, required: false }
  },
  setup(__props) {
    let fontAwesomeLoaded = false;
    const loadFontAwesome = async () => {
      if (fontAwesomeLoaded) return;
      try {
        if (typeof window !== "undefined" && window.FontAwesome) {
          fontAwesomeLoaded = true;
          return;
        }
        const script = document.createElement("script");
        script.src = "/icon.js";
        script.async = true;
        return new Promise((resolve, reject) => {
          script.onload = () => {
            fontAwesomeLoaded = true;
            resolve(true);
          };
          script.onerror = () => {
            reject(new Error("Failed to load FontAwesome"));
          };
          document.head.appendChild(script);
        });
      } catch (error) {
        console.warn("FontAwesome 加载失败:", error);
      }
    };
    const props = __props;
    const iconClasses = computed(() => {
      const classes = [];
      const iconName = props.name;
      if (props.solid) {
        classes.push("fas", `fa-${iconName}`);
      } else if (props.regular) {
        classes.push("far", `fa-${iconName}`);
      } else if (props.light) {
        classes.push("fal", `fa-${iconName}`);
      } else if (props.thin) {
        classes.push("fat", `fa-${iconName}`);
      } else if (props.duotone) {
        classes.push("fad", `fa-${iconName}`);
      } else if (props.brand) {
        classes.push("fab", `fa-${iconName}`);
      } else {
        classes.push("fas", `fa-${iconName}`);
      }
      if (props.xs) classes.push("text-xs");
      else if (props.sm) classes.push("text-sm");
      else if (props.lg) classes.push("text-lg");
      else if (props.xl) classes.push("text-xl");
      else classes.push("text-base");
      if (props.color) {
        const colorMap = {
          primary: "text-primary",
          secondary: "text-secondary",
          success: "text-success",
          warning: "text-warning",
          error: "text-error",
          info: "text-info",
          base: "text-base-content",
          neutral: "text-neutral"
        };
        if (colorMap[props.color]) {
          classes.push(colorMap[props.color]);
        }
      }
      if (props.beat || props.bounce) classes.push("animate-bounce");
      else if (props.fade) classes.push("opacity-50");
      else if (props.beatfade) classes.push("animate-pulse");
      else if (props.flip) classes.push("transform rotate-180");
      else if (props.shake) classes.push("animate-pulse");
      else if (props.spin) classes.push("animate-spin");
      else if (props.spinpulse) classes.push("animate-pulse");
      if (props.opacity !== 1) {
        const opacityClass = `opacity-${Math.round(props.opacity * 100)}`;
        classes.push(opacityClass);
      }
      return classes;
    });
    const customStyles = computed(() => {
      const styles = {};
      if (props.customColor) {
        styles.color = props.customColor;
      }
      return styles;
    });
    onMounted(async () => {
      await nextTick();
      await loadFontAwesome();
      if (typeof window !== "undefined" && window.FontAwesome) {
        const fa = window.FontAwesome;
        if (fa.dom && fa.dom.i2svg) {
          fa.dom.i2svg();
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", {
        class: normalizeClass(iconClasses.value),
        style: normalizeStyle(customStyles.value)
      }, null, 6);
    };
  }
});
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "Backdrop",
  props: {
    show: { type: Boolean, required: false, default: false },
    blur: { type: Boolean, required: false },
    loading: { type: Boolean, required: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_tst = resolveComponent("tst");
      return openBlock(), createBlock(_component_tst, { name: "bloom" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["fixed inset-0 z-10 flex place-content-center h-screen backdrop-filter items-center", [__props.blur ? "backdrop-brightness-60 backdrop-blur-1" : "bg-gray-500 opacity-30"]])
          }, [
            withDirectives(createElementVNode("div", null, [
              createVNode(_component_icn, {
                name: "spinner",
                solid: "",
                xl: "",
                spinpulse: ""
              })
            ], 512), [
              [vShow, __props.show && __props.loading]
            ])
          ], 2), [
            [vShow, __props.show]
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$s = ["value", "rows", "cols", "disabled", "readonly", "placeholder", "maxlength"];
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "Textarea",
  props: {
    modelValue: { type: String },
    rows: { type: Number, default: 5 },
    cols: { type: Number, default: 30 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    placeholder: { type: String, default: "Please Input" },
    maxlength: { type: Number, default: 150 },
    showCounter: { type: Boolean, default: true },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    color: {
      type: String,
      default: "default",
      required: false,
      validator: (value) => {
        return ["default", "primary", "secondary", "success", "error", "warning"].includes(value);
      }
    },
    bordered: { type: Boolean, default: true, required: false },
    ghost: { type: Boolean, default: false, required: false },
    resize: {
      type: String,
      default: "resize",
      required: false,
      validator: (value) => {
        return ["resize", "resize-x", "resize-y", "resize-none"].includes(value);
      }
    },
    // 响应式尺寸
    sm: { type: String, required: false },
    md: { type: String, required: false },
    lg: { type: String, required: false },
    xl: { type: String, required: false }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const quantity = ref(0);
    const emit = __emit;
    const baseClasses = computed(() => {
      return [
        "w-full max-w-sm bg-base-100 transition-all duration-200 ease-in-out",
        "outline-none focus:outline-1 focus:outline-base-gray-300 focus:outline-offset-1",
        "min-w-0 flex-shrink-0",
        "rounded-$rounded-btn"
      ].join(" ");
    });
    const sizeClasses = computed(() => {
      const sizes = {
        xs: "h-20 px-2 py-1 text-xs",
        sm: "h-24 px-3 py-2 text-sm",
        md: "h-32 px-4 py-3 text-sm",
        lg: "h-40 px-5 py-4 text-base",
        xl: "h-48 px-6 py-5 text-xl"
      };
      return sizes[props.size] || sizes.md;
    });
    const colorVariantClasses = computed(() => {
      const variants = {
        default: () => props.bordered ? "border border-base-gray-300/60" : "",
        primary: () => props.bordered ? "border border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2" : "",
        secondary: () => props.bordered ? "border border-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2" : "",
        success: () => props.bordered ? "border border-success focus:outline-2 focus:outline-success focus:outline-offset-2" : "",
        error: () => props.bordered ? "border border-error focus:outline-2 focus:outline-error focus:outline-offset-2" : "",
        warning: () => props.bordered ? "border border-warning focus:outline-2 focus:outline-warning focus:outline-offset-2" : ""
      };
      const variantFn = variants[props.color];
      return variantFn ? variantFn() : "";
    });
    const stateClasses = computed(() => {
      const classes = [];
      if (props.ghost) {
        classes.push("bg-transparent");
      }
      if (props.disabled) {
        classes.push("cursor-not-allowed pointer-events-none bg-base-100/70 border-base-100/50 text-base-content/80");
      }
      if (props.loading) {
        classes.push("pointer-events-none");
      }
      if (props.readonly) {
        classes.push("cursor-default");
      }
      return classes.join(" ");
    });
    const responsiveClasses = computed(() => {
      const classes = [];
      if (props.sm) {
        const size = props.sm;
        classes.push(`sm:${responsiveSizes[size]}`);
      }
      if (props.md) {
        const size = props.md;
        classes.push(`md:${responsiveSizes[size]}`);
      }
      if (props.lg) {
        const size = props.lg;
        classes.push(`lg:${responsiveSizes[size]}`);
      }
      if (props.xl) {
        const size = props.xl;
        classes.push(`xl:${responsiveSizes[size]}`);
      }
      return classes.join(" ");
    });
    const responsiveSizes = {
      xs: "h-20 px-2 py-1 text-xs",
      sm: "h-24 px-3 py-2 text-sm",
      md: "h-32 px-4 py-3 text-sm",
      lg: "h-40 px-5 py-4 text-base",
      xl: "h-48 px-6 py-5 text-xl"
    };
    const textareaClasses = computed(() => {
      return [
        baseClasses.value,
        sizeClasses.value,
        colorVariantClasses.value,
        stateClasses.value,
        responsiveClasses.value,
        props.resize
      ].filter(Boolean).join(" ");
    });
    const containerClasses = computed(() => {
      return "relative w-full";
    });
    const counterClasses = computed(() => {
      return "opacity-50 absolute bottom-2 right-2 text-xs";
    });
    const input = (e) => {
      quantity.value = e.target.value.length;
      if (quantity.value > props.maxlength) {
        quantity.value = props.maxlength;
      }
      emit("update:modelValue", e.target.value);
    };
    const focus = (e) => {
      emit("focus", e.target.value);
    };
    const blur = (e) => {
      emit("blur", e.target.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        createElementVNode("textarea", {
          value: __props.modelValue,
          onInput: input,
          rows: __props.rows,
          cols: __props.cols,
          disabled: __props.disabled || __props.loading,
          readonly: __props.readonly,
          placeholder: __props.placeholder,
          onFocus: focus,
          onBlur: blur,
          maxlength: __props.maxlength,
          class: normalizeClass(textareaClasses.value)
        }, null, 42, _hoisted_1$s),
        __props.showCounter ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(counterClasses.value)
        }, toDisplayString$1(quantity.value) + "/" + toDisplayString$1(__props.maxlength), 3)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Textarea = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-87a6e8a0"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "Transition",
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => {
        return ["downward", "upward", "leftward", "rightward", "bloom", "fade"].includes(value);
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition$1, { name: __props.name }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
const Transition = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-25e2ffe3"]]);
const _hoisted_1$r = { class: "font-bold text-sm" };
const _hoisted_2$a = { class: "opacity-50 font-mono text-xs -mt-1" };
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "Color",
  props: {
    color: {
      default: ""
    }
  },
  setup(__props) {
    const colors = {
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef3c7",
        200: "#fde68e",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7c3aed",
        800: "#6b21a8",
        900: "#581c87"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827"
      }
    };
    const props = __props;
    function camelize(str) {
      const arr = str.split("-");
      const capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
      const capitalString = capital.join("");
      return capitalString;
    }
    const level = computed(() => props.color.split(/-/).slice(-1)[0]);
    const color = computed(() => props.color.split(/-/).slice(1, -1).join("-"));
    const hex = computed(() => colors[camelize(color.value)]?.[+level.value]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", {
          class: normalizeClass(["w-14 h-14 rounded", props.color])
        }, null, 2),
        createElementVNode("div", _hoisted_1$r, toDisplayString$1(level.value), 1),
        createElementVNode("div", _hoisted_2$a, toDisplayString$1(hex.value), 1)
      ]);
    };
  }
});
const _hoisted_1$q = { class: "my-8" };
const _hoisted_2$9 = { class: "mb-3 mt-8" };
const _hoisted_3$7 = { class: "font-bold" };
const _hoisted_4$5 = { class: "flex gap-2 mb-2" };
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "Palette",
  setup(__props) {
    const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const colors = [
      "pink",
      "rose",
      "red",
      "orange",
      "yellow",
      "amber",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      //light-blue
      "blue",
      "indigo",
      "purple",
      "violet",
      "fuchsia",
      "gray",
      //cool-gray
      "slate",
      //blue-gray
      "stone",
      //warm-gray
      "neutral",
      //true-gray
      "zinc",
      "light",
      "dark"
    ];
    return (_ctx, _cache) => {
      const _component_Color = resolveComponent("Color");
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        (openBlock(), createElementBlock(Fragment, null, renderList(colors, (color) => {
          return createElementVNode("div", { key: color }, [
            createElementVNode("div", _hoisted_2$9, [
              createElementVNode("span", _hoisted_3$7, toDisplayString$1(color), 1)
            ]),
            createElementVNode("div", _hoisted_4$5, [
              (openBlock(), createElementBlock(Fragment, null, renderList(levels, (level) => {
                return createVNode(_component_Color, {
                  key: level,
                  color: `bg-${color}-${level}`
                }, null, 8, ["color"]);
              }), 64))
            ])
          ]);
        }), 64))
      ]);
    };
  }
});
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    type: {
      type: String,
      default: "message",
      required: true,
      validator: (value) => {
        return Object.values(MessageTypes).includes(value);
      }
    },
    message: { type: String, default: "message" }
  },
  setup(__props, { expose: __expose }) {
    const state = reactive({ visible: false, top: 20 });
    let timer = null;
    const props = __props;
    const bgClass = computed(() => {
      const typeMap = {
        "success": "bg-success",
        "message": "bg-primary",
        "warning": "bg-warning",
        "error": "bg-error"
      };
      return typeMap[props.type] || "bg-primary";
    });
    const bgStyle = computed(() => {
      const colorMap = {
        "success": "var(--success)",
        "message": "var(--primary)",
        "warning": "var(--warning)",
        "error": "var(--error)"
      };
      return {
        top: top.value + "rem",
        backgroundColor: colorMap[props.type] || "#2563eb"
      };
    });
    const setVisible = (isVisible) => {
      return new Promise((resolve) => {
        state.visible = isVisible;
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          resolve("");
        }, 300);
      });
    };
    const setTop2 = (top2) => {
      state.top = top2;
      return top2;
    };
    __expose({ setVisible, setTop: setTop2, height: 8, margin: 2 });
    const { visible, top } = toRefs(state);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition$1, { name: "slide-fade" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["msg fixed left-1/2 transform -translate-x-1/2 h-8 w-64 z-100 text-center text-lg rounded-md shadow-lg text-white opacity-90", bgClass.value]),
            style: normalizeStyle(bgStyle.value)
          }, toDisplayString$1(__props.message), 7), [
            [vShow, unref(visible)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const MessageComponent = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-4c4a9d11"]]);
const MessageTypes = {
  SUCCESS: "success",
  MESSAGE: "message",
  WARNING: "warning",
  ERROR: "error"
};
const messageArr = ref([]);
const Message = (options) => {
  const messageApp = createApp(MessageComponent, options);
  showMessage$1(messageApp, options.duration || 3e3);
};
const MessageWithMethods = Message;
Object.values(MessageTypes).forEach((type) => {
  MessageWithMethods[type] = (options) => {
    const optionsWithType = { ...options, type };
    return Message(optionsWithType);
  };
});
function showMessage$1(app, duration) {
  const oFrag = document.createDocumentFragment();
  const vm = app.mount(oFrag);
  messageArr.value.push(vm);
  document.body.appendChild(oFrag);
  setTop(vm);
  vm.setVisible(true);
  watch(messageArr, () => setTop(vm));
  hideMessage(app, vm, duration);
}
function hideMessage(app, vm, duration) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false);
    app.unmount();
    messageArr.value = messageArr.value.filter((item) => item !== vm);
    clearTimeout(vm.timer);
    vm.timer = null;
  }, duration);
}
function setTop(vm) {
  const { setTop: setTop2, height, margin } = vm;
  const currentIndex = messageArr.value.findIndex((item) => item === vm);
  const baseTop = 5;
  setTop2(baseTop + (margin * 2 + height) * currentIndex);
}
const install$5 = (app) => {
  app.component("btn", Button);
  app.component("lab", Label);
  app.component("ipt", Input);
  app.component("tgl", Toggle);
  app.component("ckb", Checkbox);
  app.component("icn", _sfc_main$O);
  app.component("bkd", _sfc_main$N);
  app.component("txa", Textarea);
  app.component("tst", Transition);
  app.component("Color", _sfc_main$K);
  app.component("Palette", _sfc_main$J);
  app.config.globalProperties.$message = MessageWithMethods;
  app.provide("message", MessageWithMethods);
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "ButtonGroup",
  props: {
    direction: { default: "horizontal" },
    size: { default: "md" },
    color: { default: "primary" },
    variant: { default: "solid" },
    shape: { default: "rounded" },
    spacing: { default: "none" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    maxButtons: { default: 0 },
    showDivider: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
    showCount: { type: Boolean, default: false },
    customClass: { default: "" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const baseClasses = computed(() => {
      return [
        "inline-flex relative align-middle",
        // 方向
        props.direction === "vertical" ? "flex-col" : "flex-row",
        // 可折叠
        props.collapsible ? "flex-wrap" : "",
        // 状态
        props.disabled ? "opacity-60" : "",
        props.readonly ? "pointer-events-none" : "",
        // 自定义类名
        props.customClass
      ].filter(Boolean).join(" ");
    });
    const spacingClasses = computed(() => {
      if (props.spacing === "none") return "";
      const spacings = {
        xs: props.direction === "vertical" ? "space-y-0.5" : "space-x-0.5",
        sm: props.direction === "vertical" ? "space-y-1" : "space-x-1",
        md: props.direction === "vertical" ? "space-y-2" : "space-x-2",
        lg: props.direction === "vertical" ? "space-y-3" : "space-x-3",
        xl: props.direction === "vertical" ? "space-y-4" : "space-x-4"
      };
      return spacings[props.spacing] || "";
    });
    const dividerClasses = computed(() => {
      if (!props.showDivider) return "";
      return props.direction === "vertical" ? "divide-y divide-current/30" : "divide-x divide-current/30";
    });
    const responsiveClasses = computed(() => {
      if (!props.collapsible) return "";
      return "sm:flex-col sm:space-x-0 sm:space-y-1";
    });
    const countClasses = computed(() => {
      if (!props.showCount) return "";
      return "relative after:absolute after:-top-2 after:-right-2 after:bg-error after:text-error-content after:rounded-full after:w-6 after:h-6 after:flex after:items-center after:justify-center after:text-xs after:font-bold";
    });
    const maxButtonsClasses = computed(() => {
      if (props.maxButtons <= 0) return "";
      return `[&>*:nth-child(n+${props.maxButtons + 1})]:hidden`;
    });
    const buttonGroupClasses = computed(() => {
      return [
        baseClasses.value,
        spacingClasses.value,
        dividerClasses.value,
        responsiveClasses.value,
        countClasses.value,
        maxButtonsClasses.value
      ].filter(Boolean).join(" ");
    });
    const buttonGroupStyles = computed(() => {
      const styles = {};
      if (props.maxButtons > 0) {
        styles["--max-buttons"] = props.maxButtons.toString();
      }
      return styles;
    });
    __expose({
      // 获取按钮数量
      getButtonCount: () => {
        return document.querySelectorAll(".btn-group .btn").length;
      },
      // 检查是否超过最大按钮数量
      isOverMaxButtons: () => {
        if (props.maxButtons <= 0) return false;
        return document.querySelectorAll(".btn-group .btn").length > props.maxButtons;
      },
      // 获取按钮组配置
      getConfig: () => {
        return {
          direction: props.direction,
          size: props.size,
          color: props.color,
          variant: props.variant,
          shape: props.shape,
          spacing: props.spacing,
          disabled: props.disabled,
          readonly: props.readonly,
          maxButtons: props.maxButtons,
          showDivider: props.showDivider,
          collapsible: props.collapsible,
          showCount: props.showCount
        };
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(buttonGroupClasses.value),
        style: normalizeStyle(buttonGroupStyles.value)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});
const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-103ddf75"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  props: {
    compact: {
      // Menu compact if set true or responsive
      type: [Boolean, String],
      default: false,
      required: false,
      validator: (value) => {
        return ["sm", "md", "lg", "xl", true, false].includes(value);
      }
    },
    horizontal: {
      // Menu horizontal if set true or responsive
      type: [Boolean, String],
      default: false,
      required: false,
      validator: (value) => {
        return ["sm", "md", "lg", "xl", true, false].includes(value);
      }
    },
    shadow: { type: Boolean, default: false, required: false },
    rounded: { type: Boolean, default: false, required: false },
    // Menu with rounded borders
    padding: { type: Boolean, default: false, required: false },
    // Menu with padding and list with rounded border
    hoverBorder: { type: Boolean, default: false, required: false }
    // List with left border colored on hover
  },
  setup(__props) {
    const props = __props;
    const baseClasses = computed(() => {
      return [
        "w-auto select-none list-none p-0 m-0",
        "flex flex-col",
        props.shadow ? "shadow-md" : "",
        props.padding ? "p-2" : "",
        props.rounded ? "rounded-$rounded-btn" : "",
        props.hoverBorder ? "hover-border" : ""
      ].filter(Boolean).join(" ");
    });
    const compactClasses = computed(() => {
      if (!props.compact) return "";
      if (props.compact === true) {
        return "compact";
      }
      return `compact-${props.compact}`;
    });
    const horizontalClasses = computed(() => {
      if (!props.horizontal) return "";
      if (props.horizontal === true) {
        return "horizontal";
      }
      return `horizontal-${props.horizontal}`;
    });
    const menuClasses = computed(() => {
      return [
        "menu bg-base-200",
        baseClasses.value,
        compactClasses.value,
        horizontalClasses.value
      ].filter(Boolean).join(" ");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass(menuClasses.value)
      }, [
        _ctx.$slots.default ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.$slots.default(), (slot, key) => {
          return openBlock(), createElementBlock("li", {
            key,
            class: "menu-item list-none p-0 m-0"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(slot)))
          ]);
        }), 128)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-7560be56"]]);
function useClickOutside(target, callback) {
  if (!target)
    return;
  const shouldListen = ref(true);
  let fallback;
  const listener = ((event) => {
    window.clearTimeout(fallback);
    if (event.target === target.value || event.composedPath().includes(target.value) || !shouldListen.value)
      return;
    callback(event);
  });
  const pointerDownListener = ((event) => {
    shouldListen.value = !!target.value && !event.composedPath().includes(target.value);
  });
  const pointerUpListener = ((event) => {
    fallback = window.setTimeout(() => listener(event), 50);
  });
  const useEventListener = (action, options = {}) => {
    window[`${action}EventListener`]("click", listener, options);
    window[`${action}EventListener`]("pointerdown", pointerDownListener, options);
    window[`${action}EventListener`]("pointerup", pointerUpListener, options);
  };
  onMounted(() => {
    useEventListener("add", { passive: true });
  });
  onBeforeUnmount(() => {
    useEventListener("remove");
  });
  return { listener };
}
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "Dropdown",
  props: {
    placement: {
      type: String,
      default: "bottom-start",
      required: false,
      validator: (value) => {
        return ["bottom", "bottom-start", "bottom-end", "top-start", "top-end"].includes(value);
      }
    },
    hover: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const props = __props;
    const dropdownRef = ref(null);
    const isActive = ref(false);
    const baseClasses = computed(() => {
      return "relative flex inline-block";
    });
    const menuClasses = computed(() => {
      return [
        "absolute block z-50 p-1 mt-1",
        // 位置样式
        props.placement === "bottom" ? "left-1/2 transform -translate-x-1/2 top-full" : "",
        props.placement === "bottom-start" ? "left-0 top-full" : "",
        props.placement === "bottom-end" ? "right-0 top-full" : "",
        props.placement === "top-start" ? "bottom-full left-0" : "",
        props.placement === "top-end" ? "bottom-full right-0" : ""
      ].filter(Boolean).join(" ");
    });
    const transitionClasses = computed(() => {
      return {
        "enter-active-class": "transition-all duration-150 ease-out",
        "enter-from-class": "scale-95 opacity-0",
        "enter-to-class": "scale-100 opacity-100",
        "leave-active-class": "transition-all duration-75 ease-in",
        "leave-from-class": "scale-100 opacity-100",
        "leave-to-class": "scale-100 opacity-100"
      };
    });
    const toggle = () => {
      if (!props.hover)
        isActive.value = !isActive.value;
    };
    const mouseEnter = () => {
      if (props.hover)
        isActive.value = true;
    };
    function mouseLeave() {
      if (props.hover)
        isActive.value = false;
    }
    useClickOutside(dropdownRef, () => {
      if (isActive.value)
        isActive.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "dropdownRef",
        ref: dropdownRef,
        class: normalizeClass(baseClasses.value),
        onMouseenter: mouseEnter,
        onMouseleave: mouseLeave,
        onPointerenter: mouseEnter
      }, [
        createElementVNode("div", {
          class: "dropdown-trigger",
          onClick: toggle
        }, [
          renderSlot(_ctx.$slots, "trigger", { active: isActive.value })
        ]),
        createVNode(Transition$1, {
          "enter-active-class": transitionClasses.value["enter-active-class"],
          "enter-from-class": transitionClasses.value["enter-from-class"],
          "enter-to-class": transitionClasses.value["enter-to-class"],
          "leave-active-class": transitionClasses.value["leave-active-class"],
          "leave-from-class": transitionClasses.value["leave-from-class"],
          "leave-to-class": transitionClasses.value["leave-to-class"]
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: normalizeClass(menuClasses.value)
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2), [
              [vShow, isActive.value]
            ])
          ]),
          _: 3
        }, 8, ["enter-active-class", "enter-from-class", "enter-to-class", "leave-active-class", "leave-from-class", "leave-to-class"])
      ], 34);
    };
  }
});
const _hoisted_1$p = { class: "font-semibold text-xl" };
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    active: { type: Boolean, required: true },
    backdrop: { type: Boolean, default: true, required: false },
    // show backdrop
    outside: { type: Boolean, default: true, required: false },
    // click outside to close
    closeBtn: { type: Boolean, default: false, required: false },
    // btn for close modal
    rounded: { type: Boolean, default: false, required: false },
    width: { type: String, default: "w-200", required: false },
    height: { type: String, default: "h-150", required: false },
    size: {
      type: String,
      required: false,
      validator: (value) => {
        return ["sm", "md", "lg"].includes(value);
      }
    }
  },
  emits: ["update:active", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modalClasses = computed(() => {
      const baseClasses = [
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "transform z-25 bg-base-100 flex flex-col justify-between",
        "max-h-4/5 max-w-4/5"
      ];
      if (props.rounded) {
        baseClasses.push("rounded-$rounded-btn");
      }
      if (props.width === "w-200" || props.height === "h-150") {
        const sizeMap = {
          sm: "w-1/4 h-1/5",
          md: "w-1/3 h-1/4",
          lg: "w-1/2 h-1/3"
        };
        const sizeClass = sizeMap[props.size];
        if (sizeClass) {
          baseClasses.push(sizeClass);
        }
      } else {
        baseClasses.push(props.height, props.width);
      }
      return baseClasses.join(" ");
    });
    const headerClasses = computed(() => {
      const baseClasses = [
        "flex flex-row justify-between pl-3 pr-5 border-1 py-3"
      ];
      if (props.rounded) {
        baseClasses.push("rounded-t-$rounded-btn");
      }
      return baseClasses.join(" ");
    });
    const bodyClasses = computed(() => {
      return "p-1 overflow-y-auto";
    });
    const footerClasses = computed(() => {
      return "flex justify-end px-3 pb-3 mt-1.5 space-x-3 items-center align-middle";
    });
    const dismiss = () => {
      emits("update:active", false);
    };
    const clickOutside = () => {
      if (props.outside)
        emits("update:active", false);
    };
    return (_ctx, _cache) => {
      const _component_bkd = resolveComponent("bkd");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_tst = resolveComponent("tst");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_bkd, {
          show: __props.active,
          blur: "",
          onClick: clickOutside
        }, null, 8, ["show"]),
        createVNode(_component_tst, { name: "bloom" }, {
          default: withCtx(() => [
            __props.active ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(modalClasses.value)
            }, [
              createElementVNode("div", {
                class: normalizeClass(headerClasses.value)
              }, [
                withDirectives(createElementVNode("h2", _hoisted_1$p, [
                  renderSlot(_ctx.$slots, "header", {}, void 0, true)
                ], 512), [
                  [vShow, _ctx.$slots.header]
                ]),
                withDirectives(createVNode(_component_btn, {
                  item: "",
                  onClick: dismiss,
                  class: "hover:text-primary"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "xmark",
                      regular: "",
                      xl: ""
                    })
                  ]),
                  _: 1
                }, 512), [
                  [vShow, __props.closeBtn]
                ])
              ], 2),
              withDirectives(createElementVNode("div", {
                class: normalizeClass(bodyClasses.value)
              }, [
                renderSlot(_ctx.$slots, "body", {}, void 0, true)
              ], 2), [
                [vShow, _ctx.$slots.body]
              ]),
              withDirectives(createElementVNode("div", {
                class: normalizeClass(footerClasses.value)
              }, [
                renderSlot(_ctx.$slots, "footer", { dismiss }, void 0, true)
              ], 2), [
                [vShow, _ctx.$slots.footer]
              ])
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 3
        })
      ], 64);
    };
  }
});
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-e0bdb0a9"]]);
const _hoisted_1$o = { class: "text-base-content font-medium text-lg" };
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "Drawer",
  props: {
    isShow: { type: Boolean, default: false, required: false },
    title: { type: String, default: "Title", required: false },
    width: { type: String, default: "w-32", required: false },
    height: { type: String, required: false },
    overflow: { type: Boolean, default: false, required: false },
    backdrop: { type: Boolean, default: true, required: false },
    position: {
      type: String,
      default: "right",
      validator: (value) => ["top", "right", "bottom", "left"].includes(value)
    }
  },
  emits: ["update:isShow"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isShow = computed({
      get: () => props.isShow,
      set: (value) => emit("update:isShow", value)
    });
    const emit = __emit;
    const animationName = computed(() => {
      const animationMap = {
        top: "downward",
        right: "leftward",
        bottom: "upward",
        left: "rightward"
      };
      return animationMap[props.position] || "leftward";
    });
    const positionClasses = computed(() => {
      const positionMap = {
        top: "top-0 left-0 right-0 h-screen",
        right: "top-0 right-14 h-screen",
        bottom: "bottom-0 left-0 right-0 h-screen",
        left: "top-0 left-14 h-screen"
      };
      return positionMap[props.position] || "top-0 right-14 h-screen";
    });
    const sizeClasses = computed(() => {
      if (props.position === "top" || props.position === "bottom") {
        return props.height || "h-96";
      } else {
        return props.width;
      }
    });
    const borderClass = computed(() => {
      const borderMap = {
        top: "border-b",
        right: "border-l",
        bottom: "border-t",
        left: "border-r"
      };
      return borderMap[props.position] || "border-l";
    });
    const closeDrawer = () => {
      emit("update:isShow", false);
    };
    return (_ctx, _cache) => {
      const _component_bkd = resolveComponent("bkd");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_tst = resolveComponent("tst");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_bkd, {
          show: isShow.value && __props.backdrop,
          onClick: closeDrawer,
          blur: ""
        }, null, 8, ["show"]),
        createVNode(_component_tst, { name: animationName.value }, {
          default: withCtx(() => [
            isShow.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["fixed z-15 flex-none bg-base-200", [positionClasses.value, sizeClasses.value]])
            }, [
              createElementVNode("div", {
                class: normalizeClass(["flex items-center justify-between bg-base-100 px-2 border-b h-10", borderClass.value])
              }, [
                createElementVNode("span", _hoisted_1$o, toDisplayString$1(__props.title), 1),
                createVNode(_component_btn, {
                  item: "",
                  class: "hover:text-primary",
                  onClick: closeDrawer
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "xmark",
                      regular: "",
                      xl: ""
                    })
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("div", {
                class: normalizeClass([__props.height, __props.overflow ? "overflow-y-auto" : ""])
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name"])
      ], 64);
    };
  }
});
const _hoisted_1$n = ["value"];
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "EditInput",
  props: {
    value: { type: String, default: "" },
    setValue: { type: Function, default: () => {
    } }
  },
  setup(__props) {
    const props = __props;
    const inputValue = ref(props.value);
    const onInput = (e) => {
      inputValue.value = e.target.value.trim();
    };
    const onClick = (e) => {
      e.stopPropagation();
    };
    const onBlur = (e) => {
      props.setValue(inputValue.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("input", {
        type: "text",
        value: __props.value,
        onInput,
        onBlur,
        onClick,
        class: "absolute top-0 left-0 w-full h-full box-border border-1 text-center outline-none bg-base-300 shadow shadow-md"
      }, null, 40, _hoisted_1$n);
    };
  }
});
const _hoisted_1$m = ["onClick"];
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "Table",
  props: {
    data: { type: Object, default: { tableHead: [], tableBody: [] }, required: true },
    quantity: { type: Number, default: 0, required: false }
  },
  setup(__props) {
    let editInputApp = null;
    const state = reactive({ key: "", value: "", index: -1, text: "" });
    const props = __props;
    const containerClasses = computed(() => {
      return "px-3 pt-2 h-screen";
    });
    const headerTableClasses = computed(() => {
      return "w-full m-0 text-center table-fixed fixed-thead z-10";
    });
    const headerRowClasses = computed(() => {
      return "bg-base-200 border-b-1 h-12 shadow shadow-lg !w-10";
    });
    const headerCellClasses = computed(() => {
      return (key) => {
        return [
          "font-medium text-base-content",
          checkWidth(key)
        ].filter(Boolean).join(" ");
      };
    });
    const moreHeaderCellClasses = computed(() => {
      return "font-medium text-base-content w-15";
    });
    const bodyContainerClasses = computed(() => {
      return "overflow-y-auto w-full h-8/9 scrollbar-hide";
    });
    const bodyTableClasses = computed(() => {
      return "w-full m-0 table-fixed";
    });
    const bodyRowClasses = computed(() => {
      return "bg-base-100 h-8 hover:bg-base-200";
    });
    const bodyCellClasses = computed(() => {
      return (key) => {
        return [
          "relative border-1 hover:bg-base-300 font-thin text-current text-base whitespace-nowrap p-4 align-middle",
          checkTruncate(key),
          checkAlign(key),
          checkWidth(key)
        ].filter(Boolean).join(" ");
      };
    });
    const moreBodyCellClasses = computed(() => {
      return "text-center w-15 !h-5 border-1";
    });
    const footerTableClasses = computed(() => {
      return "w-full text-center table-fixed";
    });
    const footerRowClasses = computed(() => {
      return "bg-base-200 border-b-1 h-10";
    });
    function showEditInput(event, key, index) {
      editInputApp && removeEditInputApp();
      if (!checkEditable(key)) return;
      const target = event.target;
      editInputApp = createApp(_sfc_main$C, {
        value: target.textContent,
        setValue
      });
      if (editInputApp) {
        editInputApp.mount(target);
        target.querySelector("input").select();
      }
      setData({ index, key, text: findText(key) });
    }
    function setData({ index, key, value = "", text }) {
      state.key = key;
      state.index = index;
      state.value = value;
      state.text = text;
    }
    function findText(key) {
      const { text } = props.data.tableHead.value.find((item) => item.key === key);
      return text;
    }
    function setValue(value) {
      state.value = value;
      editData({ ...state }, removeEditInputApp);
    }
    function removeEditInputApp() {
      editInputApp && editInputApp.unmount();
      setData({
        index: -1,
        key: "",
        value: "",
        text: ""
      });
    }
    function checkEditable(key) {
      const editable = props.data.tableHead.find((item) => item.key === key);
      return editable;
    }
    window.addEventListener("click", removeEditInputApp, false);
    function checkTruncate(key) {
      const arr = JSON.parse(JSON.stringify(props.data.tableHead));
      const truncate = arr.find((item) => item.key === key);
      return truncate.truncate ? "truncate" : "";
    }
    function checkAlign(key) {
      const arr = JSON.parse(JSON.stringify(props.data.tableHead));
      const align = arr.find((item) => item.key === key);
      return "text-" + align.align;
    }
    function checkWidth(key) {
      const arr = JSON.parse(JSON.stringify(props.data.tableHead));
      const width = arr.find((item) => item.key === key);
      return "px-2 " + width.width;
    }
    const editData = ({ index, key, value, text }, removeInput) => {
      removeInput();
      if (props.data.tableBody[index][key] != value) {
        const cfm = window.confirm(`
    您确定将数据下表第${index}项${text}字段的内容修改为${value}吗？`);
        if (cfm) {
          props.data.tableBody = props.data.tableBody.map((item, idx) => {
            index === idx && (item[key] = value);
            return item;
          });
        } else {
          removeInput();
        }
      }
    };
    const print = (key) => {
      props.data.tableHead[key].align;
    };
    return (_ctx, _cache) => {
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        createElementVNode("table", {
          class: normalizeClass(headerTableClasses.value)
        }, [
          createElementVNode("thead", null, [
            createElementVNode("tr", {
              class: normalizeClass(headerRowClasses.value)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.data.tableHead, (info) => {
                return openBlock(), createElementBlock("th", {
                  key: info.key,
                  class: normalizeClass(headerCellClasses.value(info.key))
                }, toDisplayString$1(info.text), 3);
              }), 128)),
              createElementVNode("th", {
                class: normalizeClass(moreHeaderCellClasses.value)
              }, "More", 2)
            ], 2)
          ])
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(bodyContainerClasses.value)
        }, [
          createElementVNode("table", {
            class: normalizeClass(bodyTableClasses.value)
          }, [
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.data.tableBody, (item, index) => {
                return openBlock(), createElementBlock("tr", {
                  key: item.id,
                  class: normalizeClass(bodyRowClasses.value)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item, (value, key) => {
                    return openBlock(), createElementBlock("td", {
                      key,
                      onClick: [
                        withModifiers(($event) => showEditInput($event, key, index), ["stop"]),
                        ($event) => print(key)
                      ],
                      class: normalizeClass(bodyCellClasses.value(key))
                    }, toDisplayString$1(value), 11, _hoisted_1$m);
                  }), 128)),
                  createElementVNode("td", {
                    class: normalizeClass(moreBodyCellClasses.value)
                  }, [
                    createVNode(_component_btn, {
                      variant: "link",
                      class: "h-5"
                    }, {
                      default: withCtx(() => [..._cache[0] || (_cache[0] = [
                        createTextVNode("More", -1)
                      ])]),
                      _: 1
                    })
                  ], 2)
                ], 2);
              }), 128))
            ])
          ], 2)
        ], 2),
        createElementVNode("table", {
          class: normalizeClass(footerTableClasses.value)
        }, [
          createElementVNode("tfoot", null, [
            createElementVNode("tr", {
              class: normalizeClass(footerRowClasses.value)
            }, [
              createElementVNode("td", null, "Quantity: " + toDisplayString$1(__props.quantity), 1)
            ], 2)
          ])
        ], 2)
      ], 2);
    };
  }
});
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-ee53b1b3"]]);
const _sfc_main$A = {};
const _hoisted_1$l = { class: "p-3 w-full" };
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$1]]);
const _hoisted_1$k = { class: "flex flex-row items-center" };
const _hoisted_2$8 = {
  key: 0,
  class: "w-15"
};
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "FormItem",
  props: {
    isShow: { type: Boolean, default: false },
    label: { type: String, default: "" },
    icon: { type: String, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        __props.label ? (openBlock(), createElementBlock("label", _hoisted_2$8, toDisplayString$1(__props.label), 1)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    direction: {},
    options: {},
    placeholder: {},
    fieldLabel: {},
    fieldValue: {},
    label: {},
    labelWidth: {},
    disabled: { type: Boolean },
    size: {},
    selected: {}
  },
  emits: ["select", "selectIndex"],
  setup(__props, { emit: __emit }) {
    const selectRef = ref(null);
    const props = __props;
    const containerClasses = computed(() => {
      if (!props.label) return "";
      return props.direction === "col" ? "flex flex-col" : "flex flex-row justify-between items-center";
    });
    const labelClasses = computed(() => {
      return [
        "select-none py-2",
        props.label ? props.labelWidth : ""
      ].filter(Boolean).join(" ");
    });
    const labelTextClasses = computed(() => {
      const sizeMap = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      };
      return sizeMap[props.size] || "text-base";
    });
    const selectContainerClasses = computed(() => {
      return "relative";
    });
    const arrowContainerClasses = computed(() => {
      return "absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50 pointer-events-none";
    });
    const tstClasses = computed(() => {
      return "absolute z-99 top-8 w-full";
    });
    const menuClasses = computed(() => {
      const baseClasses = [];
      if (hAuto.value) {
        baseClasses.push("h-64 overflow-y-auto");
      } else {
        baseClasses.push("h-auto");
      }
      return baseClasses.join(" ");
    });
    const hAuto = ref(false);
    const placedisabled = ref("");
    onMounted(() => {
      if (props.disabled) {
        placedisabled.value = "";
      } else {
        placedisabled.value = props.placeholder || "Please Select";
      }
      if (props.selected) {
        selectValue.value = props.selected;
      }
    });
    const emit = __emit;
    const positionShow = ref(false);
    const toggleShow = () => {
      positionShow.value = true;
      if (props.options.length > 10) {
        hAuto.value = true;
      }
    };
    const selectValue = ref("");
    watch(() => props.selected, async () => {
      if (props.selected) {
        selectValue.value = props.selected;
      }
    });
    const selectData = (item, index) => {
      selectValue.value = item[props.fieldLabel || "label"];
      positionShow.value = !positionShow.value;
      emit("select", item[props.fieldValue || "value"]);
      emit("selectIndex", index);
    };
    useClickOutside(selectRef, () => {
      if (positionShow.value)
        positionShow.value = false;
    });
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Menu = resolveComponent("Menu");
      const _component_tst = resolveComponent("tst");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value),
        ref_key: "selectRef",
        ref: selectRef
      }, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(labelClasses.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass(labelTextClasses.value)
          }, toDisplayString$1(__props.label), 3)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(selectContainerClasses.value)
        }, [
          createVNode(_component_ipt, {
            type: "text",
            readonly: "",
            modelValue: selectValue.value,
            placeholder: placedisabled.value,
            disabled: __props.disabled,
            onClick: toggleShow
          }, null, 8, ["modelValue", "placeholder", "disabled"]),
          withDirectives(createElementVNode("div", {
            class: normalizeClass(arrowContainerClasses.value)
          }, [
            withDirectives(createElementVNode("span", null, [
              createVNode(_component_icn, {
                name: "angle-down",
                light: "",
                xl: ""
              })
            ], 512), [
              [vShow, !positionShow.value]
            ]),
            withDirectives(createElementVNode("span", null, [
              createVNode(_component_icn, {
                name: "angle-up",
                light: "",
                xl: ""
              })
            ], 512), [
              [vShow, positionShow.value]
            ])
          ], 2), [
            [vShow, !__props.disabled]
          ]),
          positionShow.value && !__props.disabled ? (openBlock(), createBlock(_component_tst, {
            key: 0,
            name: "downward",
            class: normalizeClass(tstClasses.value)
          }, {
            default: withCtx(() => [
              createVNode(_component_Menu, {
                compact: "",
                shadow: "",
                class: normalizeClass(menuClasses.value),
                style: { "width": "100%", "min-width": "0", "max-width": "100%" }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index) => {
                    return openBlock(), createBlock(_component_btn, {
                      clean: "",
                      key: index,
                      onClick: ($event) => selectData(item, index)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString$1(item[__props.fieldLabel || "label"]), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});
/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const hasWarned = {};
function warnOnce(msg) {
  if (!hasWarned[msg]) {
    hasWarned[msg] = true;
    warn(msg);
  }
}
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
if (process.env.NODE_ENV !== "production") {
  const perf2 = inBrowser && window.performance;
  if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && // @ts-ignore browser compat
  perf2.clearMeasures) {
    mark = (tag) => {
      perf2.mark(tag);
    };
    measure = (name, startTag, endTag) => {
      perf2.measure(name, startTag, endTag);
      perf2.clearMarks(startTag);
      perf2.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject$1(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber$1 = (val) => typeof val === "number" && isFinite(val);
const isDate$1 = (val) => toTypeString(val) === "[object Date]";
const isRegExp$1 = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject$1 = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
const assign = Object.assign;
const _create = Object.create;
const create = (obj = null) => _create(obj);
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create());
};
function escapeHtml(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    if (process.env.NODE_ENV !== "production") {
      warn("Potentially dangerous event handlers detected in translation. Consider removing onclick, onerror, etc. from your translation messages.");
    }
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern) => {
    html = html.replace(pattern, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isArray$1 = Array.isArray;
const isFunction$2 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean$1 = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$2(val.then) && isFunction$2(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray$1(val) || isPlainObject$1(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isObject$1(src2[key]) && !isObject$1(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : create();
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16
};
const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
const errorMessages$2 = {
  // tokenizer error messages
  [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
  [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
  [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
  [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
  [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
  // parser error messages
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
  [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
  // generator error messages
  [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
  // minimizer error messages
  [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = process.env.NODE_ENV !== "production" ? format$1((messages || errorMessages$2)[code] || "", ...args || []) : code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
const detectHtmlTag = (source) => RE_HTML_TAG.test(source);
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 13,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 13,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    13
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 7) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 7 || currentType === 11)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "") => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return hasSpace;
      } else if (ch === "@" || !ch) {
        return hasSpace;
      } else if (ch === "|") {
        return !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    const currentChar = scnr.currentChar();
    if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
      const invalidPart = readInvalidIdentifier(scnr);
      emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart);
      return name + invalidPart;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 4, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 6, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 12, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 11, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 10, readLinkedRefer(scnr));
          }
        }
        if (currentType === 7) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        13
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    // eslint-disable-next-line no-useless-escape
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 11) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 8) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 9) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 10:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 4:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 7: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 13 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 13);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 13) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 13) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 13) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
const ERROR_DOMAIN$1 = "minifier";
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
    default:
      if (process.env.NODE_ENV !== "production") {
        throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
          domain: ERROR_DOMAIN$1,
          args: [node.type]
        });
      }
  }
  delete node.type;
}
const ERROR_DOMAIN = "parser";
function createCodeGenerator(ast, options) {
  const { filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
    default:
      if (process.env.NODE_ENV !== "production") {
        throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
          domain: ERROR_DOMAIN,
          args: [node.type]
        });
      }
  }
}
const generate = (ast, options = {}) => {
  const mode = isString$1(options.mode) ? options.mode : "normal";
  const filename = isString$1(options.filename) ? options.filename : "message.intl";
  !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    filename,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags$1() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
function isMessageAST(val) {
  return isObject$1(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (hasOwn(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type) {
  return new Error(`unhandled node type: ${type}`);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type = resolveType(body);
  if (type === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = resolveType(node);
  switch (type) {
    case 3: {
      return resolveValue$1(node, type);
    }
    case 9: {
      return resolveValue$1(node, type);
    }
    case 4: {
      const named = node;
      if (hasOwn(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type);
    }
    case 5: {
      const list = node;
      if (hasOwn(list, "i") && isNumber$1(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber$1(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type);
    }
    case 8: {
      return resolveValue$1(node, type);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type}`);
  }
}
const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
function checkHtmlMessage(source, warnHtmlMessage) {
  if (warnHtmlMessage && detectHtmlTag(source)) {
    warn(format$1(WARN_MESSAGE, { source }));
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = create();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
    const warnHtmlMessage = isBoolean$1(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    process.env.NODE_ENV !== "production" && checkHtmlMessage(message, warnHtmlMessage);
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: process.env.NODE_ENV !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    if (process.env.NODE_ENV !== "production" && !isMessageAST(message)) {
      warn(`the message that is resolve with key '${context.key}' is not supported for jit compilation`);
      return (() => message);
    }
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version, meta) {
  devtools && devtools.emit("i18n:init", {
    timestamp: Date.now(),
    i18n,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages$1 } : void 0);
}
const errorMessages$1 = {
  [CoreErrorCodes.INVALID_ARGUMENT]: "Invalid arguments",
  [CoreErrorCodes.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString$1(locale)) {
    return locale;
  } else {
    if (isFunction$2(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray$1(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray$1(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults2 = isArray$1(fallback) || !isPlainObject$1(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults2) ? [defaults2] : defaults2;
    if (isArray$1(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean$1(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray$1(blocks) || isPlainObject$1(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return ch;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const key = hit[i];
    if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
      return null;
    }
    const val = last[key];
    if (val === void 0) {
      return null;
    }
    if (isFunction$2(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7
};
const CORE_WARN_CODES_EXTEND_POINT = 8;
const warnMessages$1 = {
  [CoreWarnCodes.NOT_FOUND_KEY]: `Not found '{key}' key in '{locale}' locale messages.`,
  [CoreWarnCodes.FALLBACK_TO_TRANSLATE]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.CANNOT_FORMAT_NUMBER]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.CANNOT_FORMAT_DATE]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [CoreWarnCodes.FALLBACK_TO_DATE_FORMAT]: `Fall back to datetime format '{key}' key with '{target}' locale.`,
  [CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: `This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.`
};
function getWarnMessage$1(code, ...args) {
  return format$1(warnMessages$1[code], ...args);
}
const VERSION$3 = "11.1.12";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction$2(options.onWarn) ? options.onWarn : warn;
  const version = isString$1(options.version) ? options.version : VERSION$3;
  const locale = isString$1(options.locale) || isFunction$2(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction$2(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject$1(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction$2(options.missing) ? options.missing : null;
  const missingWarn = isBoolean$1(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean$1(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction$2(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject$1(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction$2(options.messageCompiler) ? options.messageCompiler : _compiler;
  if (process.env.NODE_ENV !== "production" && true && true && isFunction$2(options.messageCompiler)) {
    warnOnce(getWarnMessage$1(CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  }
  const messageResolver = isFunction$2(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction$2(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  if (process.env.NODE_ENV !== "production") {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create() });
function isTranslateFallbackWarn(fallback, key) {
  return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
  return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (process.env.NODE_ENV !== "production") {
    const emitter = context.__v_emitter;
    if (emitter) {
      emitter.emit("missing", {
        locale,
        key,
        type,
        groupId: `${type}:${key}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    if (process.env.NODE_ENV !== "production" && isTranslateMissingWarn(missingWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.NOT_FOUND_KEY, { key, locale }));
    }
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i = index + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  if (process.env.NODE_ENV !== "production" && !Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_DATE));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_DATE_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject$1(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject$1(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  let value;
  if (isString$1(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate$1(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber$1(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject$1(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject$1(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject$1(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  if (process.env.NODE_ENV !== "production" && !Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_NUMBER));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject$1(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject$1(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  if (!isNumber$1(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject$1(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject$1(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject$1(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber$1(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber$1(options.named.count) || isNumber$1(options.named.n)) ? isNumber$1(options.named.count) ? options.named.count : isNumber$1(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$2(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$2(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create();
  isNumber$1(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction$2(options.messages) ? options.messages(key, !!useLinked) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject$1(options.processor) && isFunction$2(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject$1(options.processor) && isFunction$2(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject$1(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key, true)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray$1(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign(create(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction$2(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean$1(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean$1(options.default) ? !isBoolean$1(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString$1(defaultMsgOrKey) || isFunction$2(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || create()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  if (process.env.NODE_ENV !== "production" && isString$1(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
    return key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (escapeParameter && isString$1(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray$1(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = create();
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale && !isAlmostSameLocale(locale, targetLocale) && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_TRANSLATE, {
        key,
        target: targetLocale
      }));
    }
    if (process.env.NODE_ENV !== "production" && locale !== targetLocale) {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    message = messages[targetLocale] || create();
    let start = null;
    let startTag;
    let endTag;
    if (process.env.NODE_ENV !== "production" && inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (process.env.NODE_ENV !== "production" && inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start && format2) {
        emitter.emit("message-resolve", {
          type: "message-resolve",
          key,
          message: format2,
          time: end - start,
          groupId: `${type}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = (() => format2);
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (process.env.NODE_ENV !== "production" && inBrowser) {
    const end = window.performance.now();
    const emitter = context.__v_emitter;
    if (emitter && start) {
      emitter.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create();
  if (!isString$1(arg1) && !isNumber$1(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber$1(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber$1(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject$1(arg2) && !isEmptyObject$1(arg2)) {
    options.named = arg2;
  } else if (isArray$1(arg2)) {
    options.list = arg2;
  }
  if (isNumber$1(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject$1(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      if (process.env.NODE_ENV !== "production") {
        const _source = getSourceForCodeFrame(source);
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && _source && generateCodeFrame(_source, err.location.start.offset, err.location.end.offset);
        const emitter = context.__v_emitter;
        if (emitter && _source) {
          emitter.emit("compile-error", {
            message: _source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      } else {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getSourceForCodeFrame(source) {
  if (isString$1(source)) {
    return source;
  } else {
    if (source.loc && source.loc.source) {
      return source.loc.source;
    }
  }
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key, useLinked) => {
    let val = resolveValue2(message, key);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber$1(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
{
  initFeatureFlags$1();
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = globalThis.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) {
      setupFn(proxy.proxiedTarget);
    }
  }
}
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION$2 = "11.1.12";
function initFeatureFlags() {
  if (typeof __VUE_I18N_FULL_INSTALL__ !== "boolean") {
    getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true;
  }
  if (typeof __VUE_I18N_LEGACY_API__ !== "boolean") {
    getGlobalThis().__VUE_I18N_LEGACY_API__ = true;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function createI18nError(code, ...args) {
  return createCompileError(code, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages, args } : void 0);
}
const errorMessages = {
  [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [I18nErrorCodes.INVALID_ARGUMENT]: "Invalid argument",
  [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [I18nErrorCodes.NOT_INSTALLED]: "Need to install with `app.use` function",
  [I18nErrorCodes.UNEXPECTED_ERROR]: "Unexpected error",
  [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
  [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
  [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
  [I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
};
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
const I18nWarnCodes = {
  FALLBACK_TO_ROOT: CORE_WARN_CODES_EXTEND_POINT,
  // 8
  NOT_FOUND_PARENT_SCOPE: 9,
  IGNORE_OBJ_FLATTEN: 10,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_LEGACY_MODE: 11,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 12,
  // duplicate `useI18n` calling
  DUPLICATE_USE_I18N_CALLING: 13
};
const warnMessages = {
  [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
  [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`,
  [I18nWarnCodes.IGNORE_OBJ_FLATTEN]: `Ignore object flatten: '{key}' key has an string value`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [I18nWarnCodes.DEPRECATE_LEGACY_MODE]: `Legacy API mode has been deprecated in v11. Use Composition API mode instead.
About how to use the Composition API mode, see https://vue-i18n.intlify.dev/guide/advanced/composition.html`,
  /**
   * @deprecated will be removed at vue-i18n v12
   */
  [I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE]: `'v-t' has been deprecated in v11. Use translate APIs ('t' or '$t') instead.`,
  [I18nWarnCodes.DUPLICATE_USE_I18N_CALLING]: "Duplicate `useI18n` calling by local scope. Please don't call it on local scope, due to it does not work properly in component."
};
function getWarnMessage(code, ...args) {
  return format$1(warnMessages[code], ...args);
}
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          process.env.NODE_ENV !== "production" && warn(getWarnMessage(I18nWarnCodes.IGNORE_OBJ_FLATTEN, {
            key: subKeys[i]
          }));
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject$1(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject$1(messages) ? messages : isArray$1(__i18n) ? create() : { [locale]: create() };
  if (isArray$1(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return ((ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  });
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = inBrowser ? ref : shallowRef;
  let _inheritLocale = isBoolean$1(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean$1(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean$1(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction$2(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction$2(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction$2(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION$2,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject$1(_context) ? _context.__numberFormatters : void 0;
    }
    if (process.env.NODE_ENV !== "production") {
      ctxOptions.__v_emitter = isPlainObject$1(_context) ? _context.__v_emitter : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _context.locale = val;
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _context.fallbackLocale = val;
      _fallbackLocale.value = val;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction$2(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !arg.resolvedMessage;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        /* @__PURE__ */ setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) ;
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber$1(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      if (process.env.NODE_ENV !== "production" && __root && isString$1(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
            key,
            type: warnType
          }));
        }
        if (process.env.NODE_ENV !== "production") {
          const { __v_emitter: emitter } = _context;
          if (emitter && _fallbackRoot) {
            emitter.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber$1(val) || isBoolean$1(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray$1(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean$1(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  if (process.env.NODE_ENV !== "production") {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
const VueDevToolsLabels = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n DevTools",
  "vue-i18n-resource-inspector": "Vue I18n DevTools",
  "vue-i18n-timeline": "Vue I18n"
};
const VueDevToolsPlaceholders = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  "vue-i18n-timeline": 16764185
};
let devtoolsApi;
async function enableDevTools(app, i18n) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key) => {
    const v = messages[key];
    if (isFunction$2(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer = i18n.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$2(nodeId, i18n) {
  if (nodeId === "global") {
    return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  } else {
    const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$2(payload.nodeId, i18n);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$2(payload.nodeId, i18n);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray$1(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean$1(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
function convertComposerOptions(options) {
  const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction$2(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean$1(options.silentTranslationWarn) || isRegExp$1(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean$1(options.silentFallbackWarn) || isRegExp$1(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject$1(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction$2(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString$1(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean$1(options.sync) ? options.sync : true;
  let messages = options.messages;
  if (isPlainObject$1(options.sharedMessages)) {
    const sharedMessages = options.sharedMessages;
    const locales = Object.keys(sharedMessages);
    messages = locales.reduce((messages2, locale2) => {
      const message = messages2[locale2] || (messages2[locale2] = {});
      assign(message, sharedMessages[locale2]);
      return messages2;
    }, messages || {});
  }
  const { __i18n, __root, __injectWithOption } = options;
  const datetimeFormats = options.datetimeFormats;
  const numberFormats = options.numberFormats;
  const flatJson = options.flatJson;
  return {
    locale,
    fallbackLocale,
    messages,
    flatJson,
    datetimeFormats,
    numberFormats,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackRoot,
    fallbackFormat,
    modifiers,
    pluralRules: pluralizationRules,
    postTranslation,
    warnHtmlMessage,
    escapeParameter,
    messageResolver: options.messageResolver,
    inheritLocale,
    __i18n,
    __root,
    __injectWithOption
  };
}
function createVueI18n(options = {}) {
  const composer = createComposer(convertComposerOptions(options));
  const { __extender } = options;
  const vueI18n = {
    // id
    id: composer.id,
    // locale
    get locale() {
      return composer.locale.value;
    },
    set locale(val) {
      composer.locale.value = val;
    },
    // fallbackLocale
    get fallbackLocale() {
      return composer.fallbackLocale.value;
    },
    set fallbackLocale(val) {
      composer.fallbackLocale.value = val;
    },
    // messages
    get messages() {
      return composer.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return composer.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return composer.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return composer.availableLocales;
    },
    // missing
    get missing() {
      return composer.getMissingHandler();
    },
    set missing(handler) {
      composer.setMissingHandler(handler);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return isBoolean$1(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
    },
    set silentTranslationWarn(val) {
      composer.missingWarn = isBoolean$1(val) ? !val : val;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return isBoolean$1(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
    },
    set silentFallbackWarn(val) {
      composer.fallbackWarn = isBoolean$1(val) ? !val : val;
    },
    // modifiers
    get modifiers() {
      return composer.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return composer.fallbackFormat;
    },
    set formatFallbackMessages(val) {
      composer.fallbackFormat = val;
    },
    // postTranslation
    get postTranslation() {
      return composer.getPostTranslationHandler();
    },
    set postTranslation(handler) {
      composer.setPostTranslationHandler(handler);
    },
    // sync
    get sync() {
      return composer.inheritLocale;
    },
    set sync(val) {
      composer.inheritLocale = val;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return composer.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(val) {
      composer.warnHtmlMessage = val !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return composer.escapeParameter;
    },
    set escapeParameterHtml(val) {
      composer.escapeParameter = val;
    },
    // pluralizationRules
    get pluralizationRules() {
      return composer.pluralRules || {};
    },
    // for internal
    __composer: composer,
    // t
    t(...args) {
      return Reflect.apply(composer.t, composer, [...args]);
    },
    // rt
    rt(...args) {
      return Reflect.apply(composer.rt, composer, [...args]);
    },
    // te
    te(key, locale) {
      return composer.te(key, locale);
    },
    // tm
    tm(key) {
      return composer.tm(key);
    },
    // getLocaleMessage
    getLocaleMessage(locale) {
      return composer.getLocaleMessage(locale);
    },
    // setLocaleMessage
    setLocaleMessage(locale, message) {
      composer.setLocaleMessage(locale, message);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(locale, message) {
      composer.mergeLocaleMessage(locale, message);
    },
    // d
    d(...args) {
      return Reflect.apply(composer.d, composer, [...args]);
    },
    // getDateTimeFormat
    getDateTimeFormat(locale) {
      return composer.getDateTimeFormat(locale);
    },
    // setDateTimeFormat
    setDateTimeFormat(locale, format2) {
      composer.setDateTimeFormat(locale, format2);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(locale, format2) {
      composer.mergeDateTimeFormat(locale, format2);
    },
    // n
    n(...args) {
      return Reflect.apply(composer.n, composer, [...args]);
    },
    // getNumberFormat
    getNumberFormat(locale) {
      return composer.getNumberFormat(locale);
    },
    // setNumberFormat
    setNumberFormat(locale, format2) {
      composer.setNumberFormat(locale, format2);
    },
    // mergeNumberFormat
    mergeNumberFormat(locale, format2) {
      composer.mergeNumberFormat(locale, format2);
    }
  };
  vueI18n.__extender = __extender;
  if (process.env.NODE_ENV !== "production") {
    vueI18n.__enableEmitter = (emitter) => {
      const __composer = composer;
      __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
    };
    vueI18n.__disableEmitter = () => {
      const __composer = composer;
      __composer[DisableEmitter] && __composer[DisableEmitter]();
    };
  }
  return vueI18n;
}
function defineMixin(vuei18n, composer, i18n) {
  return {
    beforeCreate() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const options = this.$options;
      if (options.i18n) {
        const optionsI18n = options.i18n;
        if (options.__i18n) {
          optionsI18n.__i18n = options.__i18n;
        }
        optionsI18n.__root = composer;
        if (this === this.$root) {
          this.$i18n = mergeToGlobal(vuei18n, optionsI18n);
        } else {
          optionsI18n.__injectWithOption = true;
          optionsI18n.__extender = i18n.__vueI18nExtend;
          this.$i18n = createVueI18n(optionsI18n);
          const _vueI18n = this.$i18n;
          if (_vueI18n.__extender) {
            _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
          }
        }
      } else if (options.__i18n) {
        if (this === this.$root) {
          this.$i18n = mergeToGlobal(vuei18n, options);
        } else {
          this.$i18n = createVueI18n({
            __i18n: options.__i18n,
            __injectWithOption: true,
            __extender: i18n.__vueI18nExtend,
            __root: composer
          });
          const _vueI18n = this.$i18n;
          if (_vueI18n.__extender) {
            _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
          }
        }
      } else {
        this.$i18n = vuei18n;
      }
      if (options.__i18nGlobal) {
        adjustI18nResources(composer, options, options);
      }
      this.$t = (...args) => this.$i18n.t(...args);
      this.$rt = (...args) => this.$i18n.rt(...args);
      this.$te = (key, locale) => this.$i18n.te(key, locale);
      this.$d = (...args) => this.$i18n.d(...args);
      this.$n = (...args) => this.$i18n.n(...args);
      this.$tm = (key) => this.$i18n.tm(key);
      i18n.__setInstance(instance, this.$i18n);
    },
    mounted() {
      if ((process.env.NODE_ENV !== "production" || false) && true && this.$el && this.$i18n) {
        const _vueI18n = this.$i18n;
        this.$el.__VUE_I18N__ = _vueI18n.__composer;
        const emitter = this.__v_emitter = createEmitter();
        _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
        emitter.on("*", addTimelineEvent);
      }
    },
    unmounted() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const _vueI18n = this.$i18n;
      if ((process.env.NODE_ENV !== "production" || false) && true && this.$el && this.$el.__VUE_I18N__) {
        if (this.__v_emitter) {
          this.__v_emitter.off("*", addTimelineEvent);
          delete this.__v_emitter;
        }
        if (this.$i18n) {
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
      }
      delete this.$t;
      delete this.$rt;
      delete this.$te;
      delete this.$d;
      delete this.$n;
      delete this.$tm;
      if (_vueI18n.__disposer) {
        _vueI18n.__disposer();
        delete _vueI18n.__disposer;
        delete _vueI18n.__extender;
      }
      i18n.__deleteInstance(instance);
      delete this.$i18n;
    }
  };
}
function mergeToGlobal(g, options) {
  g.locale = options.locale || g.locale;
  g.fallbackLocale = options.fallbackLocale || g.fallbackLocale;
  g.missing = options.missing || g.missing;
  g.silentTranslationWarn = options.silentTranslationWarn || g.silentFallbackWarn;
  g.silentFallbackWarn = options.silentFallbackWarn || g.silentFallbackWarn;
  g.formatFallbackMessages = options.formatFallbackMessages || g.formatFallbackMessages;
  g.postTranslation = options.postTranslation || g.postTranslation;
  g.warnHtmlInMessage = options.warnHtmlInMessage || g.warnHtmlInMessage;
  g.escapeParameterHtml = options.escapeParameterHtml || g.escapeParameterHtml;
  g.sync = options.sync || g.sync;
  g.__composer[SetPluralRulesSymbol](options.pluralizationRules || g.pluralizationRules);
  const messages = getLocaleMessages(g.locale, {
    messages: options.messages,
    __i18n: options.__i18n
  });
  Object.keys(messages).forEach((locale) => g.mergeLocaleMessage(locale, messages[locale]));
  if (options.datetimeFormats) {
    Object.keys(options.datetimeFormats).forEach((locale) => g.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
  }
  if (options.numberFormats) {
    Object.keys(options.numberFormats).forEach((locale) => g.mergeNumberFormat(locale, options.numberFormats[locale]));
  }
  return g;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber$1(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key[0] !== "_");
      const options = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign(create(), attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray$1(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = create();
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray$1(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign(create(), attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    if (process.env.NODE_ENV !== "production") {
      warnOnce(getWarnMessage(I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE));
    }
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject$1(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber$1(choice)) {
    options.plural = choice;
  }
  if (isNumber$1(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
  const globalInstall = isBoolean$1(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
  const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean$1(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__;
  if (process.env.NODE_ENV !== "production" && __legacyMode) {
    warnOnce(getWarnMessage(I18nWarnCodes.DEPRECATE_LEGACY_MODE));
  }
  const __globalInjection = isBoolean$1(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options, __legacyMode);
  const symbol = /* @__PURE__ */ makeSymbol(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && __legacyMode ? "legacy" : "composition";
    },
    // install plugin
    async install(app, ...options2) {
      if ((process.env.NODE_ENV !== "production" || false) && true) {
        app.__VUE_I18N__ = i18n;
      }
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject$1(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (!__legacyMode && __globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      if (__VUE_I18N_FULL_INSTALL__) {
        apply(app, i18n, ...options2);
      }
      if (__VUE_I18N_LEGACY_API__ && __legacyMode) {
        app.mixin(defineMixin(__global, __global.__composer, i18n));
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
      if ((process.env.NODE_ENV !== "production" || false) && true) {
        const ret = await enableDevTools(app, i18n);
        if (!ret) {
          throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
        }
        const emitter = createEmitter();
        if (__legacyMode) {
          const _vueI18n = __global;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
        } else {
          const _composer = __global;
          _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        }
        emitter.on("*", addTimelineEvent);
      }
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      if (process.env.NODE_ENV !== "production") {
        warn(getWarnMessage(I18nWarnCodes.NOT_FOUND_PARENT_SCOPE));
      }
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  } else {
    if (process.env.NODE_ENV !== "production" && scope === "local") {
      warn(getWarnMessage(I18nWarnCodes.DUPLICATE_USE_I18N_CALLING));
    }
  }
  return composer;
}
function createGlobal(options, legacyMode) {
  const scope = effectScope();
  const obj = __VUE_I18N_LEGACY_API__ && legacyMode ? scope.run(() => createVueI18n(options)) : scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject$1(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      if (__VUE_I18N_LEGACY_API__) {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
          if (useComponent && composer && !composer[InejctWithOptionSymbol]) {
            composer = null;
          }
        }
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter = null;
  onMounted(() => {
    if ((process.env.NODE_ENV !== "production" || false) && true && target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
      emitter.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    const _composer = composer;
    if ((process.env.NODE_ENV !== "production" || false) && true && target.vnode.el && target.vnode.el.__VUE_I18N__) {
      emitter && emitter.off("*", addTimelineEvent);
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.vnode.el.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
    const dispose = _composer[DisposeSymbol];
    if (dispose) {
      dispose();
      delete _composer[DisposeSymbol];
    }
  }, target);
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
{
  initFeatureFlags();
}
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if (process.env.NODE_ENV !== "production") ;
const _hoisted_1$j = {
  key: 0,
  class: "text-error ml-1"
};
const _hoisted_2$7 = ["onClick"];
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "Date",
  props: {
    modelValue: {},
    placeholder: { default: "请选择日期" },
    label: {},
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    direction: { default: "row" },
    labelWidth: { default: "w-32" },
    size: { default: "md" },
    format: { default: "YYYY-MM-DD" },
    minDate: {},
    maxDate: {},
    showToday: { type: Boolean, default: true },
    showNow: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: true },
    color: { default: "primary" },
    variant: { default: "outline" },
    shape: { default: "rounded" },
    range: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false },
    timeFormat: { default: "24h" },
    customClass: { default: "" },
    inputClass: { default: "" },
    panelClass: { default: "" }
  },
  emits: ["update:modelValue", "change", "select", "clear", "focus", "blur"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const dateRef = ref();
    const inputRef = ref();
    const positionShow = ref(false);
    const currentYear = ref((/* @__PURE__ */ new Date()).getFullYear());
    const currentMonth = ref((/* @__PURE__ */ new Date()).getMonth());
    const selectedDate = ref(null);
    const focused = ref(false);
    const displayValue = computed(() => {
      if (!selectedDate.value) return "";
      if (typeof selectedDate.value === "string") {
        return selectedDate.value;
      }
      return formatDate(selectedDate.value, props.format);
    });
    const iconName = computed(() => {
      return props.showTime ? "clock" : "calendar-day";
    });
    const iconSize = computed(() => {
      const sizes = { xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" };
      return sizes[props.size] || "md";
    });
    const buttonSize = computed(() => {
      const sizes = { xs: "xs", sm: "sm", md: "sm", lg: "md", xl: "md" };
      return sizes[props.size] || "sm";
    });
    const buttonColor = computed(() => props.color);
    const dateContainerClasses = computed(() => {
      return [
        "w-full",
        props.direction === "column" ? "flex flex-col space-y-2" : "flex flex-row items-center space-x-4",
        props.customClass
      ].filter(Boolean).join(" ");
    });
    const labelClasses = computed(() => {
      return [
        "select-none py-2",
        props.labelWidth,
        props.required ? "required" : ""
      ].filter(Boolean).join(" ");
    });
    const labelTextClasses = computed(() => {
      const sizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      };
      return [sizes[props.size] || "text-base", "font-medium"].join(" ");
    });
    const datePickerClasses = computed(() => {
      return [
        "w-full relative"
      ].join(" ");
    });
    const inputContainerClasses = computed(() => {
      return [
        "flex flex-row items-center relative w-full cursor-pointer",
        props.disabled ? "opacity-50 cursor-not-allowed" : "",
        props.readonly ? "cursor-default" : ""
      ].filter(Boolean).join(" ");
    });
    const inputClasses = computed(() => {
      const baseClasses = [
        "w-full border-0 outline-none bg-transparent",
        "placeholder-gray-400",
        props.disabled ? "cursor-not-allowed" : "",
        props.readonly ? "cursor-default" : ""
      ];
      const sizeClasses = {
        xs: "h-6 px-2 text-xs min-w-20",
        sm: "h-8 px-3 text-sm min-w-24",
        md: "h-10 px-4 text-base min-w-32",
        lg: "h-12 px-5 text-lg min-w-36",
        xl: "h-14 px-6 text-xl min-w-40"
      };
      const variantClasses = {
        outline: "border border-gray-300 rounded hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary",
        filled: "bg-gray-100 rounded hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary",
        ghost: "border-b border-gray-300 rounded-none hover:border-gray-400 focus:border-primary"
      };
      const shapeClasses = {
        rounded: "rounded",
        square: "rounded-none",
        circle: "rounded-full"
      };
      return [
        ...baseClasses,
        sizeClasses[props.size] || sizeClasses.md,
        variantClasses[props.variant] || variantClasses.outline,
        shapeClasses[props.shape] || shapeClasses.rounded,
        props.inputClass
      ].filter(Boolean).join(" ");
    });
    const iconContainerClasses = computed(() => {
      return [
        "absolute right-2 opacity-50 hover:opacity-70 transition-opacity",
        props.disabled ? "opacity-30" : ""
      ].filter(Boolean).join(" ");
    });
    const iconClasses = computed(() => {
      return [
        "text-gray-500",
        `text-${props.color}`
      ].join(" ");
    });
    const panelClasses = computed(() => {
      return [
        "absolute w-auto bg-base-100 border border-base-300 rounded-lg shadow-lg z-50",
        "min-w-80 max-w-96",
        props.panelClass
      ].filter(Boolean).join(" ");
    });
    const headerClasses = computed(() => {
      return [
        "flex flex-row justify-between items-center border-b border-base-300 p-4"
      ].join(" ");
    });
    const navButtonClasses = computed(() => {
      return [
        "flex items-center justify-center min-w-8 min-h-8 rounded-md transition-all duration-200 ease-in-out",
        "hover:opacity-70 active:scale-95 cursor-pointer p-2"
      ].join(" ");
    });
    const yearMonthClasses = computed(() => {
      return [
        "min-w-32 text-center flex flex-col items-center space-y-1"
      ].join(" ");
    });
    const yearClasses = computed(() => {
      return [
        "text-lg font-semibold text-primary"
      ].join(" ");
    });
    const monthClasses = computed(() => {
      return [
        "text-sm text-base-content"
      ].join(" ");
    });
    const weekHeaderClasses = computed(() => {
      return [
        "grid grid-cols-7 gap-1 p-2"
      ].join(" ");
    });
    const weekDayClasses = computed(() => {
      return [
        "flex justify-center items-center text-sm text-base-content opacity-70 font-medium h-8"
      ].join(" ");
    });
    const dateGridClasses = computed(() => {
      return [
        "grid grid-cols-7 gap-1 p-2"
      ].join(" ");
    });
    const footerClasses = computed(() => {
      return [
        "flex flex-row justify-center items-center space-x-2 p-4 border-t border-base-300"
      ].join(" ");
    });
    const dateList = computed(() => {
      return setDateList(currentYear.value, currentMonth.value);
    });
    const WeekName = computed(() => [
      t("date.sunday"),
      t("date.monday"),
      t("date.tuesday"),
      t("date.wednesday"),
      t("date.thursday"),
      t("date.friday"),
      t("date.saturday")
    ]);
    const MonthName = computed(() => [
      t("date.january"),
      t("date.february"),
      t("date.march"),
      t("date.april"),
      t("date.may"),
      t("date.june"),
      t("date.july"),
      t("date.august"),
      t("date.september"),
      t("date.october"),
      t("date.november"),
      t("date.december")
    ]);
    const setDateList = (year, month) => {
      const curDays = new Date(year, month + 1, 0).getDate();
      const prevDays = new Date(year, month, 0).getDate();
      const curFirstDayWeek = new Date(year, month, 1).getDay();
      const list = [];
      for (let i = prevDays - curFirstDayWeek + 1; i <= prevDays; i++) {
        const date = new Date(year, month - 1, i);
        list.push({
          day: i,
          year,
          month: month - 1,
          value: +date,
          isSelected: false,
          isToday: isToday(date),
          isDisabled: isDateDisabled(date),
          type: "prev"
        });
      }
      for (let i = 1; i <= curDays; i++) {
        const date = new Date(year, month, i);
        list.push({
          day: i,
          year,
          month,
          value: +date,
          isSelected: isDateSelected(date),
          isToday: isToday(date),
          isDisabled: isDateDisabled(date),
          type: "current"
        });
      }
      const nextDays = 7 - list.length % 7;
      if (nextDays !== 7) {
        for (let i = 1; i <= nextDays; i++) {
          const date = new Date(year, month + 1, i);
          list.push({
            day: i,
            year,
            month: month + 1,
            value: +date,
            isSelected: false,
            isToday: isToday(date),
            isDisabled: isDateDisabled(date),
            type: "next"
          });
        }
      }
      return list;
    };
    const isToday = (date) => {
      const today2 = /* @__PURE__ */ new Date();
      return date.toDateString() === today2.toDateString();
    };
    const isDateSelected = (date) => {
      if (!selectedDate.value) return false;
      const selected = typeof selectedDate.value === "string" ? new Date(selectedDate.value) : selectedDate.value;
      return date.toDateString() === selected.toDateString();
    };
    const isDateDisabled = (date) => {
      if (props.minDate) {
        const min = typeof props.minDate === "string" ? new Date(props.minDate) : props.minDate;
        if (date < min) return true;
      }
      if (props.maxDate) {
        const max = typeof props.maxDate === "string" ? new Date(props.maxDate) : props.maxDate;
        if (date > max) return true;
      }
      return false;
    };
    const getDateClasses = (date) => {
      const classes = [
        "flex justify-center items-center text-lg h-8 rounded cursor-pointer transition-colors",
        "hover:bg-base-200"
      ];
      if (date.type === "current") {
        classes.push("text-base-content");
      } else {
        classes.push("text-base-content opacity-50");
      }
      if (date.isSelected) {
        classes.push(`bg-${props.color} text-${props.color}-content hover:bg-${props.color}-focus`);
      } else if (date.isToday) {
        classes.push(`text-${props.color} font-semibold`);
      }
      if (date.isDisabled) {
        classes.push("opacity-50 cursor-not-allowed hover:bg-transparent");
      }
      return classes.join(" ");
    };
    const formatDate = (date, format2) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return format2.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day);
    };
    const parseDate = (dateString) => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };
    const toggleShow = () => {
      if (props.disabled || props.readonly) return;
      positionShow.value = !positionShow.value;
    };
    const selectDate = (date) => {
      if (date.isDisabled) return;
      const selected = new Date(date.year, date.month, date.day);
      selectedDate.value = selected;
      positionShow.value = false;
      emit("update:modelValue", selected);
      emit("change", selected);
      emit("select", selected);
    };
    const yearDecrease = () => {
      currentYear.value -= 1;
    };
    const monthDecrease = () => {
      if (currentMonth.value <= 0) {
        currentMonth.value = 11;
        currentYear.value -= 1;
      } else {
        currentMonth.value -= 1;
      }
    };
    const yearIncrease = () => {
      currentYear.value += 1;
    };
    const monthIncrease = () => {
      if (currentMonth.value >= 11) {
        currentMonth.value = 0;
        currentYear.value += 1;
      } else {
        currentMonth.value += 1;
      }
    };
    const today = () => {
      const today2 = /* @__PURE__ */ new Date();
      selectedDate.value = today2;
      positionShow.value = false;
      emit("update:modelValue", today2);
      emit("change", today2);
      emit("select", today2);
    };
    const selectNow = () => {
      const now2 = /* @__PURE__ */ new Date();
      selectedDate.value = now2;
      positionShow.value = false;
      emit("update:modelValue", now2);
      emit("change", now2);
      emit("select", now2);
    };
    const clear = () => {
      selectedDate.value = null;
      emit("update:modelValue", null);
      emit("change", null);
      emit("clear");
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      focused.value = false;
      emit("blur", event);
    };
    const handleInput = (value) => {
      if (value) {
        const date = parseDate(value);
        if (date) {
          selectedDate.value = date;
          emit("update:modelValue", date);
          emit("change", date);
        }
      } else {
        selectedDate.value = null;
        emit("update:modelValue", null);
        emit("change", null);
      }
    };
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        if (typeof newValue === "string") {
          const date = parseDate(newValue);
          if (date) {
            selectedDate.value = date;
            currentYear.value = date.getFullYear();
            currentMonth.value = date.getMonth();
          }
        } else {
          selectedDate.value = newValue;
          currentYear.value = newValue.getFullYear();
          currentMonth.value = newValue.getMonth();
        }
      } else {
        selectedDate.value = null;
      }
    }, { immediate: true });
    useClickOutside(dateRef, () => {
      if (positionShow.value) {
        positionShow.value = false;
      }
    });
    __expose({
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur(),
      clear: () => clear(),
      getValue: () => selectedDate.value,
      setValue: (value) => {
        selectedDate.value = value;
        emit("update:modelValue", value);
      }
    });
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_tst = resolveComponent("tst");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(dateContainerClasses.value)
      }, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(labelClasses.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass(labelTextClasses.value)
          }, toDisplayString$1(__props.label), 3),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_1$j, "*")) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", {
          ref_key: "dateRef",
          ref: dateRef,
          class: normalizeClass(datePickerClasses.value)
        }, [
          createElementVNode("div", {
            class: normalizeClass(inputContainerClasses.value),
            onClick: toggleShow
          }, [
            createVNode(_component_ipt, {
              ref_key: "inputRef",
              ref: inputRef,
              type: "text",
              class: normalizeClass(inputClasses.value),
              modelValue: displayValue.value,
              placeholder: __props.placeholder,
              disabled: __props.disabled,
              readonly: __props.readonly,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onInput: handleInput
            }, null, 8, ["class", "modelValue", "placeholder", "disabled", "readonly"]),
            createElementVNode("div", {
              class: normalizeClass(iconContainerClasses.value)
            }, [
              createVNode(_component_icn, {
                name: iconName.value,
                size: iconSize.value,
                class: normalizeClass(iconClasses.value)
              }, null, 8, ["name", "size", "class"])
            ], 2)
          ], 2),
          createVNode(_component_tst, { name: "fade" }, {
            default: withCtx(() => [
              positionShow.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(panelClasses.value)
              }, [
                createElementVNode("div", {
                  class: normalizeClass(headerClasses.value)
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(navButtonClasses.value),
                    onClick: yearDecrease,
                    title: "上一年"
                  }, [
                    createVNode(_component_icn, {
                      name: "angles-left",
                      light: "",
                      lg: "",
                      color: "primary"
                    })
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(navButtonClasses.value),
                    onClick: monthDecrease,
                    title: "上一月"
                  }, [
                    createVNode(_component_icn, {
                      name: "angle-left",
                      light: "",
                      lg: "",
                      color: "primary"
                    })
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(yearMonthClasses.value)
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass(yearClasses.value)
                    }, toDisplayString$1(currentYear.value), 3),
                    createElementVNode("span", {
                      class: normalizeClass(monthClasses.value)
                    }, toDisplayString$1(MonthName.value[currentMonth.value]), 3)
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(navButtonClasses.value),
                    onClick: monthIncrease,
                    title: "下一月"
                  }, [
                    createVNode(_component_icn, {
                      name: "angle-right",
                      light: "",
                      lg: "",
                      color: "primary"
                    })
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(navButtonClasses.value),
                    onClick: yearIncrease,
                    title: "下一年"
                  }, [
                    createVNode(_component_icn, {
                      name: "angles-right",
                      light: "",
                      lg: "",
                      color: "primary"
                    })
                  ], 2)
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(weekHeaderClasses.value)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(WeekName.value, (day) => {
                    return openBlock(), createElementBlock("div", {
                      key: day,
                      class: normalizeClass(weekDayClasses.value)
                    }, toDisplayString$1(day), 3);
                  }), 128))
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(dateGridClasses.value)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(dateList.value, (date) => {
                    return openBlock(), createElementBlock("div", {
                      key: `${date.year}-${date.month}-${date.day}`,
                      class: normalizeClass(getDateClasses(date)),
                      onClick: ($event) => selectDate(date)
                    }, toDisplayString$1(date.day), 11, _hoisted_2$7);
                  }), 128))
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(footerClasses.value)
                }, [
                  createVNode(_component_btn, {
                    size: buttonSize.value,
                    color: buttonColor.value,
                    variant: "transparent",
                    onClick: today
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString$1(unref(t)("date.today")), 1)
                    ]),
                    _: 1
                  }, 8, ["size", "color"]),
                  createVNode(_component_btn, {
                    size: buttonSize.value,
                    color: buttonColor.value,
                    variant: "transparent",
                    onClick: clear
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString$1(unref(t)("date.clear")), 1)
                    ]),
                    _: 1
                  }, 8, ["size", "color"]),
                  __props.showNow ? (openBlock(), createBlock(_component_btn, {
                    key: 0,
                    size: buttonSize.value,
                    color: buttonColor.value,
                    variant: "transparent",
                    onClick: selectNow
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString$1(unref(t)("date.now")), 1)
                    ]),
                    _: 1
                  }, 8, ["size", "color"])) : createCommentVNode("", true)
                ], 2)
              ], 2)) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ], 2)
      ], 2);
    };
  }
});
const Date$1 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-b0c88115"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    name: {},
    default: {}
  },
  setup(__props) {
    const globalProps = __props;
    const slots = useSlots();
    let currentTab = ref(globalProps.default || "");
    const renderOneButton = (name, tab, index) => h(
      "label",
      {
        class: {
          "mx-2 px-2 cursor-pointer hover:text-primary": true,
          "border-b-2": currentTab.value === name || index === 0 && !currentTab.value
        }
      },
      [
        h(
          "input",
          {
            name: globalProps.name,
            value: name,
            type: "radio",
            class: "hidden",
            onClick: () => {
              currentTab.value = name;
            }
          },
          {}
        ),
        tab
      ]
    );
    const renderTabBar = () => h(
      "div",
      { class: "flex flex-warp overflow-x-scroll" },
      slots.default && slots.default().map((it, index) => {
        return renderOneButton(it.props?.name, it.props?.tab, index);
      })
    );
    const renderContent = () => {
      return slots.default && slots.default().find((it) => {
        if (currentTab.value === "") {
          return true;
        }
        return it.props?.name === currentTab.value;
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(renderTabBar),
        createVNode(renderContent)
      ]);
    };
  }
});
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "TabPane",
  props: {
    name: {},
    tab: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
const _hoisted_1$i = { class: "w-95" };
const _hoisted_2$6 = { class: "py-1" };
const _hoisted_3$6 = { class: "text-sm truncate" };
const _hoisted_4$4 = ["href"];
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = ["multiple"];
const _hoisted_7$1 = { class: "px-1" };
const _hoisted_8$1 = ["onClick"];
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Upload",
  props: {
    direction: { type: String, default: "row", required: false },
    multiple: { type: Boolean, default: false, required: false },
    button: { type: String, default: "Upload", required: false },
    icon: { type: Boolean, default: false, required: false },
    list: { type: Boolean, default: false, required: false },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    label: { type: String, required: false },
    labelWidth: { type: String, default: "w-4/9", required: false },
    files: { type: Array, required: false }
  },
  emits: ["change", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const containerClasses = computed(() => {
      if (props.direction === "col") {
        return "flex flex-col w-full";
      }
      return "flex flex-row justify-between items-center w-full";
    });
    const emit = __emit;
    const inRef = ref();
    const fileList = reactive([]);
    const fileUpload = () => {
      inRef.value?.click();
    };
    const inChange = (e) => {
      const target = e.target;
      if (target.files) {
        fileList.unshift(...Array.from(target.files));
        emit("change", fileList);
      }
    };
    const deleteFile = (index) => {
      fileList.splice(index, 1);
    };
    const deleteAppendix = (index) => {
      emit("delete", index);
    };
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(["select-none py-2 px-1", [__props.label ? __props.labelWidth : ""]])
        }, [
          createElementVNode("span", {
            class: normalizeClass([`text-${__props.size}`])
          }, toDisplayString$1(__props.label), 3)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_1$i, [
          withDirectives(createElementVNode("div", _hoisted_2$6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (item, index) => {
              return openBlock(), createElementBlock("li", {
                key: index,
                class: "flex align-middle justify-between w-full hover:bg-base-300 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 rounded-$rounded-btn"
              }, [
                createElementVNode("span", _hoisted_3$6, [
                  createElementVNode("a", {
                    href: item.Link
                  }, toDisplayString$1(item.Name), 9, _hoisted_4$4)
                ]),
                createElementVNode("span", {
                  class: "cursor-pointer hover:text-primary",
                  onClick: ($event) => deleteAppendix(item.AppendixId)
                }, [
                  createVNode(_component_icn, {
                    name: "trash-can",
                    light: "",
                    md: ""
                  })
                ], 8, _hoisted_5$2)
              ]);
            }), 128))
          ], 512), [
            [vShow, __props.files]
          ]),
          createElementVNode("div", null, [
            createElementVNode("input", {
              type: "file",
              ref_key: "inRef",
              ref: inRef,
              class: "hidden",
              onChange: inChange,
              multiple: __props.multiple
            }, null, 40, _hoisted_6$2),
            createVNode(_component_btn, {
              size: "sm",
              onClick: fileUpload,
              class: "w-full"
            }, {
              default: withCtx(() => [
                withDirectives(createVNode(_component_icn, {
                  name: "file-arrow-up",
                  light: "",
                  lg: ""
                }, null, 512), [
                  [vShow, __props.icon]
                ]),
                createElementVNode("span", _hoisted_7$1, toDisplayString$1(__props.button), 1)
              ]),
              _: 1
            })
          ]),
          withDirectives(createElementVNode("div", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(fileList, (item, index) => {
              return openBlock(), createElementBlock("li", {
                key: index,
                class: "flex align-middle justify-between w-full"
              }, [
                createElementVNode("span", null, toDisplayString$1(item.name), 1),
                createElementVNode("span", {
                  class: "cursor-pointer hover:text-primary",
                  onClick: ($event) => deleteFile(index)
                }, [
                  createVNode(_component_icn, {
                    name: "trash-can",
                    light: "",
                    lg: ""
                  })
                ], 8, _hoisted_8$1)
              ]);
            }), 128))
          ], 512), [
            [vShow, __props.list]
          ])
        ])
      ], 2);
    };
  }
});
const _hoisted_1$h = ["href"];
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "File",
  props: {
    direction: { type: String, default: "row", required: false },
    size: {
      type: String,
      default: "md",
      required: false,
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].includes(value);
      }
    },
    label: { type: String, required: false },
    labelWidth: { type: String, default: "w-4/9", required: false },
    files: { type: Array, required: false }
  },
  setup(__props) {
    const props = __props;
    const containerClasses = computed(() => {
      return props.direction === "col" ? "flex flex-col" : "flex flex-row w-full";
    });
    const labelClasses = computed(() => {
      return [
        "select-none py-2 px-1",
        props.label ? props.labelWidth : ""
      ].filter(Boolean).join(" ");
    });
    const labelTextClasses = computed(() => {
      const sizeMap = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      };
      return sizeMap[props.size] || "text-base";
    });
    const filesContainerClasses = computed(() => {
      return "w-95";
    });
    const fileItemClasses = computed(() => {
      return [
        "flex pl-3 p-1 rounded-$rounded-btn",
        "bg-gray-100 dark:bg-gray-700",
        "hover:bg-base-300 dark:hover:bg-gray-600"
      ].join(" ");
    });
    const fileLinkClasses = computed(() => {
      return "text-sm truncate hover:underline";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClasses.value)
      }, [
        __props.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass(labelClasses.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass(labelTextClasses.value)
          }, toDisplayString$1(__props.label), 3)
        ], 2)) : createCommentVNode("", true),
        withDirectives(createElementVNode("div", {
          class: normalizeClass(filesContainerClasses.value)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (item, index) => {
            return openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass(fileItemClasses.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass(fileLinkClasses.value)
              }, [
                createElementVNode("a", {
                  href: item.Link,
                  class: "hover:underline"
                }, toDisplayString$1(item.Name), 9, _hoisted_1$h)
              ], 2)
            ], 2);
          }), 128))
        ], 2), [
          [vShow, __props.files]
        ])
      ], 2);
    };
  }
});
const install$4 = (app) => {
  app.component("ButtonGroup", ButtonGroup);
  app.component("Menu", Menu);
  app.component("Dropdown", _sfc_main$F);
  app.component("Modal", Modal);
  app.component("Drawer", _sfc_main$D);
  app.component("Table", Table);
  app.component("Form", Form);
  app.component("FormItem", _sfc_main$z);
  app.component("Select", _sfc_main$y);
  app.component("Date", Date$1);
  app.component("Tabs", _sfc_main$w);
  app.component("TabPane", _sfc_main$v);
  app.component("Upload", _sfc_main$u);
  app.component("File", _sfc_main$t);
};
class Store {
  /**
   * 获取Cookie值
   */
  static getCookie = (key) => {
    const name = key + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  /**
   * 设置Cookie值
   * exhours 保存时长，默认两小时
   */
  static setCookie = (key, value, exhours = 2) => {
    let currentTime = (/* @__PURE__ */ new Date()).getTime();
    let expireTime = new Date(currentTime + (exhours + 8) * 60 * 60 * 1e3);
    const expires = "expires=" + expireTime.toUTCString();
    document.cookie = key + "=" + value + ";" + expires;
  };
  /**
   * 删除cookie值
   */
  static removeCookie = (key) => {
    const d = /* @__PURE__ */ new Date();
    d.setTime(-1);
    const expires = "expires=" + d.toUTCString();
    document.cookie = key + "='';" + expires;
  };
  /**
   * 清除cookie值
   */
  static clearCookie = () => {
    Store.setCookie("", "", -1);
  };
  /**
   *  设置localStorage存储
   */
  static setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  /**
   * 获取localStorage存储
   */
  static getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  };
  /**
   * 删除localStorage存储
   */
  static removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  /**
   * 清除localStorage存储
   */
  static clearLocalStorage = () => {
    localStorage.clear();
  };
  /**
   *  设置sessionStorage存储
   */
  static setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  /**
   * 获取sessionStorage存储
   */
  static getSessionStorage = (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  /**
   * 删除SessionStorage存储
   */
  static removeSessionStorage = (key) => {
    sessionStorage.removeItem(key);
  };
  /**
   * 清除SessionStorage存储
   */
  static clearSessionStorage = () => {
    sessionStorage.clear();
  };
}
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "ThemeSelect",
  setup(__props) {
    const { t } = useI18n();
    const isTheme = ref("theme-blue");
    onMounted(() => {
      if (Store.getLocalStorage("theme"))
        isTheme.value = Store.getLocalStorage("theme");
      document.documentElement.classList.add(isTheme.value);
    });
    function changeTheme(color) {
      document.documentElement.classList.remove(isTheme.value);
      isTheme.value = color;
      document.documentElement.classList.add(isTheme.value);
      Store.setLocalStorage("theme", isTheme.value);
    }
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Menu = resolveComponent("Menu");
      const _component_Dropdown = resolveComponent("Dropdown");
      return openBlock(), createBlock(_component_Dropdown, {
        placement: "bottom",
        hover: ""
      }, {
        trigger: withCtx(() => [
          createVNode(_component_btn, {
            item: "",
            class: "hover:text-primary"
          }, {
            default: withCtx(() => [
              createVNode(_component_icn, {
                name: "swatchbook",
                light: "",
                xl: ""
              })
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createVNode(_component_Menu, {
            shadow: "",
            rounded: "",
            class: "bg-base-300 dark:bg-base-100 w-auto min-w-32 mt-5",
            style: { "transform": "translateX(-50%)", "left": "50%" }
          }, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[0] || (_cache[0] = ($event) => changeTheme("theme-default")),
                class: "w-full flex items-center gap-3 whitespace-nowrap"
              }, {
                default: withCtx(() => [
                  _cache[5] || (_cache[5] = createElementVNode("span", { class: "theme-blue rounded-$rounded-btn bg-blue-700 h-6 w-6 flex-shrink-0" }, null, -1)),
                  createTextVNode(toDisplayString$1(unref(t)("theme.blue")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[1] || (_cache[1] = ($event) => changeTheme("theme-teal")),
                class: "w-full flex items-center gap-3 whitespace-nowrap"
              }, {
                default: withCtx(() => [
                  _cache[6] || (_cache[6] = createElementVNode("span", { class: "theme-teal rounded-$rounded-btn bg-teal-700 h-6 w-6 flex-shrink-0" }, null, -1)),
                  createTextVNode(toDisplayString$1(unref(t)("theme.teal")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[2] || (_cache[2] = ($event) => changeTheme("theme-rose")),
                class: "w-full flex items-center gap-3 whitespace-nowrap"
              }, {
                default: withCtx(() => [
                  _cache[7] || (_cache[7] = createElementVNode("span", { class: "theme-rose rounded-$rounded-btn bg-rose-700 h-6 w-6 flex-shrink-0" }, null, -1)),
                  createTextVNode(toDisplayString$1(unref(t)("theme.rose")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[3] || (_cache[3] = ($event) => changeTheme("theme-violet")),
                class: "w-full flex items-center gap-3 whitespace-nowrap"
              }, {
                default: withCtx(() => [
                  _cache[8] || (_cache[8] = createElementVNode("span", { class: "theme-violet rounded-$rounded-btn bg-violet-700 h-6 w-6 flex-shrink-0" }, null, -1)),
                  createTextVNode(toDisplayString$1(unref(t)("theme.violet")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[4] || (_cache[4] = ($event) => changeTheme("theme-orange")),
                class: "w-full flex items-center gap-3 whitespace-nowrap"
              }, {
                default: withCtx(() => [
                  _cache[9] || (_cache[9] = createElementVNode("span", { class: "theme-orange rounded-$rounded-btn bg-orange-700 h-6 w-6 flex-shrink-0" }, null, -1)),
                  createTextVNode(toDisplayString$1(unref(t)("theme.orange")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const zhCN = {
  theme: {
    blue: "天空蓝",
    teal: "碧落青",
    rose: "玫瑰红",
    violet: "罗兰紫",
    orange: "霞光橙"
  },
  home: {
    started: "从这里开始",
    components: "组件库",
    tableOfContent: "目录",
    version: "版本",
    changelog: "更新日志",
    download: "下载"
  }
};
const enUS = {
  theme: {
    blue: "Blue",
    teal: "Teal",
    rose: "Rose",
    violet: "Violet",
    orange: "Orange"
  },
  home: {
    started: "Get Started",
    components: "Components",
    tableOfContent: "Table Of Content",
    version: "version",
    changelog: "changelog",
    download: "download"
  }
};
const I18n = createI18n({
  legacy: false,
  globalInjection: true,
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS
  }
});
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "LanguageSelect",
  setup(__props) {
    const setLanguage = (locale) => {
      if (locale !== I18n.global.locale.value) {
        Store.setLocalStorage("locale", locale);
        I18n.global.locale.value = locale;
        return true;
      }
      {
        return false;
      }
    };
    onMounted(() => {
      if (Store.getLocalStorage("locale")) {
        I18n.global.locale.value = Store.getLocalStorage("locale");
      }
    });
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Menu = resolveComponent("Menu");
      const _component_Dropdown = resolveComponent("Dropdown");
      return openBlock(), createBlock(_component_Dropdown, {
        placement: "bottom",
        hover: ""
      }, {
        trigger: withCtx(({ active }) => [
          createVNode(_component_btn, {
            item: "",
            class: "hover:text-primary"
          }, {
            default: withCtx(() => [
              createVNode(_component_icn, {
                name: "language",
                light: "",
                xl: ""
              })
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createVNode(_component_Menu, {
            rounded: "",
            shadow: "",
            class: "bg-base-300 dark:bg-base-100 w-auto min-w-32 mt-5"
          }, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[0] || (_cache[0] = ($event) => setLanguage("en-US"))
              }, {
                default: withCtx(() => [..._cache[2] || (_cache[2] = [
                  createTextVNode(" English ", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_btn, {
                clean: "",
                onClick: _cache[1] || (_cache[1] = ($event) => setLanguage("zh-CN"))
              }, {
                default: withCtx(() => [..._cache[3] || (_cache[3] = [
                  createTextVNode(" 中文 ", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "DarkChange",
  setup(__props) {
    const isDark = ref(false);
    onMounted(() => {
      if (Store.getLocalStorage("dark"))
        isDark.value = Store.getLocalStorage("dark") === "dark";
      document.documentElement.classList.add(isDark.value ? "dark" : "light");
    });
    function setDark() {
      document.documentElement.classList.remove(isDark.value ? "dark" : "light");
      isDark.value = !isDark.value;
      document.documentElement.classList.add(isDark.value ? "dark" : "light");
      Store.setLocalStorage("dark", isDark.value ? "dark" : "light");
    }
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createBlock(_component_btn, {
        item: "",
        onClick: setDark,
        class: "hover:text-primary"
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("span", null, [
            createVNode(_component_icn, {
              name: "sun-bright",
              light: "",
              xl: ""
            })
          ], 512), [
            [vShow, !isDark.value]
          ]),
          withDirectives(createElementVNode("span", null, [
            createVNode(_component_icn, {
              name: "moon-stars",
              light: "",
              xl: ""
            })
          ], 512), [
            [vShow, isDark.value]
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$g = { class: "site-toc order-last hidden flex-shrink-0 px-4 text-sm xl:block" };
const _hoisted_2$5 = {
  ref: "tocContent",
  class: "max-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] !border-l z-0 overflow-x-hidden overflow-y-hidden"
};
const _hoisted_3$5 = {
  key: 0,
  class: "!list-none p-0 m-0"
};
const _hoisted_4$3 = { class: "mb-4 font-semibold tracking-tight dark:text-gray-300" };
const _hoisted_5$1 = ["href", "aria-selected", "onClick"];
const _hoisted_6$1 = {
  key: 0,
  class: "!list-none p-0 m-0"
};
const _hoisted_7 = ["href", "aria-selected", "onClick"];
const _hoisted_8 = {
  key: 0,
  class: "!list-none !p-0 !m-0"
};
const _hoisted_9 = ["href", "aria-selected", "onClick"];
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Catalog",
  props: {
    toc: { type: Array, default: () => [] },
    index: { type: String, default: "" }
  },
  setup(__props) {
    const { t } = useI18n();
    const route2 = useRoute();
    const props = __props;
    const hasHeadings = computed(() => props.toc.length > 0);
    const headingCssClassMap = {
      1: "",
      2: "",
      3: "",
      4: "ml-4",
      5: "ml-6",
      6: "ml-8"
    };
    const isActiveItem = (slug) => {
      return route2.hash === `#${decodeURIComponent(slug)}`;
    };
    const getLinkClasses = (level, slug) => {
      const isActive = props.index === slug;
      return [
        "inline-block no-underline py-1",
        headingCssClassMap[level] || "",
        isActive ? "text-primary-500 subpixel-antialiased border-l-2 border-primary bg-base-gray-300 dark:bg-base-gray-600 px-3.5" : "text-gray-700 hover:bg-base-gray-300 dark:text-gray-400 dark:hover:text-gray-400 dark:hover:bg-base-gray-600 px-4"
      ];
    };
    const handleLinkClick = (event, slug) => {
      event.preventDefault();
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createElementVNode("div", _hoisted_2$5, [
          hasHeadings.value ? (openBlock(), createElementBlock("ul", _hoisted_3$5, [
            createElementVNode("p", _hoisted_4$3, toDisplayString$1(unref(t)("home.tableOfContent")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.toc, (heading) => {
              return openBlock(), createElementBlock("li", {
                key: heading.slug,
                class: normalizeClass([headingCssClassMap[heading.level], "!list-none m-0 pl-0 relative"])
              }, [
                createElementVNode("a", {
                  href: `#${heading.slug}`,
                  class: normalizeClass([getLinkClasses(heading.level, heading.slug), "block no-underline transition-all duration-200 ease-in-out hover:no-underline"]),
                  "aria-selected": isActiveItem(heading.slug),
                  onClick: ($event) => handleLinkClick($event, heading.slug)
                }, toDisplayString$1(heading.title), 11, _hoisted_5$1),
                heading.children && heading.children.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_6$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(heading.children, (child) => {
                    return openBlock(), createElementBlock("li", {
                      key: child.slug,
                      class: normalizeClass([headingCssClassMap[child.level], "!list-none !m-0 !pl-0 relative group"])
                    }, [
                      createElementVNode("a", {
                        href: `#${child.slug}`,
                        class: normalizeClass([getLinkClasses(child.level, child.slug), "block no-underline transition-all duration-200 ease-in-out hover:no-underline"]),
                        "aria-selected": isActiveItem(child.slug),
                        onClick: ($event) => handleLinkClick($event, child.slug)
                      }, toDisplayString$1(child.title), 11, _hoisted_7),
                      child.children && child.children.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_8, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(child.children, (grandchild) => {
                          return openBlock(), createElementBlock("li", {
                            key: grandchild.slug,
                            class: normalizeClass([headingCssClassMap[grandchild.level], "!list-none !m-0 !pl-0 relative group"])
                          }, [
                            createElementVNode("a", {
                              href: `#${grandchild.slug}`,
                              class: normalizeClass([getLinkClasses(grandchild.level, grandchild.slug), "block no-underline transition-all duration-200 ease-in-out hover:no-underline"]),
                              "aria-selected": isActiveItem(grandchild.slug),
                              onClick: ($event) => handleLinkClick($event, grandchild.slug)
                            }, toDisplayString$1(grandchild.title), 11, _hoisted_9)
                          ], 2);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ])) : createCommentVNode("", true)
              ], 2);
            }), 128))
          ])) : createCommentVNode("", true)
        ], 512)
      ]);
    };
  }
});
const Catalog = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-eb228acc"]]);
const _hoisted_1$f = { class: "h-screen overflow-y-auto w-full" };
const _hoisted_2$4 = { class: "flex flex-row px-10 pt-10 min-w-0 h-full" };
const _hoisted_3$4 = { class: "lg:w-5/6 w-full lg:pr-10" };
const _hoisted_4$2 = {
  key: 0,
  class: "hidden xl:block xl:row-span-3"
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Markdown",
  props: {
    content: {}
  },
  setup(__props) {
    const props = __props;
    const toc = ref([]);
    const currentIndex = ref("");
    const list = [];
    const handleScroll = () => {
      let a = document.getElementsByClassName("doc")[0];
      for (let i = 0; i < list.length; i++) {
        let b = document.getElementById(list[i]);
        let e = document.getElementById(list[i + 1]);
        if (a.scrollTop >= b?.offsetTop && a.scrollTop < e?.offsetTop) {
          currentIndex.value = list[i];
        }
        if (a.scrollTop >= e?.offsetTop) {
          currentIndex.value = list[i + 1];
        }
      }
    };
    const showTop = ref(false);
    const showRight = ref(false);
    const showBottom = ref(false);
    const showLeft = ref(false);
    const showSmall = ref(false);
    const showMedium = ref(false);
    const showLarge = ref(false);
    const showHeightDrawer = ref(false);
    const showScrollDrawer = ref(false);
    const showNoBackdropDrawer = ref(false);
    window.showTop = showTop;
    window.showRight = showRight;
    window.showBottom = showBottom;
    window.showLeft = showLeft;
    window.showSmall = showSmall;
    window.showMedium = showMedium;
    window.showLarge = showLarge;
    window.showHeightDrawer = showHeightDrawer;
    window.showScrollDrawer = showScrollDrawer;
    window.showNoBackdropDrawer = showNoBackdropDrawer;
    function convertTocToMarkdownItHeaders(tocItems) {
      return tocItems.map((item) => ({
        level: item.level,
        title: item.title,
        slug: item.slug,
        link: `#${item.slug}`,
        children: item.children ? convertTocToMarkdownItHeaders(item.children) : []
      }));
    }
    const debugInfo = ref({
      headerCount: 0,
      domStatus: "未初始化",
      containerContent: "未检查"
    });
    function parseHeaders2(content) {
      const lines = content.split("\n");
      const headers = [];
      const stack = [];
      lines.forEach((line, index) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const title = match[2].trim();
          const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
          const item = {
            level,
            title,
            slug,
            children: []
          };
          while (stack.length > 0 && stack[stack.length - 1].level >= level) {
            stack.pop();
          }
          if (stack.length === 0) {
            headers.push(item);
          } else {
            if (!stack[stack.length - 1].children) {
              stack[stack.length - 1].children = [];
            }
            stack[stack.length - 1].children.push(item);
          }
          stack.push(item);
        }
      });
      return headers;
    }
    function addHeaderIds() {
      const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headers.forEach((header, index) => {
        const text = header.textContent || "";
        let slug = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
        if (!slug) {
          slug = `header-${index}`;
        }
        if (!header.id || header.id !== slug) {
          header.id = slug;
        }
      });
    }
    function parseDOMHeaders() {
      debugInfo.value.domStatus = "正在解析...";
      addHeaderIds();
      const markdownContainer = document.querySelector(".markdown-body");
      if (!markdownContainer) {
        debugInfo.value.domStatus = "未找到 Markdown 容器";
        return;
      }
      const headers = markdownContainer.querySelectorAll("h2, h3");
      debugInfo.value.headerCount = headers.length;
      debugInfo.value.containerContent = markdownContainer ? `Markdown容器存在，标题数: ${headers.length}` : "Markdown容器不存在";
      const headerData = [];
      const stack = [];
      headers.forEach((header, index) => {
        const level = parseInt(header.tagName.charAt(1));
        const title = header.textContent || "";
        const slug = header.id || "";
        const item = {
          level,
          title,
          slug,
          children: []
        };
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }
        if (stack.length === 0) {
          headerData.push(item);
        } else {
          const parent = stack[stack.length - 1];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
        stack.push(item);
      });
      toc.value = convertTocToMarkdownItHeaders(headerData);
      debugInfo.value.domStatus = `解析完成，找到 ${headerData.length} 个项目`;
    }
    onMounted(async () => {
      debugInfo.value.domStatus = "组件已挂载";
      if (props.content) {
        const parsedToc = parseHeaders2(props.content);
        toc.value = convertTocToMarkdownItHeaders(parsedToc);
      } else {
        await nextTick();
        parseDOMHeaders();
        if (toc.value.length === 0) {
          setTimeout(() => {
            parseDOMHeaders();
          }, 100);
          setTimeout(() => {
            parseDOMHeaders();
          }, 500);
          setTimeout(() => {
            parseDOMHeaders();
          }, 1e3);
        }
      }
      await nextTick();
      var tocElements = document.querySelectorAll(".site-toc li a");
      list.length = 0;
      for (let i = 0; i < tocElements.length; i++) {
        const href = tocElements[i].getAttribute("href");
        if (href) {
          list.push(href.substr(1));
        }
      }
      window.addEventListener("scroll", handleScroll, true);
      currentIndex.value = "";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createElementVNode("div", _hoisted_2$4, [
          createElementVNode("div", _hoisted_3$4, [
            renderSlot(_ctx.$slots, "default")
          ]),
          toc.value && toc.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
            createVNode(Catalog, {
              toc: toc.value,
              index: currentIndex.value,
              class: "max-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] fixed border-l h-screen"
            }, null, 8, ["toc", "index"])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "FullScreen",
  props: {
    target: { default: void 0 },
    immersive: { type: Boolean, default: true },
    position: { default: void 0 },
    zIndex: { default: void 0 }
  },
  emits: ["fullscreenchange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const methodMap = [
      [
        "requestFullscreen",
        "exitFullscreen",
        "fullscreenElement",
        "fullscreenEnabled",
        "fullscreenchange",
        "fullscreenerror"
      ],
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      [
        "msRequestFullscreen",
        "msExitFullscreen",
        "msFullscreenElement",
        "msFullscreenEnabled",
        "MSFullscreenChange",
        "MSFullscreenError"
      ]
    ];
    const defaultElement = document.documentElement;
    let targetEl = ref(
      props.target || defaultElement
    );
    const isFullscreen = ref(false);
    let isSupported = false;
    const unprefixedMethods = methodMap[0];
    const fullscreenAPI = {};
    for (const methodList of methodMap) {
      if (methodList[1] in document) {
        for (const [index, method] of methodList.entries()) {
          fullscreenAPI[unprefixedMethods[index]] = method;
        }
        isSupported = true;
        break;
      }
    }
    async function enter(targetEl2) {
      if (!isSupported) return;
      if (!targetEl2) targetEl2 = activeEl.value || defaultElement;
      let fullscreenEnter = null;
      if (props.immersive) {
        fullscreenEnter = Promise.resolve(
          // @ts-ignore
          targetEl2[fullscreenAPI.requestFullscreen]()
        );
      } else {
        styleLayFullscreen(targetEl2, false);
        fullscreenEnter = Promise.resolve(
          targetEl2?.classList.add("FullScreen")
        );
      }
      return await fullscreenEnter?.then(() => {
        isFullscreen.value = true;
        emit("fullscreenchange", isFullscreen.value);
        return !!document.fullscreenElement;
      });
    }
    async function exit(targetEl2) {
      if (!isSupported) return;
      if (!targetEl2) targetEl2 = activeEl.value || document;
      let fullscreenExit = null;
      if (props.immersive) {
        fullscreenExit = Promise.resolve(document[fullscreenAPI.exitFullscreen]());
      } else {
        if (targetEl2 instanceof Document) return;
        styleLayFullscreen(targetEl2, true);
        fullscreenExit = Promise.resolve(
          targetEl2?.classList.remove("FullScreen")
        );
      }
      return await fullscreenExit?.then(() => {
        isFullscreen.value = false;
        emit("fullscreenchange", isFullscreen.value);
        return !!document.fullscreenElement;
      });
    }
    async function toggle() {
      if (isFullscreen.value) {
        await exit(activeEl.value);
      } else {
        await enter(activeEl.value);
      }
    }
    const styleLayFullscreen = function(el, isRemove = false) {
      el.style.position = isRemove ? "" : props.position || "";
      el.style.zIndex = isRemove ? "" : props.zIndex || "";
    };
    const activeEl = computed(() => targetEl.value = props.target);
    const onFullscreenchange = function(event) {
      if (isFullscreen.value && !document.fullscreenElement) {
        if (props.immersive) {
          isFullscreen.value = false;
          emit("fullscreenchange", isFullscreen.value);
        } else if (event.key === "Escape") {
          exit(activeEl.value);
        }
      }
    };
    const onKeydownF11 = function(event) {
      let isRootNodeFullscreen = props.immersive && (!activeEl.value || activeEl.value === defaultElement);
      if (event.key === "F11" && isRootNodeFullscreen) {
        event.preventDefault();
        toggle();
      }
    };
    onMounted(() => {
      document.addEventListener(fullscreenAPI.fullscreenchange, onFullscreenchange);
      document.addEventListener("keydown", onFullscreenchange);
      document.addEventListener("keydown", onKeydownF11);
    });
    onBeforeUnmount(() => {
      document.removeEventListener(
        fullscreenAPI.fullscreenchange,
        onFullscreenchange
      );
      document.removeEventListener("keydown", onFullscreenchange);
      document.removeEventListener("keydown", onKeydownF11);
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", {
        isFullscreen: isFullscreen.value,
        enter,
        exit,
        toggle
      });
    };
  }
});
const install$3 = (app) => {
  app.component("Theme", _sfc_main$s);
  app.component("Language", _sfc_main$r);
  app.component("Dark", _sfc_main$q);
  app.component("Markdown", _sfc_main$o);
  app.component("Toc", Catalog);
  app.component("FullScreen", _sfc_main$n);
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "TaskCreate",
  props: {
    onSubmit: { type: Function },
    onSuccess: { type: Function },
    onError: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const TaskCreateForm = reactive({
      Name: "",
      Project: 0,
      EndAt: ""
    });
    const TaskCreate2 = async (form) => {
      const param = {
        Name: form.Name,
        "Project": form.Project,
        "EndAt": form.EndAt
      };
      try {
        if (props.onSubmit) {
          await props.onSubmit(param);
        } else {
          MessageWithMethods({ type: "success", message: t("project.create") });
        }
      } catch (error) {
        if (props.onError) {
          props.onError(error, error.response || error);
        } else {
          const errorMessage = error?.response?.data?.message || error?.data?.message || "创建失败";
          MessageWithMethods({ type: "error", message: errorMessage });
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_FormItem = resolveComponent("FormItem");
      const _component_Date = resolveComponent("Date");
      const _component_Select = resolveComponent("Select");
      const _component_btn = resolveComponent("btn");
      const _component_Form = resolveComponent("Form");
      return openBlock(), createBlock(_component_Form, { class: "bg-base/5 space-y-3 w-full" }, {
        default: withCtx(() => [
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_ipt, {
                class: "w-full",
                placeholder: unref(t)("task.name")
              }, null, 8, ["placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_Date, {
                class: "w-full",
                placeholder: unref(t)("toolbar.date")
              }, null, 8, ["placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_Select, {
                class: "w-full",
                placeholder: unref(t)("project.type")
              }, null, 8, ["placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                class: "w-full",
                onClick: _cache[0] || (_cache[0] = ($event) => TaskCreate2(TaskCreateForm))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString$1(unref(t)("toolbar.create")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$e = { class: "pt-5" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "AccountCreate",
  props: {
    onSubmit: { type: Function },
    onSuccess: { type: Function },
    onError: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const state = reactive({
      options: [
        { label: computed(() => t("project.order")), value: 0 },
        { label: computed(() => t("project.train")), value: 1 },
        { label: computed(() => t("project.section")), value: 2 },
        { label: computed(() => t("project.assembly")), value: 3 },
        { label: computed(() => t("project.source")), value: 4 },
        { label: computed(() => t("project.machine")), value: 5 },
        { label: computed(() => t("project.system")), value: 6 },
        { label: computed(() => t("project.standard")), value: 7 },
        { label: computed(() => t("project.industry")), value: 8 },
        { label: computed(() => t("project.technology")), value: 9 }
      ]
    });
    const { options } = state;
    const ProjectCreateForm = reactive({
      Type: 0,
      Abbr: "",
      Name: "",
      Profile: "",
      EndAt: ""
    });
    const select = (e) => {
      ProjectCreateForm.Type = e;
    };
    const selectDate = (e) => {
      ProjectCreateForm.EndAt = e;
    };
    const btnEnable = ref(false);
    const ProjectCreate = async (form) => {
      const param = {
        "Type": form.Type,
        "Abbr": form.Abbr,
        "Name": form.Name,
        "Profile": form.Profile,
        "EndAt": form.EndAt
      };
      try {
        if (props.onSubmit) {
          await props.onSubmit(param);
        } else {
          MessageWithMethods({ type: "success", message: t("project.create") });
        }
      } catch (error) {
        if (props.onError) {
          props.onError(error, error.response || error);
        } else {
          const errorMessage = error?.response?.data?.message || error?.data?.message || "创建失败";
          MessageWithMethods({ type: "error", message: errorMessage });
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_FormItem = resolveComponent("FormItem");
      const _component_txa = resolveComponent("txa");
      const _component_Select = resolveComponent("Select");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      const _component_Form = resolveComponent("Form");
      return openBlock(), createBlock(_component_Form, { class: "bg-base/5 space-y-3 w-full" }, {
        default: withCtx(() => [
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_ipt, {
                modelValue: ProjectCreateForm.Abbr,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ProjectCreateForm.Abbr = $event),
                size: "sm",
                class: "w-full",
                placeholder: unref(t)("project.abbr")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_ipt, {
                modelValue: ProjectCreateForm.Name,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ProjectCreateForm.Name = $event),
                size: "sm",
                class: "w-full",
                placeholder: unref(t)("project.name")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_txa, {
                modelValue: ProjectCreateForm.Profile,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ProjectCreateForm.Profile = $event),
                class: "w-full",
                resize: "resize-y",
                placeholder: unref(t)("project.profile")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_Select, {
                options: unref(options),
                onSelect: select,
                placeholder: unref(t)("project.type"),
                class: "w-full"
              }, null, 8, ["options", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_Date, {
                onSelect: selectDate,
                class: "w-full",
                placeholder: unref(t)("toolbar.date")
              }, null, 8, ["placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                disabled: btnEnable.value,
                class: "w-full",
                onClick: _cache[3] || (_cache[3] = ($event) => ProjectCreate(ProjectCreateForm))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString$1(unref(t)("toolbar.create")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          }),
          createElementVNode("div", _hoisted_1$e, toDisplayString$1(ProjectCreateForm), 1)
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$d = { class: "pt-5" };
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "ProjectCreate",
  props: {
    onSubmit: { type: Function },
    onSuccess: { type: Function },
    onError: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const state = reactive({
      options: [
        { label: computed(() => t("project.order")), value: 0 },
        { label: computed(() => t("project.train")), value: 1 },
        { label: computed(() => t("project.section")), value: 2 },
        { label: computed(() => t("project.assembly")), value: 3 },
        { label: computed(() => t("project.source")), value: 4 },
        { label: computed(() => t("project.machine")), value: 5 },
        { label: computed(() => t("project.system")), value: 6 },
        { label: computed(() => t("project.standard")), value: 7 },
        { label: computed(() => t("project.industry")), value: 8 },
        { label: computed(() => t("project.technology")), value: 9 }
      ]
    });
    const project = reactive({
      Type: 0,
      Name: ""
    });
    const select = (e) => {
      project.Type = e;
    };
    const ProjectCreate2 = async (project2) => {
      try {
        if (props.onSubmit) {
          await props.onSubmit(project2);
        } else {
          MessageWithMethods({ type: "success", message: t("project.create") });
        }
      } catch (error) {
        if (props.onError) {
          props.onError(error, error.response || error);
        } else {
          const errorMessage = error?.response?.data?.message || error?.data?.message || "创建失败";
          MessageWithMethods({ type: "error", message: errorMessage });
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_FormItem = resolveComponent("FormItem");
      const _component_Select = resolveComponent("Select");
      const _component_btn = resolveComponent("btn");
      const _component_Form = resolveComponent("Form");
      return openBlock(), createBlock(_component_Form, { class: "bg-base/5 space-y-3 w-full" }, {
        default: withCtx(() => [
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_ipt, {
                modelValue: project.Name,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => project.Name = $event),
                size: "sm",
                class: "w-full",
                placeholder: unref(t)("project.name")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_Select, {
                options: state.options,
                onSelect: select,
                placeholder: unref(t)("project.type"),
                class: "w-full"
              }, null, 8, ["options", "placeholder"])
            ]),
            _: 1
          }),
          createVNode(_component_FormItem, null, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                class: "w-full",
                onClick: _cache[1] || (_cache[1] = ($event) => ProjectCreate2(project))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString$1(unref(t)("toolbar.create")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createElementVNode("div", _hoisted_1$d, toDisplayString$1(project), 1)
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$c = { class: "flex flex-col p-2" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "PartDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const isBrands = ref(false);
    const isModels = ref(false);
    const selectModels = ref();
    const selectBrand = ref();
    const selectModel = ref();
    const selectCost = ref();
    const selectPrice = ref();
    const selectIndex = ref();
    const selectModelIndex = ref();
    watch(() => props.item, async () => {
      if (props.item) {
        selectBrand.value = props.item.Select[0].Brand;
        selectModel.value = props.item.Select[0].Purchase[0].Model;
        selectCost.value = props.item.Select[0].Purchase[0].Cost;
        selectPrice.value = props.item.Select[0].Purchase[0].Price;
        selectModels.value = props.item.Select[0].Purchase;
        if (props.item.Select.length <= 1) {
          isBrands.value = true;
        }
        if (props.item.Select[0].Purchase.length <= 1) {
          isModels.value = true;
        }
      }
    });
    const selectedBrand = (e) => {
      selectIndex.value = e;
      selectModels.value = null;
      selectModels.value = props.item.Select[selectIndex.value].Purchase;
      selectModel.value = props.item.Select[selectIndex.value].Purchase[0].Model;
      selectCost.value = props.item.Select[selectIndex.value].Purchase[0].Cost;
      selectPrice.value = props.item.Select[selectIndex.value].Purchase[0].Price;
      if (props.item.Select[selectIndex.value].Purchase.length <= 1) {
        isModels.value = true;
      }
    };
    const selectedModel = (e) => {
      selectModelIndex.value = e;
      selectPrice.value = props.item.Select[selectIndex.value].Purchase[selectModelIndex.value].Price;
    };
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_MaterialSelect = resolveComponent("MaterialSelect");
      const _component_SurfaceSelect = resolveComponent("SurfaceSelect");
      const _component_StandardSelect = resolveComponent("StandardSelect");
      const _component_SymbolSelect = resolveComponent("SymbolSelect");
      const _component_Select = resolveComponent("Select");
      const _component_File = resolveComponent("File");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Model"),
          modelValue: __props.item.Model,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Model = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Unit"),
          modelValue: __props.item.Unit,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Unit = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Detail"),
          modelValue: __props.item.Detail,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Detail = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Mass"),
          modelValue: __props.item.Mass,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => __props.item.Mass = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MaterialSelect, {
          label: unref(t)("data.Material"),
          selected: __props.item.Material
        }, null, 8, ["label", "selected"]),
        createVNode(_component_SurfaceSelect, {
          label: unref(t)("data.Surface"),
          selected: __props.item.Surface
        }, null, 8, ["label", "selected"]),
        createVNode(_component_StandardSelect, {
          label: unref(t)("data.Standard"),
          selected: __props.item.Standard
        }, null, 8, ["label", "selected"]),
        createVNode(_component_SymbolSelect, {
          label: unref(t)("data.Symbol"),
          selected: __props.item.Symbol
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Select, {
          label: unref(t)("data.Brand"),
          options: __props.item.Select,
          selected: selectBrand.value,
          fieldLabel: "Brand",
          fieldValue: "BrandId",
          onSelectIndex: selectedBrand,
          disabled: isBrands.value
        }, null, 8, ["label", "options", "selected", "disabled"]),
        createVNode(_component_Select, {
          label: unref(t)("data.Select"),
          options: selectModels.value,
          selected: selectModel.value,
          fieldLabel: "Model",
          fieldValue: "Model",
          onSelectIndex: selectedModel,
          disabled: isModels.value
        }, null, 8, ["label", "options", "selected", "disabled"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Cost"),
          modelValue: selectCost.value,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => selectCost.value = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Price"),
          modelValue: selectPrice.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => selectPrice.value = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_File, {
          label: unref(t)("data.File"),
          files: __props.item.File
        }, null, 8, ["label", "files"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DesignBy"),
          selected: __props.item.DesignBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DesignAt"),
          selected: __props.item.DesignAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DraftBy"),
          selected: __props.item.DraftBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DraftAt"),
          selected: __props.item.DraftAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.InspectBy"),
          selected: __props.item.InspectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.InspectAt"),
          selected: __props.item.InspectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DirectBy"),
          selected: __props.item.DirectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DirectAt"),
          selected: __props.item.DirectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$b = { class: "flex flex-col p-2" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SectionDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const isBrands = ref(false);
    const isModels = ref(false);
    const selectModels = ref();
    const selectBrand = ref();
    const selectModel = ref();
    const selectCost = ref();
    const selectPrice = ref();
    const selectIndex = ref(0);
    const selectModelIndex = ref(0);
    watch(() => props.item, async () => {
      if (props.item) {
        selectBrand.value = props.item.Select[0].Brand;
        selectModel.value = props.item.Select[0].Purchase[0].Model;
        selectCost.value = props.item.Select[0].Purchase[0].Cost;
        selectPrice.value = props.item.Select[0].Purchase[0].Price;
        selectModels.value = props.item.Select[0].Purchase;
        if (props.item.Select.length == 1) {
          isBrands.value = true;
        }
        if (props.item.Select[0].Purchase.length == 1) {
          isModels.value = true;
        }
      }
    });
    const selected = (e) => {
      selectIndex.value = e;
      selectModel.value = props.item.Select[selectIndex.value].Purchase[0].Model;
      selectCost.value = props.item.Select[selectIndex.value].Purchase[0].Cost;
      selectPrice.value = props.item.Select[selectIndex.value].Purchase[0].Price;
      selectModels.value = props.item.Select[selectIndex.value].Purchase;
      if (props.item.Select[selectIndex.value].Purchase.length == 1) {
        isModels.value = true;
      }
    };
    const selectedModel = (e) => {
      selectModelIndex.value = e;
      selectPrice.value = props.item.Select[selectIndex.value].Purchase[selectModelIndex.value].Price;
    };
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_Select = resolveComponent("Select");
      const _component_File = resolveComponent("File");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Model"),
          modelValue: __props.item.Model,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Model = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Detail"),
          modelValue: __props.item.Detail,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Detail = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_Select, {
          label: unref(t)("data.Brand"),
          options: __props.item.Select,
          selected: selectBrand.value,
          fieldLabel: "Brand",
          fieldValue: "BrandId",
          onSelectIndex: selected,
          disabled: isBrands.value
        }, null, 8, ["label", "options", "selected", "disabled"]),
        createVNode(_component_Select, {
          label: unref(t)("data.Select"),
          options: selectModels.value,
          selected: selectModel.value,
          fieldLabel: "Model",
          fieldValue: "Model",
          onSelectIndex: selectedModel,
          disabled: isModels.value
        }, null, 8, ["label", "options", "selected", "disabled"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Cost"),
          modelValue: selectCost.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => selectCost.value = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Price"),
          modelValue: selectPrice.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => selectPrice.value = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_File, {
          label: unref(t)("data.File"),
          files: __props.item.File
        }, null, 8, ["label", "files"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DesignBy"),
          selected: __props.item.DesignBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DesignAt"),
          selected: __props.item.DesignAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DraftBy"),
          selected: __props.item.DraftBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DraftAt"),
          selected: __props.item.DraftAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.InspectBy"),
          selected: __props.item.InspectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.InspectAt"),
          selected: __props.item.InspectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DirectBy"),
          selected: __props.item.DirectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DirectAt"),
          selected: __props.item.DirectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$a = { class: "flex flex-col p-2" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SourceDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_File = resolveComponent("File");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Model"),
          modelValue: __props.item.Model,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Model = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Detail"),
          modelValue: __props.item.Detail,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Detail = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_File, {
          label: unref(t)("data.File"),
          files: __props.item.File
        }, null, 8, ["label", "files"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DesignBy"),
          selected: __props.item.DesignBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DesignAt"),
          selected: __props.item.DesignAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DraftBy"),
          selected: __props.item.DraftBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DraftAt"),
          selected: __props.item.DraftAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.InspectBy"),
          selected: __props.item.InspectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.InspectAt"),
          selected: __props.item.InspectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DirectBy"),
          selected: __props.item.DirectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DirectAt"),
          selected: __props.item.DirectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$9 = { class: "flex flex-col p-2" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "StandardDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_File = resolveComponent("File");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Model"),
          modelValue: __props.item.Model,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Model = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Point"),
          modelValue: __props.item.Point,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Point = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Detail"),
          modelValue: __props.item.Detail,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Detail = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Desity"),
          modelValue: __props.item.Desity,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => __props.item.Desity = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Yield"),
          modelValue: __props.item.Yield,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => __props.item.Yield = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ultima"),
          modelValue: __props.item.Ultima,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => __props.item.Ultima = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Elastic"),
          modelValue: __props.item.Elastic,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => __props.item.Elastic = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_File, {
          label: unref(t)("data.File"),
          files: __props.item.File
        }, null, 8, ["label", "files"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DesignBy"),
          selected: __props.item.DesignBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DesignAt"),
          selected: __props.item.DesignAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DraftBy"),
          selected: __props.item.DraftBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DraftAt"),
          selected: __props.item.DraftAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.InspectBy"),
          selected: __props.item.InspectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.InspectAt"),
          selected: __props.item.InspectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DirectBy"),
          selected: __props.item.DirectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DirectAt"),
          selected: __props.item.DirectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$8 = { class: "flex flex-col p-2" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "ProjectDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Purpose"),
          modelValue: __props.item.Purpose,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Purpose = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Target"),
          modelValue: __props.item.Target,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Target = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.InspectBy"),
          selected: __props.item.InspectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.InspectAt"),
          selected: __props.item.InspectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DirectBy"),
          selected: __props.item.DirectBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DirectAt"),
          selected: __props.item.DirectAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "flex flex-col p-2" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "TaskDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createVNode(_component_ipt, {
          label: unref(t)("data.TaskId"),
          modelValue: __props.item.TaskId,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.TaskId = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Title"),
          modelValue: __props.item.Title,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Title = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Completed"),
          modelValue: __props.item.IsCompleted,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.IsCompleted = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.Sponsor"),
          selected: __props.item.Sponsor
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.Executor"),
          selected: __props.item.Executor
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Profile"),
          modelValue: __props.item.Profile,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Profile = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.StartAt"),
          modelValue: __props.item.StartAt,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.StartAt = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.EndAt"),
          modelValue: __props.item.EndAt,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.EndAt = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$6 = { class: "flex flex-col p-2" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "StorageDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_Date = resolveComponent("Date");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(_component_ipt, {
          label: unref(t)("data.StorageId"),
          modelValue: __props.item.StorageId,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.StorageId = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Size"),
          modelValue: __props.item.Size,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Size = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Type"),
          modelValue: __props.item.Type,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Type = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Bucket"),
          modelValue: __props.item.Bucket,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Bucket = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Link"),
          modelValue: __props.item.Link,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Link = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$5 = { class: "flex flex-col p-2" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "InterlinkDetail",
  props: {
    item: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_ipt = resolveComponent("ipt");
      const _component_Date = resolveComponent("Date");
      const _component_MemberSelect = resolveComponent("MemberSelect");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createVNode(_component_ipt, {
          label: unref(t)("data.Code"),
          modelValue: __props.item.Code,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.item.Code = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Ver"),
          modelValue: __props.item.Ver,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => __props.item.Ver = $event),
          disabled: ""
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Name"),
          modelValue: __props.item.Name,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => __props.item.Name = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Contact"),
          modelValue: __props.item.Contact,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => __props.item.Contact = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Phone"),
          modelValue: __props.item.Phone,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => __props.item.Phone = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Gender"),
          modelValue: __props.item.Gender,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.item.Gender = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_Date, {
          label: unref(t)("data.Birthday"),
          selected: __props.item.Birthday
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Detail"),
          modelValue: __props.item.Detail,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => __props.item.Detail = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Address"),
          modelValue: __props.item.Address,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => __props.item.Address = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Website"),
          modelValue: __props.item.Website,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => __props.item.Website = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.CreateBy"),
          selected: __props.item.CreateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.CreateAt"),
          selected: __props.item.CreateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.UpdateBy"),
          selected: __props.item.UpdateBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.UpdateAt"),
          selected: __props.item.UndateAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_MemberSelect, {
          label: unref(t)("data.DeleteBy"),
          selected: __props.item.DeleteBy
        }, null, 8, ["label", "selected"]),
        createVNode(_component_Date, {
          label: unref(t)("data.DeleteAt"),
          selected: __props.item.DeleteAt
        }, null, 8, ["label", "selected"]),
        createVNode(_component_ipt, {
          label: unref(t)("data.Remark"),
          modelValue: __props.item.Remark,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => __props.item.Remark = $event)
        }, null, 8, ["label", "modelValue"]),
        createVNode(_component_btn, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString$1(unref(t)("data.Update")), 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache2) => (thing) => {
  const str = toString.call(thing);
  return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request2, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request2, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request2, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform2(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request2) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request2);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now2 = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now2;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now2;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now2 - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now2 - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now2 = Date.now()) => {
    timestamp = now2;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now2 = Date.now();
    const passed = now2 - timestamp;
    if (passed >= threshold) {
      invoke(args, now2);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request2 = new XMLHttpRequest();
    request2.open(_config.method.toUpperCase(), _config.url, true);
    request2.timeout = _config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request2 && request2.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      const response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request2));
      request2 = null;
    };
    request2.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request2);
      err.event = event || null;
      reject(err);
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request2
      ));
      request2 = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request2) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request2.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request2.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request2.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request2.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request2.upload.addEventListener("progress", uploadThrottled);
      request2.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request2) : cancel);
        request2.abort();
        request2 = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request2.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request2 = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request2 = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request2, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request: request2
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request2),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request2);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config ? config.env : {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2, config) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.12.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request2) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request2);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const route = [
  {
    path: "/",
    component: () => import("./index-DipH__xP.mjs"),
    meta: { title: "Index" }
  },
  {
    path: "/section",
    meta: { title: "Section" },
    children: [
      {
        path: "/section/",
        meta: { title: "Introduce" },
        children: [
          {
            path: "/section/started",
            component: () => import("~/packet/Intro/started.md"),
            meta: { title: "Started" }
          },
          {
            path: "/section/usage",
            component: () => import("~/packet/Intro/usage.md"),
            meta: { title: "Usage" }
          },
          {
            path: "/section/theme",
            component: () => import("~/packet/Intro/theme.md"),
            meta: { title: "Theme" }
          },
          {
            path: "/section/color",
            component: () => import("~/packet/Intro/color.md"),
            meta: { title: "Color" }
          }
        ]
      },
      {
        path: "/section/",
        meta: { title: "Element" },
        children: [
          {
            path: "/section/button",
            component: () => import("~/packet/Element/Button/button.md"),
            meta: { title: "Button" }
          },
          {
            path: "/section/icon",
            component: () => import("~/packet/Element/Icon/Icon.md"),
            meta: { title: "Icon" }
          },
          {
            path: "/section/input",
            component: () => import("~/packet/Element/Input/input.md"),
            meta: { title: "Input" }
          },
          {
            path: "/section/checkbox",
            component: () => import("~/packet/Element/Checkbox/checkbox.md"),
            meta: { title: "Checkbox" }
          },
          {
            path: "/section/toggle",
            component: () => import("~/packet/Element/Toggle/toggle.md"),
            meta: { title: "Toggle" }
          }
        ]
      },
      {
        path: "/section/",
        meta: { title: "Section" },
        children: [
          {
            path: "/section/buttongroup",
            component: () => import("~/packet/Section/ButtonGroup/ButtonGroup.md"),
            meta: { title: "ButtonGroup" }
          },
          {
            path: "/section/menu",
            component: () => import("~/packet/Section/Menu/menu.md"),
            meta: { title: "Menu" }
          },
          {
            path: "/section/dropdown",
            component: () => import("~/packet/Section/Dropdown/dropdown.md"),
            meta: { title: "Dropdown" }
          },
          {
            path: "/section/modal",
            component: () => import("~/packet/Section/Modal/modal.md"),
            meta: { title: "Modal" }
          }
        ]
      },
      {
        path: "/section/",
        meta: { title: "Pattern" },
        children: [
          {
            path: "/section/dropdown",
            component: () => import("~/packet/Section/Dropdown/dropdown.md"),
            meta: { title: "Form" }
          },
          {
            path: "/section/menu",
            component: () => import("~/packet/Section/Dropdown/dropdown.md"),
            meta: { title: "Drawer" }
          }
        ]
      },
      {
        path: "/section/",
        meta: { title: "Template" },
        children: [
          {
            path: "/section/dropdown",
            component: () => import("~/packet/Section/Dropdown/dropdown.md"),
            meta: { title: "Blog" }
          },
          {
            path: "/section/menu",
            component: () => import("~/packet/Section/Dropdown/dropdown.md"),
            meta: { title: "Document" }
          }
        ]
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...route,
    {
      path: "/test",
      component: () => import("./test-YWDhjlME.mjs"),
      meta: { title: "Test" }
    }
  ]
});
const showMessage = (status) => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
axios.defaults.timeout = 6e4;
axios.defaults.baseURL = "http://123.60.25.193:8888/";
axios.interceptors.request.use(
  (config) => {
    config.headers.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    config.headers.set("Authorization", "Bearer " + Store.getLocalStorage("Token"));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    if (response.data.code == 5e3) {
      router.push("/login");
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      alert("网路连接异常，请稍后再试!");
    }
  }
);
function request(url, method, params) {
  return new Promise((resolve, reject) => {
    let promise;
    if (method.toUpperCase() === "GET") {
      promise = axios({ method: "GET", url });
    } else if (method.toUpperCase() === "POST") {
      promise = axios({ method: "POST", url, params });
    } else if (method.toUpperCase() === "PUT") {
      promise = axios({ method: "PUT", url, params });
    } else if (method.toUpperCase() === "DELETE") {
      promise = axios({ method: "DELETE", url, params });
    } else {
      promise = axios({ url, params });
    }
    promise.then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
class Sheet {
  static async PartTable(params) {
    return request("/sheet/parttable", "GET", params);
  }
  static async PartDetail(params) {
    return request("/sheet/partdetail", "POST", params);
  }
  static async MaterialSelect(params) {
    return request("/sheet/materialselect", "GET", params);
  }
  static async SurfaceSelect(params) {
    return request("/sheet/surfaceselect", "GET", params);
  }
  static async StandardSelect(params) {
    return request("/sheet/standardselect", "GET", params);
  }
  static async SymbolSelect(params) {
    return request("/sheet/symbolselect", "GET", params);
  }
  static async MemberSelect(params) {
    return request("/sheet/memberselect", "GET", params);
  }
  static async BrandSelect(params) {
    return request("/sheet/brandselect", "GET", params);
  }
  static async ProjectSelect(params) {
    return request("/sheet/projectselect", "GET", params);
  }
  static async SectionTable(params) {
    return request("/sheet/sectiontable", "GET", params);
  }
  static async SectionDetail(params) {
    return request("/sheet/sectiondetail", "POST", params);
  }
  static async SectionPartTable(params) {
    return request("/sheet/sectionparttable", "POST", params);
  }
  static async SourceTable(params) {
    return request("/sheet/sourcetable", "GET", params);
  }
  static async SourceDetail(params) {
    return request("/sheet/sourcedetail", "POST", params);
  }
  static async StandardTable(params) {
    return request("/sheet/standardtable", "GET", params);
  }
  static async StandardDetail(params) {
    return request("/sheet/standarddetail", "POST", params);
  }
  static async ProjectTable(params) {
    return request("/sheet/projecttable", "GET", params);
  }
  static async ProjectDetail(params) {
    return request("/sheet/projectdetail", "POST", params);
  }
  static async TaskTable(params) {
    return request("/sheet/tasktable", "GET", params);
  }
  static async TaskDetail(params) {
    return request("/sheet/taskdetail", "POST", params);
  }
  static async StorageTable(params) {
    return request("/sheet/storagetable", "GET", params);
  }
  static async StorageDetail(params) {
    return request("/sheet/storagedetail", "POST", params);
  }
  static async InterlinkTable(params) {
    return request("/sheet/interlinktable", "GET", params);
  }
  static async InterlinkDetail(params) {
    return request("/sheet/interlinkdetail", "POST", params);
  }
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "MaterialSelect",
  props: {
    selected: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.MaterialSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Model",
        fieldValue: "StandardId",
        onSelect: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SymbolSelect",
  props: {
    selected: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.SymbolSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Model",
        fieldValue: "StandardId",
        onSelect: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SurfaceSelect",
  props: {
    selected: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.SurfaceSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Model",
        fieldValue: "StandardId",
        onSelect: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "StandardSelect",
  props: {
    selected: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.StandardSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Model",
        fieldValue: "StandardId",
        onSelect: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MemberSelect",
  props: {
    selected: { type: String, default: "", required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.MemberSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Name",
        fieldValue: "InterlinkId",
        onSelectIndex: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BrandSelect",
  props: {
    selected: { type: String, default: "", required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.BrandSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Name",
        fieldValue: "InterlinkId",
        onSelectIndex: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProjectSelect",
  props: {
    selected: { type: String, required: false },
    disabled: { type: Boolean, default: false, required: false }
  },
  setup(__props) {
    const sheet = reactive([]);
    onMounted(() => {
      Sheet.ProjectSelect().then((res) => {
        sheet.length = 0;
        sheet.push(...res.data.data);
      }).catch((reason) => {
        console.log(reason);
      });
    });
    const select = (e) => {
      console.log(e);
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createBlock(_component_Select, {
        options: sheet,
        selected: __props.selected,
        fieldLabel: "Name",
        fieldValue: "ProjectId",
        onSelect: select,
        disabled: __props.disabled
      }, null, 8, ["options", "selected", "disabled"]);
    };
  }
});
const install$2 = (app) => {
  app.component("TaskCreate", _sfc_main$m);
  app.component("AccountCreate", _sfc_main$l);
  app.component("ProjectCreate", _sfc_main$k);
  app.component("PartDetail", _sfc_main$j);
  app.component("SectionDetail", _sfc_main$i);
  app.component("SourceDetail", _sfc_main$h);
  app.component("StandardDetail", _sfc_main$g);
  app.component("ProjectDetail", _sfc_main$f);
  app.component("TaskDetail", _sfc_main$e);
  app.component("StorageDetail", _sfc_main$d);
  app.component("InterlinkDetail", _sfc_main$c);
  app.component("MaterialSelect", _sfc_main$b);
  app.component("SurfaceSelect", _sfc_main$9);
  app.component("StandardSelect", _sfc_main$8);
  app.component("SymbolSelect", _sfc_main$a);
  app.component("MemberSelect", _sfc_main$7);
  app.component("BrandSelect", _sfc_main$6);
  app.component("ProjectSelect", _sfc_main$5);
};
const _sfc_main$4 = {};
const _hoisted_1$4 = { class: "mx-auto container !max-w-screen-2xl px-6" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("footer", _hoisted_1$4, [..._cache[0] || (_cache[0] = [
    createElementVNode("div", { class: "px-6 pb-9 sm:(px-6 pb-18)" }, [
      createElementVNode("p", { class: "text-center text-sm text-gray-600 dark:text-gray-400" }, " MIT Licensed | Copyright © 2022-Present Cesar.Studio ")
    ], -1)
  ])]);
}
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const _hoisted_1$3 = { class: "flex sticky top-0 z-10 flex-none py-3 mx-auto w-full border-b bg-base-100 h-18" };
const _hoisted_2$3 = { class: "flex justify-between items-center px-5 lg:px-30 mx-auto w-full" };
const _hoisted_3$3 = { class: "flex items-center" };
const _hoisted_4$1 = {
  href: "/",
  class: "inline-flex items-center text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline"
};
const _hoisted_5 = { class: "text-primary" };
const _hoisted_6 = { class: "flex space-x-5" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  props: {
    projectName: {},
    themeComponent: {},
    darkComponent: {},
    languageComponent: {},
    userLink: {}
  },
  setup(__props) {
    const props = __props;
    const sidebar = inject("sidebar", {
      isOpen: ref(false),
      toggleSidebar: () => {
      }
    });
    sidebar?.isOpen;
    const toggleSidebar = sidebar?.toggleSidebar;
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_RouterLink = resolveComponent("RouterLink");
      return openBlock(), createElementBlock("nav", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2$3, [
          createElementVNode("div", _hoisted_3$3, [
            createVNode(_component_btn, {
              onClick: withModifiers(unref(toggleSidebar), ["prevent"]),
              clean: "",
              type: "button",
              size: "xl",
              class: "px-2 items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10"
            }, {
              default: withCtx(() => [
                createVNode(_component_icn, {
                  name: "bars",
                  regular: "",
                  xl: ""
                })
              ]),
              _: 1
            }, 8, ["onClick"]),
            createElementVNode("a", _hoisted_4$1, [
              createElementVNode("span", _hoisted_5, toDisplayString$1(props.projectName || "Cloud"), 1)
            ])
          ]),
          createElementVNode("div", _hoisted_6, [
            props.themeComponent ? (openBlock(), createBlock(resolveDynamicComponent(props.themeComponent), { key: 0 })) : createCommentVNode("", true),
            props.darkComponent ? (openBlock(), createBlock(resolveDynamicComponent(props.darkComponent), { key: 1 })) : createCommentVNode("", true),
            props.languageComponent ? (openBlock(), createBlock(resolveDynamicComponent(props.languageComponent), { key: 2 })) : createCommentVNode("", true),
            props.userLink ? (openBlock(), createBlock(_component_btn, {
              key: 3,
              clean: "",
              class: "text-base-content hover:text-primary"
            }, {
              default: withCtx(() => [
                createVNode(_component_RouterLink, {
                  to: props.userLink
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "user",
                      light: "",
                      xl: ""
                    })
                  ]),
                  _: 1
                }, 8, ["to"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
const navbar = [{
  title: "Dashboard",
  icon: "gauge",
  path: "/dashboard"
}, {
  title: "Task",
  icon: "calendar-check",
  path: "/task"
}, {
  title: "Project",
  icon: "layer-group",
  path: "/project"
}, {
  title: "Product",
  icon: "atom",
  path: "/product"
}, {
  title: "Data",
  icon: "database",
  path: "/data"
}, {
  title: "Website",
  icon: "globe",
  path: "/website"
}, {
  title: "Blog",
  icon: "blog",
  path: "/blog"
}, {
  title: "Section",
  icon: "section",
  path: "/sectum/"
}];
const _hoisted_1$2 = { class: "flex flex-col items-center h-screen w-20 bg-base-100 border-r dark:bg-gray-800 dark:border-gray-500 text-center" };
const _hoisted_2$2 = { class: "flex flex-col mt-6 gap-y-2" };
const _hoisted_3$2 = { class: "mx-2 text-sm font-normal" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  setup(__props) {
    let ind = ref(0);
    onMounted(() => {
      if (Store.getLocalStorage("Nav")) {
        ind.value = Store.getLocalStorage("Nav");
      } else {
        ind.value = 0;
      }
    });
    const Nav = ref(navbar);
    const setNav = (index) => {
      ind.value = index;
      Store.setLocalStorage("Nav", index);
    };
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[0] || (_cache[0] = createElementVNode("h2", { class: "font-medium text-primary text-xl pt-3" }, [
          createElementVNode("a", {
            href: "/",
            class: "no-underline"
          }, "Cloud")
        ], -1)),
        createElementVNode("nav", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(Nav.value, (item, index) => {
            return openBlock(), createBlock(_component_btn, {
              size: "md",
              item: "",
              key: index,
              tag: "RouterLink",
              class: normalizeClass(["flex flex-col items-center py-2 no-underline hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-20", [unref(ind) === index ? "bg-gray-200 text-blue-500 dark:bg-gray-800 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"]]),
              to: item.path,
              onClick: ($event) => setNav(index)
            }, {
              default: withCtx(() => [
                createVNode(_component_icn, {
                  name: item.icon,
                  light: "",
                  xl: ""
                }, null, 8, ["name"]),
                createElementVNode("span", _hoisted_3$2, toDisplayString$1(item.title), 1)
              ]),
              _: 2
            }, 1032, ["class", "to", "onClick"]);
          }), 128))
        ])
      ]);
    };
  }
});
function windowWidth() {
  const windowWidth2 = ref(0);
  const onWidthChange = () => windowWidth2.value = window.innerWidth;
  onMounted(() => {
    windowWidth2.value = window.innerWidth;
    window.addEventListener("resize", onWidthChange);
  });
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));
  const isMdSize = computed(() => {
    if (windowWidth2.value && windowWidth2.value >= 768) {
      return true;
    }
    return false;
  });
  const isLgSize = computed(() => {
    if (windowWidth2.value && windowWidth2.value >= 1024) {
      return true;
    }
    return false;
  });
  return { isMdSize, isLgSize };
}
const _hoisted_1$1 = { class: "lg:hidden flex items-center justify-between h-$navbar-height bg-primary-200/10 px-2" };
const _hoisted_2$1 = { class: "overflow-y-auto h-full max-w-2xs lg:fixed lg:mx-2 lg:w-60" };
const _hoisted_3$1 = {
  class: "px-1 pl-3 text-base lg:(text-sm pb-10 h-(screen-18))",
  "aria-label": "Docs navigation"
};
const _hoisted_4 = { class: "menu-title" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  props: {
    routes: {}
  },
  setup(__props) {
    const props = __props;
    const sidebar = inject("sidebar", {
      isOpen: ref(false),
      toggleSidebar: () => {
      }
    });
    const isOpen = sidebar?.isOpen;
    const toggleSidebar = sidebar?.toggleSidebar;
    const { isLgSize } = windowWidth();
    let router2 = useRoute();
    const isHome = computed(() => router2.meta.title === "Index");
    return (_ctx, _cache) => {
      const _component_bkd = resolveComponent("bkd");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Menu = resolveComponent("Menu");
      return openBlock(), createElementBlock(Fragment, null, [
        !unref(isLgSize) ? (openBlock(), createBlock(_component_bkd, {
          key: 0,
          onClick: unref(toggleSidebar),
          show: unref(isOpen)
        }, null, 8, ["onClick", "show"])) : createCommentVNode("", true),
        withDirectives(createElementVNode("aside", {
          class: normalizeClass([{ "!lg:hidden": isHome.value }, "fixed inset-0 z-10 flex-none w-72 h-screen bg-base-200 border-r lg:(z-0 static h-auto overflow-y-visible w-60 block)"])
        }, [
          createElementVNode("div", _hoisted_1$1, [
            createVNode(_component_btn, {
              onClick: unref(toggleSidebar),
              variant: "transparent",
              color: "secondary",
              class: "!fill-base-text"
            }, {
              default: withCtx(() => [
                createVNode(_component_icn, {
                  name: "arrow-left",
                  regular: "",
                  xl: ""
                })
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          createElementVNode("div", _hoisted_2$1, [
            createElementVNode("nav", _hoisted_3$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.routes, (menu) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: menu.meta?.title
                }, [
                  menu.children && menu.children.length > 1 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(menu.children, (parent) => {
                    return openBlock(), createBlock(_component_Menu, {
                      key: parent.meta?.title,
                      class: "w-full bg-base-200"
                    }, {
                      default: withCtx(() => [
                        createElementVNode("span", _hoisted_4, toDisplayString$1(parent.meta.title), 1),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(parent.children, (child) => {
                          return openBlock(), createBlock(_component_btn, {
                            size: "sm",
                            clean: "",
                            variant: "transparent",
                            key: child.path,
                            tag: "RouterLink",
                            to: child.path,
                            class: normalizeClass([unref(router2).meta.title === child.meta.title ? "border-l-2 border-primary bg-base-300 dark:bg-base-100" : ""])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString$1(child.meta.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["to", "class"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)) : createCommentVNode("", true)
                ], 64);
              }), 128))
            ])
          ])
        ], 2), [
          [vShow, unref(isOpen) || unref(isLgSize)]
        ])
      ], 64);
    };
  }
});
class Task {
  //新建任务
  static async Create(params) {
    return request("/task/create", "POST", params);
  }
  //获取任务列表
  static async List() {
    return request("/task/list", "GET");
  }
  //修改任务内容
  static async Update(params) {
    return request("/task/update", "PUT", params);
  }
  //删除任务（子任务）
  static async Delete(params) {
    return request("/task/delete", "DELETE", params);
  }
}
class Project {
  //创建项目
  static async Create(params) {
    return request("/project/create", "POST", params);
  }
  //获取项目列表
  static async List(params) {
    return request("/project/list", "GET", params);
  }
  //修改项目内容
  static async Update(params) {
    return request("/project/update", "PUT", params);
  }
  //删除项目
  static async Delete(params) {
    return request("/project/delete", "DELETE", params);
  }
  //获取项目详情
  static async Profile(params) {
    return request("/project/profile", "POST", params);
  }
}
const _hoisted_1 = { class: "flex flex-row" };
const _hoisted_2 = { class: "flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800 dark:border-gray-600" };
const _hoisted_3 = { class: "flex flex-row" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toolbar",
  props: {
    onLogout: { type: Function },
    onThemeChange: { type: Function },
    onLanguageChange: { type: Function },
    onTaskCreate: { type: Function },
    onAccountCreate: { type: Function },
    onNoticeClick: { type: Function },
    onSearchClick: { type: Function },
    onSettingClick: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const plusWidth = ref("");
    onMounted(() => {
      if (Store.getLocalStorage("locale")) {
        I18n.global.locale.value = Store.getLocalStorage("locale");
      }
    });
    const setLanguage = (locale) => {
      if (locale !== I18n.global.locale.value) {
        Store.setLocalStorage("locale", locale);
        I18n.global.locale.value = locale;
        props.onLanguageChange?.(locale);
        return true;
      } else {
        return false;
      }
    };
    const Logout = () => {
      router.push("/");
      props.onLogout?.();
      Store.removeLocalStorage("Token");
      Store.removeLocalStorage("Expire");
      Store.clearLocalStorage();
    };
    const isShowPlus = ref(false);
    const isShowUser = ref(false);
    const isShowTheme = ref(false);
    const isShowNotice = ref(false);
    const isShowLanguage = ref(false);
    const isShowTaskForm = ref(false);
    const isShowProjectForm = ref(false);
    const isShowAccountForm = ref(false);
    const showPlus = () => {
      isShowPlus.value = !isShowPlus.value;
      isShowUser.value = false;
      isShowTheme.value = false;
      isShowNotice.value = false;
      isShowLanguage.value = false;
      isShowTaskForm.value = false;
      isShowProjectForm.value = false;
      plusWidth.value = "w-32";
    };
    function showUser() {
      isShowUser.value = !isShowUser.value;
      isShowTheme.value = false;
      isShowNotice.value = false;
      isShowPlus.value = false;
      isShowLanguage.value = false;
    }
    function showTheme() {
      isShowTheme.value = !isShowTheme.value;
      isShowUser.value = false;
      isShowNotice.value = false;
      isShowPlus.value = false;
      isShowLanguage.value = false;
    }
    function showNotice() {
      isShowNotice.value = !isShowNotice.value;
      isShowUser.value = false;
      isShowTheme.value = false;
      isShowPlus.value = false;
      isShowLanguage.value = false;
      props.onNoticeClick?.();
    }
    function showLanguage() {
      isShowLanguage.value = !isShowLanguage.value;
      isShowUser.value = false;
      isShowTheme.value = false;
      isShowPlus.value = false;
      isShowNotice.value = false;
    }
    const isTheme = ref("theme-default");
    onMounted(() => {
      if (Store.getLocalStorage("theme"))
        isTheme.value = Store.getLocalStorage("theme");
      document.documentElement.classList.add(isTheme.value);
    });
    function changeTheme(color) {
      document.documentElement.classList.remove(isTheme.value);
      isTheme.value = color;
      document.documentElement.classList.add(isTheme.value);
      Store.setLocalStorage("theme", isTheme.value);
      props.onThemeChange?.(color);
    }
    function plusTask() {
      isShowTaskForm.value = true;
      isShowProjectForm.value = false;
      isShowAccountForm.value = false;
      plusWidth.value = "w-100";
      props.onTaskCreate?.();
    }
    function plusAccount() {
      isShowAccountForm.value = true;
      isShowProjectForm.value = false;
      isShowTaskForm.value = false;
      plusWidth.value = "w-100";
      props.onAccountCreate?.();
    }
    const handleTaskSubmit = async (formData) => {
      try {
        const response = await Task.Create(formData);
        if (response.data.code === 0) {
          handleTaskSuccess(response);
        } else {
          handleTaskError(response.data.message);
        }
      } catch (error) {
        handleTaskError(error);
      }
    };
    const handleTaskSuccess = (response) => {
      console.log("任务创建成功:", response);
    };
    const handleTaskError = (error, response) => {
      console.error("任务创建失败:", error);
      if (response?.data?.message) {
        console.error("错误信息:", response.data.message);
      }
    };
    const handleAccountSubmit = async (formData) => {
      try {
        const response = await Project.Create(formData);
        if (response.data.code === 0) {
          handleAccountSuccess(response);
        } else {
          handleAccountError(response.data.message);
        }
      } catch (error) {
        handleAccountError(error);
      }
    };
    const handleAccountSuccess = (response) => {
      console.log("账户创建成功:", response);
    };
    const handleAccountError = (error, response) => {
      console.error("账户创建失败:", error);
      if (response?.data?.message) {
        console.error("错误信息:", response.data.message);
      }
    };
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Dark = resolveComponent("Dark");
      const _component_FullScreen = resolveComponent("FullScreen");
      const _component_Menu = resolveComponent("Menu");
      const _component_TaskCreate = resolveComponent("TaskCreate");
      const _component_AccountCreate = resolveComponent("AccountCreate");
      const _component_Drawer = resolveComponent("Drawer");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_Menu, { class: "flex flex-col h-full w-full" }, {
            default: withCtx(() => [
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: showPlus
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "plus",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: showUser
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "user",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Dark, {
                item: "",
                class: "flex items-center justify-center w-full h-12"
              }),
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: showTheme
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "swatchbook",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: showLanguage
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "language",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: showNotice
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "bell",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_btn, {
                item: "",
                class: "hover:text-primary flex items-center justify-center w-full h-12",
                onClick: _cache[0] || (_cache[0] = ($event) => props.onSearchClick?.())
              }, {
                default: withCtx(() => [
                  createVNode(_component_icn, {
                    name: "magnifying-glass",
                    light: "",
                    lg: ""
                  })
                ]),
                _: 1
              }),
              createVNode(_component_FullScreen, null, {
                default: withCtx(({ toggle, isFullscreen }) => [
                  createVNode(_component_btn, {
                    item: "",
                    onClick: ($event) => toggle(),
                    class: "hover:text-primary flex items-center justify-center w-full h-12"
                  }, {
                    default: withCtx(() => [
                      withDirectives(createElementVNode("span", null, [
                        createVNode(_component_icn, {
                          name: "expand",
                          light: "",
                          lg: ""
                        })
                      ], 512), [
                        [vShow, !isFullscreen]
                      ]),
                      withDirectives(createElementVNode("span", null, [
                        createVNode(_component_icn, {
                          name: "compress",
                          light: "",
                          lg: ""
                        })
                      ], 512), [
                        [vShow, isFullscreen]
                      ])
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createVNode(_component_Drawer, {
          title: unref(t)("toolbar.plus"),
          width: plusWidth.value,
          isShow: isShowPlus.value,
          "onUpdate:isShow": showPlus
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_3, [
              createVNode(_component_Menu, {
                shadow: "",
                class: "w-36 h-screen"
              }, {
                default: withCtx(() => [
                  createVNode(_component_btn, {
                    item: "",
                    onClick: plusTask,
                    class: normalizeClass([isShowTaskForm.value ? "bg-gray-200 dark:bg-gray-700" : ""])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_icn, {
                        name: "calendar-check",
                        light: "",
                        lg: ""
                      }),
                      createTextVNode(toDisplayString$1(unref(t)("task.task")), 1)
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode(_component_btn, {
                    item: "",
                    onClick: plusAccount,
                    class: normalizeClass([isShowAccountForm.value ? "bg-gray-200 dark:bg-gray-700" : ""])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_icn, {
                        name: "user",
                        light: "",
                        lg: ""
                      }),
                      createTextVNode(toDisplayString$1(unref(t)("toolbar.account")), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }),
              isShowTaskForm.value ? (openBlock(), createBlock(_component_TaskCreate, {
                key: 0,
                onSubmit: handleTaskSubmit,
                onSuccess: handleTaskSuccess,
                onError: handleTaskError
              })) : createCommentVNode("", true),
              isShowAccountForm.value ? (openBlock(), createBlock(_component_AccountCreate, {
                key: 1,
                onSubmit: handleAccountSubmit,
                onSuccess: handleAccountSuccess,
                onError: handleAccountError
              })) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["title", "width", "isShow"]),
        createVNode(_component_Drawer, {
          title: "User",
          isShow: isShowUser.value,
          "onUpdate:isShow": showUser
        }, {
          default: withCtx(() => [
            createVNode(_component_Menu, {
              shadow: "",
              class: "h-screen"
            }, {
              default: withCtx(() => [
                createVNode(_component_btn, {
                  item: "",
                  onClick: _cache[1] || (_cache[1] = ($event) => Logout())
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "calendar-check",
                      light: "",
                      lg: ""
                    }),
                    createTextVNode(toDisplayString$1(unref(t)("toolbar.logout")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  item: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => props.onSettingClick?.())
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: "gear",
                      light: "",
                      lg: ""
                    }),
                    createTextVNode(toDisplayString$1(unref(t)("toolbar.setting")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["isShow"]),
        createVNode(_component_Drawer, {
          title: "Theme",
          width: "w-36",
          isShow: isShowTheme.value,
          "onUpdate:isShow": showTheme
        }, {
          default: withCtx(() => [
            createVNode(_component_Menu, {
              shadow: "",
              class: "bg-base-300 dark:bg-base-100 m-3"
            }, {
              default: withCtx(() => [
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[3] || (_cache[3] = ($event) => changeTheme("theme-default"))
                }, {
                  default: withCtx(() => [
                    _cache[10] || (_cache[10] = createElementVNode("span", { class: "theme-blue rounded-$rounded-btn bg-blue-700 h-6 w-6" }, null, -1)),
                    createTextVNode(toDisplayString$1(unref(t)("theme.blue")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[4] || (_cache[4] = ($event) => changeTheme("theme-teal"))
                }, {
                  default: withCtx(() => [
                    _cache[11] || (_cache[11] = createElementVNode("span", { class: "theme-teal rounded-$rounded-btn bg-teal-700 h-6 w-6" }, null, -1)),
                    createTextVNode(toDisplayString$1(unref(t)("theme.teal")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[5] || (_cache[5] = ($event) => changeTheme("theme-rose"))
                }, {
                  default: withCtx(() => [
                    _cache[12] || (_cache[12] = createElementVNode("span", { class: "theme-rose rounded-$rounded-btn bg-rose-700 h-6 w-6" }, null, -1)),
                    createTextVNode(toDisplayString$1(unref(t)("theme.rose")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[6] || (_cache[6] = ($event) => changeTheme("theme-violet"))
                }, {
                  default: withCtx(() => [
                    _cache[13] || (_cache[13] = createElementVNode("span", { class: "theme-violet rounded-$rounded-btn bg-violet-700 h-6 w-6" }, null, -1)),
                    createTextVNode(toDisplayString$1(unref(t)("theme.violet")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[7] || (_cache[7] = ($event) => changeTheme("theme-orange"))
                }, {
                  default: withCtx(() => [
                    _cache[14] || (_cache[14] = createElementVNode("span", { class: "theme-orange rounded-$rounded-btn bg-orange-700 h-6 w-6" }, null, -1)),
                    createTextVNode(toDisplayString$1(unref(t)("theme.orange")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["isShow"]),
        createVNode(_component_Drawer, {
          title: "Language",
          isShow: isShowLanguage.value,
          "onUpdate:isShow": showLanguage
        }, {
          default: withCtx(() => [
            createVNode(_component_Menu, {
              shadow: "",
              class: "bg-base-300 dark:bg-base-100 m-3"
            }, {
              default: withCtx(() => [
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[8] || (_cache[8] = ($event) => setLanguage("en-US"))
                }, {
                  default: withCtx(() => [..._cache[15] || (_cache[15] = [
                    createTextVNode(" English ", -1)
                  ])]),
                  _: 1
                }),
                createVNode(_component_btn, {
                  clean: "",
                  onClick: _cache[9] || (_cache[9] = ($event) => setLanguage("zh-CN"))
                }, {
                  default: withCtx(() => [..._cache[16] || (_cache[16] = [
                    createTextVNode(" 中文 ", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["isShow"]),
        createVNode(_component_Drawer, {
          title: "Notice",
          isShow: isShowNotice.value,
          "onUpdate:isShow": showNotice
        }, {
          default: withCtx(() => [..._cache[17] || (_cache[17] = [
            createElementVNode("h1", null, "用户登录", -1),
            createElementVNode("h1", null, "用户登出", -1)
          ])]),
          _: 1
        }, 8, ["isShow"])
      ]);
    };
  }
});
const install$1 = (app) => {
  app.component("Footer", Footer);
  app.component("Header", _sfc_main$3);
  app.component("Navbar", _sfc_main$2);
  app.component("Sidebar", _sfc_main$1);
  app.component("Toolbar", _sfc_main);
};
const install = (app) => {
  app.use(install$5);
  app.use(install$4);
  app.use(install$3);
  app.use(install$1);
  app.use(install$2);
};
export {
  Catalog as C,
  Footer as F,
  _sfc_main$s as _,
  install$5 as a,
  install$4 as b,
  install$3 as c,
  install$1 as d,
  install$2 as e,
  _sfc_main$r as f,
  _sfc_main$q as g,
  _sfc_main$o as h,
  install as i,
  _sfc_main$n as j,
  useI18n as u
};
//# sourceMappingURL=index-CV0rKLaB.mjs.map
