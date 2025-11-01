if (typeof process === "undefined") {
  window.process = { env: {} };
  globalThis.process = { env: {} };
}
import { defineComponent, computed, createBlock, openBlock, resolveDynamicComponent, normalizeClass, withCtx, createElementBlock, createCommentVNode, renderSlot, ref, createElementVNode, toDisplayString as toDisplayString$1, withDirectives, vModelCheckbox, onMounted, nextTick, normalizeStyle, resolveComponent, createVNode, vShow, Transition as Transition$1, Fragment, renderList, reactive, toRefs, unref, createApp, watch, createTextVNode, onBeforeUnmount, withModifiers, getCurrentInstance, inject, shallowRef, onUnmounted, effectScope, isRef, h as h$1, Text, useSlots } from "vue";
import { useRoute } from "vue-router";
import { createValueHandler, colorToString, colorOpacityToString, parseCssColor, getStringComponent, getStringComponents, variantParentMatcher, createPartClasses, variantMatcher, variantGetParameter, variantGetBracket, calcMaxWidthBySize, createPseudoClassesAndElements, getBracket, createPseudoClassFunctions, createTaggedPseudoClasses, hasThemeFn, transformThemeFn } from "@unocss/rule-utils";
import { resolveBreakpoints as resolveBreakpoints$1, makeGlobalStaticRules as makeGlobalStaticRules$1, directionSize as directionSize$1, colorResolver as colorResolver$1, h as h$2, globalKeywords as globalKeywords$1, colorableShadows as colorableShadows$1, variantParentMatcher as variantParentMatcher$1, variantMatcher as variantMatcher$1, hasParseableColor as hasParseableColor$1, positionMap as positionMap$1, directionMap as directionMap$1, parseColor as parseColor$1 } from "@unocss/preset-mini/utils";
const _hoisted_1$x = {
  key: 0,
  class: "btn-loading-icon animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
};
const _sfc_main$N = /* @__PURE__ */ defineComponent({
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
        return "bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-pointer no-underline hover:no-underline focus:no-underline";
      }
      return [
        // 基础样式 - 重置浏览器默认样式
        "border-none outline-none bg-transparent",
        "font-semibold inline-flex items-center justify-center select-none relative overflow-hidden",
        // 链接态去下划线
        "no-underline hover:no-underline focus:no-underline",
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
      const sizes2 = {
        xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
        sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
        md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
        lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
        xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
      };
      return sizes2[props.size] || sizes2.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean || props.item) return "";
      const variants2 = {
        default: (color) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
        outline: (color) => `text-${color} ring-2 ring-${color} ring-inset bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
        transparent: (color) => `text-${color} bg-transparent hover:bg-${color}/10`,
        link: (color) => `text-${color} bg-transparent hover:underline`
      };
      const variantFn = variants2[props.variant];
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
          props.loading ? (openBlock(), createElementBlock("div", _hoisted_1$x)) : createCommentVNode("", true),
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
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-31f68421"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
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
      const sizes2 = {
        xs: props.circle ? "w-6 h-6 p-0 text-xs" : "h-6 px-1 text-xs",
        sm: props.circle ? "w-8 h-8 p-0 text-sm" : "h-8 px-2 text-sm",
        md: props.circle ? "w-10 h-10 p-0 text-sm" : "h-10 px-4 text-sm",
        lg: props.circle ? "w-12 h-12 p-0 text-base" : "h-12 px-5 text-base",
        xl: props.circle ? "w-14 h-14 p-0 text-xl" : "h-14 px-6 text-xl"
      };
      return sizes2[props.size] || sizes2.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean || props.item) return "";
      const variants2 = {
        default: (color) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
        outline: (color) => `text-${color} border-2 border-${color} border-solid bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
        transparent: (color) => `text-${color} bg-transparent hover:bg-${color}/10`,
        link: (color) => `text-${color} bg-transparent hover:underline`
      };
      const variantFn = variants2[props.variant];
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
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-791b1ff8"]]);
const _hoisted_1$w = ["value", "name", "placeholder", "type", "disabled"];
const _hoisted_2$c = ["textContent"];
const _sfc_main$L = /* @__PURE__ */ defineComponent({
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
        "min-w-0 flex-shrink-0",
        // 防止溢出
        // 圆角
        props.pills ? "rounded-full" : props.circle ? "rounded-full" : "rounded-$rounded-btn"
      ].filter(Boolean).join(" ");
    });
    const sizeClasses = computed(() => {
      if (props.clean) return "";
      const sizes2 = {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-xl"
      };
      return sizes2[props.size] || sizes2.md;
    });
    const colorVariantClasses = computed(() => {
      if (props.clean) return "";
      const variants2 = {
        // default: 默认透明边框（保持大小不变），聚焦时显示边框（不受 bordered 影响）
        default: () => "border border-transparent focus:border-base-300 focus:outline-2 focus:outline-base-300 focus:outline-offset-2",
        // 其他颜色: 一直显示边框，聚焦时显示外围边框（需要 bordered 为 true）
        primary: () => props.bordered ? "border border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2" : "",
        secondary: () => props.bordered ? "border border-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2" : "",
        success: () => props.bordered ? "border border-success focus:outline-2 focus:outline-success focus:outline-offset-2" : "",
        error: () => props.bordered ? "border border-error focus:outline-2 focus:outline-error focus:outline-offset-2" : "",
        warning: () => props.bordered ? "border border-warning focus:outline-2 focus:outline-warning focus:outline-offset-2" : ""
      };
      const variantFn = variants2[props.color];
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
        }, null, 42, _hoisted_1$w),
        isError.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(validationClasses.value),
          textContent: toDisplayString$1(__props.error)
        }, null, 10, _hoisted_2$c)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1$v = ["disabled"];
const _sfc_main$K = /* @__PURE__ */ defineComponent({
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
      }, null, 10, _hoisted_1$v)), [
        [vModelCheckbox, isChecked.value]
      ]);
    };
  }
});
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-cd5cc613"]]);
const _hoisted_1$u = ["disabled"];
const _sfc_main$J = /* @__PURE__ */ defineComponent({
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
      const sizes2 = {
        xs: "w-6 h-4",
        sm: "w-8 h-5",
        md: "w-12 h-6",
        lg: "w-16 h-8",
        xl: "w-20 h-10"
      };
      return sizes2[props.size] || sizes2.md;
    });
    const colorClasses = computed(() => {
      if (!props.checked) return "";
      const colors2 = {
        primary: "border-primary bg-primary text-primary",
        secondary: "border-secondary bg-secondary text-secondary",
        success: "border-success bg-success text-success",
        error: "border-error bg-error text-error",
        warning: "border-warning bg-warning text-warning"
      };
      return colors2[props.color] || colors2.primary;
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
      }, null, 10, _hoisted_1$u)), [
        [vModelCheckbox, isChecked.value]
      ]);
    };
  }
});
const Toggle = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-bca215d5"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
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
const _sfc_main$H = /* @__PURE__ */ defineComponent({
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
const _hoisted_1$t = ["value", "rows", "cols", "disabled", "readonly", "placeholder", "maxlength"];
const _sfc_main$G = /* @__PURE__ */ defineComponent({
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
        "min-w-0 flex-shrink-0",
        "rounded-$rounded-btn"
      ].join(" ");
    });
    const sizeClasses = computed(() => {
      const sizes2 = {
        xs: "h-20 px-2 py-1 text-xs",
        sm: "h-24 px-3 py-2 text-sm",
        md: "h-32 px-4 py-3 text-sm",
        lg: "h-40 px-5 py-4 text-base",
        xl: "h-48 px-6 py-5 text-xl"
      };
      return sizes2[props.size] || sizes2.md;
    });
    const colorVariantClasses = computed(() => {
      const variants2 = {
        default: () => props.bordered ? "border border-base-300 focus:outline-2 focus:outline-offset-2 focus:outline-base-300" : "",
        primary: () => props.bordered ? "border border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary" : "",
        secondary: () => props.bordered ? "border border-secondary focus:outline-2 focus:outline-offset-2 focus:outline-secondary" : "",
        success: () => props.bordered ? "border border-success focus:outline-2 focus:outline-offset-2 focus:outline-success" : "",
        error: () => props.bordered ? "border border-error focus:outline-2 focus:outline-offset-2 focus:outline-error" : "",
        warning: () => props.bordered ? "border border-warning focus:outline-2 focus:outline-offset-2 focus:outline-warning" : ""
      };
      const variantFn = variants2[props.color];
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
    const blur2 = (e) => {
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
          onBlur: blur2,
          maxlength: __props.maxlength,
          class: normalizeClass(textareaClasses.value)
        }, null, 42, _hoisted_1$t),
        __props.showCounter ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(counterClasses.value)
        }, toDisplayString$1(quantity.value) + "/" + toDisplayString$1(__props.maxlength), 3)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Textarea = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-d533ebeb"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
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
const Transition = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-25e2ffe3"]]);
const _hoisted_1$s = { class: "flex flex-col items-center" };
const _hoisted_2$b = { class: "font-bold text-sm mt-1" };
const _hoisted_3$9 = { class: "opacity-50 font-mono text-xs -mt-1" };
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "Color",
  props: {
    color: {
      default: ""
    }
  },
  setup(__props) {
    const colors2 = {
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
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337"
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
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75"
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
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95"
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
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b"
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
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#365314",
        900: "#1a2e05"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717"
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
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b"
      },
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a"
      },
      // light 映射到浅色系（从白色到浅灰）
      light: {
        50: "#ffffff",
        100: "#fafafa",
        200: "#f5f5f5",
        300: "#f0f0f0",
        400: "#e8e8e8",
        500: "#d9d9d9",
        600: "#bfbfbf",
        700: "#a6a6a6",
        800: "#8c8c8c",
        900: "#737373"
      },
      // dark 映射到深色系（从深灰到黑色）
      dark: {
        50: "#4a4a4a",
        100: "#3f3f3f",
        200: "#333333",
        300: "#292929",
        400: "#1f1f1f",
        500: "#1a1a1a",
        600: "#141414",
        700: "#0f0f0f",
        800: "#0a0a0a",
        900: "#000000"
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
    const hex = computed(() => {
      const colorName = color.value.toLowerCase();
      if (colors2[colorName]?.[+level.value]) {
        return colors2[colorName][+level.value];
      }
      const camelizedName = camelize(color.value);
      return colors2[camelizedName]?.[+level.value] || "";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        createElementVNode("div", {
          class: normalizeClass(["w-14 h-14 rounded border border-gray-200 dark:border-gray-700", props.color]),
          style: normalizeStyle(hex.value ? { backgroundColor: hex.value } : {})
        }, null, 6),
        createElementVNode("div", _hoisted_2$b, toDisplayString$1(level.value), 1),
        createElementVNode("div", _hoisted_3$9, toDisplayString$1(hex.value || "N/A"), 1)
      ]);
    };
  }
});
const _hoisted_1$r = { class: "my-8" };
const _hoisted_2$a = { class: "mb-3 mt-8" };
const _hoisted_3$8 = { class: "font-bold" };
const _hoisted_4$5 = { class: "flex gap-2 mb-2" };
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "Palette",
  setup(__props) {
    const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const colors2 = [
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
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        (openBlock(), createElementBlock(Fragment, null, renderList(colors2, (color) => {
          return createElementVNode("div", { key: color }, [
            createElementVNode("div", _hoisted_2$a, [
              createElementVNode("span", _hoisted_3$8, toDisplayString$1(color), 1)
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
const _sfc_main$C = /* @__PURE__ */ defineComponent({
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
const MessageComponent = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-4c4a9d11"]]);
const MessageTypes = {
  SUCCESS: "success",
  MESSAGE: "message",
  WARNING: "warning",
  ERROR: "error"
};
const messageArr = ref([]);
const Message = (options) => {
  const messageApp = createApp(MessageComponent, options);
  showMessage(messageApp, options.duration || 3e3);
};
const MessageWithMethods = Message;
Object.values(MessageTypes).forEach((type) => {
  MessageWithMethods[type] = (options) => {
    const optionsWithType = { ...options, type };
    return Message(optionsWithType);
  };
});
function showMessage(app, duration2) {
  const oFrag = document.createDocumentFragment();
  const vm = app.mount(oFrag);
  messageArr.value.push(vm);
  document.body.appendChild(oFrag);
  setTop(vm);
  vm.setVisible(true);
  watch(messageArr, () => setTop(vm));
  hideMessage(app, vm, duration2);
}
function hideMessage(app, vm, duration2) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false);
    app.unmount();
    messageArr.value = messageArr.value.filter((item) => item !== vm);
    clearTimeout(vm.timer);
    vm.timer = null;
  }, duration2);
}
function setTop(vm) {
  const { setTop: setTop2, height: height2, margin } = vm;
  const currentIndex = messageArr.value.findIndex((item) => item === vm);
  const baseTop = 5;
  setTop2(baseTop + (margin * 2 + height2) * currentIndex);
}
const _hoisted_1$q = {
  key: 0,
  class: "flex flex-col gap-0 py-5"
};
const _hoisted_2$9 = ["title"];
const _hoisted_3$7 = { class: "code-slot-container py-3" };
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "Code",
  props: {
    code: { type: String, default: "" },
    // 代码内容
    language: { type: String, default: "" },
    // 编程语言
    inline: { type: Boolean, default: false },
    // 是否为行内代码
    wordWrap: { type: Boolean, default: false },
    // 是否自动换行
    trim: { type: Boolean, default: true }
    // 是否去除首尾空白
  },
  setup(__props) {
    const props = __props;
    const codeRef = ref(null);
    const isCodeExpanded = ref(true);
    const decodeHtmlEntities = (text) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    };
    const copyCode = async () => {
      try {
        const codeToCopy = props.code || codeRef.value?.querySelector("._code")?.textContent || "";
        await navigator.clipboard.writeText(codeToCopy);
        console.log("代码已复制到剪贴板");
      } catch (err) {
        console.error("复制失败:", err);
      }
    };
    const toggleCode = () => {
      isCodeExpanded.value = !isCodeExpanded.value;
    };
    const setCode = () => {
      if (!codeRef.value) return;
      let decodedCode = props.code;
      if (props.code.includes("&#")) {
        decodedCode = decodeHtmlEntities(props.code);
      }
      const codeContent = props.inline || props.trim ? decodedCode.trim() : decodedCode;
      if (props.inline) {
        codeRef.value.textContent = codeContent;
      } else {
        let codeEl = codeRef.value.querySelector("._code");
        if (!codeEl) {
          codeEl = document.createElement("code");
          codeEl.className = "_code";
          const slotContainer = codeRef.value.querySelector(".code-slot-container");
          if (slotContainer) {
            slotContainer.innerHTML = "";
            slotContainer.appendChild(codeEl);
          } else {
            codeRef.value.appendChild(codeEl);
          }
        }
        if (codeEl) {
          codeEl.textContent = codeContent;
        }
        if (codeRef.value) {
          const pre = codeRef.value;
          const styles = window.getComputedStyle(pre);
          console.log("=== Pre 元素高度信息 ===");
          console.log("pre.clientHeight:", pre.clientHeight, "px");
          console.log("pre.scrollHeight:", pre.scrollHeight, "px");
          console.log("pre.offsetHeight:", pre.offsetHeight, "px");
          console.log("pre.clientTop (上边框):", pre.clientTop, "px");
          console.log("CSS padding-top:", styles.paddingTop);
          console.log("CSS padding-bottom:", styles.paddingBottom);
          console.log("CSS height:", styles.height);
          console.log("CSS line-height:", styles.lineHeight);
          console.log("CSS box-sizing:", styles.boxSizing);
          console.log("");
          console.log("=== 内部子元素高度 ===");
          const headerLine = pre.querySelector(".code-header-line");
          if (headerLine) {
            const headerStyles = window.getComputedStyle(headerLine);
            console.log("code-header-line.offsetHeight:", headerLine.offsetHeight, "px");
            console.log("code-header-line.clientHeight:", headerLine.clientHeight, "px");
            console.log("code-header-line CSS height:", headerStyles.height);
          }
          const languageLabel = pre.querySelector(".code-language-label");
          if (languageLabel) {
            const labelStyles = window.getComputedStyle(languageLabel);
            console.log("code-language-label.offsetHeight:", languageLabel.offsetHeight, "px");
            console.log("code-language-label.clientHeight:", languageLabel.clientHeight, "px");
            console.log("code-language-label CSS height:", labelStyles.height);
            console.log("code-language-label CSS padding:", labelStyles.padding);
          }
          const slotContainer = pre.querySelector(".code-slot-container");
          if (slotContainer) {
            const containerStyles = window.getComputedStyle(slotContainer);
            console.log("code-slot-container.offsetHeight:", slotContainer.offsetHeight, "px");
            console.log("code-slot-container.clientHeight:", slotContainer.clientHeight, "px");
            console.log("code-slot-container.scrollHeight:", slotContainer.scrollHeight, "px");
            console.log("code-slot-container CSS height:", containerStyles.height);
            console.log("code-slot-container CSS display:", containerStyles.display);
            console.log("code-slot-container CSS line-height:", containerStyles.lineHeight);
            console.log("code-slot-container CSS margin:", containerStyles.margin);
            console.log("code-slot-container CSS padding:", containerStyles.padding);
            console.log("code-slot-container 子元素数量:", slotContainer.children.length);
            console.log("code-slot-container 文本节点数量:", Array.from(slotContainer.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).length);
          }
          const codeEl2 = pre.querySelector("._code");
          if (codeEl2) {
            const codeStyles = window.getComputedStyle(codeEl2);
            console.log("_code.offsetHeight:", codeEl2.offsetHeight, "px");
            console.log("_code.clientHeight:", codeEl2.clientHeight, "px");
            console.log("_code.scrollHeight:", codeEl2.scrollHeight, "px");
            console.log("_code CSS height:", codeStyles.height);
            console.log("_code CSS line-height:", codeStyles.lineHeight);
            console.log("_code CSS display:", codeStyles.display);
            console.log("_code CSS white-space:", codeStyles.whiteSpace);
            console.log("_code CSS margin:", codeStyles.margin);
            console.log("_code CSS padding:", codeStyles.padding);
            console.log("_code textContent 行数:", codeEl2.textContent?.split("\n").length || 0);
            console.log("_code textContent 长度:", codeEl2.textContent?.length || 0);
          }
          let totalHeight = 0;
          let normalFlowHeight = 0;
          if (slotContainer) {
            normalFlowHeight = slotContainer.offsetHeight;
            totalHeight += slotContainer.offsetHeight;
          } else if (codeEl2) {
            normalFlowHeight = codeEl2.offsetHeight;
            totalHeight += codeEl2.offsetHeight;
          }
          const allChildren = Array.from(pre.childNodes);
          let totalTextHeight = 0;
          let textNodesInfo = [];
          allChildren.forEach((node, index) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent || "";
              const lines = text.split("\n").length;
              const nodeHeight = lines > 1 ? (lines - 1) * 21 : 0;
              if (lines > 1 || text.trim()) {
                totalTextHeight += nodeHeight;
                const visibleText = text.replace(/\n/g, "\\n").replace(/ /g, "·").substring(0, 40);
                textNodesInfo.push(`  文本节点[${index}]: "${visibleText}" - ${lines}行 = ${nodeHeight}px`);
              }
            } else if (node.nodeType === Node.COMMENT_NODE) {
              textNodesInfo.push(`  注释节点[${index}]: <!-- ${node.data.substring(0, 30)}... -->`);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node;
              textNodesInfo.push(`  元素节点[${index}]: <${el.tagName.toLowerCase()} class="${el.className}">`);
            }
          });
          console.log("");
          console.log("=== 高度分析 ===");
          console.log("正常流元素高度 (code-slot-container):", normalFlowHeight, "px");
          console.log("绝对定位元素高度:");
          if (headerLine) console.log("  - header-line:", headerLine.offsetHeight, "px (绝对定位)");
          if (languageLabel) console.log("  - language-label:", languageLabel.offsetHeight, "px (绝对定位)");
          console.log("pre.clientHeight:", pre.clientHeight, "px");
          console.log("pre 所有直接子节点:", allChildren.length, "个");
          if (textNodesInfo.length > 0) {
            console.log("文本/注释节点:");
            textNodesInfo.forEach((info) => console.log(info));
            console.log("文本节点总高度:", totalTextHeight, "px");
          }
          console.log("高度差:", pre.clientHeight - normalFlowHeight, "px");
          console.log("计算验证:");
          console.log("  - code-slot-container:", normalFlowHeight, "px");
          console.log("  - 文本节点高度:", totalTextHeight, "px");
          console.log("  - 总和:", normalFlowHeight + totalTextHeight, "px");
          console.log("  - pre.clientHeight:", pre.clientHeight, "px");
          console.log("  - 剩余高度:", pre.clientHeight - normalFlowHeight - totalTextHeight, "px");
          console.log("========================");
        }
      }
    };
    onMounted(() => {
      setCode();
      if (codeRef.value && !props.inline) {
        nextTick(() => {
          const pre = codeRef.value;
          if (!pre) return;
          const nodesToRemove = [];
          pre.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent || "";
              if (!text.trim() && /^[\s\n\r\t]*$/.test(text)) {
                nodesToRemove.push(node);
              }
            }
          });
          nodesToRemove.forEach((node) => {
            if (node.parentNode) {
              node.parentNode.removeChild(node);
            }
          });
        });
      }
    });
    watch(() => props.code, setCode);
    watch(() => props.language, setCode);
    watch(() => props.inline, setCode);
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      return !__props.inline ? (openBlock(), createElementBlock("div", _hoisted_1$q, [
        createElementVNode("div", {
          class: normalizeClass([
            "relative h-8 border-b border-b-solid border-base-300 dark:border-dark-base-300 flex items-center justify-center gap-3 bg-base-200 dark:bg-dark-base-200 m-0 pointer-events-auto",
            isCodeExpanded.value ? "rounded-t-lg" : "rounded-lg"
          ])
        }, [
          createElementVNode("button", {
            onClick: toggleCode,
            class: "p-1 rounded hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none",
            style: { "font-family": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" },
            type: "button",
            title: isCodeExpanded.value ? "折叠代码" : "展开代码"
          }, [
            createVNode(_component_icn, {
              name: "code",
              light: "",
              sm: "",
              class: "text-base-content/60 hover:text-base-content dark:text-dark-base-content/60 dark:hover:text-dark-base-content"
            })
          ], 8, _hoisted_2$9),
          createElementVNode("button", {
            onClick: copyCode,
            class: "p-1 rounded hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none",
            style: { "font-family": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" },
            type: "button",
            title: "复制代码"
          }, [
            createVNode(_component_icn, {
              name: "copy",
              light: "",
              sm: "",
              class: "text-base-content/60 hover:text-base-content dark:text-dark-base-content/60 dark:hover:text-dark-base-content"
            })
          ]),
          withDirectives(createElementVNode("div", {
            class: normalizeClass([
              "absolute top-0 right-0 bg-base-300 dark:bg-dark-base-300 text-base-content dark:text-dark-base-content z-10 font-medium select-none pointer-events-none px-2 py-1.5",
              isCodeExpanded.value ? "rounded-bl-lg" : "rounded-br-lg"
            ])
          }, toDisplayString$1(__props.language), 3), [
            [vShow, isCodeExpanded.value]
          ])
        ], 2),
        withDirectives(createElementVNode("pre", {
          ref_key: "codeRef",
          ref: codeRef,
          class: normalizeClass([
            "font-mono text-sm leading-normal text-base-content select-text",
            "block bg-base-200 rounded-b-lg border border-t-0 border-base-100 px-5 overflow-x-auto m-0",
            "dark:bg-dark-base-200 dark:border-dark-base-100 dark:text-dark-base-content",
            {
              "code-word-wrap whitespace-pre-wrap break-words": __props.wordWrap,
              [`code-${__props.language}`]: __props.language
            }
          ]),
          style: { "white-space": "pre", "margin-top": "0" }
        }, [
          _cache[2] || (_cache[2] = createTextVNode("      ", -1)),
          createElementVNode("div", _hoisted_3$7, [
            _cache[0] || (_cache[0] = createTextVNode("\n        ", -1)),
            renderSlot(_ctx.$slots, "default"),
            _cache[1] || (_cache[1] = createTextVNode("\n      ", -1))
          ]),
          _cache[3] || (_cache[3] = createTextVNode("\n    ", -1))
        ], 2), [
          [vShow, isCodeExpanded.value]
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const install$5 = (app) => {
  app.component("btn", Button);
  app.component("lab", Label);
  app.component("ipt", _sfc_main$L);
  app.component("tgl", Toggle);
  app.component("ckb", Checkbox);
  app.component("icn", _sfc_main$I);
  app.component("bkd", _sfc_main$H);
  app.component("txa", Textarea);
  app.component("tst", Transition);
  app.component("cod", _sfc_main$B);
  app.component("Color", _sfc_main$E);
  app.component("Palette", _sfc_main$D);
  app.config.globalProperties.$message = MessageWithMethods;
  app.provide("message", MessageWithMethods);
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
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
const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-103ddf75"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
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
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-175d1f05"]]);
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
const _sfc_main$y = /* @__PURE__ */ defineComponent({
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
const _sfc_main$x = /* @__PURE__ */ defineComponent({
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
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-e0bdb0a9"]]);
const _hoisted_1$o = { class: "text-base-content font-medium text-lg" };
const _sfc_main$w = /* @__PURE__ */ defineComponent({
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
      const positionMap2 = {
        top: "top-0 left-0 right-0 h-screen",
        right: "top-0 right-14 h-screen",
        bottom: "bottom-0 left-0 right-0 h-screen",
        left: "top-0 left-14 h-screen"
      };
      return positionMap2[props.position] || "top-0 right-14 h-screen";
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
const _sfc_main$v = /* @__PURE__ */ defineComponent({
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
const _sfc_main$u = /* @__PURE__ */ defineComponent({
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
      editInputApp = createApp(_sfc_main$v, {
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
      const width2 = arr.find((item) => item.key === key);
      return "px-2 " + width2.width;
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
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-ee53b1b3"]]);
const _sfc_main$t = {};
const _hoisted_1$l = { class: "p-3 w-full" };
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$1]]);
const _hoisted_1$k = { class: "flex flex-row items-center" };
const _hoisted_2$8 = {
  key: 0,
  class: "w-15"
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
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
const _sfc_main$r = /* @__PURE__ */ defineComponent({
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
var define_process_env_default$3 = {};
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
if (define_process_env_default$3.NODE_ENV !== "production") {
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
  if (args.length === 1 && isObject(args[0])) {
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
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
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
    if (define_process_env_default$3.NODE_ENV !== "production") {
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
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
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
    on(event, handler2) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler2);
      if (!added) {
        events.set(event, [handler2]);
      }
    },
    off(event, handler2) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler2) => handler2(payload));
      (events.get("*") || []).slice().map((handler2) => handler2(event, payload));
    }
  };
  return emitter;
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
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
      if (isObject(src2[key]) && !isObject(des2[key])) {
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
var define_process_env_default$2 = {};
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
  const msg = define_process_env_default$2.NODE_ENV !== "production" ? format$1((messages || errorMessages$2)[code] || "", ...args || []) : code;
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
function transform$1(ast, options = {}) {
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
      if (define_process_env_default$2.NODE_ENV !== "production") {
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
      if (define_process_env_default$2.NODE_ENV !== "production") {
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
    transform$1(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
var define_process_env_default$1 = {};
function initFeatureFlags$1() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
function isMessageAST(val) {
  return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
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
      if (hasOwn(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber(list.index)) {
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
    const warnHtmlMessage = isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    define_process_env_default$1.NODE_ENV !== "production" && checkHtmlMessage(message, warnHtmlMessage);
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: define_process_env_default$1.NODE_ENV !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    if (define_process_env_default$1.NODE_ENV !== "production" && !isMessageAST(message)) {
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
  return createCompileError(code, null, define_process_env_default$1.NODE_ENV !== "production" ? { messages: errorMessages$1 } : void 0);
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
    if (isFunction(locale)) {
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
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
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
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
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
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
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
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
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
    if (isFunction(last)) {
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
const VERSION$1 = "11.1.12";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
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
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  if (define_process_env_default$1.NODE_ENV !== "production" && true && true && isFunction(options.messageCompiler)) {
    warnOnce(getWarnMessage$1(CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  }
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
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
  if (define_process_env_default$1.NODE_ENV !== "production") {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  if (define_process_env_default$1.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
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
  if (define_process_env_default$1.NODE_ENV !== "production") {
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
    if (define_process_env_default$1.NODE_ENV !== "production" && isTranslateMissingWarn(missingWarn, key)) {
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
  if (define_process_env_default$1.NODE_ENV !== "production" && !Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_DATE));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
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
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_DATE_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale) {
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
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
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
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
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
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
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
function number$1(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  if (define_process_env_default$1.NODE_ENV !== "production" && !Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(CoreWarnCodes.CANNOT_FORMAT_NUMBER));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
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
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT, {
        key,
        target: targetLocale
      }));
    }
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale) {
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
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
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
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
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
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
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
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
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
  const pluralRule = isObject(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
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
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
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
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString$1(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
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
  if (define_process_env_default$1.NODE_ENV !== "production" && isString$1(format2) && context.messageCompiler == null) {
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
  if (define_process_env_default$1.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
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
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
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
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale && !isAlmostSameLocale(locale, targetLocale) && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(CoreWarnCodes.FALLBACK_TO_TRANSLATE, {
        key,
        target: targetLocale
      }));
    }
    if (define_process_env_default$1.NODE_ENV !== "production" && locale !== targetLocale) {
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
    if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
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
  if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
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
  if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (define_process_env_default$1.NODE_ENV !== "production" && inBrowser) {
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
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
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
      if (define_process_env_default$1.NODE_ENV !== "production") {
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
  if (isNumber(options.plural)) {
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
var define_process_env_default = {};
const VERSION = "11.1.12";
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
  return createCompileError(code, null, define_process_env_default.NODE_ENV !== "production" ? { messages: errorMessages, args } : void 0);
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
  if (!isObject(obj)) {
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
      if (isObject(obj[key])) {
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
        if (!isObject(currentObj[subKeys[i]])) {
          define_process_env_default.NODE_ENV !== "production" && warn(getWarnMessage(I18nWarnCodes.IGNORE_OBJ_FLATTEN, {
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
        if (isObject(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
  if (isArray(__i18n)) {
    __i18n.forEach((custom2) => {
      if ("locale" in custom2 && "resource" in custom2) {
        const { locale: locale2, resource } = custom2;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom2) && deepCopy(JSON.parse(custom2), ret);
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
  let messages = isObject(options.messages) ? options.messages : create();
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
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
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
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
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
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    if (define_process_env_default.NODE_ENV !== "production") {
      ctxOptions.__v_emitter = isPlainObject(_context) ? _context.__v_emitter : void 0;
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
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler2) {
    _postTranslation = handler2;
    _context.postTranslation = handler2;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler2) {
    if (handler2 !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler2);
    }
    _missing = handler2;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !arg.resolvedMessage;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (define_process_env_default.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        /* @__PURE__ */ setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (define_process_env_default.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) ;
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      if (define_process_env_default.NODE_ENV !== "production" && __root && isString$1(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
            key,
            type: warnType
          }));
        }
        if (define_process_env_default.NODE_ENV !== "production") {
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
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number$1, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
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
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number$1, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray(val));
  }
  function setPluralRules(rules2) {
    _pluralRules = rules2;
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
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
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
  if (define_process_env_default.NODE_ENV !== "production") {
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
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject(v)) {
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
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray(payload.state.value) || isObject(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
function convertComposerOptions(options) {
  const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString$1(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean(options.sync) ? options.sync : true;
  let messages = options.messages;
  if (isPlainObject(options.sharedMessages)) {
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
    set missing(handler2) {
      composer.setMissingHandler(handler2);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
    },
    set silentTranslationWarn(val) {
      composer.missingWarn = isBoolean(val) ? !val : val;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
    },
    set silentFallbackWarn(val) {
      composer.fallbackWarn = isBoolean(val) ? !val : val;
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
    set postTranslation(handler2) {
      composer.setPostTranslationHandler(handler2);
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
  if (define_process_env_default.NODE_ENV !== "production") {
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
      if ((define_process_env_default.NODE_ENV !== "production" || false) && true && this.$el && this.$i18n) {
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
      if ((define_process_env_default.NODE_ENV !== "production" || false) && true && this.$el && this.$el.__VUE_I18N__) {
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
      validator: (val) => isNumber(val) || !isNaN(val)
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
      const tag = isString$1(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h$1(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString$1(target[0]);
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
    } else if (isObject(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
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
    const tag = isString$1(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h$1(tag, assignedAttrs, children);
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
    if (define_process_env_default.NODE_ENV !== "production") {
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
  } else if (isPlainObject(value)) {
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
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
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
  const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__;
  if (define_process_env_default.NODE_ENV !== "production" && __legacyMode) {
    warnOnce(getWarnMessage(I18nWarnCodes.DEPRECATE_LEGACY_MODE));
  }
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options, __legacyMode);
  const symbol = /* @__PURE__ */ makeSymbol(define_process_env_default.NODE_ENV !== "production" ? "vue-i18n" : "");
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
      if ((define_process_env_default.NODE_ENV !== "production" || false) && true) {
        app.__VUE_I18N__ = i18n;
      }
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject(options2[0])) {
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
      if ((define_process_env_default.NODE_ENV !== "production" || false) && true) {
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
      if (define_process_env_default.NODE_ENV !== "production") {
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
    if (define_process_env_default.NODE_ENV !== "production" && scope === "local") {
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
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
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
    if ((define_process_env_default.NODE_ENV !== "production" || false) && true && target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
      emitter.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    const _composer = composer;
    if ((define_process_env_default.NODE_ENV !== "production" || false) && true && target.vnode.el && target.vnode.el.__VUE_I18N__) {
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
if (define_process_env_default.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const _hoisted_1$j = {
  key: 0,
  class: "text-error ml-1"
};
const _hoisted_2$7 = ["onClick"];
const _sfc_main$q = /* @__PURE__ */ defineComponent({
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
      const sizes2 = { xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" };
      return sizes2[props.size] || "md";
    });
    const buttonSize = computed(() => {
      const sizes2 = { xs: "xs", sm: "sm", md: "sm", lg: "md", xl: "md" };
      return sizes2[props.size] || "sm";
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
      const sizes2 = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      };
      return [sizes2[props.size] || "text-base", "font-medium"].join(" ");
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
const Date$1 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-b0c88115"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    name: {},
    default: {}
  },
  setup(__props) {
    const globalProps = __props;
    const slots = useSlots();
    let currentTab = ref(globalProps.default || "");
    const renderOneButton = (name, tab, index) => h$1(
      "label",
      {
        class: {
          "mx-2 px-2 cursor-pointer hover:text-primary": true,
          "border-b-2": currentTab.value === name || index === 0 && !currentTab.value
        }
      },
      [
        h$1(
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
    const renderTabBar = () => h$1(
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
const _sfc_main$o = /* @__PURE__ */ defineComponent({
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
const _hoisted_8 = ["onClick"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
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
                ], 8, _hoisted_8)
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
const _sfc_main$m = /* @__PURE__ */ defineComponent({
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
  app.component("Dropdown", _sfc_main$y);
  app.component("Modal", Modal);
  app.component("Drawer", _sfc_main$w);
  app.component("Table", Table);
  app.component("Form", Form);
  app.component("FormItem", _sfc_main$s);
  app.component("Select", _sfc_main$r);
  app.component("Date", Date$1);
  app.component("Tabs", _sfc_main$p);
  app.component("TabPane", _sfc_main$o);
  app.component("Upload", _sfc_main$n);
  app.component("File", _sfc_main$m);
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
const _sfc_main$l = /* @__PURE__ */ defineComponent({
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
const _sfc_main$k = /* @__PURE__ */ defineComponent({
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
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "DarkChange",
  setup(__props) {
    const isDark = ref(false);
    onMounted(() => {
      if (Store.getLocalStorage("dark"))
        isDark.value = Store.getLocalStorage("dark") === "dark";
      document.documentElement.classList.add(isDark.value ? "dark" : "light");
    });
    watch(isDark, (newVal) => {
      document.documentElement.classList.remove(newVal ? "light" : "dark");
      document.documentElement.classList.add(newVal ? "dark" : "light");
      Store.setLocalStorage("dark", newVal ? "dark" : "light");
    });
    function setDark() {
      isDark.value = !isDark.value;
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
const _hoisted_1$g = { class: "toc order-last hidden flex-shrink-0 border-l border-l-solid pl-2 border-base-200 dark:border-dark-base-200 xl:block h-full" };
const _hoisted_2$5 = {
  key: 0,
  class: "toc-list list-none m-0 p-0 pt-2"
};
const _hoisted_3$5 = { class: "toc-title text-base font-semibold my-4 mb-2 tracking-tight text-gray-900 dark:text-gray-300" };
const _hoisted_4$3 = ["href", "aria-selected", "onClick"];
const _hoisted_5$1 = {
  key: 0,
  class: "toc-nested-list list-none m-0 p-0"
};
const _hoisted_6$1 = ["href", "aria-selected", "onClick"];
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "catalog",
  props: {
    toc: { type: Array, default: () => [] },
    index: { type: String, default: "" }
  },
  setup(__props, { expose: __expose }) {
    const { t } = useI18n();
    const route = useRoute();
    const props = __props;
    const catalog = ref(null);
    const hasHeadings = computed(() => props.toc.length > 0);
    const headingCssClassMap = {
      1: "",
      // H1 无缩进
      2: "ml-1",
      // H2 缩进 0.5rem (8px)
      3: "ml-2",
      // H3 缩进 1rem (16px)
      4: "ml-3",
      // H4 缩进 1.5rem (24px)
      5: "ml-4",
      // H5 缩进 2rem (32px)
      6: "ml-5"
      // H6 缩进 2.5rem (40px)
    };
    const isActiveItem = (slug) => {
      if (props.index) return props.index === slug;
      return route.hash === `#${decodeURIComponent(slug)}`;
    };
    const getLinkClasses = (level, slug) => {
      const isActive = isActiveItem(slug);
      return [
        "toc-link inline-block no-underline w-full transition-colors duration-200 text-sm py-1",
        headingCssClassMap[level] || "",
        isActive ? "text-primary border-l-2 border-l-solid border-primary bg-base-200 dark:bg-dark-base-200 px-3.5" : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 px-4"
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
        history.pushState(null, "", `#${slug}`);
      }
    };
    __expose({
      scrollToRatio: (ratio) => {
        if (catalog.value) {
          const maxScrollTop = catalog.value.scrollHeight - catalog.value.clientHeight;
          catalog.value.scrollTop = ratio * maxScrollTop;
        }
      },
      // 滚动到指定的标题项
      scrollToItem: (slug) => {
        if (catalog.value) {
          const element = catalog.value.querySelector(`[href="#${slug}"]`);
          if (element) {
            const containerRect = catalog.value.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top - containerRect.top + catalog.value.scrollTop;
            const scrollTo = elementTop - catalog.value.clientHeight / 2 + elementRect.height / 2;
            catalog.value.scrollTop = scrollTo;
          }
        }
      },
      getScrollRatio: () => {
        if (catalog.value) {
          const scrollTop = catalog.value.scrollTop;
          const maxScrollTop = catalog.value.scrollHeight - catalog.value.clientHeight;
          return maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
        }
        return 0;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createElementVNode("div", {
          ref_key: "catalog",
          ref: catalog,
          class: "h-full z-0 overflow-x-hidden overflow-y-auto pr-2 hide-scrollbar"
        }, [
          hasHeadings.value ? (openBlock(), createElementBlock("ul", _hoisted_2$5, [
            createElementVNode("p", _hoisted_3$5, toDisplayString$1(unref(t)("home.tableOfContent")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.toc, (heading) => {
              return openBlock(), createElementBlock("li", {
                key: heading.slug,
                class: normalizeClass([headingCssClassMap[heading.level], "toc-item list-none"])
              }, [
                createElementVNode("a", {
                  href: `#${heading.slug}`,
                  class: normalizeClass(getLinkClasses(heading.level, heading.slug)),
                  "aria-selected": isActiveItem(heading.slug),
                  onClick: ($event) => handleLinkClick($event, heading.slug)
                }, toDisplayString$1(heading.title), 11, _hoisted_4$3),
                heading.children && heading.children.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_5$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(heading.children, (child) => {
                    return openBlock(), createElementBlock("li", {
                      key: child.slug,
                      class: normalizeClass([headingCssClassMap[child.level], "toc-nested-item list-none"])
                    }, [
                      createElementVNode("a", {
                        href: `#${child.slug}`,
                        class: normalizeClass(getLinkClasses(child.level, child.slug)),
                        "aria-selected": isActiveItem(child.slug),
                        onClick: ($event) => handleLinkClick($event, child.slug)
                      }, toDisplayString$1(child.title), 11, _hoisted_6$1)
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
const Catalog = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-0c827cb5"]]);
const _hoisted_1$f = { class: "flex flex-row flex-1 min-h-0 px-10" };
const _hoisted_2$4 = { class: "flex-1 w-full lg:pr-10" };
const _hoisted_3$4 = {
  key: 0,
  class: "hidden xl:block xl:row-span-3 flex-shrink-0"
};
const _hoisted_4$2 = { class: "sticky top-5 h-[calc(100vh-4rem)]" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "Markdown",
  props: {
    content: {}
  },
  setup(__props) {
    const props = __props;
    const toc = ref([]);
    const currentIndex = ref("");
    const catalogRef = ref(null);
    let scrollTimer = null;
    const getContentContainer = () => {
      const markdownBody = document.querySelector(".markdown-body");
      if (markdownBody) return markdownBody;
      const docContainer = document.querySelector(".doc");
      if (docContainer) return docContainer;
      return document.documentElement;
    };
    const handleScroll = () => {
      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }
      scrollTimer = window.setTimeout(() => {
        const headers = toc.value.map((item) => {
          return {
            id: item.slug,
            element: document.getElementById(item.slug)
          };
        }).filter((item) => item.element);
        let currentId = "";
        for (let i = headers.length - 1; i >= 0; i--) {
          const header = headers[i];
          const rect = header.element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentId = header.id;
            break;
          }
        }
        if (currentId !== currentIndex.value) {
          currentIndex.value = currentId;
          if (catalogRef.value && typeof catalogRef.value.scrollToItem === "function") {
            catalogRef.value.scrollToItem(currentId);
          }
        }
      }, 100);
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
    function parseHeaders(content) {
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
    watch(currentIndex, (newIndex) => {
      if (catalogRef.value && typeof catalogRef.value.scrollToItem === "function") {
        catalogRef.value.scrollToItem(newIndex);
      }
    });
    onMounted(async () => {
      debugInfo.value.domStatus = "组件已挂载";
      if (props.content) {
        const parsedToc = parseHeaders(props.content);
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
      const contentContainer = getContentContainer();
      contentContainer.addEventListener("scroll", handleScroll, { capture: true, passive: true });
      currentIndex.value = "";
    });
    onUnmounted(() => {
      const contentContainer = getContentContainer();
      contentContainer.removeEventListener("scroll", handleScroll, true);
      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createElementVNode("div", _hoisted_2$4, [
          renderSlot(_ctx.$slots, "default")
        ]),
        toc.value && toc.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
          createElementVNode("div", _hoisted_4$2, [
            createVNode(Catalog, {
              toc: toc.value,
              index: currentIndex.value,
              class: "h-full",
              ref_key: "catalogRef",
              ref: catalogRef
            }, null, 8, ["toc", "index"])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
  app.component("Theme", _sfc_main$l);
  app.component("Language", _sfc_main$k);
  app.component("Dark", _sfc_main$j);
  app.component("Markdown", _sfc_main$h);
  app.component("Catalog", Catalog);
  app.component("FullScreen", _sfc_main$g);
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
    const TaskCreate = async (form) => {
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
                onClick: _cache[0] || (_cache[0] = ($event) => TaskCreate(TaskCreateForm))
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
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
    const ProjectCreate = async (project2) => {
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
                onClick: _cache[1] || (_cache[1] = ($event) => ProjectCreate(project))
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
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const install$2 = (app) => {
  app.component("TaskCreate", _sfc_main$f);
  app.component("AccountCreate", _sfc_main$e);
  app.component("ProjectCreate", _sfc_main$d);
  app.component("PartDetail", _sfc_main$c);
  app.component("SectionDetail", _sfc_main$b);
  app.component("SourceDetail", _sfc_main$a);
  app.component("StandardDetail", _sfc_main$9);
  app.component("ProjectDetail", _sfc_main$8);
  app.component("TaskDetail", _sfc_main$7);
  app.component("StorageDetail", _sfc_main$6);
  app.component("InterlinkDetail", _sfc_main$5);
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
const _hoisted_1$3 = { class: "flex sticky top-0 z-10 flex-none py-3 mx-auto w-full border-b bg-base-200 h-12 shadow-md" };
const _hoisted_2$3 = { class: "flex justify-between items-center px-5 lg:px-30 mx-auto w-full" };
const _hoisted_3$3 = { class: "flex items-center" };
const _hoisted_4$1 = {
  href: "/",
  class: "inline-flex items-center gap-3 text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline"
};
const _hoisted_5 = { class: "text-primary" };
const _hoisted_6 = { class: "flex space-x-5" };
const _hoisted_7 = ["href"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  props: {
    projectName: {},
    themeComponent: {},
    darkComponent: {},
    languageComponent: {},
    userLink: {},
    userIcon: {},
    userIconLight: { type: Boolean },
    userIconBrand: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const isHomePage = computed(() => route.path === "/" || route.name && String(route.name).toLowerCase().includes("home"));
    const isExternalLink = (url) => {
      if (!url) return false;
      return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
    };
    const toggleSidebar = () => {
      window.dispatchEvent(new CustomEvent("toggle-sidebar"));
    };
    return (_ctx, _cache) => {
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_RouterLink = resolveComponent("RouterLink");
      return openBlock(), createElementBlock("nav", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2$3, [
          createElementVNode("div", _hoisted_3$3, [
            !isHomePage.value ? (openBlock(), createBlock(_component_btn, {
              key: 0,
              onClick: withModifiers(toggleSidebar, ["prevent"]),
              clean: "",
              type: "button",
              size: "xl",
              class: "px-5 items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10"
            }, {
              default: withCtx(() => [
                createVNode(_component_icn, {
                  name: "bars",
                  regular: "",
                  xl: ""
                })
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createElementVNode("a", _hoisted_4$1, [
              createVNode(_component_icn, {
                name: "section",
                solid: "",
                xl: "",
                color: "primary",
                style: { "font-size": "2rem" }
              }),
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
              class: "transition-colors duration-200"
            }, {
              default: withCtx(() => [
                isExternalLink(props.userLink) ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  href: props.userLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "inline-flex items-center group"
                }, [
                  createVNode(_component_icn, {
                    name: props.userIcon || "user",
                    brand: props.userIconBrand || false,
                    light: props.userIconLight !== false && !props.userIconBrand,
                    xl: "",
                    class: "text-base-content group-hover:text-primary transition-colors duration-200"
                  }, null, 8, ["name", "brand", "light"])
                ], 8, _hoisted_7)) : (openBlock(), createBlock(_component_RouterLink, {
                  key: 1,
                  to: props.userLink,
                  class: "inline-flex items-center group"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_icn, {
                      name: props.userIcon || "user",
                      brand: props.userIconBrand || false,
                      light: props.userIconLight !== false && !props.userIconBrand,
                      xl: "",
                      class: "text-base-content group-hover:text-primary transition-colors duration-200"
                    }, null, 8, ["name", "brand", "light"])
                  ]),
                  _: 1
                }, 8, ["to"]))
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
const _hoisted_1$1 = { class: "lg:hidden flex items-center justify-between bg-primary-200/10 px-5 pt-5" };
const _hoisted_2$1 = { class: "max-w-2xs lg:mx-2 lg:w-60 min-h-0 mt-5" };
const _hoisted_3$1 = { "aria-label": "Docs navigation" };
const _hoisted_4 = { class: "menu-title block text-base text-md font-bold bg-base-100 p-3" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  props: {
    routes: {},
    onNavigate: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const toggleSidebar = () => {
      isOpen.value = !isOpen.value;
    };
    const handleToggleSidebar = () => {
      toggleSidebar();
    };
    onMounted(() => {
      window.addEventListener("toggle-sidebar", handleToggleSidebar);
    });
    onUnmounted(() => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    });
    const { isLgSize } = windowWidth();
    const route = useRoute();
    const isHome = computed(() => route?.meta?.title === "Index");
    return (_ctx, _cache) => {
      const _component_bkd = resolveComponent("bkd");
      const _component_icn = resolveComponent("icn");
      const _component_btn = resolveComponent("btn");
      const _component_Menu = resolveComponent("Menu");
      return openBlock(), createElementBlock(Fragment, null, [
        !unref(isLgSize) ? (openBlock(), createBlock(_component_bkd, {
          key: 0,
          onClick: toggleSidebar,
          show: isOpen.value
        }, null, 8, ["show"])) : createCommentVNode("", true),
        withDirectives(createElementVNode("aside", {
          class: normalizeClass([{ "!lg:hidden": isHome.value }, "fixed lg:relative z-100 flex-none w-70 bg-base-200 border-r min-h-0 overflow-y-auto hidden-scrollbar"]),
          style: { "height": "100vh", "left": "0", "top": "0" },
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createElementVNode("div", _hoisted_1$1, [
            createVNode(_component_btn, {
              onClick: toggleSidebar,
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
            })
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
                            size: "xs",
                            clean: "",
                            variant: "transparent",
                            key: child.path,
                            onClick: ($event) => props.onNavigate ? props.onNavigate(child.path) : null,
                            class: normalizeClass([
                              "block w-full text-left px-3",
                              // 占满与内边距
                              unref(route)?.meta?.title === child.meta.title ? "!border-l-2 !border-y-0 !border-r-0 !border-solid !border-primary bg-base-100" : "!border-l-2 !border-y-0 !border-r-0 !border-transparent"
                              // 未激活时占位，可选
                            ])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString$1(child.meta.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "class"]);
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
          [vShow, isOpen.value || unref(isLgSize)]
        ])
      ], 64);
    };
  }
});
const _hoisted_1 = { class: "flex flex-row" };
const _hoisted_2 = { class: "flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800 dark:border-gray-600" };
const _hoisted_3 = { class: "flex flex-row" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toolbar",
  props: {
    onLogout: { type: Function },
    onThemeChange: { type: Function },
    onLanguageChange: { type: Function },
    onNavigate: { type: Function },
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
      props.onLogout?.();
      Store.removeLocalStorage("Token");
      Store.removeLocalStorage("Expire");
      Store.clearLocalStorage();
      if (props.onNavigate) {
        props.onNavigate("/");
      } else {
        console.warn("Navigation callback not provided, please set onNavigate prop to handle redirect");
      }
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
      props.onTaskCreate?.(formData);
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
      props.onAccountCreate?.(formData);
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
const colorNames = [
  "primary",
  "primary-focus",
  "primary-content",
  "secondary",
  "secondary-focus",
  "secondary-content",
  "accent",
  "accent-focus",
  "accent-content",
  "success",
  "success-focus",
  "success-content",
  "error",
  "error-focus",
  "error-content",
  "warning",
  "warning-focus",
  "warning-content",
  "base-100",
  "base-200",
  "base-300",
  "base-content",
  "dark-base-100",
  "dark-base-200",
  "dark-base-300",
  "dark-base-content"
];
const themes = {
  blue: {
    "default": "#1f2937",
    //gray-800
    "default-focus": "#111827",
    //gray-900
    "default-content": "#ffffff",
    "primary": "#2563eb",
    //blue-600
    "primary-focus": "#1d4ed8",
    //blue-700
    "primary-content": "#ffffff",
    "secondary": "#374151",
    //gray-700
    "secondary-focus": "#1f2937",
    //gray-800
    "secondary-content": "#ffffff",
    "accent": "#fef3c7",
    //yellow-100
    "accent-focus": "#fde68e",
    //yellow-200
    "accent-content": "#ffffff",
    "success": "#059669",
    //green-600
    "success-focus": "#047857",
    //green-700
    "success-content": "#ffffff",
    "warning": "#f97316",
    //orange-500
    "warning-focus": "#ea580c",
    //orange-600
    "warning-content": "#ffffff",
    "error": "#dc2626",
    //red-600
    "error-focus": "#b91c1c",
    //red-700
    "error-content": "#ffffff",
    "base-100": "#fcfcfc",
    "base-200": "#f8f8f8",
    "base-300": "#e8e8e8",
    "base-content": "#1f2937",
    //gray-800
    "dark-base-100": "#374151",
    //gray-700
    "dark-base-200": "#1f2937",
    //gray-800
    "dark-base-300": "#111827",
    //gray-900
    "dark-base-content": "#f9fafb",
    //gray-50
    "rounded-box": "0.5rem",
    "rounded-btn": "0.5rem",
    "rounded-badge": "2.0rem"
  },
  teal: {
    "primary": "#0d9488",
    //teal-600
    "primary-focus": "#0f766e",
    //teal-700
    "primary-content": "#ffffff",
    "secondary": "#374151",
    //gray-700
    "secondary-focus": "#1f2937",
    //gray-800
    "secondary-content": "#ffffff",
    "accent": "#fef3c7",
    //yellow-100
    "accent-focus": "#fde68e",
    //yellow-200
    "accent-content": "#ffffff",
    "default": "#1f2937",
    //gray-800
    "default-focus": "#111827",
    //gray-900
    "default-content": "#ffffff",
    "success": "#059669",
    //green-600
    "success-focus": "#047857",
    //green-700
    "success-content": "#ffffff",
    "warning": "#f97316",
    //orange-500
    "warning-focus": "#ea580c",
    //orange-600
    "warning-content": "#ffffff",
    "error": "#dc2626",
    //red-600
    "error-focus": "#b91c1c",
    //red-700
    "error-content": "#ffffff",
    "base-100": "#fcfcfc",
    "base-200": "#f8f8f8",
    "base-300": "#e8e8e8",
    "base-content": "#1f2937",
    //gray-800
    "dark-base-100": "#374151",
    //gray-700
    "dark-base-200": "#1f2937",
    //gray-800
    "dark-base-300": "#111827",
    //gray-900
    "dark-base-content": "#f9fafb",
    //gray-50
    "rounded-box": "0rem",
    "rounded-btn": "0rem",
    "rounded-badge": "1rem"
  },
  rose: {
    "default": "#3d4451",
    "default-content": "#ffffff",
    "primary": "#e11d48",
    //rose-600
    "primary-content": "#ffffff",
    "secondary": "#374151",
    "secondary-content": "#ffffff",
    "accent": "#ffe999",
    "success": "#15803d",
    "success-content": "#ffffff",
    "warning": "#a16207",
    "warning-content": "#ffffff",
    "error": "#b91c1c",
    "error-content": "#ffffff",
    "base-100": "#fcfcfc",
    "base-200": "#fafafa",
    "base-300": "#f8f9fa",
    "base-content": "#1f2937",
    "dark-base-100": "#181818",
    "dark-base-200": "#151414",
    "dark-base-300": "#0f0f0f",
    "dark-base-content": "#f3f4f6",
    "rounded-box": "1.0rem",
    "rounded-btn": "0.5rem",
    "rounded-badge": "1.9rem"
  },
  violet: {
    "default": "#3d4451",
    "default-focus": "#1f2937",
    "default-content": "#ffffff",
    "primary": "#7c3aed",
    //violet-600
    "primary-focus": "#6d28d9",
    //violet-700
    "primary-content": "#ffffff",
    "secondary": "#374151",
    "secondary-focus": "#1f2937",
    "secondary-content": "#ffffff",
    "accent": "#ffe999",
    "accent-focus": "#fde68e",
    "accent-content": "#ffffff",
    "success": "#15803d",
    "success-focus": "#166534",
    "success-content": "#ffffff",
    "warning": "#a16207",
    "warning-focus": "#ca8a04",
    "warning-content": "#ffffff",
    "error": "#b91c1c",
    "error-focus": "#991b1b",
    "error-content": "#ffffff",
    "base-100": "#fcfcfc",
    "base-200": "#f8f8f8",
    "base-300": "#e8e8e8",
    "base-content": "#1f2937",
    "dark-base-100": "#181818",
    "dark-base-200": "#111827",
    "dark-base-300": "#0f0f0f",
    "dark-base-content": "#f3f4f6",
    "rounded-box": "0.5rem",
    "rounded-btn": "0.5rem",
    "rounded-badge": "1.9rem"
  },
  orange: {
    "default": "#3d4451",
    "default-focus": "#1f2937",
    "default-content": "#ffffff",
    "primary": "#ea580C",
    //orange-600
    "primary-focus": "#c2410c",
    //orange-700
    "primary-content": "#ffffff",
    "secondary": "#374151",
    "secondary-focus": "#1f2937",
    "secondary-content": "#ffffff",
    "accent": "#ffe999",
    "accent-focus": "#fde68e",
    "accent-content": "#ffffff",
    "success": "#15803d",
    "success-focus": "#166534",
    "success-content": "#ffffff",
    "error": "#b91c1c",
    "error-focus": "#991b1b",
    "error-content": "#ffffff",
    "warning": "#a16207",
    "warning-focus": "#ca8a04",
    "warning-content": "#ffffff",
    "base-100": "#f8fafc",
    "base-200": "#f1f5f9",
    "base-300": "#e2e8f0",
    "base-content": "#1f2937",
    "dark-base-100": "#111827",
    "dark-base-200": "#0f172a",
    "dark-base-300": "#0c1426",
    "dark-base-content": "#f3f4f6",
    "rounded-box": "1.0rem",
    "rounded-btn": "0.5rem",
    "rounded-badge": "1.9rem"
  }
};
const generateCSSVariables = (themeName = "blue") => {
  const theme2 = themes[themeName] || themes.blue;
  let css = "";
  css += ":root {\n";
  for (const [key, value] of Object.entries(theme2)) {
    if (!key.includes("dark-") && !key.includes("rounded-")) {
      css += `  --${key}: ${value};
`;
    }
  }
  css += "}\n\n";
  for (const [themeKey, themeData] of Object.entries(themes)) {
    css += `.theme-${themeKey} {
`;
    for (const [key, value] of Object.entries(themeData)) {
      if (!key.includes("dark-") && !key.includes("rounded-")) {
        css += `  --${key}: ${value};
`;
      }
    }
    css += "}\n\n";
  }
  css += ".dark {\n";
  for (const [key, value] of Object.entries(theme2)) {
    if (key.includes("dark-")) {
      const baseKey = key.replace("dark-", "");
      css += `  --${baseKey}: ${value};
`;
    }
  }
  css += "}\n\n";
  for (const [themeKey, themeData] of Object.entries(themes)) {
    css += `.dark.theme-${themeKey} {
`;
    for (const [key, value] of Object.entries(themeData)) {
      if (key.includes("dark-")) {
        const baseKey = key.replace("dark-", "");
        css += `  --${baseKey}: ${value};
`;
      }
    }
    css += "}\n\n";
  }
  return css;
};
function definePreset$3(preset) {
  return preset;
}
function toArray$1(value = []) {
  return Array.isArray(value) ? value : [value];
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeSelector(str) {
  const length = str.length;
  let index = -1;
  let codeUnit;
  let result = "";
  const firstCodeUnit = str.charCodeAt(0);
  while (++index < length) {
    codeUnit = str.charCodeAt(index);
    if (codeUnit === 0) {
      result += "�";
      continue;
    }
    if (codeUnit === 37) {
      result += "\\%";
      continue;
    }
    if (codeUnit === 44) {
      result += "\\,";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45
    ) {
      result += `\\${codeUnit.toString(16)} `;
      continue;
    }
    if (
      // If the character is the first character and is a `-` (U+002D), and
      // there is no second character, […]
      index === 0 && length === 1 && codeUnit === 45
    ) {
      result += `\\${str.charAt(index)}`;
      continue;
    }
    if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
      result += str.charAt(index);
      continue;
    }
    result += `\\${str.charAt(index)}`;
  }
  return result;
}
function clearIdenticalEntries(entry) {
  return entry.filter(([k, v], idx) => {
    if (k.startsWith("$$"))
      return false;
    for (let i = idx - 1; i >= 0; i--) {
      if (entry[i][0] === k && entry[i][1] === v)
        return false;
    }
    return true;
  });
}
const VirtualKey = "__virtual_key__";
function entriesToCss(arr) {
  if (arr == null)
    return "";
  return clearIdenticalEntries(arr).map(([key, value]) => value != null && typeof value !== "function" ? key !== VirtualKey ? `${key}:${value};` : value : void 0).filter(Boolean).join("");
}
function definePreset$2(preset) {
  return preset;
}
const defaultSplitRE = /[\\:]?[\s'"`;{}]+/g;
const validateFilterRE = /[\w\u00A0-\uFFFF%-?]/;
function isValidSelector(selector = "") {
  return validateFilterRE.test(selector);
}
function hash(str) {
  let i;
  let l;
  let hval = 2166136261;
  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}
function transformSkipCode(code, map, SKIP_RULES_RE, keyFlag) {
  for (const item of Array.from(code.matchAll(SKIP_RULES_RE))) {
    if (item != null) {
      const matched = item[0];
      const withHashKey = `${keyFlag}${hash(matched)}`;
      map.set(withHashKey, matched);
      code = code.replace(matched, withHashKey);
    }
  }
  return code;
}
function restoreSkipCode(code, map) {
  for (const [withHashKey, matched] of map.entries())
    code = code.replaceAll(withHashKey, matched);
  return code;
}
const sourceMapRE = /\/\/#\s*sourceMappingURL=.*\n?/g;
function removeSourceMap(code) {
  if (code.includes("sourceMappingURL="))
    return code.replace(sourceMapRE, "");
  return code;
}
const quotedArbitraryValuesRE = /(?:[\w&:[\]-]|\[\S{1,64}=\S{1,64}\]){1,64}\[\\?['"]?\S{1,64}?['"]\]\]?[\w:-]{0,64}/g;
const arbitraryPropertyRE = /\[(\\\W|[\w-]){1,64}:[^\s:]{0,64}?("\S{1,64}?"|'\S{1,64}?'|`\S{1,64}?`|[^\s:]{1,64}?)[^\s:]{0,64}?\)?\]/g;
const arbitraryPropertyCandidateRE = /^\[(?:\\\W|[\w-]){1,64}:['"]?\S{1,64}?['"]?\]$/;
function splitCodeWithArbitraryVariants(code) {
  const result = [];
  for (const match of code.matchAll(arbitraryPropertyRE)) {
    if (match.index !== 0 && !/^[\s'"`]/.test(code[match.index - 1] ?? ""))
      continue;
    result.push(match[0]);
  }
  for (const match of code.matchAll(quotedArbitraryValuesRE))
    result.push(match[0]);
  const skipMap = /* @__PURE__ */ new Map();
  const skipFlag = "@unocss-skip-arbitrary-brackets";
  code = transformSkipCode(code, skipMap, /-\[(?!&.+?;)[^\]]*\]/g, skipFlag);
  if (!code)
    return result;
  code.split(defaultSplitRE).forEach((match) => {
    if (match.includes(skipFlag))
      match = restoreSkipCode(match, skipMap);
    if (isValidSelector(match) && !arbitraryPropertyCandidateRE.test(match))
      result.push(match);
  });
  return result;
}
function extractorArbitraryVariants() {
  return {
    name: "@unocss/extractor-arbitrary-variants",
    order: 0,
    extract({ code }) {
      return splitCodeWithArbitraryVariants(removeSourceMap(code));
    }
  };
}
const directionMap = {
  "l": ["-left"],
  "r": ["-right"],
  "t": ["-top"],
  "b": ["-bottom"],
  "s": ["-inline-start"],
  "e": ["-inline-end"],
  "x": ["-left", "-right"],
  "y": ["-top", "-bottom"],
  "": [""],
  "bs": ["-block-start"],
  "be": ["-block-end"],
  "is": ["-inline-start"],
  "ie": ["-inline-end"],
  "block": ["-block-start", "-block-end"],
  "inline": ["-inline-start", "-inline-end"]
};
const insetMap = {
  ...directionMap,
  s: ["-inset-inline-start"],
  start: ["-inset-inline-start"],
  e: ["-inset-inline-end"],
  end: ["-inset-inline-end"],
  bs: ["-inset-block-start"],
  be: ["-inset-block-end"],
  is: ["-inset-inline-start"],
  ie: ["-inset-inline-end"],
  block: ["-inset-block-start", "-inset-block-end"],
  inline: ["-inset-inline-start", "-inset-inline-end"]
};
const cornerMap = {
  "l": ["-top-left", "-bottom-left"],
  "r": ["-top-right", "-bottom-right"],
  "t": ["-top-left", "-top-right"],
  "b": ["-bottom-left", "-bottom-right"],
  "tl": ["-top-left"],
  "lt": ["-top-left"],
  "tr": ["-top-right"],
  "rt": ["-top-right"],
  "bl": ["-bottom-left"],
  "lb": ["-bottom-left"],
  "br": ["-bottom-right"],
  "rb": ["-bottom-right"],
  "": [""],
  "bs": ["-start-start", "-start-end"],
  "be": ["-end-start", "-end-end"],
  "s": ["-end-start", "-start-start"],
  "is": ["-end-start", "-start-start"],
  "e": ["-start-end", "-end-end"],
  "ie": ["-start-end", "-end-end"],
  "ss": ["-start-start"],
  "bs-is": ["-start-start"],
  "is-bs": ["-start-start"],
  "se": ["-start-end"],
  "bs-ie": ["-start-end"],
  "ie-bs": ["-start-end"],
  "es": ["-end-start"],
  "be-is": ["-end-start"],
  "is-be": ["-end-start"],
  "ee": ["-end-end"],
  "be-ie": ["-end-end"],
  "ie-be": ["-end-end"]
};
const xyzMap = {
  "x": ["-x"],
  "y": ["-y"],
  "z": ["-z"],
  "": ["-x", "-y"]
};
const xyzArray = ["x", "y", "z"];
const basePositionMap = [
  "top",
  "top center",
  "top left",
  "top right",
  "bottom",
  "bottom center",
  "bottom left",
  "bottom right",
  "left",
  "left center",
  "left top",
  "left bottom",
  "right",
  "right center",
  "right top",
  "right bottom",
  "center",
  "center top",
  "center bottom",
  "center left",
  "center right",
  "center center"
];
const positionMap = Object.assign(
  {},
  ...basePositionMap.map((p) => ({ [p.replace(/ /, "-")]: p })),
  ...basePositionMap.map((p) => ({ [p.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: p }))
);
const globalKeywords = [
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
];
const cssMathFnRE = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/;
const cssVarFnRE = /^(var)\s*\((.+)\)(.*)/;
const numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
const numberRE$1 = /^(-?\d*(?:\.\d+)?)$/;
const unitOnlyRE = /^(px|[sld]?v[wh])$/i;
const unitOnlyMap = {
  px: 1,
  vw: 100,
  vh: 100,
  svw: 100,
  svh: 100,
  dvw: 100,
  dvh: 100,
  lvh: 100,
  lvw: 100
};
const bracketTypeRe = /^\[(color|image|length|size|position|quoted|string):/i;
const splitComma = /,(?![^()]*\))/g;
const cssProps = [
  // basic props
  "color",
  "border-color",
  "background-color",
  "outline-color",
  "text-decoration-color",
  "flex-grow",
  "flex",
  "flex-shrink",
  "caret-color",
  "font",
  "gap",
  "opacity",
  "visibility",
  "z-index",
  "font-weight",
  "zoom",
  "text-shadow",
  "transform",
  "box-shadow",
  "border",
  // positions
  "background-position",
  "left",
  "right",
  "top",
  "bottom",
  "object-position",
  // sizes
  "max-height",
  "min-height",
  "max-width",
  "min-width",
  "height",
  "width",
  "border-width",
  "margin",
  "padding",
  "outline-width",
  "outline-offset",
  "font-size",
  "line-height",
  "text-indent",
  "vertical-align",
  "border-spacing",
  "letter-spacing",
  "word-spacing",
  // enhances
  "stroke",
  "filter",
  "backdrop-filter",
  "fill",
  "mask",
  "mask-size",
  "mask-border",
  "clip-path",
  "clip",
  "border-radius"
];
function round(n) {
  return +n.toFixed(10);
}
function numberWithUnit(str) {
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = Number.parseFloat(n);
  if (unit && !Number.isNaN(num))
    return `${round(num)}${unit}`;
}
function auto(str) {
  if (str === "auto" || str === "a")
    return "auto";
}
function rem(str) {
  if (!str)
    return;
  if (unitOnlyRE.test(str))
    return `${unitOnlyMap[str]}${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = Number.parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num / 4)}rem`;
  }
}
function px(str) {
  if (unitOnlyRE.test(str))
    return `${unitOnlyMap[str]}${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = Number.parseFloat(n);
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num)}px`;
}
function number(str) {
  if (!numberRE$1.test(str))
    return;
  const num = Number.parseFloat(str);
  if (!Number.isNaN(num))
    return round(num);
}
function percent(str) {
  if (str.endsWith("%"))
    str = str.slice(0, -1);
  if (!numberRE$1.test(str))
    return;
  const num = Number.parseFloat(str);
  if (!Number.isNaN(num))
    return `${round(num / 100)}`;
}
function fraction(str) {
  if (!str)
    return;
  if (str === "full")
    return "100%";
  const [left, right] = str.split("/");
  const num = Number.parseFloat(left) / Number.parseFloat(right);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return `${round(num * 100)}%`;
  }
}
function bracketWithType(str, requiredType) {
  if (str && str.startsWith("[") && str.endsWith("]")) {
    let base;
    let hintedType;
    const match = str.match(bracketTypeRe);
    if (!match) {
      base = str.slice(1, -1);
    } else {
      if (!requiredType)
        hintedType = match[1];
      base = str.slice(match[0].length, -1);
    }
    if (!base)
      return;
    if (base === '=""')
      return;
    if (base.startsWith("--"))
      base = `var(${base})`;
    let curly = 0;
    for (const i of base) {
      if (i === "[") {
        curly += 1;
      } else if (i === "]") {
        curly -= 1;
        if (curly < 0)
          return;
      }
    }
    if (curly)
      return;
    switch (hintedType) {
      case "string":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
      case "quoted":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, '"$1"');
    }
    return base.replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (match2) => {
      const vars = [];
      return match2.replace(/var\((--.+?)[,)]/g, (match3, g1) => {
        vars.push(g1);
        return match3.replace(g1, "--un-calc");
      }).replace(/(-?\d*\.?\d(?!-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, () => vars.shift());
    });
  }
}
function bracket(str) {
  return bracketWithType(str);
}
function bracketOfColor(str) {
  return bracketWithType(str, "color");
}
function bracketOfLength(str) {
  return bracketWithType(str, "length");
}
function bracketOfPosition(str) {
  return bracketWithType(str, "position");
}
function cssvar(str) {
  if (/^\$[^\s'"`;{}]/.test(str)) {
    const [name, defaultValue] = str.slice(1).split(",");
    return `var(--${escapeSelector(name)}${defaultValue ? `, ${defaultValue}` : ""})`;
  }
}
function time(str) {
  const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = Number.parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0 && !unit)
      return "0s";
    return unit ? `${round(num)}${unit}` : `${round(num)}ms`;
  }
}
function degree(str) {
  const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
  if (!match)
    return;
  const [, n, unit] = match;
  const num = Number.parseFloat(n);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0deg";
    return unit ? `${round(num)}${unit}` : `${round(num)}deg`;
  }
}
function global$1(str) {
  if (globalKeywords.includes(str))
    return str;
}
function properties(str) {
  if (str.split(",").every((prop) => cssProps.includes(prop)))
    return str;
}
function position(str) {
  if (["top", "left", "right", "bottom", "center"].includes(str))
    return str;
}
const valueHandlers = {
  __proto__: null,
  auto,
  bracket,
  bracketOfColor,
  bracketOfLength,
  bracketOfPosition,
  cssvar,
  degree,
  fraction,
  global: global$1,
  number,
  numberWithUnit,
  percent,
  position,
  properties,
  px,
  rem,
  time
};
const handler = createValueHandler(valueHandlers);
const h = handler;
const CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";
function directionSize(propertyPrefix) {
  return ([_, direction, size], { theme: theme2 }) => {
    const v = theme2.spacing?.[size || "DEFAULT"] ?? h.bracket.cssvar.global.auto.fraction.rem(size);
    if (v != null) {
      return directionMap[direction].map((i) => [`${propertyPrefix}${i}`, v]);
    } else if (size?.startsWith("-")) {
      const v2 = theme2.spacing?.[size.slice(1)];
      if (v2 != null)
        return directionMap[direction].map((i) => [`${propertyPrefix}${i}`, `calc(${v2} * -1)`]);
    }
  };
}
function getThemeColorForKey(theme2, colors2, key = "colors") {
  let obj = theme2[key];
  let index = -1;
  for (const c of colors2) {
    index += 1;
    if (obj && typeof obj !== "string") {
      const camel = colors2.slice(index).join("-").replace(/(-[a-z])/g, (n) => n.slice(1).toUpperCase());
      if (obj[camel])
        return obj[camel];
      if (obj[c]) {
        obj = obj[c];
        continue;
      }
    }
    return void 0;
  }
  return obj;
}
function getThemeColor(theme2, colors2, key) {
  return getThemeColorForKey(theme2, colors2, key) || getThemeColorForKey(theme2, colors2, "colors");
}
function splitShorthand(body, type) {
  const [front, rest] = getStringComponent(body, "[", "]", ["/", ":"]) ?? [];
  if (front != null) {
    const match = (front.match(bracketTypeRe) ?? [])[1];
    if (match == null || match === type)
      return [front, rest];
  }
}
function parseColor(body, theme2, key) {
  const split = splitShorthand(body, "color");
  if (!split)
    return;
  const [main, opacity2] = split;
  const colors2 = main.replace(/([a-z])(\d)/g, "$1-$2").split(/-/g);
  const [name] = colors2;
  if (!name)
    return;
  let color;
  const bracket2 = h.bracketOfColor(main);
  const bracketOrMain = bracket2 || main;
  if (h.numberWithUnit(bracketOrMain))
    return;
  if (/^#[\da-f]+$/i.test(bracketOrMain))
    color = bracketOrMain;
  else if (/^hex-[\da-fA-F]+$/.test(bracketOrMain))
    color = `#${bracketOrMain.slice(4)}`;
  else if (main.startsWith("$"))
    color = h.cssvar(main);
  color = color || bracket2;
  if (!color) {
    const colorData = getThemeColor(theme2, [main], key);
    if (typeof colorData === "string")
      color = colorData;
  }
  let no = "DEFAULT";
  if (!color) {
    let keys = colors2;
    let _no;
    const [scale] = colors2.slice(-1);
    if (/^\d+$/.test(scale)) {
      no = _no = scale;
      keys = colors2.slice(0, -1);
    }
    const colorData = getThemeColor(theme2, keys, key);
    if (typeof colorData === "object") {
      color = colorData[_no ?? no];
    } else if (typeof colorData === "string" && !_no) {
      color = colorData;
    }
  }
  return {
    opacity: opacity2,
    name,
    no,
    color,
    cssColor: parseCssColor(color),
    alpha: h.bracket.cssvar.percent(opacity2 ?? "")
  };
}
function colorResolver(property, varName, key, shouldPass) {
  return ([, body], { theme: theme2, generator }) => {
    const data = parseColor(body ?? "", theme2, key);
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    const isDev = generator.config.envMode === "dev";
    const rawColorComment = isDev && color ? ` /* ${color} */` : "";
    const css = {};
    if (cssColor) {
      if (alpha != null) {
        css[property] = colorToString(cssColor, alpha) + rawColorComment;
      } else {
        const opacityVar = `--un-${varName}-opacity`;
        const result = colorToString(cssColor, `var(${opacityVar})`);
        if (result.includes(opacityVar))
          css[opacityVar] = colorOpacityToString(cssColor);
        css[property] = result + rawColorComment;
      }
    } else if (color) {
      if (alpha != null) {
        css[property] = colorToString(color, alpha) + rawColorComment;
      } else {
        const opacityVar = `--un-${varName}-opacity`;
        const result = colorToString(color, `var(${opacityVar})`);
        if (result.includes(opacityVar))
          css[opacityVar] = 1;
        css[property] = result + rawColorComment;
      }
    }
    return css;
  };
}
function colorableShadows(shadows, colorVar) {
  const colored = [];
  shadows = toArray$1(shadows);
  for (let i = 0; i < shadows.length; i++) {
    const components = getStringComponents(shadows[i], " ", 6);
    if (!components || components.length < 3)
      return shadows;
    let isInset = false;
    const pos = components.indexOf("inset");
    if (pos !== -1) {
      components.splice(pos, 1);
      isInset = true;
    }
    let colorVarValue = "";
    const lastComp = components.at(-1);
    if (parseCssColor(components.at(0))) {
      const color = parseCssColor(components.shift());
      if (color)
        colorVarValue = `, ${colorToString(color)}`;
    } else if (parseCssColor(lastComp)) {
      const color = parseCssColor(components.pop());
      if (color)
        colorVarValue = `, ${colorToString(color)}`;
    } else if (lastComp && cssVarFnRE.test(lastComp)) {
      const color = components.pop();
      colorVarValue = `, ${color}`;
    }
    colored.push(`${isInset ? "inset " : ""}${components.join(" ")} var(${colorVar}${colorVarValue})`);
  }
  return colored;
}
function hasParseableColor(color, theme2, key) {
  return color != null && !!parseColor(color, theme2, key)?.color;
}
const reLetters = /[a-z]+/gi;
const resolvedBreakpoints = /* @__PURE__ */ new WeakMap();
function resolveBreakpoints({ theme: theme2, generator }, key = "breakpoints") {
  const breakpoints2 = generator?.userConfig?.theme?.[key] || theme2[key];
  if (!breakpoints2)
    return void 0;
  if (resolvedBreakpoints.has(theme2))
    return resolvedBreakpoints.get(theme2);
  const resolved = Object.entries(breakpoints2).sort((a, b) => Number.parseInt(a[1].replace(reLetters, "")) - Number.parseInt(b[1].replace(reLetters, ""))).map(([point, size]) => ({ point, size }));
  resolvedBreakpoints.set(theme2, resolved);
  return resolved;
}
function makeGlobalStaticRules(prefix, property) {
  return globalKeywords.map((keyword) => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }]);
}
function isCSSMathFn(value) {
  return value != null && cssMathFnRE.test(value);
}
function isSize(str) {
  if (str[0] === "[" && str.slice(-1) === "]")
    str = str.slice(1, -1);
  return cssMathFnRE.test(str) || numberWithUnitRE.test(str);
}
function transformXYZ(d, v, name) {
  const values = v.split(splitComma);
  if (d || !d && values.length === 1)
    return xyzMap[d].map((i) => [`--un-${name}${i}`, v]);
  return values.map((v2, i) => [`--un-${name}-${xyzArray[i]}`, v2]);
}
const variantAria = {
  name: "aria",
  match(matcher, ctx) {
    const variant = variantGetParameter("aria-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const aria = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
      if (aria) {
        return {
          matcher: rest,
          selector: (s) => `${s}[aria-${aria}]`
        };
      }
    }
  },
  multiPass: true
};
function taggedAria(tagName, combinator, options = {}) {
  return {
    name: `${tagName}-aria`,
    match(matcher, ctx) {
      const variant = variantGetParameter(`${tagName}-aria-`, matcher, ctx.generator.config.separators);
      if (variant) {
        const [match, rest, label] = variant;
        const ariaAttribute = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
        if (ariaAttribute) {
          const attributify = !!options?.attributifyPseudo;
          let firstPrefix = options?.prefix ?? "";
          firstPrefix = (Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "";
          const parent = `${attributify ? `[${firstPrefix}${tagName}=""]` : `.${firstPrefix}${tagName}`}`;
          const escapedLabel = escapeSelector(label ? `/${label}` : "");
          return {
            matcher: rest,
            handle: (input, next) => {
              const regexp = new RegExp(`${escapeRegExp(parent)}${escapeRegExp(escapedLabel)}(?:\\[.+?\\])+`);
              const match2 = input.prefix.match(regexp);
              let nextPrefix;
              if (match2) {
                const insertIndex = (match2.index ?? 0) + parent.length + escapedLabel.length;
                nextPrefix = [
                  input.prefix.slice(0, insertIndex),
                  `[aria-${ariaAttribute}]`,
                  input.prefix.slice(insertIndex)
                ].join("");
              } else {
                const prefixGroupIndex = Math.max(input.prefix.indexOf(parent), 0);
                nextPrefix = [
                  input.prefix.slice(0, prefixGroupIndex),
                  parent,
                  escapedLabel,
                  `[aria-${ariaAttribute}]`,
                  combinator,
                  input.prefix.slice(prefixGroupIndex)
                ].join("");
              }
              return next({
                ...input,
                prefix: nextPrefix
              });
            }
          };
        }
      }
    },
    multiPass: true
  };
}
function taggedHasAria() {
  return {
    name: "has-aria",
    match(matcher, ctx) {
      const variant = variantGetParameter("has-aria-", matcher, ctx.generator.config.separators);
      if (variant) {
        const [match, rest] = variant;
        const ariaAttribute = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
        if (ariaAttribute) {
          return {
            matcher: rest,
            handle: (input, next) => next({
              ...input,
              pseudo: `${input.pseudo}:has([aria-${ariaAttribute}])`
            })
          };
        }
      }
    },
    multiPass: true
  };
}
function variantTaggedAriaAttributes(options = {}) {
  return [
    taggedAria("group", " ", options),
    taggedAria("peer", "~", options),
    taggedAria("parent", ">", options),
    taggedAria("previous", "+", options),
    taggedHasAria()
  ];
}
const sizePseudo = /(max|min)-\[([^\]]*)\]:/;
function variantBreakpoints() {
  const regexCache = {};
  return {
    name: "breakpoints",
    match(matcher, context) {
      if (sizePseudo.test(matcher)) {
        const match = matcher.match(sizePseudo);
        const m = matcher.replace(match[0], "");
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (${match[1]}-width: ${match[2]})`
            // parentOrder: order,
          })
        };
      }
      const variantEntries = (resolveBreakpoints(context) ?? []).map(({ point, size }, idx) => [point, size, idx]);
      for (const [point, size, idx] of variantEntries) {
        if (!regexCache[point])
          regexCache[point] = new RegExp(`^((?:([al]t-|[<~]|max-))?${point}(?:${context.generator.config.separators.join("|")}))`);
        const match = matcher.match(regexCache[point]);
        if (!match)
          continue;
        const [, pre] = match;
        const m = matcher.slice(pre.length);
        if (m === "container")
          continue;
        const isLtPrefix = pre.startsWith("lt-") || pre.startsWith("<") || pre.startsWith("max-");
        const isAtPrefix = pre.startsWith("at-") || pre.startsWith("~");
        let order = 3e3;
        if (isLtPrefix) {
          order -= idx + 1;
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (max-width: ${calcMaxWidthBySize(size)})`,
              parentOrder: order
            })
          };
        }
        order += idx + 1;
        if (isAtPrefix && idx < variantEntries.length - 1) {
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
              parentOrder: order
            })
          };
        }
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (min-width: ${size})`,
            parentOrder: order
          })
        };
      }
    },
    multiPass: true,
    autocomplete: "(at-|lt-|max-|)$breakpoints:"
  };
}
const variantChildren = [
  variantMatcher("*", (input) => ({ selector: `${input.selector} > *` }), { order: -1 })
];
function scopeMatcher(name, combinator) {
  return {
    name: `combinator:${name}`,
    match(matcher, ctx) {
      if (!matcher.startsWith(name))
        return;
      const separators = ctx.generator.config.separators;
      let body = variantGetBracket(`${name}-`, matcher, separators);
      if (!body) {
        for (const separator of separators) {
          if (matcher.startsWith(`${name}${separator}`)) {
            body = ["", matcher.slice(name.length + separator.length)];
            break;
          }
        }
        if (!body)
          return;
      }
      let bracketValue = h.bracket(body[0]) ?? "";
      if (bracketValue === "")
        bracketValue = "*";
      return {
        matcher: body[1],
        selector: (s) => `${s}${combinator}${bracketValue}`
      };
    },
    multiPass: true
  };
}
const variantCombinators$1 = [
  scopeMatcher("all", " "),
  scopeMatcher("children", ">"),
  scopeMatcher("next", "+"),
  scopeMatcher("sibling", "+"),
  scopeMatcher("siblings", "~")
];
const variantContainerQuery = {
  name: "@",
  match(matcher, ctx) {
    if (matcher.startsWith("@container"))
      return;
    const variant = variantGetParameter("@", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest, label] = variant;
      const unbracket = h.bracket(match);
      let container2;
      if (unbracket) {
        container2 = h.numberWithUnit(unbracket);
      } else {
        container2 = ctx.theme.containers?.[match] ?? "";
      }
      if (container2) {
        let order = 1e3 + Object.keys(ctx.theme.containers ?? {}).indexOf(match);
        if (label)
          order += 1e3;
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@container${label ? ` ${label} ` : " "}(min-width: ${container2})`,
            parentOrder: order
          })
        };
      }
    }
  },
  multiPass: true
};
function variantColorsMediaOrClass(options = {}) {
  if (options?.dark === "class" || typeof options.dark === "object") {
    const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
    return [
      variantMatcher("dark", toArray$1(dark).map((dark2) => (input) => ({ prefix: `${dark2} $$ ${input.prefix}` }))),
      variantMatcher("light", toArray$1(light).map((light2) => (input) => ({ prefix: `${light2} $$ ${input.prefix}` })))
    ];
  }
  return [
    variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"),
    variantParentMatcher("light", "@media (prefers-color-scheme: light)")
  ];
}
const variantDataAttribute = {
  name: "data",
  match(matcher, ctx) {
    const variant = variantGetParameter("data-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
      if (dataAttribute) {
        return {
          matcher: rest,
          selector: (s) => `${s}[data-${dataAttribute}]`
        };
      }
    }
  },
  multiPass: true
};
function taggedData(tagName, combinator, options = {}) {
  return {
    name: `${tagName}-data`,
    match(matcher, ctx) {
      const variant = variantGetParameter(`${tagName}-data-`, matcher, ctx.generator.config.separators);
      if (variant) {
        const [match, rest, label] = variant;
        const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
        if (dataAttribute) {
          const attributify = !!options?.attributifyPseudo;
          let firstPrefix = options?.prefix ?? "";
          firstPrefix = (Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "";
          const parent = `${attributify ? `[${firstPrefix}${tagName}=""]` : `.${firstPrefix}${tagName}`}`;
          const escapedLabel = escapeSelector(label ? `/${label}` : "");
          return {
            matcher: rest,
            handle: (input, next) => {
              const regexp = new RegExp(`${escapeRegExp(parent)}${escapeRegExp(escapedLabel)}(?:\\[.+?\\])+`);
              const match2 = input.prefix.match(regexp);
              let nextPrefix;
              if (match2) {
                const insertIndex = (match2.index ?? 0) + parent.length + escapedLabel.length;
                nextPrefix = [
                  input.prefix.slice(0, insertIndex),
                  `[data-${dataAttribute}]`,
                  input.prefix.slice(insertIndex)
                ].join("");
              } else {
                const prefixGroupIndex = Math.max(input.prefix.indexOf(parent), 0);
                nextPrefix = [
                  input.prefix.slice(0, prefixGroupIndex),
                  parent,
                  escapedLabel,
                  `[data-${dataAttribute}]`,
                  combinator,
                  input.prefix.slice(prefixGroupIndex)
                ].join("");
              }
              return next({
                ...input,
                prefix: nextPrefix
              });
            }
          };
        }
      }
    },
    multiPass: true
  };
}
function taggedHasData() {
  return {
    name: "has-data",
    match(matcher, ctx) {
      const variant = variantGetParameter("has-data-", matcher, ctx.generator.config.separators);
      if (variant) {
        const [match, rest] = variant;
        const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
        if (dataAttribute) {
          return {
            matcher: rest,
            handle: (input, next) => next({
              ...input,
              pseudo: `${input.pseudo}:has([data-${dataAttribute}])`
            })
          };
        }
      }
    },
    multiPass: true
  };
}
function variantTaggedDataAttributes(options = {}) {
  return [
    taggedData("group", " ", options),
    taggedData("peer", "~", options),
    taggedData("parent", ">", options),
    taggedData("previous", "+", options),
    taggedHasData()
  ];
}
const variantLanguageDirections = [
  variantMatcher("rtl", (input) => ({ prefix: `[dir="rtl"] $$ ${input.prefix}` })),
  variantMatcher("ltr", (input) => ({ prefix: `[dir="ltr"] $$ ${input.prefix}` }))
];
function variantImportant() {
  let re;
  return {
    name: "important",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^(important(?:${ctx.generator.config.separators.join("|")})|!)`);
      let base;
      const match = matcher.match(re);
      if (match)
        base = matcher.slice(match[0].length);
      else if (matcher.endsWith("!"))
        base = matcher.slice(0, -1);
      if (base) {
        return {
          matcher: base,
          body: (body) => {
            body.forEach((v) => {
              if (v[1] != null)
                v[1] += " !important";
            });
            return body;
          }
        };
      }
    }
  };
}
const variantPrint = variantParentMatcher("print", "@media print");
const variantCustomMedia = {
  name: "media",
  match(matcher, ctx) {
    const variant = variantGetParameter("media-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let media2 = h.bracket(match) ?? "";
      if (media2 === "")
        media2 = ctx.theme.media?.[match] ?? "";
      if (media2) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@media ${media2}`
          })
        };
      }
    }
  },
  multiPass: true
};
const variantSelector = {
  name: "selector",
  match(matcher, ctx) {
    const variant = variantGetBracket("selector-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const selector = h.bracket(match);
      if (selector) {
        return {
          matcher: rest,
          selector: () => selector
        };
      }
    }
  }
};
const variantCssLayer = {
  name: "layer",
  match(matcher, ctx) {
    const variant = variantGetParameter("layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = h.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@layer ${layer}`
          })
        };
      }
    }
  }
};
const variantInternalLayer = {
  name: "uno-layer",
  match(matcher, ctx) {
    const variant = variantGetParameter("uno-layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = h.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          layer
        };
      }
    }
  }
};
const variantScope = {
  name: "scope",
  match(matcher, ctx) {
    const variant = variantGetBracket("scope-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const scope = h.bracket(match);
      if (scope) {
        return {
          matcher: rest,
          selector: (s) => `${scope} $$ ${s}`
        };
      }
    }
  }
};
const variantVariables = {
  name: "variables",
  match(matcher, ctx) {
    if (!matcher.startsWith("["))
      return;
    const [match, rest] = getBracket(matcher, "[", "]") ?? [];
    if (!(match && rest))
      return;
    let newMatcher;
    for (const separator of ctx.generator.config.separators) {
      if (rest.startsWith(separator)) {
        newMatcher = rest.slice(separator.length);
        break;
      }
    }
    if (newMatcher == null)
      return;
    const variant = h.bracket(match) ?? "";
    const useParent = variant.startsWith("@");
    if (!(useParent || variant.includes("&")))
      return;
    return {
      matcher: newMatcher,
      handle(input, next) {
        const updates = useParent ? {
          parent: `${input.parent ? `${input.parent} $$ ` : ""}${variant}`
        } : {
          selector: variant.replace(/&/g, input.selector)
        };
        return next({
          ...input,
          ...updates
        });
      }
    };
  },
  multiPass: true
};
const variantTheme = {
  name: "theme-variables",
  match(matcher, ctx) {
    if (!hasThemeFn(matcher))
      return;
    return {
      matcher,
      handle(input, next) {
        return next({
          ...input,
          //  entries: [ [ '--css-spacing', '28px' ] ],
          entries: JSON.parse(transformThemeFn(JSON.stringify(input.entries), ctx.theme))
        });
      }
    };
  }
};
const anchoredNumberRE = /^-?[0-9.]+(?:[a-z]+|%)?$/;
const numberRE = /-?[0-9.]+(?:[a-z]+|%)?/;
const ignoreProps = [
  /\b(opacity|color|flex|backdrop-filter|^filter|transform)\b/
];
function negateMathFunction(value) {
  const match = value.match(cssMathFnRE) || value.match(cssVarFnRE);
  if (match) {
    const [fnBody, rest] = getStringComponent(`(${match[2]})${match[3]}`, "(", ")", " ") ?? [];
    if (fnBody)
      return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ""}`;
  }
}
const negateFunctionBodyRE = /\b(hue-rotate)\s*(\(.*)/;
function negateFunctionBody(value) {
  const match = value.match(negateFunctionBodyRE);
  if (match) {
    const [fnBody, rest] = getStringComponent(match[2], "(", ")", " ") ?? [];
    if (fnBody) {
      const body = anchoredNumberRE.test(fnBody.slice(1, -1)) ? fnBody.replace(numberRE, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`) : `(calc(${fnBody} * -1))`;
      return `${match[1]}${body}${rest ? ` ${rest}` : ""}`;
    }
  }
}
const variantNegative = {
  name: "negative",
  match(matcher) {
    if (!matcher.startsWith("-"))
      return;
    return {
      matcher: matcher.slice(1),
      body: (body) => {
        if (body.find((v) => v[0] === CONTROL_MINI_NO_NEGATIVE))
          return;
        let changed = false;
        body.forEach((v) => {
          const value = v[1]?.toString();
          if (!value || value === "0")
            return;
          if (ignoreProps.some((i) => i.test(v[0])))
            return;
          const negatedFn = negateMathFunction(value);
          if (negatedFn) {
            v[1] = negatedFn;
            changed = true;
            return;
          }
          const negatedBody = negateFunctionBody(value);
          if (negatedBody) {
            v[1] = negatedBody;
            changed = true;
            return;
          }
          if (anchoredNumberRE.test(value)) {
            v[1] = value.replace(numberRE, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`);
            changed = true;
          }
        });
        if (changed)
          return body;
        return [];
      }
    };
  }
};
function variantPseudoClassesAndElements() {
  const utils = { getBracket, h, variantGetBracket };
  return createPseudoClassesAndElements(utils);
}
function variantPseudoClassFunctions() {
  const utils = { getBracket, h, variantGetBracket };
  return createPseudoClassFunctions(utils);
}
function variantTaggedPseudoClasses(options = {}) {
  const utils = { getBracket, h, variantGetBracket };
  return createTaggedPseudoClasses(options, utils);
}
const variantPartClasses = createPartClasses();
const variantStartingStyle = {
  name: "starting",
  match(matcher) {
    if (!matcher.startsWith("starting:"))
      return;
    return {
      matcher: matcher.slice(9),
      handle: (input, next) => next({
        ...input,
        parent: `@starting-style`
      })
    };
  }
};
const variantSupports = {
  name: "supports",
  match(matcher, ctx) {
    const variant = variantGetParameter("supports-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let supports = h.bracket(match) ?? "";
      if (supports === "")
        supports = ctx.theme.supports?.[match] ?? "";
      if (supports) {
        if (!(supports.startsWith("(") && supports.endsWith(")"))) {
          supports = `(${supports})`;
        }
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ""}@supports ${supports}`
          })
        };
      }
    }
  },
  multiPass: true
};
function variants$1(options) {
  return [
    variantAria,
    variantDataAttribute,
    variantCssLayer,
    variantSelector,
    variantInternalLayer,
    variantNegative,
    variantStartingStyle,
    variantImportant(),
    variantSupports,
    variantPrint,
    variantCustomMedia,
    variantBreakpoints(),
    ...variantCombinators$1,
    ...variantPseudoClassesAndElements(),
    variantPseudoClassFunctions(),
    ...variantTaggedPseudoClasses(options),
    variantPartClasses,
    ...variantColorsMediaOrClass(options),
    ...variantLanguageDirections,
    variantScope,
    ...variantChildren,
    variantContainerQuery,
    variantVariables,
    ...variantTaggedDataAttributes(options),
    ...variantTaggedAriaAttributes(options),
    variantTheme
  ];
}
const cursorValues = ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"];
const containValues = ["none", "strict", "content", "size", "inline-size", "layout", "style", "paint"];
const varEmpty = " ";
const displays = [
  ["inline", { display: "inline" }],
  ["block", { display: "block" }],
  ["inline-block", { display: "inline-block" }],
  ["contents", { display: "contents" }],
  ["flow-root", { display: "flow-root" }],
  ["list-item", { display: "list-item" }],
  ["hidden", { display: "none" }],
  [/^display-(.+)$/, ([, c]) => ({ display: h.bracket.cssvar.global(c) })]
];
const appearances = [
  ["visible", { visibility: "visible" }],
  ["invisible", { visibility: "hidden" }],
  ["backface-visible", { "backface-visibility": "visible" }],
  ["backface-hidden", { "backface-visibility": "hidden" }],
  ...makeGlobalStaticRules("backface", "backface-visibility")
];
const cursors = [
  [/^cursor-(.+)$/, ([, c]) => ({ cursor: h.bracket.cssvar.global(c) })],
  ...cursorValues.map((v) => [`cursor-${v}`, { cursor: v }])
];
const contains = [
  [/^contain-(.*)$/, ([, d]) => {
    if (h.bracket(d) != null) {
      return {
        contain: h.bracket(d).split(" ").map((e) => h.cssvar.fraction(e) ?? e).join(" ")
      };
    }
    return containValues.includes(d) ? { contain: d } : void 0;
  }]
];
const pointerEvents = [
  ["pointer-events-auto", { "pointer-events": "auto" }],
  ["pointer-events-none", { "pointer-events": "none" }],
  ...makeGlobalStaticRules("pointer-events")
];
const resizes = [
  ["resize-x", { resize: "horizontal" }],
  ["resize-y", { resize: "vertical" }],
  ["resize", { resize: "both" }],
  ["resize-none", { resize: "none" }],
  ...makeGlobalStaticRules("resize")
];
const userSelects = [
  ["select-auto", { "-webkit-user-select": "auto", "user-select": "auto" }],
  ["select-all", { "-webkit-user-select": "all", "user-select": "all" }],
  ["select-text", { "-webkit-user-select": "text", "user-select": "text" }],
  ["select-none", { "-webkit-user-select": "none", "user-select": "none" }],
  ...makeGlobalStaticRules("select", "user-select")
];
const whitespaces = [
  [
    /^(?:whitespace-|ws-)([-\w]+)$/,
    ([, v]) => ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces", ...globalKeywords].includes(v) ? { "white-space": v } : void 0,
    { autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)" }
  ]
];
const contentVisibility = [
  [/^intrinsic-size-(.+)$/, ([, d]) => ({ "contain-intrinsic-size": h.bracket.cssvar.global.fraction.rem(d) }), { autocomplete: "intrinsic-size-<num>" }],
  ["content-visibility-visible", { "content-visibility": "visible" }],
  ["content-visibility-hidden", { "content-visibility": "hidden" }],
  ["content-visibility-auto", { "content-visibility": "auto" }],
  ...makeGlobalStaticRules("content-visibility")
];
const contents = [
  [/^content-(.+)$/, ([, v]) => ({ content: h.bracket.cssvar(v) })],
  ["content-empty", { content: '""' }],
  ["content-none", { content: "none" }]
];
const breaks = [
  ["break-normal", { "overflow-wrap": "normal", "word-break": "normal" }],
  ["break-words", { "overflow-wrap": "break-word" }],
  ["break-all", { "word-break": "break-all" }],
  ["break-keep", { "word-break": "keep-all" }],
  ["break-anywhere", { "overflow-wrap": "anywhere" }]
];
const textWraps = [
  ["text-wrap", { "text-wrap": "wrap" }],
  ["text-nowrap", { "text-wrap": "nowrap" }],
  ["text-balance", { "text-wrap": "balance" }],
  ["text-pretty", { "text-wrap": "pretty" }]
];
const textOverflows = [
  ["truncate", { "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-truncate", { "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-ellipsis", { "text-overflow": "ellipsis" }],
  ["text-clip", { "text-overflow": "clip" }]
];
const textTransforms$1 = [
  ["case-upper", { "text-transform": "uppercase" }],
  ["case-lower", { "text-transform": "lowercase" }],
  ["case-capital", { "text-transform": "capitalize" }],
  ["case-normal", { "text-transform": "none" }],
  ...makeGlobalStaticRules("case", "text-transform")
];
const fontStyles = [
  ["italic", { "font-style": "italic" }],
  ["not-italic", { "font-style": "normal" }],
  ["font-italic", { "font-style": "italic" }],
  ["font-not-italic", { "font-style": "normal" }],
  ["oblique", { "font-style": "oblique" }],
  ["not-oblique", { "font-style": "normal" }],
  ["font-oblique", { "font-style": "oblique" }],
  ["font-not-oblique", { "font-style": "normal" }]
];
const fontSmoothings = [
  ["antialiased", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale"
  }],
  ["subpixel-antialiased", {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto"
  }]
];
const fieldSizing = [
  ["field-sizing-fixed", { "field-sizing": "fixed" }],
  ["field-sizing-content", { "field-sizing": "content" }]
];
const ringBase = {
  "--un-ring-inset": varEmpty,
  "--un-ring-offset-width": "0px",
  "--un-ring-offset-color": "#fff",
  "--un-ring-width": "0px",
  "--un-ring-color": "rgb(147 197 253 / 0.5)",
  "--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
const preflightKeys$2 = Object.keys(ringBase);
const rings = [
  // ring
  [/^ring(?:-(.+))?$/, ([, d], { theme: theme2 }) => {
    const value = theme2.ringWidth?.[d || "DEFAULT"] ?? h.px(d || "1");
    if (value) {
      return {
        "--un-ring-width": value,
        "--un-ring-offset-shadow": "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
        "--un-ring-shadow": "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
  }, { custom: { preflightKeys: preflightKeys$2 }, autocomplete: "ring-$ringWidth" }],
  // size
  [/^ring-(?:width-|size-)(.+)$/, handleWidth$3, { autocomplete: "ring-(width|size)-$lineWidth" }],
  // offset size
  ["ring-offset", { "--un-ring-offset-width": "1px" }],
  [/^ring-offset-(?:width-|size-)?(.+)$/, ([, d], { theme: theme2 }) => ({ "--un-ring-offset-width": theme2.lineWidth?.[d] ?? h.bracket.cssvar.px(d) }), { autocomplete: "ring-offset-(width|size)-$lineWidth" }],
  // colors
  [/^ring-(.+)$/, handleColorOrWidth$3, { autocomplete: "ring-$colors" }],
  [/^ring-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-ring-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "ring-(op|opacity)-<percent>" }],
  // offset color
  [/^ring-offset-(.+)$/, colorResolver("--un-ring-offset-color", "ring-offset", "borderColor"), { autocomplete: "ring-offset-$colors" }],
  [/^ring-offset-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-ring-offset-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "ring-offset-(op|opacity)-<percent>" }],
  // style
  ["ring-inset", { "--un-ring-inset": "inset" }]
];
function handleWidth$3([, b], { theme: theme2 }) {
  return { "--un-ring-width": theme2.ringWidth?.[b] ?? h.bracket.cssvar.px(b) };
}
function handleColorOrWidth$3(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth$3(match, ctx);
  return colorResolver("--un-ring-color", "ring", "borderColor")(match, ctx);
}
const boxShadowsBase = {
  "--un-ring-offset-shadow": "0 0 rgb(0 0 0 / 0)",
  "--un-ring-shadow": "0 0 rgb(0 0 0 / 0)",
  "--un-shadow-inset": varEmpty,
  "--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
const preflightKeys$1 = Object.keys(boxShadowsBase);
const boxShadows = [
  // color
  [/^shadow(?:-(.+))?$/, (match, context) => {
    const [, d] = match;
    const { theme: theme2 } = context;
    const v = theme2.boxShadow?.[d || "DEFAULT"];
    const c = d ? h.bracket.cssvar(d) : void 0;
    if ((v != null || c != null) && !hasParseableColor(c, theme2, "shadowColor")) {
      return {
        "--un-shadow": colorableShadows(v || c, "--un-shadow-color").join(","),
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
    return colorResolver("--un-shadow-color", "shadow", "shadowColor")(match, context);
  }, { custom: { preflightKeys: preflightKeys$1 }, autocomplete: ["shadow-$colors", "shadow-$boxShadow"] }],
  [/^shadow-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-shadow-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "shadow-(op|opacity)-<percent>" }],
  // inset
  ["shadow-inset", { "--un-shadow-inset": "inset" }]
];
const transformValues = [
  "translate",
  "rotate",
  "scale"
];
const transformCpu = [
  "translateX(var(--un-translate-x))",
  "translateY(var(--un-translate-y))",
  // 'translateZ(var(--un-translate-z))',
  "rotate(var(--un-rotate))",
  // 'rotateX(var(--un-rotate-x))',
  // 'rotateY(var(--un-rotate-y))',
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))"
  // 'scaleZ(var(--un-scale-z))',
].join(" ");
const transform = [
  "translateX(var(--un-translate-x))",
  "translateY(var(--un-translate-y))",
  "translateZ(var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
const transformGpu = [
  "translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
const transformBase = {
  // transform
  "--un-rotate": 0,
  "--un-rotate-x": 0,
  "--un-rotate-y": 0,
  "--un-rotate-z": 0,
  "--un-scale-x": 1,
  "--un-scale-y": 1,
  "--un-scale-z": 1,
  "--un-skew-x": 0,
  "--un-skew-y": 0,
  "--un-translate-x": 0,
  "--un-translate-y": 0,
  "--un-translate-z": 0
};
const preflightKeys = Object.keys(transformBase);
const transforms = [
  // origins
  [
    /^(?:transform-)?origin-(.+)$/,
    ([, s]) => ({ "transform-origin": positionMap[s] ?? h.bracket.cssvar(s) }),
    { autocomplete: [`transform-origin-(${Object.keys(positionMap).join("|")})`, `origin-(${Object.keys(positionMap).join("|")})`] }
  ],
  // perspectives
  [/^(?:transform-)?perspect(?:ive)?-(.+)$/, ([, s]) => {
    const v = h.bracket.cssvar.px.numberWithUnit(s);
    if (v != null) {
      return {
        "-webkit-perspective": v,
        "perspective": v
      };
    }
  }],
  // skip 1 & 2 letters shortcut
  [/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, ([, s]) => {
    const v = h.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : void 0);
    if (v != null) {
      return {
        "-webkit-perspective-origin": v,
        "perspective-origin": v
      };
    }
  }],
  // modifiers
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate, { custom: { preflightKeys } }],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate, { custom: { preflightKeys } }],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate, { custom: { preflightKeys } }],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate, { custom: { preflightKeys } }],
  [/^(?:transform-)?skew-()(.+)$/, handleSkew, { custom: { preflightKeys } }],
  [/^(?:transform-)?skew-([xy])-(.+)$/, handleSkew, { custom: { preflightKeys }, autocomplete: ["transform-skew-(x|y)-<percent>", "skew-(x|y)-<percent>"] }],
  [/^(?:transform-)?scale-()(.+)$/, handleScale, { custom: { preflightKeys } }],
  [/^(?:transform-)?scale-([xyz])-(.+)$/, handleScale, { custom: { preflightKeys }, autocomplete: [`transform-(${transformValues.join("|")})-<percent>`, `transform-(${transformValues.join("|")})-(x|y|z)-<percent>`, `(${transformValues.join("|")})-<percent>`, `(${transformValues.join("|")})-(x|y|z)-<percent>`] }],
  // style
  [/^(?:transform-)?preserve-3d$/, () => ({ "transform-style": "preserve-3d" })],
  [/^(?:transform-)?preserve-flat$/, () => ({ "transform-style": "flat" })],
  // base
  ["transform", { transform }, { custom: { preflightKeys } }],
  ["transform-cpu", { transform: transformCpu }, {
    custom: { preflightKeys: ["--un-translate-x", "--un-translate-y", "--un-rotate", "--un-rotate-z", "--un-skew-x", "--un-skew-y", "--un-scale-x", "--un-scale-y"] }
  }],
  ["transform-gpu", { transform: transformGpu }, { custom: { preflightKeys } }],
  ["transform-none", { transform: "none" }],
  ...makeGlobalStaticRules("transform")
];
function handleTranslate([, d, b], { theme: theme2 }) {
  const v = theme2.spacing?.[b] ?? h.bracket.cssvar.fraction.rem(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "translate"),
      ["transform", transform]
    ];
  }
}
function handleScale([, d, b]) {
  const v = h.bracket.cssvar.fraction.percent(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "scale"),
      ["transform", transform]
    ];
  }
}
function handleRotate([, d = "", b]) {
  const v = h.bracket.cssvar.degree(b);
  if (v != null) {
    if (d) {
      return {
        "--un-rotate": 0,
        [`--un-rotate-${d}`]: v,
        "transform": transform
      };
    } else {
      return {
        "--un-rotate-x": 0,
        "--un-rotate-y": 0,
        "--un-rotate-z": 0,
        "--un-rotate": v,
        "transform": transform
      };
    }
  }
}
function handleSkew([, d, b]) {
  const v = h.bracket.cssvar.degree(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "skew"),
      ["transform", transform]
    ];
  }
}
const verticalAlignAlias = {
  "mid": "middle",
  "base": "baseline",
  "btm": "bottom",
  "baseline": "baseline",
  "top": "top",
  "start": "top",
  "middle": "middle",
  "bottom": "bottom",
  "end": "bottom",
  "text-top": "text-top",
  "text-bottom": "text-bottom",
  "sub": "sub",
  "super": "super",
  ...Object.fromEntries(globalKeywords.map((x) => [x, x]))
};
const verticalAligns = [
  [
    /^(?:vertical|align|v)-(.+)$/,
    ([, v]) => ({ "vertical-align": verticalAlignAlias[v] ?? h.bracket.cssvar.numberWithUnit(v) }),
    {
      autocomplete: [
        `(vertical|align|v)-(${Object.keys(verticalAlignAlias).join("|")})`,
        "(vertical|align|v)-<percentage>"
      ]
    }
  ]
];
const textAlignValues = ["center", "left", "right", "justify", "start", "end"];
const textAligns = [
  ...textAlignValues.map((v) => [`text-${v}`, { "text-align": v }]),
  ...[
    ...globalKeywords,
    ...textAlignValues
  ].map((v) => [`text-align-${v}`, { "text-align": v }])
];
const outline = [
  // size
  [/^outline-(?:width-|size-)?(.+)$/, handleWidth$2, { autocomplete: "outline-(width|size)-<num>" }],
  // color
  [/^outline-(?:color-)?(.+)$/, handleColorOrWidth$2, { autocomplete: "outline-$colors" }],
  // offset
  [/^outline-offset-(.+)$/, ([, d], { theme: theme2 }) => ({ "outline-offset": theme2.lineWidth?.[d] ?? h.bracket.cssvar.global.px(d) }), { autocomplete: "outline-(offset)-<num>" }],
  // style
  ["outline", { "outline-style": "solid" }],
  ...["auto", "dashed", "dotted", "double", "hidden", "solid", "groove", "ridge", "inset", "outset", ...globalKeywords].map((v) => [`outline-${v}`, { "outline-style": v }]),
  ["outline-none", { "outline": "2px solid transparent", "outline-offset": "2px" }]
];
function handleWidth$2([, b], { theme: theme2 }) {
  return { "outline-width": theme2.lineWidth?.[b] ?? h.bracket.cssvar.global.px(b) };
}
function handleColorOrWidth$2(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth$2(match, ctx);
  return colorResolver("outline-color", "outline-color", "borderColor")(match, ctx);
}
const appearance = [
  ["appearance-auto", { "-webkit-appearance": "auto", "appearance": "auto" }],
  ["appearance-none", { "-webkit-appearance": "none", "appearance": "none" }]
];
function willChangeProperty(prop) {
  return h.properties.auto.global(prop) ?? {
    contents: "contents",
    scroll: "scroll-position"
  }[prop];
}
const willChange = [
  [/^will-change-(.+)/, ([, p]) => ({ "will-change": willChangeProperty(p) })]
];
const borderStyles = ["solid", "dashed", "dotted", "double", "hidden", "none", "groove", "ridge", "inset", "outset", ...globalKeywords];
const borders = [
  // compound
  [/^(?:border|b)()(?:-(.+))?$/, handlerBorderSize, { autocomplete: "(border|b)-<directions>" }],
  [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorderSize],
  // size
  [/^(?:border|b)-()(?:width|size)-(.+)$/, handlerBorderSize, { autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"] }],
  [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],
  // colors
  [/^(?:border|b)-()(?:color-)?(.+)$/, handlerBorderColorOrSize, { autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"] }],
  [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  // opacity
  [/^(?:border|b)-()op(?:acity)?-?(.+)$/, handlerBorderOpacity, { autocomplete: "(border|b)-(op|opacity)-<percent>" }],
  [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  // radius
  [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, handlerRounded, { autocomplete: ["(border|b)-(rounded|rd)", "(border|b)-(rounded|rd)-$borderRadius", "(rounded|rd)", "(rounded|rd)-$borderRadius"] }],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],
  // style
  [/^(?:border|b)-(?:style-)?()(.+)$/, handlerBorderStyle, { autocomplete: ["(border|b)-style", `(border|b)-(${borderStyles.join("|")})`, "(border|b)-<directions>-style", `(border|b)-<directions>-(${borderStyles.join("|")})`, `(border|b)-<directions>-style-(${borderStyles.join("|")})`, `(border|b)-style-(${borderStyles.join("|")})`] }],
  [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle]
];
function transformBorderColor(color, alpha, direction) {
  if (alpha != null) {
    return {
      [`border${direction}-color`]: colorToString(color, alpha)
    };
  }
  if (direction === "") {
    const object = {};
    const opacityVar = `--un-border-opacity`;
    const result = colorToString(color, `var(${opacityVar})`);
    if (result.includes(opacityVar))
      object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
    object["border-color"] = result;
    return object;
  } else {
    const object = {};
    const opacityVar = "--un-border-opacity";
    const opacityDirectionVar = `--un-border${direction}-opacity`;
    const result = colorToString(color, `var(${opacityDirectionVar})`);
    if (result.includes(opacityDirectionVar)) {
      object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
      object[opacityDirectionVar] = `var(${opacityVar})`;
    }
    object[`border${direction}-color`] = result;
    return object;
  }
}
function borderColorResolver(direction) {
  return ([, body], theme2) => {
    const data = parseColor(body, theme2, "borderColor");
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    if (cssColor)
      return transformBorderColor(cssColor, alpha, direction);
    else if (color)
      return transformBorderColor(color, alpha, direction);
  };
}
function handlerBorderSize([, a = "", b], { theme: theme2 }) {
  const v = theme2.lineWidth?.[b || "DEFAULT"] ?? h.bracket.cssvar.global.px(b || "1");
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`border${i}-width`, v]);
}
function handlerBorderColorOrSize([, a = "", b], ctx) {
  if (a in directionMap) {
    if (isCSSMathFn(h.bracket(b)))
      return handlerBorderSize(["", a, b], ctx);
    if (hasParseableColor(b, ctx.theme, "borderColor")) {
      return Object.assign(
        {},
        ...directionMap[a].map((i) => borderColorResolver(i)(["", b], ctx.theme))
      );
    }
  }
}
function handlerBorderOpacity([, a = "", opacity2]) {
  const v = h.bracket.percent.cssvar(opacity2);
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`--un-border${i}-opacity`, v]);
}
function handlerRounded([, a = "", s], { theme: theme2 }) {
  const v = theme2.borderRadius?.[s || "DEFAULT"] || h.bracket.cssvar.global.fraction.rem(s || "1");
  if (a in cornerMap && v != null)
    return cornerMap[a].map((i) => [`border${i}-radius`, v]);
}
function handlerBorderStyle([, a = "", s]) {
  if (borderStyles.includes(s) && a in directionMap)
    return directionMap[a].map((i) => [`border${i}-style`, s]);
}
const opacity = [
  [/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) })]
];
const bgUrlRE = /^\[url\(.+\)\]$/;
const bgLengthRE = /^\[(?:length|size):.+\]$/;
const bgPositionRE = /^\[position:.+\]$/;
const bgGradientRE = /^\[(?:linear|conic|radial)-gradient\(.+\)\]$/;
const bgImageRE = /^\[image:.+\]$/;
const bgColors = [
  [/^bg-(.+)$/, (...args) => {
    const d = args[0][1];
    if (bgUrlRE.test(d))
      return { "--un-url": h.bracket(d), "background-image": "var(--un-url)" };
    if (bgLengthRE.test(d) && h.bracketOfLength(d) != null)
      return { "background-size": h.bracketOfLength(d).split(" ").map((e) => h.fraction.auto.px.cssvar(e) ?? e).join(" ") };
    if ((isSize(d) || bgPositionRE.test(d)) && h.bracketOfPosition(d) != null)
      return { "background-position": h.bracketOfPosition(d).split(" ").map((e) => h.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
    if (bgGradientRE.test(d) || bgImageRE.test(d)) {
      const s = h.bracket(d);
      if (s) {
        const url = s.startsWith("http") ? `url(${s})` : h.cssvar(s);
        return { "background-image": url ?? s };
      }
    }
    return colorResolver("background-color", "bg", "backgroundColor")(...args);
  }, { autocomplete: "bg-$colors" }],
  [/^bg-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-bg-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "bg-(op|opacity)-<percent>" }]
];
const colorScheme = [
  [/^color-scheme-(\w+)$/, ([, v]) => ({ "color-scheme": v })]
];
const containerParent = [
  [/^@container(?:\/(\w+))?(?:-(normal|inline-size|size))?$/, ([, l, v]) => {
    return {
      "container-type": v ?? "inline-size",
      "container-name": l
    };
  }]
];
const decorationStyles = ["solid", "double", "dotted", "dashed", "wavy", ...globalKeywords];
const textDecorations = [
  [/^(?:decoration-)?(underline|overline|line-through)$/, ([, s]) => ({ "text-decoration-line": s }), { autocomplete: "decoration-(underline|overline|line-through)" }],
  // size
  [/^(?:underline|decoration)-(?:size-)?(.+)$/, handleWidth$1, { autocomplete: "(underline|decoration)-<num>" }],
  [/^(?:underline|decoration)-(auto|from-font)$/, ([, s]) => ({ "text-decoration-thickness": s }), { autocomplete: "(underline|decoration)-(auto|from-font)" }],
  // colors
  [/^(?:underline|decoration)-(.+)$/, handleColorOrWidth$1, { autocomplete: "(underline|decoration)-$colors" }],
  [/^(?:underline|decoration)-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-line-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "(underline|decoration)-(op|opacity)-<percent>" }],
  // offset
  [/^(?:underline|decoration)-offset-(.+)$/, ([, s], { theme: theme2 }) => ({ "text-underline-offset": theme2.lineWidth?.[s] ?? h.auto.bracket.cssvar.global.px(s) }), { autocomplete: "(underline|decoration)-(offset)-<num>" }],
  // style
  ...decorationStyles.map((v) => [`underline-${v}`, { "text-decoration-style": v }]),
  ...decorationStyles.map((v) => [`decoration-${v}`, { "text-decoration-style": v }]),
  ["no-underline", { "text-decoration": "none" }],
  ["decoration-none", { "text-decoration": "none" }]
];
function handleWidth$1([, b], { theme: theme2 }) {
  return { "text-decoration-thickness": theme2.lineWidth?.[b] ?? h.bracket.cssvar.global.px(b) };
}
function handleColorOrWidth$1(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth$1(match, ctx);
  const result = colorResolver("text-decoration-color", "line", "borderColor")(match, ctx);
  if (result) {
    return {
      "-webkit-text-decoration-color": result["text-decoration-color"],
      ...result
    };
  }
}
const flex = [
  // display
  ["flex", { display: "flex" }],
  ["inline-flex", { display: "inline-flex" }],
  ["flex-inline", { display: "inline-flex" }],
  // flex
  [/^flex-(.*)$/, ([, d]) => ({ flex: h.bracket(d) != null ? h.bracket(d).split(" ").map((e) => h.cssvar.fraction(e) ?? e).join(" ") : h.cssvar.fraction(d) })],
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { flex: "1 1 auto" }],
  ["flex-initial", { flex: "0 1 auto" }],
  ["flex-none", { flex: "none" }],
  // shrink/grow/basis
  [/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = ""]) => ({ "flex-shrink": h.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-shrink-<num>", "shrink-<num>"] }],
  [/^(?:flex-)?grow(?:-(.*))?$/, ([, d = ""]) => ({ "flex-grow": h.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-grow-<num>", "grow-<num>"] }],
  [/^(?:flex-)?basis-(.+)$/, ([, d], { theme: theme2 }) => ({ "flex-basis": theme2.spacing?.[d] ?? h.bracket.cssvar.auto.fraction.rem(d) }), { autocomplete: ["flex-basis-$spacing", "basis-$spacing"] }],
  // directions
  ["flex-row", { "flex-direction": "row" }],
  ["flex-row-reverse", { "flex-direction": "row-reverse" }],
  ["flex-col", { "flex-direction": "column" }],
  ["flex-col-reverse", { "flex-direction": "column-reverse" }],
  // wraps
  ["flex-wrap", { "flex-wrap": "wrap" }],
  ["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
  ["flex-nowrap", { "flex-wrap": "nowrap" }]
];
const directions = {
  "": "",
  "x": "column-",
  "y": "row-",
  "col": "column-",
  "row": "row-"
};
function handleGap([, d = "", s], { theme: theme2 }) {
  const v = theme2.spacing?.[s] ?? h.bracket.cssvar.global.rem(s);
  if (v != null) {
    return {
      [`${directions[d]}gap`]: v
    };
  }
}
const gaps = [
  [/^(?:flex-|grid-)?gap-?()(.+)$/, handleGap, { autocomplete: ["gap-$spacing", "gap-<num>"] }],
  [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, handleGap, { autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] }],
  [/^(?:flex-|grid-)?gap-(col|row)-?(.+)$/, handleGap, { autocomplete: ["gap-(col|row)-$spacing", "gap-(col|row)-<num>"] }]
];
function rowCol(s) {
  return s.replace("col", "column");
}
function rowColTheme(s) {
  return s[0] === "r" ? "Row" : "Column";
}
function autoDirection(c, theme2, prop) {
  const v = theme2[`gridAuto${rowColTheme(c)}`]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "fr":
      return "minmax(0,1fr)";
  }
  return h.bracket.cssvar.auto.rem(prop);
}
const grids = [
  // displays
  ["grid", { display: "grid" }],
  ["inline-grid", { display: "inline-grid" }],
  // global
  [/^(?:grid-)?(row|col)-(.+)$/, ([, c, v], { theme: theme2 }) => ({
    [`grid-${rowCol(c)}`]: theme2[`grid${rowColTheme(c)}`]?.[v] ?? h.bracket.cssvar.auto(v)
  })],
  // span
  [/^(?:grid-)?(row|col)-span-(.+)$/, ([, c, s]) => {
    if (s === "full")
      return { [`grid-${rowCol(c)}`]: "1/-1" };
    const v = h.bracket.number(s);
    if (v != null)
      return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
  }, { autocomplete: "(grid-row|grid-col|row|col)-span-<num>" }],
  // starts & ends
  [/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-start`]: h.bracket.cssvar(v) ?? v })],
  [/^(?:grid-)?(row|col)-end-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-end`]: h.bracket.cssvar(v) ?? v }), { autocomplete: "(grid-row|grid-col|row|col)-(start|end)-<num>" }],
  // auto flows
  [/^(?:grid-)?auto-(rows|cols)-(.+)$/, ([, c, v], { theme: theme2 }) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme2, v) }), { autocomplete: "(grid-auto|auto)-(rows|cols)-<num>" }],
  // grid-auto-flow, auto-flow: uno
  // grid-flow: wind
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ "grid-auto-flow": h.bracket.cssvar(v) })],
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/, ([, v]) => ({ "grid-auto-flow": rowCol(v).replace("-", " ") }), { autocomplete: ["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"] }],
  // templates
  [/^(?:grid-)?(rows|cols)-(.+)$/, ([, c, v], { theme: theme2 }) => ({
    [`grid-template-${rowCol(c)}`]: theme2[`gridTemplate${rowColTheme(c)}`]?.[v] ?? h.bracket.cssvar(v)
  })],
  [/^(?:grid-)?(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
  [/^(?:grid-)?(rows|cols)-(\d+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }), { autocomplete: "(grid-rows|grid-cols|rows|cols)-<num>" }],
  // areas
  [/^grid-area(s)?-(.+)$/, ([, s, v]) => {
    if (s != null)
      return { "grid-template-areas": h.cssvar(v) ?? v.split("-").map((s2) => `"${h.bracket(s2)}"`).join(" ") };
    return { "grid-area": h.bracket.cssvar(v) };
  }],
  // template none
  ["grid-rows-none", { "grid-template-rows": "none" }],
  ["grid-cols-none", { "grid-template-columns": "none" }],
  // template subgrid
  ["grid-rows-subgrid", { "grid-template-rows": "subgrid" }],
  ["grid-cols-subgrid", { "grid-template-columns": "subgrid" }]
];
const overflowValues = [
  "auto",
  "hidden",
  "clip",
  "visible",
  "scroll",
  "overlay",
  ...globalKeywords
];
const overflows = [
  [/^(?:overflow|of)-(.+)$/, ([, v]) => overflowValues.includes(v) ? { overflow: v } : void 0, { autocomplete: [`(overflow|of)-(${overflowValues.join("|")})`, `(overflow|of)-(x|y)-(${overflowValues.join("|")})`] }],
  [/^(?:overflow|of)-([xy])-(.+)$/, ([, d, v]) => overflowValues.includes(v) ? { [`overflow-${d}`]: v } : void 0]
];
const positions = [
  [/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, ([, v]) => ({ position: v }), {
    autocomplete: [
      "(position|pos)-<position>",
      "(position|pos)-<globalKeyword>",
      "<position>"
    ]
  }],
  [/^(?:position-|pos-)([-\w]+)$/, ([, v]) => globalKeywords.includes(v) ? { position: v } : void 0],
  [/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })]
];
const justifies = [
  // contents
  ["justify-start", { "justify-content": "flex-start" }],
  ["justify-end", { "justify-content": "flex-end" }],
  ["justify-center", { "justify-content": "center" }],
  ["justify-between", { "justify-content": "space-between" }],
  ["justify-around", { "justify-content": "space-around" }],
  ["justify-evenly", { "justify-content": "space-evenly" }],
  ["justify-stretch", { "justify-content": "stretch" }],
  ["justify-left", { "justify-content": "left" }],
  ["justify-right", { "justify-content": "right" }],
  ["justify-center-safe", { "justify-content": "safe center" }],
  ["justify-end-safe", { "justify-content": "safe flex-end" }],
  ["justify-normal", { "justify-content": "normal" }],
  ...makeGlobalStaticRules("justify", "justify-content"),
  // items
  ["justify-items-start", { "justify-items": "start" }],
  ["justify-items-end", { "justify-items": "end" }],
  ["justify-items-center", { "justify-items": "center" }],
  ["justify-items-stretch", { "justify-items": "stretch" }],
  ["justify-items-center-safe", { "justify-items": "safe center" }],
  ["justify-items-end-safe", { "justify-items": "safe flex-end" }],
  ...makeGlobalStaticRules("justify-items"),
  // selfs
  ["justify-self-auto", { "justify-self": "auto" }],
  ["justify-self-start", { "justify-self": "start" }],
  ["justify-self-end", { "justify-self": "end" }],
  ["justify-self-center", { "justify-self": "center" }],
  ["justify-self-stretch", { "justify-self": "stretch" }],
  ["justify-self-baseline", { "justify-self": "baseline" }],
  ["justify-self-center-safe", { "justify-self": "safe center" }],
  ["justify-self-end-safe", { "justify-self": "safe flex-end" }],
  ...makeGlobalStaticRules("justify-self")
];
const orders = [
  [/^order-(.+)$/, ([, v]) => ({ order: h.bracket.cssvar.number(v) })],
  ["order-first", { order: "-9999" }],
  ["order-last", { order: "9999" }],
  ["order-none", { order: "0" }]
];
const alignments = [
  // contents
  ["content-center", { "align-content": "center" }],
  ["content-start", { "align-content": "flex-start" }],
  ["content-end", { "align-content": "flex-end" }],
  ["content-between", { "align-content": "space-between" }],
  ["content-around", { "align-content": "space-around" }],
  ["content-evenly", { "align-content": "space-evenly" }],
  ["content-baseline", { "align-content": "baseline" }],
  ["content-center-safe", { "align-content": "safe center" }],
  ["content-end-safe", { "align-content": "safe flex-end" }],
  ["content-stretch", { "align-content": "stretch" }],
  ["content-normal", { "align-content": "normal" }],
  ...makeGlobalStaticRules("content", "align-content"),
  // items
  ["items-start", { "align-items": "flex-start" }],
  ["items-end", { "align-items": "flex-end" }],
  ["items-center", { "align-items": "center" }],
  ["items-baseline", { "align-items": "baseline" }],
  ["items-stretch", { "align-items": "stretch" }],
  ["items-baseline-last", { "align-items": "last baseline" }],
  ["items-center-safe", { "align-items": "safe center" }],
  ["items-end-safe", { "align-items": "safe flex-end" }],
  ...makeGlobalStaticRules("items", "align-items"),
  // selfs
  ["self-auto", { "align-self": "auto" }],
  ["self-start", { "align-self": "flex-start" }],
  ["self-end", { "align-self": "flex-end" }],
  ["self-center", { "align-self": "center" }],
  ["self-stretch", { "align-self": "stretch" }],
  ["self-baseline", { "align-self": "baseline" }],
  ["self-baseline-last", { "align-self": "last baseline" }],
  ["self-center-safe", { "align-self": "safe center" }],
  ["self-end-safe", { "align-self": "safe flex-end" }],
  ...makeGlobalStaticRules("self", "align-self")
];
const placements = [
  // contents
  ["place-content-center", { "place-content": "center" }],
  ["place-content-start", { "place-content": "start" }],
  ["place-content-end", { "place-content": "end" }],
  ["place-content-between", { "place-content": "space-between" }],
  ["place-content-around", { "place-content": "space-around" }],
  ["place-content-evenly", { "place-content": "space-evenly" }],
  ["place-content-stretch", { "place-content": "stretch" }],
  ["place-content-baseline", { "place-content": "baseline" }],
  ["place-content-center-safe", { "place-content": "safe center" }],
  ["place-content-end-safe", { "place-content": "safe flex-end" }],
  ...makeGlobalStaticRules("place-content"),
  // items
  ["place-items-start", { "place-items": "start" }],
  ["place-items-end", { "place-items": "end" }],
  ["place-items-center", { "place-items": "center" }],
  ["place-items-stretch", { "place-items": "stretch" }],
  ["place-items-baseline", { "place-items": "baseline" }],
  ["place-items-center-safe", { "place-items": "safe center" }],
  ["place-items-end-safe", { "place-items": "safe flex-end" }],
  ...makeGlobalStaticRules("place-items"),
  // selfs
  ["place-self-auto", { "place-self": "auto" }],
  ["place-self-start", { "place-self": "start" }],
  ["place-self-end", { "place-self": "end" }],
  ["place-self-center", { "place-self": "center" }],
  ["place-self-stretch", { "place-self": "stretch" }],
  ["place-self-center-safe", { "place-self": "safe center" }],
  ["place-self-end-safe", { "place-self": "safe flex-end" }],
  ...makeGlobalStaticRules("place-self")
];
const flexGridJustifiesAlignments = [...justifies, ...alignments, ...placements].flatMap(([k, v]) => [
  [`flex-${k}`, v],
  [`grid-${k}`, v]
]);
function handleInsetValue(v, { theme: theme2 }) {
  return theme2.spacing?.[v] ?? h.bracket.cssvar.global.auto.fraction.rem(v);
}
function handleInsetValues([, d, v], ctx) {
  const r = handleInsetValue(v, ctx);
  if (r != null && d in insetMap)
    return insetMap[d].map((i) => [i.slice(1), r]);
}
const insets = [
  [
    /^(?:position-|pos-)?inset-(.+)$/,
    ([, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),
    {
      autocomplete: [
        "(position|pos)-inset-<directions>-$spacing",
        "(position|pos)-inset-(block|inline)-$spacing",
        "(position|pos)-inset-(bs|be|is|ie)-$spacing",
        "(position|pos)-(top|left|right|bottom)-$spacing"
      ]
    }
  ],
  [/^(?:position-|pos-)?(start|end)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/, ([, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) })]
];
const floats = [
  // floats
  ["float-left", { float: "left" }],
  ["float-right", { float: "right" }],
  ["float-start", { float: "inline-start" }],
  ["float-end", { float: "inline-end" }],
  ["float-none", { float: "none" }],
  ...makeGlobalStaticRules("float"),
  // clears
  ["clear-left", { clear: "left" }],
  ["clear-right", { clear: "right" }],
  ["clear-both", { clear: "both" }],
  ["clear-start", { clear: "inline-start" }],
  ["clear-end", { clear: "inline-end" }],
  ["clear-none", { clear: "none" }],
  ...makeGlobalStaticRules("clear")
];
const zIndexes = [
  [/^(?:position-|pos-)?z([\d.]+)$/, ([, v]) => ({ "z-index": h.number(v) })],
  [/^(?:position-|pos-)?z-(.+)$/, ([, v], { theme: theme2 }) => ({ "z-index": theme2.zIndex?.[v] ?? h.bracket.cssvar.global.auto.number(v) }), { autocomplete: "z-<num>" }]
];
const boxSizing = [
  ["box-border", { "box-sizing": "border-box" }],
  ["box-content", { "box-sizing": "content-box" }],
  ...makeGlobalStaticRules("box", "box-sizing")
];
const questionMark = [
  [
    /^(where|\?)$/,
    (_, { constructCSS, generator }) => {
      if (generator.userConfig.envMode === "dev")
        return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}} ${constructCSS({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })}`;
    }
  ]
];
const sizeMapping = {
  h: "height",
  w: "width",
  inline: "inline-size",
  block: "block-size"
};
function getPropName(minmax, hw) {
  return `${minmax || ""}${sizeMapping[hw]}`;
}
function getSizeValue(minmax, hw, theme2, prop) {
  const key = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase());
  const v = theme2[key]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "fit":
    case "max":
    case "min":
      return `${prop}-content`;
  }
  return h.bracket.cssvar.global.auto.fraction.rem(prop);
}
const sizes = [
  [/^size-(min-|max-)?(.+)$/, ([, m, s], { theme: theme2 }) => ({ [getPropName(m, "w")]: getSizeValue(m, "w", theme2, s), [getPropName(m, "h")]: getSizeValue(m, "h", theme2, s) })],
  [/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme: theme2 }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme2, s) })],
  [/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/, ([, m, w, s], { theme: theme2 }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme2, s) }), {
    autocomplete: [
      "(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(max|min)-(w|h|block|inline)",
      "(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(w|h)-full",
      "(max|min)-(w|h)-full"
    ]
  }],
  [/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/, ([, m, h2, p], context) => ({ [getPropName(m, h2)]: handleBreakpoint(context, p, "verticalBreakpoints") })],
  [/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/, ([, m, w, p], context) => ({ [getPropName(m, w)]: handleBreakpoint(context, p) }), {
    autocomplete: [
      "(w|h)-screen",
      "(min|max)-(w|h)-screen",
      "h-screen-$verticalBreakpoints",
      "(min|max)-h-screen-$verticalBreakpoints",
      "w-screen-$breakpoints",
      "(min|max)-w-screen-$breakpoints"
    ]
  }]
];
function handleBreakpoint(context, point, key = "breakpoints") {
  const bp = resolveBreakpoints(context, key);
  if (bp)
    return bp.find((i) => i.point === point)?.size;
}
function getAspectRatio(prop) {
  if (/^\d+\/\d+$/.test(prop))
    return prop;
  switch (prop) {
    case "square":
      return "1/1";
    case "video":
      return "16/9";
  }
  return h.bracket.cssvar.global.auto.number(prop);
}
const aspectRatio = [
  [/^(?:size-)?aspect-(?:ratio-)?(.+)$/, ([, d]) => ({ "aspect-ratio": getAspectRatio(d) }), { autocomplete: ["aspect-(square|video|ratio)", "aspect-ratio-(square|video)"] }]
];
const paddings = [
  [/^pa?()-?(.+)$/, directionSize("padding"), { autocomplete: ["(m|p)<num>", "(m|p)-<num>"] }],
  [/^p-?xy()()$/, directionSize("padding"), { autocomplete: "(m|p)-(xy)" }],
  [/^p-?([xy])(?:-?(.+))?$/, directionSize("padding")],
  [/^p-?([rltbse])(?:-?(.+))?$/, directionSize("padding"), { autocomplete: "(m|p)<directions>-<num>" }],
  [/^p-(block|inline)(?:-(.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(block|inline)-<num>" }],
  [/^p-?([bi][se])(?:-?(.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(bs|be|is|ie)-<num>" }]
];
const margins = [
  [/^ma?()-?(.+)$/, directionSize("margin")],
  [/^m-?xy()()$/, directionSize("margin")],
  [/^m-?([xy])(?:-?(.+))?$/, directionSize("margin")],
  [/^m-?([rltbse])(?:-?(.+))?$/, directionSize("margin")],
  [/^m-(block|inline)(?:-(.+))?$/, directionSize("margin")],
  [/^m-?([bi][se])(?:-?(.+))?$/, directionSize("margin")]
];
const svgUtilities = [
  // fills
  [/^fill-(.+)$/, colorResolver("fill", "fill", "backgroundColor"), { autocomplete: "fill-$colors" }],
  [/^fill-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-fill-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "fill-(op|opacity)-<percent>" }],
  ["fill-none", { fill: "none" }],
  // stroke size
  [/^stroke-(?:width-|size-)?(.+)$/, handleWidth, { autocomplete: ["stroke-width-$lineWidth", "stroke-size-$lineWidth"] }],
  // stroke dash
  [/^stroke-dash-(.+)$/, ([, s]) => ({ "stroke-dasharray": h.bracket.cssvar.number(s) }), { autocomplete: "stroke-dash-<num>" }],
  [/^stroke-offset-(.+)$/, ([, s], { theme: theme2 }) => ({ "stroke-dashoffset": theme2.lineWidth?.[s] ?? h.bracket.cssvar.px.numberWithUnit(s) }), { autocomplete: "stroke-offset-$lineWidth" }],
  // stroke colors
  [/^stroke-(.+)$/, handleColorOrWidth, { autocomplete: "stroke-$colors" }],
  [/^stroke-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-stroke-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "stroke-(op|opacity)-<percent>" }],
  // line cap
  ["stroke-cap-square", { "stroke-linecap": "square" }],
  ["stroke-cap-round", { "stroke-linecap": "round" }],
  ["stroke-cap-auto", { "stroke-linecap": "butt" }],
  // line join
  ["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
  ["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
  ["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
  ["stroke-join-round", { "stroke-linejoin": "round" }],
  ["stroke-join-auto", { "stroke-linejoin": "miter" }],
  // none
  ["stroke-none", { stroke: "none" }]
];
function handleWidth([, b], { theme: theme2 }) {
  return { "stroke-width": theme2.lineWidth?.[b] ?? h.bracket.cssvar.fraction.px.number(b) };
}
function handleColorOrWidth(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth(match, ctx);
  return colorResolver("stroke", "stroke", "borderColor")(match, ctx);
}
function resolveTransitionProperty(prop, theme2) {
  let p;
  if (h.cssvar(prop) != null) {
    p = h.cssvar(prop);
  } else {
    if (prop.startsWith("[") && prop.endsWith("]")) {
      prop = prop.slice(1, -1);
    }
    const props = prop.split(",").map((p2) => theme2.transitionProperty?.[p2] ?? h.properties(p2));
    if (props.every(Boolean)) {
      p = props.join(",");
    }
  }
  return p;
}
const transitions = [
  // transition
  [
    /^transition(?:-(\D+?))?(?:-(\d+))?$/,
    ([, prop, d], { theme: theme2 }) => {
      if (!prop && !d) {
        return {
          "transition-property": theme2.transitionProperty?.DEFAULT,
          "transition-timing-function": theme2.easing?.DEFAULT,
          "transition-duration": theme2.duration?.DEFAULT ?? h.time("150")
        };
      } else if (prop != null) {
        const p = resolveTransitionProperty(prop, theme2);
        const duration2 = theme2.duration?.[d || "DEFAULT"] ?? h.time(d || "150");
        if (p) {
          return {
            "transition-property": p,
            "transition-timing-function": theme2.easing?.DEFAULT,
            "transition-duration": duration2
          };
        }
      } else if (d != null) {
        return {
          "transition-property": theme2.transitionProperty?.DEFAULT,
          "transition-timing-function": theme2.easing?.DEFAULT,
          "transition-duration": theme2.duration?.[d] ?? h.time(d)
        };
      }
    },
    {
      autocomplete: "transition-$transitionProperty-$duration"
    }
  ],
  // timings
  [
    /^(?:transition-)?duration-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "transition-duration": theme2.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-duration-$duration", "duration-$duration"] }
  ],
  [
    /^(?:transition-)?delay-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "transition-delay": theme2.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-delay-$duration", "delay-$duration"] }
  ],
  [
    /^(?:transition-)?ease(?:-(.+))?$/,
    ([, d], { theme: theme2 }) => ({ "transition-timing-function": theme2.easing?.[d || "DEFAULT"] ?? h.bracket.cssvar(d) }),
    { autocomplete: ["transition-ease-(linear|in|out|in-out|DEFAULT)", "ease-(linear|in|out|in-out|DEFAULT)"] }
  ],
  // props
  [
    /^(?:transition-)?property-(.+)$/,
    ([, v], { theme: theme2 }) => {
      const p = h.global(v) || resolveTransitionProperty(v, theme2);
      if (p)
        return { "transition-property": p };
    },
    { autocomplete: [
      `transition-property-(${[...globalKeywords].join("|")})`,
      "transition-property-$transitionProperty",
      "property-$transitionProperty"
    ] }
  ],
  // none
  ["transition-none", { transition: "none" }],
  ...makeGlobalStaticRules("transition"),
  // behavior
  ["transition-discrete", { "transition-behavior": "allow-discrete" }],
  ["transition-normal", { "transition-behavior": "normal" }]
];
const fonts = [
  // text
  [/^text-(.+)$/, handleText, { autocomplete: "text-$fontSize" }],
  // text size
  [/^(?:text|font)-size-(.+)$/, handleSize, { autocomplete: "text-size-$fontSize" }],
  // text colors
  [/^text-(?:color-)?(.+)$/, handlerColorOrSize, { autocomplete: "text-$colors" }],
  // colors
  [/^(?:color|c)-(.+)$/, colorResolver("color", "text", "textColor"), { autocomplete: "(color|c)-$colors" }],
  // style
  [/^(?:text|color|c)-(.+)$/, ([, v]) => globalKeywords.includes(v) ? { color: v } : void 0, { autocomplete: `(text|color|c)-(${globalKeywords.join("|")})` }],
  // opacity
  [/^(?:text|color|c)-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "(text|color|c)-(op|opacity)-<percent>" }],
  // weights
  [
    /^(?:font|fw)-?([^-]+)$/,
    ([, s], { theme: theme2 }) => ({ "font-weight": theme2.fontWeight?.[s] || h.bracket.global.number(s) }),
    {
      autocomplete: [
        "(font|fw)-(100|200|300|400|500|600|700|800|900)",
        "(font|fw)-$fontWeight"
      ]
    }
  ],
  // leadings
  [
    /^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "line-height": handleThemeByKey(s, theme2, "lineHeight") }),
    { autocomplete: "(leading|lh|line-height)-$lineHeight" }
  ],
  // synthesis
  ["font-synthesis-weight", { "font-synthesis": "weight" }],
  ["font-synthesis-style", { "font-synthesis": "style" }],
  ["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
  ["font-synthesis-none", { "font-synthesis": "none" }],
  [/^font-synthesis-(.+)$/, ([, s]) => ({ "font-synthesis": h.bracket.cssvar.global(s) })],
  // tracking
  [
    /^(?:font-)?tracking-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "letter-spacing": theme2.letterSpacing?.[s] || h.bracket.cssvar.global.rem(s) }),
    { autocomplete: "tracking-$letterSpacing" }
  ],
  // word-spacing
  [
    /^(?:font-)?word-spacing-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "word-spacing": theme2.wordSpacing?.[s] || h.bracket.cssvar.global.rem(s) }),
    { autocomplete: "word-spacing-$wordSpacing" }
  ],
  // stretch
  ["font-stretch-normal", { "font-stretch": "normal" }],
  ["font-stretch-ultra-condensed", { "font-stretch": "ultra-condensed" }],
  ["font-stretch-extra-condensed", { "font-stretch": "extra-condensed" }],
  ["font-stretch-condensed", { "font-stretch": "condensed" }],
  ["font-stretch-semi-condensed", { "font-stretch": "semi-condensed" }],
  ["font-stretch-semi-expanded", { "font-stretch": "semi-expanded" }],
  ["font-stretch-expanded", { "font-stretch": "expanded" }],
  ["font-stretch-extra-expanded", { "font-stretch": "extra-expanded" }],
  ["font-stretch-ultra-expanded", { "font-stretch": "ultra-expanded" }],
  [
    /^font-stretch-(.+)$/,
    ([, s]) => ({ "font-stretch": h.bracket.cssvar.fraction.global(s) }),
    { autocomplete: "font-stretch-<percentage>" }
  ],
  // family
  [
    /^font-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "font-family": theme2.fontFamily?.[d] || h.bracket.cssvar.global(d) }),
    { autocomplete: "font-$fontFamily" }
  ]
];
const tabSizes = [
  [/^tab(?:-(.+))?$/, ([, s]) => {
    const v = h.bracket.cssvar.global.number(s || "4");
    if (v != null) {
      return {
        "-moz-tab-size": v,
        "-o-tab-size": v,
        "tab-size": v
      };
    }
  }]
];
const textIndents = [
  [/^indent(?:-(.+))?$/, ([, s], { theme: theme2 }) => ({ "text-indent": theme2.textIndent?.[s || "DEFAULT"] || h.bracket.cssvar.global.fraction.rem(s) }), { autocomplete: "indent-$textIndent" }]
];
const textStrokes = [
  // widths
  [/^text-stroke(?:-(.+))?$/, ([, s], { theme: theme2 }) => ({ "-webkit-text-stroke-width": theme2.textStrokeWidth?.[s || "DEFAULT"] || h.bracket.cssvar.px(s) }), { autocomplete: "text-stroke-$textStrokeWidth" }],
  // colors
  [/^text-stroke-(.+)$/, colorResolver("-webkit-text-stroke-color", "text-stroke", "borderColor"), { autocomplete: "text-stroke-$colors" }],
  [/^text-stroke-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-stroke-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "text-stroke-(op|opacity)-<percent>" }]
];
const textShadows = [
  [/^text-shadow(?:-(.+))?$/, ([, s], { theme: theme2 }) => {
    const v = theme2.textShadow?.[s || "DEFAULT"];
    if (v != null) {
      return {
        "--un-text-shadow": colorableShadows(v, "--un-text-shadow-color").join(","),
        "text-shadow": "var(--un-text-shadow)"
      };
    }
    return { "text-shadow": h.bracket.cssvar.global(s) };
  }, { autocomplete: "text-shadow-$textShadow" }],
  // colors
  [/^text-shadow-color-(.+)$/, colorResolver("--un-text-shadow-color", "text-shadow", "shadowColor"), { autocomplete: "text-shadow-color-$colors" }],
  [/^text-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-shadow-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "text-shadow-color-(op|opacity)-<percent>" }]
];
function handleThemeByKey(s, theme2, key) {
  return theme2[key]?.[s] || h.bracket.cssvar.global.rem(s);
}
function handleSize([, s], { theme: theme2 }) {
  const themed = toArray$1(theme2.fontSize?.[s]);
  const size = themed?.[0] ?? h.bracket.cssvar.global.rem(s);
  if (size != null)
    return { "font-size": size };
}
function handlerColorOrSize(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleSize(match, ctx);
  return colorResolver("color", "text", "textColor")(match, ctx);
}
function handleText([, s = "base"], { theme: theme2 }) {
  const split = splitShorthand(s, "length");
  if (!split)
    return;
  const [size, leading] = split;
  const sizePairs = toArray$1(theme2.fontSize?.[size]);
  const lineHeight2 = leading ? handleThemeByKey(leading, theme2, "lineHeight") : void 0;
  if (sizePairs?.[0]) {
    const [fontSize22, height2, letterSpacing2] = sizePairs;
    if (typeof height2 === "object") {
      return {
        "font-size": fontSize22,
        ...height2
      };
    }
    return {
      "font-size": fontSize22,
      "line-height": lineHeight2 ?? height2 ?? "1",
      "letter-spacing": letterSpacing2 ? handleThemeByKey(letterSpacing2, theme2, "letterSpacing") : void 0
    };
  }
  const fontSize2 = h.bracketOfLength.rem(size);
  if (lineHeight2 && fontSize2) {
    return {
      "font-size": fontSize2,
      "line-height": lineHeight2
    };
  }
  return { "font-size": h.bracketOfLength.rem(s) };
}
const variablesAbbrMap$1 = {
  backface: "backface-visibility",
  break: "word-break",
  case: "text-transform",
  content: "align-content",
  fw: "font-weight",
  items: "align-items",
  justify: "justify-content",
  select: "user-select",
  self: "align-self",
  vertical: "vertical-align",
  visible: "visibility",
  whitespace: "white-space",
  ws: "white-space"
};
const cssVariables$1 = [
  [/^(.+?)-(\$.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap$1[name];
    if (prop)
      return { [prop]: h.cssvar(varname) };
  }]
];
const cssProperty = [
  [/^\[(.*)\]$/, ([_, body]) => {
    if (!body.includes(":"))
      return;
    const [prop, ...rest] = body.split(":");
    const value = rest.join(":");
    if (!isURI(body) && /^[\w-]+$/.test(prop) && isValidCSSBody(value)) {
      const parsed = h.bracket(`[${value}]`);
      if (parsed)
        return { [prop]: parsed };
    }
  }]
];
function isValidCSSBody(body) {
  let i = 0;
  function findUntil(c) {
    while (i < body.length) {
      i += 1;
      const char = body[i];
      if (char === c)
        return true;
    }
    return false;
  }
  for (i = 0; i < body.length; i++) {
    const c = body[i];
    if ("\"`'".includes(c)) {
      if (!findUntil(c))
        return false;
    } else if (c === "(") {
      if (!findUntil(")"))
        return false;
    } else if ("[]{}:".includes(c)) {
      return false;
    }
  }
  return true;
}
function isURI(declaration) {
  if (!declaration.includes("://"))
    return false;
  try {
    return new URL(declaration).host !== "";
  } catch {
    return false;
  }
}
const rules$1 = [
  cssVariables$1,
  cssProperty,
  contains,
  pointerEvents,
  appearances,
  positions,
  insets,
  zIndexes,
  orders,
  grids,
  floats,
  margins,
  boxSizing,
  displays,
  aspectRatio,
  sizes,
  flex,
  transforms,
  cursors,
  userSelects,
  resizes,
  appearance,
  placements,
  alignments,
  justifies,
  gaps,
  flexGridJustifiesAlignments,
  overflows,
  textOverflows,
  whitespaces,
  breaks,
  borders,
  bgColors,
  colorScheme,
  svgUtilities,
  paddings,
  textAligns,
  textIndents,
  textWraps,
  verticalAligns,
  fonts,
  textTransforms$1,
  fontStyles,
  textDecorations,
  fontSmoothings,
  tabSizes,
  textStrokes,
  textShadows,
  opacity,
  boxShadows,
  outline,
  rings,
  transitions,
  willChange,
  contentVisibility,
  contents,
  containerParent,
  fieldSizing,
  // should be the last
  questionMark
].flat(1);
const colors = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
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
    900: "#831843",
    950: "#500724"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
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
    900: "#312e81",
    950: "#1e1b4b"
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
    900: "#1e3a8a",
    950: "#172554"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
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
    900: "#14532d",
    950: "#052e16"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
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
    900: "#7f1d1d",
    950: "#450a0a"
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
    900: "#111827",
    950: "#030712"
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  light: {
    50: "#fdfdfd",
    100: "#fcfcfc",
    200: "#fafafa",
    300: "#f8f9fa",
    400: "#f6f6f6",
    500: "#f2f2f2",
    600: "#f1f3f5",
    700: "#e9ecef",
    800: "#dee2e6",
    900: "#dde1e3",
    950: "#d8dcdf"
  },
  dark: {
    50: "#4a4a4a",
    100: "#3c3c3c",
    200: "#323232",
    300: "#2d2d2d",
    400: "#222222",
    500: "#1f1f1f",
    600: "#1c1c1e",
    700: "#1b1b1b",
    800: "#181818",
    900: "#0f0f0f",
    950: "#080808"
  },
  get lightblue() {
    return this.sky;
  },
  get lightBlue() {
    return this.sky;
  },
  get warmgray() {
    return this.stone;
  },
  get warmGray() {
    return this.stone;
  },
  get truegray() {
    return this.neutral;
  },
  get trueGray() {
    return this.neutral;
  },
  get coolgray() {
    return this.gray;
  },
  get coolGray() {
    return this.gray;
  },
  get bluegray() {
    return this.slate;
  },
  get blueGray() {
    return this.slate;
  }
};
Object.values(colors).forEach((color) => {
  if (typeof color !== "string" && color !== void 0) {
    color.DEFAULT = color.DEFAULT || color[400];
    Object.keys(color).forEach((key) => {
      const short = +key / 100;
      if (short === Math.round(short))
        color[short] = color[key];
    });
  }
});
const blur = {
  "DEFAULT": "8px",
  "0": "0",
  "sm": "4px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "40px",
  "3xl": "64px"
};
const dropShadow = {
  "DEFAULT": ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
  "sm": "0 1px 1px rgb(0 0 0 / 0.05)",
  "md": ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
  "lg": ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
  "xl": ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
  "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
  "none": "0 0 rgb(0 0 0 / 0)"
};
const fontFamily = {
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ].join(","),
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif"
  ].join(","),
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace"
  ].join(",")
};
const fontSize = {
  "xs": ["0.75rem", "1rem"],
  "sm": ["0.875rem", "1.25rem"],
  "base": ["1rem", "1.5rem"],
  "lg": ["1.125rem", "1.75rem"],
  "xl": ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.25rem"],
  "4xl": ["2.25rem", "2.5rem"],
  "5xl": ["3rem", "1"],
  "6xl": ["3.75rem", "1"],
  "7xl": ["4.5rem", "1"],
  "8xl": ["6rem", "1"],
  "9xl": ["8rem", "1"]
};
const textIndent = {
  "DEFAULT": "1.5rem",
  "xs": "0.5rem",
  "sm": "1rem",
  "md": "1.5rem",
  "lg": "2rem",
  "xl": "2.5rem",
  "2xl": "3rem",
  "3xl": "4rem"
};
const textStrokeWidth = {
  DEFAULT: "1.5rem",
  none: "0",
  sm: "thin",
  md: "medium",
  lg: "thick"
};
const textShadow = {
  DEFAULT: ["0 0 1px rgb(0 0 0 / 0.2)", "0 0 1px rgb(1 0 5 / 0.1)"],
  none: "0 0 rgb(0 0 0 / 0)",
  sm: "1px 1px 3px rgb(36 37 47 / 0.25)",
  md: ["0 1px 2px rgb(30 29 39 / 0.19)", "1px 2px 4px rgb(54 64 147 / 0.18)"],
  lg: ["3px 3px 6px rgb(0 0 0 / 0.26)", "0 0 5px rgb(15 3 86 / 0.22)"],
  xl: ["1px 1px 3px rgb(0 0 0 / 0.29)", "2px 4px 7px rgb(73 64 125 / 0.35)"]
};
const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
  // int[0, 900] -> int
};
const wordSpacing = letterSpacing;
const breakpoints = {
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px"
};
const verticalBreakpoints = { ...breakpoints };
const lineWidth = {
  DEFAULT: "1px",
  none: "0"
};
const spacing = {
  "DEFAULT": "1rem",
  "none": "0",
  "xs": "0.75rem",
  "sm": "0.875rem",
  "lg": "1.125rem",
  "xl": "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
};
const duration = {
  DEFAULT: "150ms",
  none: "0s",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1e3: "1000ms"
};
const borderRadius = {
  "DEFAULT": "0.25rem",
  "none": "0",
  "sm": "0.125rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "full": "9999px"
};
const boxShadow = {
  "DEFAULT": ["var(--un-shadow-inset) 0 1px 3px 0 rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 1px 2px -1px rgb(0 0 0 / 0.1)"],
  "none": "0 0 rgb(0 0 0 / 0)",
  "sm": "var(--un-shadow-inset) 0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "md": ["var(--un-shadow-inset) 0 4px 6px -1px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 2px 4px -2px rgb(0 0 0 / 0.1)"],
  "lg": ["var(--un-shadow-inset) 0 10px 15px -3px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 4px 6px -4px rgb(0 0 0 / 0.1)"],
  "xl": ["var(--un-shadow-inset) 0 20px 25px -5px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 8px 10px -6px rgb(0 0 0 / 0.1)"],
  "2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
};
const ringWidth = {
  DEFAULT: "3px",
  none: "0"
};
const zIndex = {
  auto: "auto"
};
const media = {
  mouse: "(hover) and (pointer: fine)"
};
const preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase
};
const baseSize = {
  "xs": "20rem",
  "sm": "24rem",
  "md": "28rem",
  "lg": "32rem",
  "xl": "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "prose": "65ch"
};
const width = {
  auto: "auto",
  ...baseSize,
  screen: "100vw"
};
const maxWidth = {
  none: "none",
  ...baseSize,
  screen: "100vw"
};
const blockSize = {
  auto: "auto",
  ...baseSize,
  screen: "100vb"
};
const inlineSize = {
  auto: "auto",
  ...baseSize,
  screen: "100vi"
};
const height = {
  auto: "auto",
  ...baseSize,
  screen: "100vh"
};
const maxHeight = {
  none: "none",
  ...baseSize,
  screen: "100vh"
};
const maxBlockSize = {
  none: "none",
  ...baseSize,
  screen: "100vb"
};
const maxInlineSize = {
  none: "none",
  ...baseSize,
  screen: "100vi"
};
const containers = { ...baseSize };
const easing = {
  "DEFAULT": "cubic-bezier(0.4, 0, 0.2, 1)",
  "linear": "linear",
  "in": "cubic-bezier(0.4, 0, 1, 1)",
  "out": "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
const transitionProperty = {
  none: "none",
  all: "all",
  colors: ["color", "background-color", "border-color", "text-decoration-color", "fill", "stroke"].join(","),
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
  get DEFAULT() {
    return [this.colors, "opacity", "box-shadow", "transform", "filter", "backdrop-filter"].join(",");
  }
};
const theme$1 = {
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize,
  blockSize,
  maxInlineSize,
  maxBlockSize,
  minInlineSize: maxInlineSize,
  minBlockSize: maxBlockSize,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  transitionProperty,
  lineWidth,
  spacing,
  duration,
  ringWidth,
  preflightBase,
  containers,
  zIndex,
  media
};
function preflights(options) {
  if (options.preflight) {
    return [
      {
        layer: "preflights",
        getCSS({ theme: theme2, generator }) {
          if (theme2.preflightBase) {
            let entries = Object.entries(theme2.preflightBase);
            if (options.preflight === "on-demand") {
              const keys = new Set(Array.from(generator.activatedRules).map((r) => r[2]?.custom?.preflightKeys).filter(Boolean).flat());
              entries = entries.filter(([k2]) => keys.has(k2));
            }
            if (entries.length > 0) {
              let css = entriesToCss(entries);
              if (options.variablePrefix !== "un-") {
                css = css.replace(/--un-/g, `--${options.variablePrefix}`);
              }
              const roots = toArray$1(theme2.preflightRoot ?? ["*,::before,::after", "::backdrop"]);
              return roots.map((root) => `${root}{${css}}`).join("");
            }
          }
        }
      }
    ];
  }
}
const shorthands = {
  position: [
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "static"
  ],
  globalKeyword: globalKeywords
};
const presetMini = definePreset$2((options = {}) => {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  options.preflight = options.preflight ?? true;
  options.variablePrefix = options.variablePrefix ?? "un-";
  return {
    name: "@unocss/preset-mini",
    theme: theme$1,
    rules: rules$1,
    variants: variants$1(options),
    options,
    prefix: options.prefix,
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: preflights(options),
    extractorDefault: options.arbitraryVariants === false ? void 0 : extractorArbitraryVariants(),
    autocomplete: {
      shorthands
    }
  };
});
function VarPrefixPostprocessor(prefix) {
  if (prefix !== "un-") {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`);
        if (typeof i[1] === "string")
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
      });
    };
  }
}
function definePreset$1(preset) {
  return preset;
}
function toArray(value = []) {
  return Array.isArray(value) ? value : [value];
}
function isString(s) {
  return typeof s === "string";
}
function definePreset(preset) {
  return preset;
}
const queryMatcher = /@media \(min-width: (.+)\)/;
const container = [
  [
    /^__container$/,
    (m, context) => {
      const { theme: theme2, variantHandlers } = context;
      const themePadding = theme2.container?.padding;
      let padding;
      if (isString(themePadding))
        padding = themePadding;
      else
        padding = themePadding?.DEFAULT;
      const themeMaxWidth = theme2.container?.maxWidth;
      let maxWidth2;
      for (const v of variantHandlers) {
        const query = v.handle?.({}, (x) => x)?.parent;
        if (isString(query)) {
          const match = query.match(queryMatcher)?.[1];
          if (match) {
            const bp = resolveBreakpoints$1(context) ?? [];
            const matchBp = bp.find((i) => i.size === match)?.point;
            if (!themeMaxWidth)
              maxWidth2 = match;
            else if (matchBp)
              maxWidth2 = themeMaxWidth?.[matchBp];
            if (matchBp && !isString(themePadding))
              padding = themePadding?.[matchBp] ?? padding;
          }
        }
      }
      const css = {
        "max-width": maxWidth2
      };
      if (!variantHandlers.length)
        css.width = "100%";
      if (theme2.container?.center) {
        css["margin-left"] = "auto";
        css["margin-right"] = "auto";
      }
      if (themePadding) {
        css["padding-left"] = padding;
        css["padding-right"] = padding;
      }
      return css;
    },
    { internal: true }
  ]
];
const containerShortcuts = [
  [/^(?:(\w+)[:-])?container$/, ([, bp], context) => {
    let points = (resolveBreakpoints$1(context) ?? []).map((i) => i.point);
    if (bp) {
      if (!points.includes(bp))
        return;
      points = points.slice(points.indexOf(bp));
    }
    const shortcuts2 = points.map((p) => `${p}:__container`);
    if (!bp)
      shortcuts2.unshift("__container");
    return shortcuts2;
  }]
];
const shortcuts = [
  ...containerShortcuts
];
const filterBase = {
  "--un-blur": varEmpty,
  "--un-brightness": varEmpty,
  "--un-contrast": varEmpty,
  "--un-drop-shadow": varEmpty,
  "--un-grayscale": varEmpty,
  "--un-hue-rotate": varEmpty,
  "--un-invert": varEmpty,
  "--un-saturate": varEmpty,
  "--un-sepia": varEmpty
};
const filterBaseKeys = Object.keys(filterBase);
const filterMetaCustom = {
  preflightKeys: filterBaseKeys
};
const filterProperty = "var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)";
const backdropFilterBase = {
  "--un-backdrop-blur": varEmpty,
  "--un-backdrop-brightness": varEmpty,
  "--un-backdrop-contrast": varEmpty,
  "--un-backdrop-grayscale": varEmpty,
  "--un-backdrop-hue-rotate": varEmpty,
  "--un-backdrop-invert": varEmpty,
  "--un-backdrop-opacity": varEmpty,
  "--un-backdrop-saturate": varEmpty,
  "--un-backdrop-sepia": varEmpty
};
const backdropFilterBaseKeys = Object.keys(backdropFilterBase);
const backdropMetaCustom = {
  preflightKeys: backdropFilterBaseKeys
};
const backdropFilterProperty = "var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)";
const composeMetaCustom = {
  preflightKeys: [...filterBaseKeys, ...backdropFilterBaseKeys]
};
function percentWithDefault(str) {
  let v = h$2.bracket.cssvar(str || "");
  if (v != null)
    return v;
  v = str ? h$2.percent(str) : "1";
  if (v != null && Number.parseFloat(v) <= 1)
    return v;
}
function toFilter(varName, resolver) {
  return ([, b, s], { theme: theme2 }) => {
    const value = resolver(s, theme2) ?? (s === "none" ? "0" : "");
    if (value !== "") {
      if (b) {
        return {
          [`--un-${b}${varName}`]: `${varName}(${value})`,
          "-webkit-backdrop-filter": backdropFilterProperty,
          "backdrop-filter": backdropFilterProperty
        };
      } else {
        return {
          [`--un-${varName}`]: `${varName}(${value})`,
          filter: filterProperty
        };
      }
    }
  };
}
function dropShadowResolver([, s], { theme: theme2 }) {
  let v = theme2.dropShadow?.[s || "DEFAULT"];
  if (v != null) {
    const shadows = colorableShadows$1(v, "--un-drop-shadow-color");
    return {
      "--un-drop-shadow": `drop-shadow(${shadows.join(") drop-shadow(")})`,
      "filter": filterProperty
    };
  }
  v = h$2.bracket.cssvar(s);
  if (v != null) {
    return {
      "--un-drop-shadow": `drop-shadow(${v})`,
      "filter": filterProperty
    };
  }
}
const filters = [
  // filters
  [/^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/, toFilter("blur", (s, theme2) => theme2.blur?.[s || "DEFAULT"] || h$2.bracket.cssvar.px(s)), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-blur-$blur", "blur-$blur", "filter-blur"] }],
  [/^(?:(backdrop-)|filter-)?brightness-(.+)$/, toFilter("brightness", (s) => h$2.bracket.cssvar.percent(s)), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-brightness-<percent>", "brightness-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?contrast-(.+)$/, toFilter("contrast", (s) => h$2.bracket.cssvar.percent(s)), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-contrast-<percent>", "contrast-<percent>"] }],
  // drop-shadow only on filter
  [/^(?:filter-)?drop-shadow(?:-(.+))?$/, dropShadowResolver, {
    custom: filterMetaCustom,
    autocomplete: [
      "filter-drop",
      "filter-drop-shadow",
      "filter-drop-shadow-color",
      "drop-shadow",
      "drop-shadow-color",
      "filter-drop-shadow-$dropShadow",
      "drop-shadow-$dropShadow",
      "filter-drop-shadow-color-$colors",
      "drop-shadow-color-$colors",
      "filter-drop-shadow-color-(op|opacity)",
      "drop-shadow-color-(op|opacity)",
      "filter-drop-shadow-color-(op|opacity)-<percent>",
      "drop-shadow-color-(op|opacity)-<percent>"
    ]
  }],
  [/^(?:filter-)?drop-shadow-color-(.+)$/, colorResolver$1("--un-drop-shadow-color", "drop-shadow", "shadowColor")],
  [/^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-drop-shadow-opacity": h$2.bracket.percent(opacity2) })],
  [/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/, toFilter("grayscale", percentWithDefault), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-grayscale", "(backdrop|filter)-grayscale-<percent>", "grayscale-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/, toFilter("hue-rotate", (s) => h$2.bracket.cssvar.degree(s)), { custom: composeMetaCustom }],
  [/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/, toFilter("invert", percentWithDefault), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-invert", "(backdrop|filter)-invert-<percent>", "invert-<percent>"] }],
  // opacity only on backdrop-filter
  [/^(backdrop-)op(?:acity)?-(.+)$/, toFilter("opacity", (s) => h$2.bracket.cssvar.percent(s)), { custom: composeMetaCustom, autocomplete: ["backdrop-(op|opacity)", "backdrop-(op|opacity)-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?saturate-(.+)$/, toFilter("saturate", (s) => h$2.bracket.cssvar.percent(s)), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-saturate", "(backdrop|filter)-saturate-<percent>", "saturate-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/, toFilter("sepia", percentWithDefault), { custom: composeMetaCustom, autocomplete: ["(backdrop|filter)-sepia", "(backdrop|filter)-sepia-<percent>", "sepia-<percent>"] }],
  // base
  ["filter", { filter: filterProperty }, { custom: filterMetaCustom }],
  ["backdrop-filter", {
    "-webkit-backdrop-filter": backdropFilterProperty,
    "backdrop-filter": backdropFilterProperty
  }, { custom: backdropMetaCustom }],
  // nones
  ["filter-none", { filter: "none" }],
  ["backdrop-filter-none", {
    "-webkit-backdrop-filter": "none",
    "backdrop-filter": "none"
  }],
  ...globalKeywords$1.map((keyword) => [`filter-${keyword}`, { filter: keyword }]),
  ...globalKeywords$1.map((keyword) => [`backdrop-filter-${keyword}`, {
    "-webkit-backdrop-filter": keyword,
    "backdrop-filter": keyword
  }])
];
const scrollSnapTypeBase = {
  "--un-scroll-snap-strictness": "proximity"
};
const custom$3 = { preflightKeys: Object.keys(scrollSnapTypeBase) };
const scrolls = [
  // snap type
  [/^snap-(x|y)$/, ([, d]) => ({
    "scroll-snap-type": `${d} var(--un-scroll-snap-strictness)`
  }), { custom: custom$3, autocomplete: "snap-(x|y|both)" }],
  [/^snap-both$/, () => ({
    "scroll-snap-type": "both var(--un-scroll-snap-strictness)"
  }), { custom: custom$3 }],
  ["snap-mandatory", { "--un-scroll-snap-strictness": "mandatory" }],
  ["snap-proximity", { "--un-scroll-snap-strictness": "proximity" }],
  ["snap-none", { "scroll-snap-type": "none" }],
  // snap align
  ["snap-start", { "scroll-snap-align": "start" }],
  ["snap-end", { "scroll-snap-align": "end" }],
  ["snap-center", { "scroll-snap-align": "center" }],
  ["snap-align-none", { "scroll-snap-align": "none" }],
  // snap stop
  ["snap-normal", { "scroll-snap-stop": "normal" }],
  ["snap-always", { "scroll-snap-stop": "always" }],
  // scroll margin
  [/^scroll-ma?()-?(.+)$/, directionSize$1("scroll-margin"), {
    autocomplete: [
      "scroll-(m|p|ma|pa|block|inline)",
      "scroll-(m|p|ma|pa|block|inline)-$spacing",
      "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
      "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"
    ]
  }],
  [/^scroll-m-?([xy])-?(.+)$/, directionSize$1("scroll-margin")],
  [/^scroll-m-?([rltb])-?(.+)$/, directionSize$1("scroll-margin")],
  [/^scroll-m-(block|inline)-(.+)$/, directionSize$1("scroll-margin")],
  [/^scroll-m-?([bi][se])-?(.+)$/, directionSize$1("scroll-margin")],
  // scroll padding
  [/^scroll-pa?()-?(.+)$/, directionSize$1("scroll-padding")],
  [/^scroll-p-?([xy])-?(.+)$/, directionSize$1("scroll-padding")],
  [/^scroll-p-?([rltb])-?(.+)$/, directionSize$1("scroll-padding")],
  [/^scroll-p-(block|inline)-(.+)$/, directionSize$1("scroll-padding")],
  [/^scroll-p-?([bi][se])-?(.+)$/, directionSize$1("scroll-padding")]
];
const borderSpacingBase = {
  "--un-border-spacing-x": 0,
  "--un-border-spacing-y": 0
};
const custom$2 = { preflightKeys: Object.keys(borderSpacingBase) };
const borderSpacingProperty = "var(--un-border-spacing-x) var(--un-border-spacing-y)";
const tables = [
  // displays
  ["inline-table", { display: "inline-table" }],
  ["table", { display: "table" }],
  ["table-caption", { display: "table-caption" }],
  ["table-cell", { display: "table-cell" }],
  ["table-column", { display: "table-column" }],
  ["table-column-group", { display: "table-column-group" }],
  ["table-footer-group", { display: "table-footer-group" }],
  ["table-header-group", { display: "table-header-group" }],
  ["table-row", { display: "table-row" }],
  ["table-row-group", { display: "table-row-group" }],
  // layouts
  ["border-collapse", { "border-collapse": "collapse" }],
  ["border-separate", { "border-collapse": "separate" }],
  [/^border-spacing-(.+)$/, ([, s], { theme: theme2 }) => {
    const v = theme2.spacing?.[s] ?? h$2.bracket.cssvar.global.auto.fraction.rem(s);
    if (v != null) {
      return {
        "--un-border-spacing-x": v,
        "--un-border-spacing-y": v,
        "border-spacing": borderSpacingProperty
      };
    }
  }, { custom: custom$2, autocomplete: ["border-spacing", "border-spacing-$spacing"] }],
  [/^border-spacing-([xy])-(.+)$/, ([, d, s], { theme: theme2 }) => {
    const v = theme2.spacing?.[s] ?? h$2.bracket.cssvar.global.auto.fraction.rem(s);
    if (v != null) {
      return {
        [`--un-border-spacing-${d}`]: v,
        "border-spacing": borderSpacingProperty
      };
    }
  }, { custom: custom$2, autocomplete: ["border-spacing-(x|y)", "border-spacing-(x|y)-$spacing"] }],
  ["caption-top", { "caption-side": "top" }],
  ["caption-bottom", { "caption-side": "bottom" }],
  ["table-auto", { "table-layout": "auto" }],
  ["table-fixed", { "table-layout": "fixed" }],
  ["table-empty-cells-visible", { "empty-cells": "show" }],
  ["table-empty-cells-hidden", { "empty-cells": "hide" }]
];
const touchActionBase = {
  "--un-pan-x": varEmpty,
  "--un-pan-y": varEmpty,
  "--un-pinch-zoom": varEmpty
};
const custom$1 = { preflightKeys: Object.keys(touchActionBase) };
const touchActionProperty = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)";
const touchActions = [
  [/^touch-pan-(x|left|right)$/, ([, d]) => ({
    "--un-pan-x": `pan-${d}`,
    "touch-action": touchActionProperty
  }), { custom: custom$1, autocomplete: ["touch-pan", "touch-pan-(x|left|right|y|up|down)"] }],
  [/^touch-pan-(y|up|down)$/, ([, d]) => ({
    "--un-pan-y": `pan-${d}`,
    "touch-action": touchActionProperty
  }), { custom: custom$1 }],
  ["touch-pinch-zoom", {
    "--un-pinch-zoom": "pinch-zoom",
    "touch-action": touchActionProperty
  }, { custom: custom$1 }],
  ["touch-auto", { "touch-action": "auto" }],
  ["touch-manipulation", { "touch-action": "manipulation" }],
  ["touch-none", { "touch-action": "none" }],
  ...makeGlobalStaticRules$1("touch", "touch-action")
];
const fontVariantNumericBase = {
  "--un-ordinal": varEmpty,
  "--un-slashed-zero": varEmpty,
  "--un-numeric-figure": varEmpty,
  "--un-numeric-spacing": varEmpty,
  "--un-numeric-fraction": varEmpty
};
const custom = { preflightKeys: Object.keys(fontVariantNumericBase) };
function toEntries(entry) {
  return {
    ...entry,
    "font-variant-numeric": "var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)"
  };
}
const fontVariantNumeric = [
  [/^ordinal$/, () => toEntries({ "--un-ordinal": "ordinal" }), { custom, autocomplete: "ordinal" }],
  [/^slashed-zero$/, () => toEntries({ "--un-slashed-zero": "slashed-zero" }), { custom, autocomplete: "slashed-zero" }],
  [/^lining-nums$/, () => toEntries({ "--un-numeric-figure": "lining-nums" }), { custom, autocomplete: "lining-nums" }],
  [/^oldstyle-nums$/, () => toEntries({ "--un-numeric-figure": "oldstyle-nums" }), { custom, autocomplete: "oldstyle-nums" }],
  [/^proportional-nums$/, () => toEntries({ "--un-numeric-spacing": "proportional-nums" }), { custom, autocomplete: "proportional-nums" }],
  [/^tabular-nums$/, () => toEntries({ "--un-numeric-spacing": "tabular-nums" }), { custom, autocomplete: "tabular-nums" }],
  [/^diagonal-fractions$/, () => toEntries({ "--un-numeric-fraction": "diagonal-fractions" }), { custom, autocomplete: "diagonal-fractions" }],
  [/^stacked-fractions$/, () => toEntries({ "--un-numeric-fraction": "stacked-fractions" }), { custom, autocomplete: "stacked-fractions" }],
  ["normal-nums", { "font-variant-numeric": "normal" }]
];
const theme = {
  ...theme$1,
  aria: {
    busy: 'busy="true"',
    checked: 'checked="true"',
    disabled: 'disabled="true"',
    expanded: 'expanded="true"',
    hidden: 'hidden="true"',
    pressed: 'pressed="true"',
    readonly: 'readonly="true"',
    required: 'required="true"',
    selected: 'selected="true"'
  },
  animation: {
    keyframes: {
      "pulse": "{0%, 100% {opacity:1} 50% {opacity:.5}}",
      "bounce": "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
      "spin": "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
      "ping": "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
      "bounce-alt": "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
      "flash": "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
      "pulse-alt": "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
      "rubber-band": "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
      "shake-x": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
      "shake-y": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
      "head-shake": "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
      "swing": "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
      "tada": "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
      "wobble": "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
      "jello": "{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
      "heart-beat": "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
      "hinge": "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
      "jack-in-the-box": "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
      "light-speed-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
      "light-speed-in-right": "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
      "light-speed-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
      "light-speed-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
      "flip": "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
      "flip-in-x": "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
      "flip-in-y": "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
      "flip-out-x": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
      "flip-out-y": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
      "rotate-in": "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-down-left": "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-down-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-up-left": "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-up-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-out": "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
      "rotate-out-down-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
      "rotate-out-down-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
      "rotate-out-up-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
      "rotate-out-up-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
      "roll-in": "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "roll-out": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
      "zoom-in": "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
      "zoom-in-down": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-left": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-right": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-up": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-out": "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
      "zoom-out-down": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-out-left": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
      "zoom-out-right": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
      "zoom-out-up": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "bounce-in": "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
      "bounce-in-down": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-left": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-right": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-up": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-out": "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
      "bounce-out-down": "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
      "bounce-out-left": "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
      "bounce-out-right": "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
      "bounce-out-up": "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
      "slide-in-down": "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-left": "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-right": "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-up": "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-out-down": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
      "slide-out-left": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
      "slide-out-right": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
      "slide-out-up": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
      "fade-in": "{from{opacity:0}to{opacity:1}}",
      "fade-in-down": "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-down-big": "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-left-big": "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-right": "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-right-big": "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-up": "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-up-big": "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-top-left": "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-top-right": "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-bottom-left": "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-bottom-right": "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-out": "{from{opacity:1}to{opacity:0}}",
      "fade-out-down": "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
      "fade-out-down-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
      "fade-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
      "fade-out-left-big": "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
      "fade-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
      "fade-out-right-big": "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
      "fade-out-up": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
      "fade-out-up-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
      "fade-out-top-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
      "fade-out-top-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
      "fade-out-bottom-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
      "fade-out-bottom-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
      "back-in-up": "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-down": "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-right": "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-left": "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-out-up": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
      "back-out-down": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
      "back-out-right": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
      "back-out-left": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"
    },
    durations: {
      "pulse": "2s",
      "heart-beat": "1.3s",
      "bounce-in": "0.75s",
      "bounce-out": "0.75s",
      "flip-out-x": "0.75s",
      "flip-out-y": "0.75s",
      "hinge": "2s"
    },
    timingFns: {
      "pulse": "cubic-bezier(0.4,0,.6,1)",
      "ping": "cubic-bezier(0,0,.2,1)",
      "head-shake": "ease-in-out",
      "heart-beat": "ease-in-out",
      "pulse-alt": "ease-in-out",
      "light-speed-in-left": "ease-out",
      "light-speed-in-right": "ease-out",
      "light-speed-out-left": "ease-in",
      "light-speed-out-right": "ease-in"
    },
    properties: {
      "bounce-alt": { "transform-origin": "center bottom" },
      "jello": { "transform-origin": "center" },
      "swing": { "transform-origin": "top center" },
      "flip": { "backface-visibility": "visible" },
      "flip-in-x": { "backface-visibility": "visible !important" },
      "flip-in-y": { "backface-visibility": "visible !important" },
      "flip-out-x": { "backface-visibility": "visible !important" },
      "flip-out-y": { "backface-visibility": "visible !important" },
      "rotate-in": { "transform-origin": "center" },
      "rotate-in-down-left": { "transform-origin": "left bottom" },
      "rotate-in-down-right": { "transform-origin": "right bottom" },
      "rotate-in-up-left": { "transform-origin": "left bottom" },
      "rotate-in-up-right": { "transform-origin": "right bottom" },
      "rotate-out": { "transform-origin": "center" },
      "rotate-out-down-left": { "transform-origin": "left bottom" },
      "rotate-out-down-right": { "transform-origin": "right bottom" },
      "rotate-out-up-left": { "transform-origin": "left bottom" },
      "rotate-out-up-right": { "transform-origin": "right bottom" },
      "hinge": { "transform-origin": "top left" },
      "zoom-out-down": { "transform-origin": "center bottom" },
      "zoom-out-left": { "transform-origin": "left center" },
      "zoom-out-right": { "transform-origin": "right center" },
      "zoom-out-up": { "transform-origin": "center bottom" }
    },
    counts: {
      "spin": "infinite",
      "ping": "infinite",
      "pulse": "infinite",
      "pulse-alt": "infinite",
      "bounce": "infinite",
      "bounce-alt": "infinite"
    },
    category: {
      "pulse": "Attention Seekers",
      "bounce": "Attention Seekers",
      "spin": "Attention Seekers",
      "ping": "Attention Seekers",
      "bounce-alt": "Attention Seekers",
      "flash": "Attention Seekers",
      "pulse-alt": "Attention Seekers",
      "rubber-band": "Attention Seekers",
      "shake-x": "Attention Seekers",
      "shake-y": "Attention Seekers",
      "head-shake": "Attention Seekers",
      "swing": "Attention Seekers",
      "tada": "Attention Seekers",
      "wobble": "Attention Seekers",
      "jello": "Attention Seekers",
      "heart-beat": "Attention Seekers",
      "hinge": "Specials",
      "jack-in-the-box": "Specials",
      "light-speed-in-left": "Lightspeed",
      "light-speed-in-right": "Lightspeed",
      "light-speed-out-left": "Lightspeed",
      "light-speed-out-right": "Lightspeed",
      "flip": "Flippers",
      "flip-in-x": "Flippers",
      "flip-in-y": "Flippers",
      "flip-out-x": "Flippers",
      "flip-out-y": "Flippers",
      "rotate-in": "Rotating Entrances",
      "rotate-in-down-left": "Rotating Entrances",
      "rotate-in-down-right": "Rotating Entrances",
      "rotate-in-up-left": "Rotating Entrances",
      "rotate-in-up-right": "Rotating Entrances",
      "rotate-out": "Rotating Exits",
      "rotate-out-down-left": "Rotating Exits",
      "rotate-out-down-right": "Rotating Exits",
      "rotate-out-up-left": "Rotating Exits",
      "rotate-out-up-right": "Rotating Exits",
      "roll-in": "Specials",
      "roll-out": "Specials",
      "zoom-in": "Zooming Entrances",
      "zoom-in-down": "Zooming Entrances",
      "zoom-in-left": "Zooming Entrances",
      "zoom-in-right": "Zooming Entrances",
      "zoom-in-up": "Zooming Entrances",
      "zoom-out": "Zooming Exits",
      "zoom-out-down": "Zooming Exits",
      "zoom-out-left": "Zooming Exits",
      "zoom-out-right": "Zooming Exits",
      "zoom-out-up": "Zooming Exits",
      "bounce-in": "Bouncing Entrances",
      "bounce-in-down": "Bouncing Entrances",
      "bounce-in-left": "Bouncing Entrances",
      "bounce-in-right": "Bouncing Entrances",
      "bounce-in-up": "Bouncing Entrances",
      "bounce-out": "Bouncing Exits",
      "bounce-out-down": "Bouncing Exits",
      "bounce-out-left": "Bouncing Exits",
      "bounce-out-right": "Bouncing Exits",
      "bounce-out-up": "Bouncing Exits",
      "slide-in-down": "Sliding Entrances",
      "slide-in-left": "Sliding Entrances",
      "slide-in-right": "Sliding Entrances",
      "slide-in-up": "Sliding Entrances",
      "slide-out-down": "Sliding Exits",
      "slide-out-left": "Sliding Exits",
      "slide-out-right": "Sliding Exits",
      "slide-out-up": "Sliding Exits",
      "fade-in": "Fading Entrances",
      "fade-in-down": "Fading Entrances",
      "fade-in-down-big": "Fading Entrances",
      "fade-in-left": "Fading Entrances",
      "fade-in-left-big": "Fading Entrances",
      "fade-in-right": "Fading Entrances",
      "fade-in-right-big": "Fading Entrances",
      "fade-in-up": "Fading Entrances",
      "fade-in-up-big": "Fading Entrances",
      "fade-in-top-left": "Fading Entrances",
      "fade-in-top-right": "Fading Entrances",
      "fade-in-bottom-left": "Fading Entrances",
      "fade-in-bottom-right": "Fading Entrances",
      "fade-out": "Fading Exits",
      "fade-out-down": "Fading Exits",
      "fade-out-down-big": "Fading Exits",
      "fade-out-left": "Fading Exits",
      "fade-out-left-big": "Fading Exits",
      "fade-out-right": "Fading Exits",
      "fade-out-right-big": "Fading Exits",
      "fade-out-up": "Fading Exits",
      "fade-out-up-big": "Fading Exits",
      "fade-out-top-left": "Fading Exits",
      "fade-out-top-right": "Fading Exits",
      "fade-out-bottom-left": "Fading Exits",
      "fade-out-bottom-right": "Fading Exits",
      "back-in-up": "Back Entrances",
      "back-in-down": "Back Entrances",
      "back-in-right": "Back Entrances",
      "back-in-left": "Back Entrances",
      "back-out-up": "Back Exits",
      "back-out-down": "Back Exits",
      "back-out-right": "Back Exits",
      "back-out-left": "Back Exits"
    }
  },
  media: {
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
    os_dark: "(prefers-color-scheme: dark)",
    os_light: "(prefers-color-scheme: light)",
    motion_ok: "(prefers-reduced-motion: no-preference)",
    motion_not_ok: "(prefers-reduced-motion: reduce)",
    high_contrast: "(prefers-contrast: high)",
    low_contrast: "(prefers-contrast: low)",
    opacity_ok: "(prefers-reduced-transparency: no-preference)",
    opacity_not_ok: "(prefers-reduced-transparency: reduce)",
    use_data_ok: "(prefers-reduced-data: no-preference)",
    use_data_not_ok: "(prefers-reduced-data: reduce)",
    touch: "(hover: none) and (pointer: coarse)",
    stylus: "(hover: none) and (pointer: fine)",
    pointer: "(hover) and (pointer: coarse)",
    mouse: "(hover) and (pointer: fine)",
    hd_color: "(dynamic-range: high)"
  },
  supports: {
    grid: "(display: grid)"
  },
  preflightBase: {
    ...transformBase,
    ...touchActionBase,
    ...scrollSnapTypeBase,
    ...fontVariantNumericBase,
    ...borderSpacingBase,
    ...boxShadowsBase,
    ...ringBase,
    ...filterBase,
    ...backdropFilterBase
  }
};
const variantCombinators = [
  variantMatcher$1("svg", (input) => ({ selector: `${input.selector} svg` }))
];
const variantColorsScheme = [
  variantMatcher$1(".dark", (input) => ({ prefix: `.dark $$ ${input.prefix}` })),
  variantMatcher$1(".light", (input) => ({ prefix: `.light $$ ${input.prefix}` })),
  variantParentMatcher$1("@dark", "@media (prefers-color-scheme: dark)"),
  variantParentMatcher$1("@light", "@media (prefers-color-scheme: light)")
];
const variantContrasts = [
  variantParentMatcher$1("contrast-more", "@media (prefers-contrast: more)"),
  variantParentMatcher$1("contrast-less", "@media (prefers-contrast: less)")
];
const variantMotions = [
  variantParentMatcher$1("motion-reduce", "@media (prefers-reduced-motion: reduce)"),
  variantParentMatcher$1("motion-safe", "@media (prefers-reduced-motion: no-preference)")
];
const variantOrientations = [
  variantParentMatcher$1("landscape", "@media (orientation: landscape)"),
  variantParentMatcher$1("portrait", "@media (orientation: portrait)")
];
const variantSpaceAndDivide = (matcher) => {
  if (matcher.startsWith("_"))
    return;
  if (/space-[xy]-.+$/.test(matcher) || /divide-/.test(matcher)) {
    return {
      matcher,
      selector: (input) => {
        const not = ">:not([hidden])~:not([hidden])";
        return input.includes(not) ? input : `${input}${not}`;
      }
    };
  }
};
const variantStickyHover = [
  variantMatcher("@hover", (input) => ({
    parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (hover: hover) and (pointer: fine)`,
    selector: `${input.selector || ""}:hover`
  }))
];
function mixComponent(v1, v2, w) {
  return `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`;
}
function mixColor(color1, color2, weight) {
  const colors2 = [color1, color2];
  const cssColors = [];
  for (let c = 0; c < 2; c++) {
    const color = typeof colors2[c] === "string" ? parseCssColor(colors2[c]) : colors2[c];
    if (!color || !["rgb", "rgba"].includes(color.type))
      return;
    cssColors.push(color);
  }
  const newComponents = [];
  for (let x = 0; x < 3; x++)
    newComponents.push(mixComponent(cssColors[0].components[x], cssColors[1].components[x], weight));
  return {
    type: "rgb",
    components: newComponents,
    alpha: mixComponent(cssColors[0].alpha ?? 1, cssColors[1].alpha ?? 1, weight)
  };
}
function tint(color, weight) {
  return mixColor("#fff", color, weight);
}
function shade(color, weight) {
  return mixColor("#000", color, weight);
}
function shift(color, weight) {
  const num = Number.parseFloat(`${weight}`);
  if (!Number.isNaN(num))
    return num > 0 ? shade(color, weight) : tint(color, -num);
}
const fns = { tint, shade, shift };
function variantColorMix() {
  let re;
  return {
    name: "mix",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${ctx.generator.config.separators.join("|")})`);
      const m = matcher.match(re);
      if (m) {
        return {
          matcher: matcher.slice(m[0].length),
          body: (body) => {
            body.forEach((v) => {
              if (v[1]) {
                const color = parseCssColor(`${v[1]}`);
                if (color) {
                  const mixed = fns[m[1]](color, m[2]);
                  if (mixed)
                    v[1] = colorToString(mixed);
                }
              }
            });
            return body;
          }
        };
      }
    }
  };
}
const placeholderModifier = (input, { theme: theme2 }) => {
  const m = input.match(/^(.*)\b(placeholder-)(.+)$/);
  if (m) {
    const [, pre = "", p, body] = m;
    if (hasParseableColor$1(body, theme2, "accentColor") || hasOpacityValue(body)) {
      return {
        // Append `placeholder-$ ` (with space!) to the rule to be matched.
        // The `placeholder-` is added for placeholder variant processing, and
        // the `$ ` is added for rule matching after `placeholder-` is removed by the variant.
        // See rules/placeholder.
        matcher: `${pre}placeholder-$ ${p}${body}`
      };
    }
  }
};
function hasOpacityValue(body) {
  const match = body.match(/^op(?:acity)?-?(.+)$/);
  if (match && match[1] != null)
    return h$2.bracket.percent(match[1]) != null;
  return false;
}
function variants(options) {
  return [
    placeholderModifier,
    variantSpaceAndDivide,
    ...variants$1(options),
    ...variantContrasts,
    ...variantOrientations,
    ...variantMotions,
    ...variantCombinators,
    ...variantColorsScheme,
    ...variantStickyHover,
    variantColorMix()
  ];
}
const animations = [
  [/^(?:animate-)?keyframes-(.+)$/, ([, name], { theme: theme2 }) => {
    const kf = theme2.animation?.keyframes?.[name];
    if (kf) {
      return [
        `@keyframes ${name}${kf}`,
        { animation: name }
      ];
    }
  }, { autocomplete: ["animate-keyframes-$animation.keyframes", "keyframes-$animation.keyframes"] }],
  [/^animate-(.+)$/, ([, name], { theme: theme2 }) => {
    const kf = theme2.animation?.keyframes?.[name];
    if (kf) {
      const duration2 = theme2.animation?.durations?.[name] ?? "1s";
      const timing = theme2.animation?.timingFns?.[name] ?? "linear";
      const count = theme2.animation?.counts?.[name] ?? 1;
      const props = theme2.animation?.properties?.[name];
      return [
        `@keyframes ${name}${kf}`,
        {
          animation: `${name} ${duration2} ${timing} ${count}`,
          ...props
        }
      ];
    }
    return { animation: h$2.bracket.cssvar(name) };
  }, { autocomplete: "animate-$animation.keyframes" }],
  [/^animate-name-(.+)/, ([, d]) => ({ "animation-name": h$2.bracket.cssvar(d) ?? d })],
  // timings
  [/^animate-duration-(.+)$/, ([, d], { theme: theme2 }) => ({ "animation-duration": theme2.duration?.[d || "DEFAULT"] ?? h$2.bracket.cssvar.time(d) }), { autocomplete: ["animate-duration", "animate-duration-$duration"] }],
  [/^animate-delay-(.+)$/, ([, d], { theme: theme2 }) => ({ "animation-delay": theme2.duration?.[d || "DEFAULT"] ?? h$2.bracket.cssvar.time(d) }), { autocomplete: ["animate-delay", "animate-delay-$duration"] }],
  [/^animate-ease(?:-(.+))?$/, ([, d], { theme: theme2 }) => ({ "animation-timing-function": theme2.easing?.[d || "DEFAULT"] ?? h$2.bracket.cssvar(d) }), { autocomplete: ["animate-ease", "animate-ease-$easing"] }],
  // fill mode
  [/^animate-(fill-mode-|fill-|mode-)?(.+)$/, ([, t, d]) => ["none", "forwards", "backwards", "both", ...[t ? globalKeywords$1 : []]].includes(d) ? { "animation-fill-mode": d } : void 0, {
    autocomplete: [
      "animate-(fill|mode|fill-mode)",
      "animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
      "animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  // direction
  [/^animate-(direction-)?(.+)$/, ([, t, d]) => ["normal", "reverse", "alternate", "alternate-reverse", ...[t ? globalKeywords$1 : []]].includes(d) ? { "animation-direction": d } : void 0, {
    autocomplete: [
      "animate-direction",
      "animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
      "animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  // others
  [/^animate-(?:iteration-count-|iteration-|count-)(.+)$/, ([, d]) => ({ "animation-iteration-count": h$2.bracket.cssvar(d) ?? d.replace(/-/g, ",") }), { autocomplete: ["animate-(iteration|count|iteration-count)", "animate-(iteration|count|iteration-count)-<num>"] }],
  [/^animate-(play-state-|play-|state-)?(.+)$/, ([, t, d]) => ["paused", "running", ...[t ? globalKeywords$1 : []]].includes(d) ? { "animation-play-state": d } : void 0, {
    autocomplete: [
      "animate-(play|state|play-state)",
      "animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
      "animate-(paused|running|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  ["animate-none", { animation: "none" }],
  ...makeGlobalStaticRules$1("animate", "animation")
];
function bgGradientToValue(cssColor) {
  if (cssColor)
    return colorToString(cssColor, 0);
  return "rgb(255 255 255 / 0)";
}
function bgGradientColorValue(mode, cssColor, color, alpha) {
  if (cssColor) {
    if (alpha != null)
      return colorToString(cssColor, alpha);
    else
      return colorToString(cssColor, `var(--un-${mode}-opacity, ${colorOpacityToString(cssColor)})`);
  }
  return colorToString(color, alpha);
}
function bgGradientColorResolver() {
  return ([, mode, body], { theme: theme2 }) => {
    const data = parseColor$1(body, theme2, "backgroundColor");
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    if (!color)
      return;
    const colorString = bgGradientColorValue(mode, cssColor, color, alpha);
    switch (mode) {
      case "from":
        return {
          "--un-gradient-from-position": "0%",
          "--un-gradient-from": `${colorString} var(--un-gradient-from-position)`,
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${bgGradientToValue(cssColor)} var(--un-gradient-to-position)`,
          "--un-gradient-stops": "var(--un-gradient-from), var(--un-gradient-to)"
        };
      case "via":
        return {
          "--un-gradient-via-position": "50%",
          "--un-gradient-to": bgGradientToValue(cssColor),
          "--un-gradient-stops": `var(--un-gradient-from), ${colorString} var(--un-gradient-via-position), var(--un-gradient-to)`
        };
      case "to":
        return {
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${colorString} var(--un-gradient-to-position)`
        };
    }
  };
}
function bgGradientPositionResolver() {
  return ([, mode, body]) => {
    return {
      [`--un-gradient-${mode}-position`]: `${Number(h$2.bracket.cssvar.percent(body)) * 100}%`
    };
  };
}
const backgroundStyles = [
  // gradients
  [/^bg-gradient-(.+)$/, ([, d]) => ({ "--un-gradient": h$2.bracket(d) }), {
    autocomplete: ["bg-gradient", "bg-gradient-(from|to|via)", "bg-gradient-(from|to|via)-$colors", "bg-gradient-(from|to|via)-(op|opacity)", "bg-gradient-(from|to|via)-(op|opacity)-<percent>"]
  }],
  [/^(?:bg-gradient-)?stops-(\[.+\])$/, ([, s]) => ({ "--un-gradient-stops": h$2.bracket(s) })],
  [/^(?:bg-gradient-)?(from)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(via)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(to)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(from|via|to)-op(?:acity)?-?(.+)$/, ([, position2, opacity2]) => ({ [`--un-${position2}-opacity`]: h$2.bracket.percent(opacity2) })],
  [/^(from|via|to)-([\d.]+)%$/, bgGradientPositionResolver()],
  // images
  [/^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/, ([, s]) => ({
    "background-image": `${s}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))`
  }), { autocomplete: ["bg-gradient-repeating", "bg-gradient-(linear|radial|conic)", "bg-gradient-repeating-(linear|radial|conic)"] }],
  // ignore any center position
  [/^bg-gradient-to-([rltb]{1,2})$/, ([, d]) => {
    if (d in positionMap$1) {
      return {
        "--un-gradient-shape": `to ${positionMap$1[d]} in oklch`,
        "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
        "background-image": "linear-gradient(var(--un-gradient))"
      };
    }
  }, { autocomplete: `bg-gradient-to-(${Object.keys(positionMap$1).filter((k) => k.length <= 2 && Array.from(k).every((c) => "rltb".includes(c))).join("|")})` }],
  [/^(?:bg-gradient-)?shape-(.+)$/, ([, d]) => {
    const v = d in positionMap$1 ? `to ${positionMap$1[d]}` : h$2.bracket(d);
    if (v != null) {
      return {
        "--un-gradient-shape": `${v} in oklch`,
        "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)"
      };
    }
  }, { autocomplete: ["bg-gradient-shape", `bg-gradient-shape-(${Object.keys(positionMap$1).join("|")})`, `shape-(${Object.keys(positionMap$1).join("|")})`] }],
  ["bg-none", { "background-image": "none" }],
  ["box-decoration-slice", { "box-decoration-break": "slice" }],
  ["box-decoration-clone", { "box-decoration-break": "clone" }],
  ...makeGlobalStaticRules$1("box-decoration", "box-decoration-break"),
  // size
  ["bg-auto", { "background-size": "auto" }],
  ["bg-cover", { "background-size": "cover" }],
  ["bg-contain", { "background-size": "contain" }],
  // attachments
  ["bg-fixed", { "background-attachment": "fixed" }],
  ["bg-local", { "background-attachment": "local" }],
  ["bg-scroll", { "background-attachment": "scroll" }],
  // clips
  ["bg-clip-border", { "-webkit-background-clip": "border-box", "background-clip": "border-box" }],
  ["bg-clip-content", { "-webkit-background-clip": "content-box", "background-clip": "content-box" }],
  ["bg-clip-padding", { "-webkit-background-clip": "padding-box", "background-clip": "padding-box" }],
  ["bg-clip-text", { "-webkit-background-clip": "text", "background-clip": "text" }],
  ...globalKeywords$1.map((keyword) => [`bg-clip-${keyword}`, {
    "-webkit-background-clip": keyword,
    "background-clip": keyword
  }]),
  // positions
  // skip 1 & 2 letters shortcut
  [/^bg-([-\w]{3,})$/, ([, s]) => ({ "background-position": positionMap$1[s] })],
  // repeats
  ["bg-repeat", { "background-repeat": "repeat" }],
  ["bg-no-repeat", { "background-repeat": "no-repeat" }],
  ["bg-repeat-x", { "background-repeat": "repeat-x" }],
  ["bg-repeat-y", { "background-repeat": "repeat-y" }],
  ["bg-repeat-round", { "background-repeat": "round" }],
  ["bg-repeat-space", { "background-repeat": "space" }],
  ...makeGlobalStaticRules$1("bg-repeat", "background-repeat"),
  // origins
  ["bg-origin-border", { "background-origin": "border-box" }],
  ["bg-origin-padding", { "background-origin": "padding-box" }],
  ["bg-origin-content", { "background-origin": "content-box" }],
  ...makeGlobalStaticRules$1("bg-origin", "background-origin")
];
const listStyles = {
  "disc": "disc",
  "circle": "circle",
  "square": "square",
  "decimal": "decimal",
  "zero-decimal": "decimal-leading-zero",
  "greek": "lower-greek",
  "roman": "lower-roman",
  "upper-roman": "upper-roman",
  "alpha": "lower-alpha",
  "upper-alpha": "upper-alpha",
  "latin": "lower-latin",
  "upper-latin": "upper-latin"
};
const listStyle = [
  // base
  [/^list-(.+?)(?:-(outside|inside))?$/, ([, alias, position2]) => {
    const style = listStyles[alias];
    if (style) {
      if (position2) {
        return {
          "list-style-position": position2,
          "list-style-type": style
        };
      }
      return { "list-style-type": style };
    }
  }, { autocomplete: [`list-(${Object.keys(listStyles).join("|")})`, `list-(${Object.keys(listStyles).join("|")})-(outside|inside)`] }],
  // styles
  ["list-outside", { "list-style-position": "outside" }],
  ["list-inside", { "list-style-position": "inside" }],
  ["list-none", { "list-style-type": "none" }],
  // image
  [/^list-image-(.+)$/, ([, d]) => {
    if (/^\[url\(.+\)\]$/.test(d))
      return { "list-style-image": h$2.bracket(d) };
  }],
  ["list-image-none", { "list-style-image": "none" }],
  ...makeGlobalStaticRules$1("list", "list-style-type")
];
const accents = [
  [/^accent-(.+)$/, colorResolver$1("accent-color", "accent", "accentColor"), { autocomplete: "accent-$colors" }],
  [/^accent-op(?:acity)?-?(.+)$/, ([, d]) => ({ "--un-accent-opacity": h$2.bracket.percent(d) }), { autocomplete: ["accent-(op|opacity)", "accent-(op|opacity)-<percent>"] }]
];
const carets = [
  [/^caret-(.+)$/, colorResolver$1("caret-color", "caret", "textColor"), { autocomplete: "caret-$colors" }],
  [/^caret-op(?:acity)?-?(.+)$/, ([, d]) => ({ "--un-caret-opacity": h$2.bracket.percent(d) }), { autocomplete: ["caret-(op|opacity)", "caret-(op|opacity)-<percent>"] }]
];
const imageRenderings = [
  ["image-render-auto", { "image-rendering": "auto" }],
  ["image-render-edge", { "image-rendering": "crisp-edges" }],
  ["image-render-pixel", [
    ["-ms-interpolation-mode", "nearest-neighbor"],
    ["image-rendering", "-webkit-optimize-contrast"],
    ["image-rendering", "-moz-crisp-edges"],
    ["image-rendering", "-o-pixelated"],
    ["image-rendering", "pixelated"]
  ]]
];
const overscrolls = [
  ["overscroll-auto", { "overscroll-behavior": "auto" }],
  ["overscroll-contain", { "overscroll-behavior": "contain" }],
  ["overscroll-none", { "overscroll-behavior": "none" }],
  ...makeGlobalStaticRules$1("overscroll", "overscroll-behavior"),
  ["overscroll-x-auto", { "overscroll-behavior-x": "auto" }],
  ["overscroll-x-contain", { "overscroll-behavior-x": "contain" }],
  ["overscroll-x-none", { "overscroll-behavior-x": "none" }],
  ...makeGlobalStaticRules$1("overscroll-x", "overscroll-behavior-x"),
  ["overscroll-y-auto", { "overscroll-behavior-y": "auto" }],
  ["overscroll-y-contain", { "overscroll-behavior-y": "contain" }],
  ["overscroll-y-none", { "overscroll-behavior-y": "none" }],
  ...makeGlobalStaticRules$1("overscroll-y", "overscroll-behavior-y")
];
const scrollBehaviors = [
  ["scroll-auto", { "scroll-behavior": "auto" }],
  ["scroll-smooth", { "scroll-behavior": "smooth" }],
  ...makeGlobalStaticRules$1("scroll", "scroll-behavior")
];
const columns = [
  [/^columns-(.+)$/, ([, v]) => ({ columns: h$2.bracket.global.number.auto.numberWithUnit(v) }), { autocomplete: "columns-<num>" }],
  // break before
  ["break-before-auto", { "break-before": "auto" }],
  ["break-before-avoid", { "break-before": "avoid" }],
  ["break-before-all", { "break-before": "all" }],
  ["break-before-avoid-page", { "break-before": "avoid-page" }],
  ["break-before-page", { "break-before": "page" }],
  ["break-before-left", { "break-before": "left" }],
  ["break-before-right", { "break-before": "right" }],
  ["break-before-column", { "break-before": "column" }],
  ...makeGlobalStaticRules$1("break-before"),
  // break inside
  ["break-inside-auto", { "break-inside": "auto" }],
  ["break-inside-avoid", { "break-inside": "avoid" }],
  ["break-inside-avoid-page", { "break-inside": "avoid-page" }],
  ["break-inside-avoid-column", { "break-inside": "avoid-column" }],
  ...makeGlobalStaticRules$1("break-inside"),
  // break after
  ["break-after-auto", { "break-after": "auto" }],
  ["break-after-avoid", { "break-after": "avoid" }],
  ["break-after-all", { "break-after": "all" }],
  ["break-after-avoid-page", { "break-after": "avoid-page" }],
  ["break-after-page", { "break-after": "page" }],
  ["break-after-left", { "break-after": "left" }],
  ["break-after-right", { "break-after": "right" }],
  ["break-after-column", { "break-after": "column" }],
  ...makeGlobalStaticRules$1("break-after")
];
const divides = [
  // divides
  [/^divide-?([xy])$/, handlerDivide, { autocomplete: ["divide-(x|y|block|inline)", "divide-(x|y|block|inline)-reverse", "divide-(x|y|block|inline)-$lineWidth"] }],
  [/^divide-?([xy])-?(.+)$/, handlerDivide],
  [/^divide-?([xy])-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
  [/^divide-(block|inline)$/, handlerDivide],
  [/^divide-(block|inline)-(.+)$/, handlerDivide],
  [/^divide-(block|inline)-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
  // color & opacity
  [/^divide-(.+)$/, colorResolver$1("border-color", "divide", "borderColor"), { autocomplete: "divide-$colors" }],
  [/^divide-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-divide-opacity": h$2.bracket.percent(opacity2) }), { autocomplete: ["divide-(op|opacity)", "divide-(op|opacity)-<percent>"] }],
  // styles
  ...borderStyles.map((style) => [`divide-${style}`, { "border-style": style }])
];
function handlerDivide([, d, s], { theme: theme2 }) {
  let v = theme2.lineWidth?.[s || "DEFAULT"] ?? h$2.bracket.cssvar.px(s || "1");
  if (v != null) {
    if (v === "0")
      v = "0px";
    const results = directionMap$1[d].map((item) => {
      const key = `border${item}-width`;
      const value = item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-divide-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`;
      return [key, value];
    });
    if (results) {
      return [
        [`--un-divide-${d}-reverse`, 0],
        ...results
      ];
    }
  }
}
const lineClamps = [
  [/^line-clamp-(\d+)$/, ([, v]) => ({
    "overflow": "hidden",
    "display": "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": v,
    "line-clamp": v
  }), { autocomplete: ["line-clamp", "line-clamp-<num>"] }],
  ...["none", ...globalKeywords$1].map((keyword) => [`line-clamp-${keyword}`, {
    "overflow": "visible",
    "display": "block",
    "-webkit-box-orient": "horizontal",
    "-webkit-line-clamp": keyword,
    "line-clamp": keyword
  }])
];
const placeholders = [
  // The prefix `$ ` is intentional. This rule is not to be matched directly from user-generated token.
  // See variants/placeholder.
  [/^\$ placeholder-(.+)$/, colorResolver$1("color", "placeholder", "accentColor"), { autocomplete: "placeholder-$colors" }],
  [/^\$ placeholder-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-placeholder-opacity": h$2.bracket.percent(opacity2) }), { autocomplete: ["placeholder-(op|opacity)", "placeholder-(op|opacity)-<percent>"] }]
];
const spaces = [
  [/^space-([xy])-(.+)$/, handlerSpace, { autocomplete: ["space-(x|y|block|inline)", "space-(x|y|block|inline)-reverse", "space-(x|y|block|inline)-$spacing"] }],
  [/^space-([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-(.+)$/, handlerSpace],
  [/^space-(block|inline)-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })]
];
function handlerSpace([, d, s], { theme: theme2 }) {
  let v = theme2.spacing?.[s || "DEFAULT"] ?? h$2.bracket.cssvar.auto.fraction.rem(s || "1");
  if (v != null) {
    if (v === "0")
      v = "0px";
    const results = directionMap$1[d].map((item) => {
      const key = `margin${item}`;
      const value = item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-space-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-space-${d}-reverse)))`;
      return [key, value];
    });
    if (results) {
      return [
        [`--un-space-${d}-reverse`, 0],
        ...results
      ];
    }
  }
}
const textTransforms = [
  // tailwind compat
  ["uppercase", { "text-transform": "uppercase" }],
  ["lowercase", { "text-transform": "lowercase" }],
  ["capitalize", { "text-transform": "capitalize" }],
  ["normal-case", { "text-transform": "none" }]
];
const hyphens = [
  ...["manual", "auto", "none", ...globalKeywords$1].map((keyword) => [`hyphens-${keyword}`, {
    "-webkit-hyphens": keyword,
    "-ms-hyphens": keyword,
    "hyphens": keyword
  }])
];
const writingModes = [
  ["write-vertical-right", { "writing-mode": "vertical-rl" }],
  ["write-vertical-left", { "writing-mode": "vertical-lr" }],
  ["write-normal", { "writing-mode": "horizontal-tb" }],
  ...makeGlobalStaticRules$1("write", "writing-mode")
];
const writingOrientations = [
  ["write-orient-mixed", { "text-orientation": "mixed" }],
  ["write-orient-sideways", { "text-orientation": "sideways" }],
  ["write-orient-upright", { "text-orientation": "upright" }],
  ...makeGlobalStaticRules$1("write-orient", "text-orientation")
];
const screenReadersAccess = [
  [
    "sr-only",
    {
      "position": "absolute",
      "width": "1px",
      "height": "1px",
      "padding": "0",
      "margin": "-1px",
      "overflow": "hidden",
      "clip": "rect(0,0,0,0)",
      "white-space": "nowrap",
      "border-width": 0
    }
  ],
  [
    "not-sr-only",
    {
      "position": "static",
      "width": "auto",
      "height": "auto",
      "padding": "0",
      "margin": "0",
      "overflow": "visible",
      "clip": "auto",
      "white-space": "normal"
    }
  ]
];
const isolations = [
  ["isolate", { isolation: "isolate" }],
  ["isolate-auto", { isolation: "auto" }],
  ["isolation-auto", { isolation: "auto" }]
];
const objectPositions = [
  // object fit
  ["object-cover", { "object-fit": "cover" }],
  ["object-contain", { "object-fit": "contain" }],
  ["object-fill", { "object-fit": "fill" }],
  ["object-scale-down", { "object-fit": "scale-down" }],
  ["object-none", { "object-fit": "none" }],
  // object position
  [/^object-(.+)$/, ([, d]) => {
    if (positionMap$1[d])
      return { "object-position": positionMap$1[d] };
    if (h$2.bracketOfPosition(d) != null)
      return { "object-position": h$2.bracketOfPosition(d).split(" ").map((e) => h$2.position.fraction.auto.px.cssvar(e) ?? e).join(" ") };
  }, { autocomplete: `object-(${Object.keys(positionMap$1).join("|")})` }]
];
const backgroundBlendModes = [
  ["bg-blend-multiply", { "background-blend-mode": "multiply" }],
  ["bg-blend-screen", { "background-blend-mode": "screen" }],
  ["bg-blend-overlay", { "background-blend-mode": "overlay" }],
  ["bg-blend-darken", { "background-blend-mode": "darken" }],
  ["bg-blend-lighten", { "background-blend-mode": "lighten" }],
  ["bg-blend-color-dodge", { "background-blend-mode": "color-dodge" }],
  ["bg-blend-color-burn", { "background-blend-mode": "color-burn" }],
  ["bg-blend-hard-light", { "background-blend-mode": "hard-light" }],
  ["bg-blend-soft-light", { "background-blend-mode": "soft-light" }],
  ["bg-blend-difference", { "background-blend-mode": "difference" }],
  ["bg-blend-exclusion", { "background-blend-mode": "exclusion" }],
  ["bg-blend-hue", { "background-blend-mode": "hue" }],
  ["bg-blend-saturation", { "background-blend-mode": "saturation" }],
  ["bg-blend-color", { "background-blend-mode": "color" }],
  ["bg-blend-luminosity", { "background-blend-mode": "luminosity" }],
  ["bg-blend-normal", { "background-blend-mode": "normal" }],
  ...makeGlobalStaticRules$1("bg-blend", "background-blend")
];
const mixBlendModes = [
  ["mix-blend-multiply", { "mix-blend-mode": "multiply" }],
  ["mix-blend-screen", { "mix-blend-mode": "screen" }],
  ["mix-blend-overlay", { "mix-blend-mode": "overlay" }],
  ["mix-blend-darken", { "mix-blend-mode": "darken" }],
  ["mix-blend-lighten", { "mix-blend-mode": "lighten" }],
  ["mix-blend-color-dodge", { "mix-blend-mode": "color-dodge" }],
  ["mix-blend-color-burn", { "mix-blend-mode": "color-burn" }],
  ["mix-blend-hard-light", { "mix-blend-mode": "hard-light" }],
  ["mix-blend-soft-light", { "mix-blend-mode": "soft-light" }],
  ["mix-blend-difference", { "mix-blend-mode": "difference" }],
  ["mix-blend-exclusion", { "mix-blend-mode": "exclusion" }],
  ["mix-blend-hue", { "mix-blend-mode": "hue" }],
  ["mix-blend-saturation", { "mix-blend-mode": "saturation" }],
  ["mix-blend-color", { "mix-blend-mode": "color" }],
  ["mix-blend-luminosity", { "mix-blend-mode": "luminosity" }],
  ["mix-blend-plus-lighter", { "mix-blend-mode": "plus-lighter" }],
  ["mix-blend-normal", { "mix-blend-mode": "normal" }],
  ...makeGlobalStaticRules$1("mix-blend")
];
const dynamicViewportHeight = [
  ["min-h-dvh", { "min-height": "100dvh" }],
  ["min-h-svh", { "min-height": "100svh" }],
  ["min-h-lvh", { "min-height": "100lvh" }],
  ["h-dvh", { height: "100dvh" }],
  ["h-svh", { height: "100svh" }],
  ["h-lvh", { height: "100lvh" }],
  ["max-h-dvh", { "max-height": "100dvh" }],
  ["max-h-svh", { "max-height": "100svh" }],
  ["max-h-lvh", { "max-height": "100lvh" }]
];
const variablesAbbrMap = {
  "bg-blend": "background-blend-mode",
  "bg-clip": "-webkit-background-clip",
  "bg-gradient": "linear-gradient",
  "bg-image": "background-image",
  "bg-origin": "background-origin",
  "bg-position": "background-position",
  "bg-repeat": "background-repeat",
  "bg-size": "background-size",
  "mix-blend": "mix-blend-mode",
  "object": "object-fit",
  "object-position": "object-position",
  "write": "writing-mode",
  "write-orient": "text-orientation"
};
const cssVariables = [
  [/^(.+?)-(\$.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap[name];
    if (prop)
      return { [prop]: h$2.cssvar(varname) };
  }]
];
const viewTransition = [
  [/^view-transition-([\w-]+)$/, ([, name]) => {
    return { "view-transition-name": name };
  }]
];
const rules = [
  cssVariables$1,
  cssVariables,
  cssProperty,
  container,
  contains,
  screenReadersAccess,
  pointerEvents,
  appearances,
  positions,
  insets,
  lineClamps,
  isolations,
  zIndexes,
  orders,
  grids,
  floats,
  margins,
  boxSizing,
  displays,
  aspectRatio,
  sizes,
  flex,
  tables,
  transforms,
  animations,
  cursors,
  touchActions,
  userSelects,
  resizes,
  scrolls,
  listStyle,
  appearance,
  columns,
  placements,
  alignments,
  justifies,
  gaps,
  flexGridJustifiesAlignments,
  spaces,
  divides,
  overflows,
  overscrolls,
  scrollBehaviors,
  textOverflows,
  whitespaces,
  breaks,
  borders,
  bgColors,
  backgroundStyles,
  colorScheme,
  svgUtilities,
  objectPositions,
  paddings,
  textAligns,
  textIndents,
  textWraps,
  verticalAligns,
  fonts,
  textTransforms$1,
  textTransforms,
  fontStyles,
  fontVariantNumeric,
  textDecorations,
  fontSmoothings,
  tabSizes,
  textStrokes,
  textShadows,
  hyphens,
  writingModes,
  writingOrientations,
  carets,
  accents,
  opacity,
  backgroundBlendModes,
  mixBlendModes,
  boxShadows,
  outline,
  rings,
  imageRenderings,
  filters,
  transitions,
  willChange,
  contentVisibility,
  contents,
  placeholders,
  containerParent,
  viewTransition,
  dynamicViewportHeight,
  fieldSizing,
  // should be the last
  questionMark
].flat(1);
function important(option) {
  if (option == null || option === false)
    return [];
  const wrapWithIs = (selector) => {
    if (selector.startsWith(":is(") && selector.endsWith(")"))
      return selector;
    if (selector.includes("::"))
      return selector.replace(/(.*?)((?:\s\*)?::.*)/, ":is($1)$2");
    return `:is(${selector})`;
  };
  return [
    option === true ? (util) => {
      util.entries.forEach((i) => {
        if (i[1] != null && !String(i[1]).endsWith("!important"))
          i[1] += " !important";
      });
    } : (util) => {
      if (!util.selector.startsWith(option))
        util.selector = `${option} ${wrapWithIs(util.selector)}`;
    }
  ];
}
function postprocessors(options) {
  return [
    ...toArray(presetMini(options).postprocess),
    ...important(options.important)
  ];
}
const presetWind3 = definePreset((options = {}) => {
  options.important = options.important ?? false;
  return {
    ...presetMini(options),
    name: "@unocss/preset-wind3",
    theme,
    rules,
    shortcuts,
    variants: variants(options),
    postprocess: postprocessors(options)
  };
});
const presetUno = definePreset$1((options = {}) => {
  const wind = presetWind3(options);
  return {
    ...wind,
    name: "@unocss/preset-uno"
  };
});
const hexToRgbVars = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return { r, g, b };
  }
  return hex;
};
function brighten(col, amt) {
  if (amt > 0 || amt < 0) {
    col = col.replace(/^#/, "");
    if (col.length === 3)
      col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
    const rgb = hexToRgbVars(col);
    if (typeof rgb !== "string") {
      const r = Math.max(Math.min(255, rgb.r - Math.round(255 * -(amt / 100))), 0).toString(16);
      const g = Math.max(Math.min(255, rgb.g - Math.round(255 * -(amt / 100))), 0).toString(16);
      const b = Math.max(Math.min(255, rgb.b - Math.round(255 * -(amt / 100))), 0).toString(16);
      const rr = (r.length < 2 ? "0" : "") + r;
      const gg = (g.length < 2 ? "0" : "") + g;
      const bb = (b.length < 2 ? "0" : "") + b;
      return `#${rr}${gg}${bb}`;
    }
  }
  return col;
}
const luminance = (rgb) => {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
function mostReadable(bgColor) {
  const bgRgb = hexToRgbVars(bgColor);
  let textColor = "";
  if (typeof bgRgb !== "string") {
    const bgLum = luminance(bgRgb);
    for (let i = 1; i < 15; i++) {
      const readable = brighten(bgColor, bgLum < 0.3 ? i * 10 : -(i * 10));
      const readableRgb = hexToRgbVars(readable);
      if (typeof readableRgb !== "string") {
        const readableLum = luminance(readableRgb);
        const ratio = bgLum > readableLum ? (readableLum + 0.05) / (bgLum + 0.05) : (bgLum + 0.05) / (readableLum + 0.05);
        if (ratio < 1 / 4.5) {
          textColor = readable;
          break;
        }
      }
    }
  }
  return textColor;
}
const defaultTheme = "blue";
const generateMissingColors = (setTheme) => {
  const difference = colorNames.filter((name) => !Object.keys(setTheme).includes(name));
  for (const key in difference) {
    const difName = difference[key];
    if (difName.includes("focus")) {
      const index = Object.keys(setTheme).find((name) => name.includes(difName.replace("-focus", "")));
      const color = setTheme[index];
      setTheme[difName] = brighten(color, -10);
    }
    if (difName.includes("content")) {
      const index = Object.keys(setTheme).find((name) => name.includes(difName.replace("-content", "")));
      const color = setTheme[index];
      setTheme[difName] = mostReadable(color);
    }
    if (difName.includes("base-200") || difName.includes("dark-base-200")) {
      const index = Object.keys(setTheme).find((name) => name.includes(difName.replace("-200", "")));
      const color = setTheme[index];
      setTheme[difName] = brighten(color, -5);
    }
    if (difName.includes("base-300") || difName.includes("dark-base-300")) {
      const index = Object.keys(setTheme).find((name) => name.includes(difName.replace("-300", "")));
      const color = setTheme[index];
      setTheme[difName] = brighten(color, -10);
    }
  }
  return setTheme;
};
const generateTheme = (theme2) => {
  const generatedTheme = { light: {}, dark: {} };
  const themeColor = Object.assign({}, theme2);
  for (const key in themeColor) {
    if (key.includes("dark")) {
      const baseKey = key.replace("dark-", "");
      generatedTheme.dark[`--${baseKey}`] = themeColor[key];
      if (baseKey.startsWith("base-")) {
        generatedTheme.dark[`--dark-${baseKey}`] = themeColor[key];
      }
    } else {
      generatedTheme.light[`--${key}`] = themeColor[key];
    }
  }
  return generatedTheme;
};
function getTheme() {
  let setTheme = {};
  let generatedTheme = { light: {}, dark: {} };
  setTheme = themes[defaultTheme];
  setTheme = generateMissingColors(setTheme);
  generatedTheme = generateTheme(setTheme);
  const generatedOthers = {};
  const otherThemeNames = Object.keys(themes).filter((name) => name !== defaultTheme);
  for (const themeName of otherThemeNames) {
    const tempTheme = generateMissingColors(themes[themeName]);
    const tempGenerated = generateTheme(tempTheme);
    generatedOthers[`.theme-${themeName}`] = tempGenerated.light;
    generatedOthers[`.dark.theme-${themeName}`] = tempGenerated.dark;
  }
  return {
    ":root": generatedTheme.light,
    ".dark": generatedTheme.dark,
    ...generatedOthers
  };
}
const SectumTheme = definePreset$3(() => {
  return {
    name: "sectum-theme",
    preflights: [
      {
        getCSS: () => {
          let css = "";
          css += `* {
`;
          css += `  font-family: 'HarmonyOS Sans', 'HarmonyOS Sans SC', 'HarmonyOS Sans UI', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
`;
          css += `}

`;
          css += `html, body {
`;
          css += `  margin: 0;
`;
          css += `  padding: 0;
`;
          css += `  height: 100%;
`;
          css += `  background-color: var(--base-300);
`;
          css += `}

`;
          css += `#app {
`;
          css += `  height: 100%;
`;
          css += `  background-color: var(--base-300);
`;
          css += `}

`;
          css += `
/* scrollbar styles */
`;
          css += `html body::-webkit-scrollbar {
`;
          css += `  display: none;
`;
          css += `}

`;
          css += `html *::-webkit-scrollbar {
`;
          css += `  background: var(--base-300); /* Light模式：base-300轨道 */
`;
          css += `  width: 8px;
`;
          css += `  height: 8px;
`;
          css += `}

`;
          css += `html *::-webkit-scrollbar-track {
`;
          css += `  background: var(--base-300); /* Light模式：base-300轨道 */
`;
          css += `}

`;
          css += `html * {
`;
          css += `  scrollbar-width: thin;
`;
          css += `  scrollbar-color: #6b7280 var(--base-300); /* Firefox: 滑块颜色 轨道颜色 */
`;
          css += `}

`;
          css += `html *::-webkit-scrollbar-thumb {
`;
          css += `  transition: background 0.2s ease-in-out;
`;
          css += `  border: 2px solid transparent; /* 增加边框宽度以产生浮动效果 */
`;
          css += `  background: #6b7280; /* 深灰色滑块（在base-300轨道上可见） */
`;
          css += `  border-radius: 9999px;
`;
          css += `  background-clip: content-box; /* 让边框透明，产生浮动效果 */
`;
          css += `}

`;
          css += `html *::-webkit-scrollbar-thumb:hover {
`;
          css += `  background: #4b5563; /* hover 时更深的灰色 */
`;
          css += `}

`;
          css += `html *::-webkit-scrollbar-corner {
`;
          css += `  background: var(--base-300); /* 角落也使用base-300 */
`;
          css += `}

`;
          css += `/* Dark mode scrollbar */
`;
          css += `.dark html *::-webkit-scrollbar,
`;
          css += `.dark html *::-webkit-scrollbar-track,
`;
          css += `.dark html *::-webkit-scrollbar-corner {
`;
          css += `  background: var(--dark-base-300); /* 暗色模式：dark-base-300轨道 */
`;
          css += `}

`;
          css += `.dark html * {
`;
          css += `  scrollbar-color: #4b5563 var(--dark-base-300); /* Firefox 暗色模式 */
`;
          css += `}

`;
          css += `.dark html *::-webkit-scrollbar-thumb {
`;
          css += `  background: #4b5563; /* 暗色模式：稍亮的滑块 */
`;
          css += `}

`;
          css += `.dark html *::-webkit-scrollbar-thumb:hover {
`;
          css += `  background: #6b7280; /* 暗色模式 hover */
`;
          css += `}

`;
          css += `/* hidden-scrollbar utility class */
`;
          css += `.hidden-scrollbar {
`;
          css += `  -ms-overflow-style: none; /* IE and Edge */
`;
          css += `  scrollbar-width: none; /* Firefox */
`;
          css += `}

`;
          css += `.hidden-scrollbar::-webkit-scrollbar {
`;
          css += `  display: none; /* Chrome, Safari, Opera */
`;
          css += `}

`;
          css += `input, textarea {
`;
          css += `  border-style: solid;
`;
          css += `  border-image: none;
`;
          css += `}

`;
          const theme2 = getTheme();
          for (const [selector, variables] of Object.entries(theme2)) {
            css += `${selector} {
`;
            for (const [property, value] of Object.entries(variables)) {
              css += `  ${property}: ${value};
`;
            }
            css += `}
`;
          }
          css += `/* Dark variant support for bg-base and border-base - use dark-base variables */
`;
          const themeNames = ["blue", "teal", "rose", "violet", "orange"];
          const baseNumbers = ["100", "200", "300"];
          for (const num of baseNumbers) {
            const selectors = [`.dark .dark\\:bg-base-${num}`];
            for (const theme22 of themeNames) {
              selectors.push(`.dark.theme-${theme22} .dark\\:bg-base-${num}`);
            }
            css += `${selectors.join(",\n")} {
`;
            css += `  background-color: var(--dark-base-${num}) !important;
`;
            css += `}

`;
            const borderSelectors = [`.dark .dark\\:border-base-${num}`];
            for (const theme22 of themeNames) {
              borderSelectors.push(`.dark.theme-${theme22} .dark\\:border-base-${num}`);
            }
            css += `${borderSelectors.join(",\n")} {
`;
            css += `  border-color: var(--dark-base-${num}) !important;
`;
            css += `}

`;
          }
          return css;
        }
      }
    ],
    safelist: ["button", "a", "ul", "li", "input"]
  };
});
const UnoConfig = {
  presets: [
    presetUno(),
    SectumTheme
  ],
  // 确保 dark mode 使用 class 策略
  darkMode: "class",
  rules: [
    // 自定义颜色规则 - 处理项目特有的颜色名
    [/^bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "background-color": `var(--${color})` };
    }],
    [/^bg-(primary|secondary|success|warning|error)-focus$/, ([, color]) => {
      return { "background-color": `var(--${color}-focus)` };
    }],
    [/^text-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "color": `var(--${color})` };
    }],
    [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
      return { "color": `var(--${color}-content)` };
    }],
    [/^border-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "border-color": `var(--${color})` };
    }],
    [/^border-(primary|secondary|success|warning|error)-focus$/, ([, color]) => {
      return { "border-color": `var(--${color}-focus)` };
    }],
    // Outline 颜色（用于聚焦时的外围边框）
    [/^outline-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "outline-color": `var(--${color})` };
    }],
    [/^outline-base-(\d+)$/, ([, num]) => {
      return { "outline-color": `var(--base-${num})` };
    }],
    // Ring 颜色（主题色）
    [/^ring-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "--un-ring-color": `var(--${color})` };
    }],
    [/^ring-(primary|secondary|success|warning|error)-focus$/, ([, color]) => {
      return { "--un-ring-color": `var(--${color}-focus)` };
    }],
    // 透明度支持
    [/^bg-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity2]) => {
      return { "background-color": `rgba(var(--${color}), ${parseInt(opacity2) / 100})` };
    }],
    [/^text-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity2]) => {
      return { "color": `rgba(var(--${color}), ${parseInt(opacity2) / 100})` };
    }],
    // 阴影规则
    [/^shadow-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity2]) => {
      return { "box-shadow": `0 4px 6px -1px rgba(var(--${color}), ${parseInt(opacity2) / 100})` };
    }],
    // 悬停状态支持 - UnoCSS 会自动处理 hover: 前缀
    [/^hover:bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "background-color": `var(--${color})` };
    }],
    [/^hover:bg-(primary|secondary|success|warning|error)-focus$/, ([, color]) => {
      return { "background-color": `var(--${color}-focus)` };
    }],
    [/^hover:text-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { "color": `var(--${color})` };
    }],
    [/^hover:text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
      return { "color": `var(--${color}-content)` };
    }],
    // Base 颜色规则 - 必须在 bg-dark-base 之前
    [/^bg-base-(\d+)$/, ([, num]) => {
      return { "background-color": `var(--base-${num})` };
    }],
    // bg-dark-base 规则：直接使用 dark-base 变量，主要用于 dark variant
    [/^bg-dark-base-(\d+)$/, ([, num]) => {
      return { "background-color": `var(--dark-base-${num})` };
    }],
    [/^text-base-(\d+)$/, ([, num]) => {
      return { "color": `var(--base-${num})` };
    }],
    [/^text-dark-base-(\d+)$/, ([, num]) => {
      return { "color": `var(--dark-base-${num})` };
    }],
    [/^color-base-content$/, () => {
      return { "color": `var(--base-content)` };
    }],
    [/^color-dark-base-content$/, () => {
      return { "color": `var(--dark-base-content)` };
    }],
    [/^border-base-(\d+)$/, ([, num]) => {
      return { "border-color": `var(--base-${num})` };
    }],
    // Ring 颜色需要设置 UnoCSS 使用的变量 --un-ring-color
    [/^ring-base-(\d+)$/, ([, num]) => {
      return { "--un-ring-color": `var(--base-${num})` };
    }],
    [/^ring-dark-base-(\d+)$/, ([, num]) => {
      return { "--un-ring-color": `var(--dark-base-${num})` };
    }],
    [/^border-dark-base-(\d+)$/, ([, num]) => {
      return { "border-color": `var(--dark-base-${num})` };
    }],
    [/^text-base-content$/, () => {
      return { "color": `var(--base-content)` };
    }],
    [/^text-dark-base-content$/, () => {
      return { "color": `var(--dark-base-content)` };
    }]
  ],
  theme: {
    fontFamily: {
      "harmony": '"HarmonyOS Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      "sans": '"HarmonyOS Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    },
    borderRadius: {
      "$rounded-box": "var(--rounded-box)",
      "$rounded-btn": "var(--rounded-btn)",
      "$rounded-badge": "var(--rounded-badge)"
    }
  },
  content: {
    pipeline: {
      include: [
        /\.(vue|js|ts)($|\?)/,
        "src/**/*.html"
      ]
    }
  },
  // 智能生成 safelist - 基于组件中实际使用的颜色和变体
  safelist: (() => {
    const colors2 = ["primary", "secondary", "success", "warning", "error"];
    const variants2 = ["", "-focus"];
    const states = ["", "hover:"];
    const types = ["bg", "text", "border"];
    const contentTypes = ["", "-content"];
    const opacityVariants = ["/5", "/10", "/15"];
    const classes = [];
    for (const color of colors2) {
      for (const variant of variants2) {
        for (const state of states) {
          for (const type of types) {
            for (const contentType of contentTypes) {
              if (type === "text" && contentType === "-content") {
                classes.push(`${state}${type}-${color}${contentType}`);
              } else if (type === "text" && contentType === "") {
                classes.push(`${state}${type}-${color}`);
              } else if (type !== "text" && variant === "") {
                classes.push(`${state}${type}-${color}`);
              } else if (type !== "text" && variant === "-focus") {
                classes.push(`${state}${type}-${color}${variant}`);
              }
            }
          }
        }
      }
    }
    for (const color of colors2) {
      for (const opacity2 of opacityVariants) {
        classes.push(`bg-${color}${opacity2}`);
        classes.push(`hover:bg-${color}${opacity2}`);
      }
    }
    for (const color of colors2) {
      classes.push(`shadow-${color}/15`);
    }
    for (const color of colors2) {
      classes.push(`border-2`, `border-${color}`, `border-solid`);
    }
    for (const color of colors2) {
      classes.push(`ring-${color}`, `ring-${color}-focus`);
      classes.push(`hover:ring-${color}-focus`);
    }
    classes.push("ring-1", "ring-2", "ring-inset", "ring-offset-1", "ring-offset-2", "ring-offset-white", "ring-offset-transparent");
    const baseNumbers = ["100", "200", "300"];
    for (const num of baseNumbers) {
      classes.push(`bg-base-${num}`, `bg-dark-base-${num}`, `text-base-${num}`, `text-dark-base-${num}`, `border-base-${num}`, `border-dark-base-${num}`);
      classes.push(`dark:bg-base-${num}`, `dark:border-base-${num}`);
    }
    classes.push("color-base-content", "color-dark-base-content");
    classes.push("border-2", "border-collapse", "border-solid");
    classes.push("font-harmony", "font-sans", "font-mono");
    const animationClasses = ["animate-bounce", "animate-pulse", "animate-spin", "opacity-50"];
    classes.push(...animationClasses);
    for (let i = 10; i <= 100; i += 10) {
      classes.push(`opacity-${i}`);
    }
    return classes;
  })()
};
const configInfo = {
  name: "Sectum UI UnoCSS Configuration",
  version: "0.1.6",
  description: "UnoCSS configuration for Sectum UI component library, including presets, rules, theme extensions, and safelist.",
  usage: `
    // In your uno.config.js:
    import { defineConfig } from 'unocss'
    import { UnoConfig } from 'sectum/dist/uno.config.js' // For JS projects

    export default defineConfig({
      ...UnoConfig,
      // Your other configurations
    })

    // In your uno.config.ts (for internal development or TS projects):
    import { defineConfig } from 'unocss'
    import { UnoConfig } from 'sectum/src/packet/Config' // For TS projects

    export default defineConfig({
      ...UnoConfig,
      // Your other configurations
    })
  `
};
var define_process_default = {};
const install = (app) => {
  if (typeof define_process_default === "undefined") {
    window.process = { env: {} };
    globalThis.process = { env: {} };
  }
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = generateCSSVariables();
    document.head.appendChild(style);
  }
  app.use(install$5);
  app.use(install$4);
  app.use(install$3);
  app.use(install$1);
  app.use(install$2);
};
export {
  _sfc_main$e as AccountCreate,
  _sfc_main$H as Backdrop,
  Button,
  ButtonGroup,
  Catalog,
  Checkbox,
  _sfc_main$B as Code,
  _sfc_main$E as Color,
  _sfc_main$j as DarkChange,
  Date$1 as Date,
  _sfc_main$w as Drawer,
  _sfc_main$y as Dropdown,
  install$5 as Element,
  _sfc_main$m as File,
  Footer,
  Form,
  _sfc_main$s as FormItem,
  _sfc_main$g as FullScreen,
  _sfc_main$3 as Header,
  _sfc_main$I as Icon,
  _sfc_main$L as Input,
  _sfc_main$5 as InterlinkDetail,
  Label,
  _sfc_main$k as LanguageSelect,
  install$1 as Layout,
  _sfc_main$h as Markdown,
  Menu,
  MessageWithMethods as Message,
  Modal,
  install$2 as Model,
  _sfc_main$2 as Navbar,
  _sfc_main$D as Palette,
  _sfc_main$c as PartDetail,
  install$3 as Pattern,
  _sfc_main$d as ProjectCreate,
  _sfc_main$8 as ProjectDetail,
  install$4 as Section,
  _sfc_main$b as SectionDetail,
  _sfc_main$r as Select,
  _sfc_main$1 as Sidebar,
  _sfc_main$a as SourceDetail,
  _sfc_main$9 as StandardDetail,
  _sfc_main$6 as StorageDetail,
  Store,
  _sfc_main$o as TabPane,
  Table,
  _sfc_main$p as Tabs,
  _sfc_main$f as TaskCreate,
  _sfc_main$7 as TaskDetail,
  Textarea,
  _sfc_main$l as ThemeSelect,
  Toggle,
  _sfc_main as Toolbar,
  Transition,
  UnoConfig,
  _sfc_main$n as Upload,
  configInfo,
  install as default
};
//# sourceMappingURL=sectum.es.js.map
