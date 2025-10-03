<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String, default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'error', 'warning'].includes(value)
    }
  },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  disabled: { type: Boolean, default: false, required: false },
  checked: { type: Boolean, default: false, required: false },
})

const emits = defineEmits(['change'])

const isChecked = computed({
  get: () => props.checked,
  set: (val) => emits("change", val)
})
</script>

<template>
  <input type="checkbox" v-model="isChecked" :disabled="disabled" class="ckb" :class="[
    `ckb-${color}`,
    `ckb-${size}`,
  ]">
</template>

<style scoped>
/* Checkbox 基础样式 */
.ckb {
  appearance: none;
  cursor: pointer;
  border: 2px solid var(--primary);
  border-radius: var(--rounded-btn);
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
  display: inline-block;
}

.ckb:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 尺寸样式 */
.ckb-xs { width: 1rem; height: 1rem; }
.ckb-sm { width: 1.25rem; height: 1.25rem; }
.ckb-md { width: 1.5rem; height: 1.5rem; }
.ckb-lg { width: 2rem; height: 2rem; }
.ckb-xl { width: 2.5rem; height: 2.5rem; }

/* 颜色变体 */
.ckb-primary {
  --chkbg: var(--primary);
  --chkfg: var(--primary-content);
  border-color: var(--primary);
}

.ckb-secondary {
  --chkbg: var(--secondary);
  --chkfg: var(--secondary-content);
  border-color: var(--secondary);
}

.ckb-success {
  --chkbg: var(--success);
  --chkfg: var(--success-content);
  border-color: var(--success);
}

.ckb-warning {
  --chkbg: var(--warning);
  --chkfg: var(--warning-content);
  border-color: var(--warning);
}

.ckb-error {
  --chkbg: var(--error);
  --chkfg: var(--error-content);
  border-color: var(--error);
}

/* 选中状态 */
.ckb:checked,
.ckb[checked="true"] {
  background-color: var(--chkbg);
  animation: checkmark var(--animation-input, 0.2s) ease-in-out;
  background-image:
    linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%),
    linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%),
    linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%),
    linear-gradient(45deg,
      var(--chkbg) 30%,
      var(--chkfg) 30.99%,
      var(--chkfg) 40%,
      transparent 40.99%),
    linear-gradient(-45deg,
      var(--chkfg) 50%,
      var(--chkbg) 50.99%);
}

/* 禁用状态 */
.ckb:disabled {
  cursor: not-allowed;
  border-color: transparent;
  background-color: var(--base-200);
  opacity: 0.2;
}

/* 悬停效果 */
.ckb:not(:disabled):hover {
  border-color: var(--chkbg);
  background-color: rgba(var(--chkbg), 0.1);
}

/* 动画 */
@keyframes checkmark {
  0% { background-position-y: 5px }
  50% { background-position-y: -2px; }
  100% { background-position-y: 0; }
}
</style>
