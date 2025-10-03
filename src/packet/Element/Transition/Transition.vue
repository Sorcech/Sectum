<template>
  <Transition :name="name">
    <slot></slot>
  </Transition>
</template>
<script lang="ts" setup>
defineProps({
  name: {
    type: String, required: true,
    validator: (value: string) => {
      return ['downward', 'upward', 'leftward', 'rightward', 'bloom', 'fade'].includes(value)
    },
  }
})
</script>
<style scoped>
.downward-enter-active {
  transition: all 0.2s ease-out;
}

.downward-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.downward-enter-from,
.downward-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


.leftward-enter-active {
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.leftward-leave-active {
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.leftward-enter-from,
.leftward-leave-to {
  transform: translateX(100%);
  opacity: 0;
}


.rightward-enter-active {
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.rightward-leave-active {
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.rightward-enter-from,
.rightward-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.upward-enter-active {
  transition: all 0.2s ease-out;
}

.upward-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.upward-enter-from,
.upward-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.bloom-enter-active,
.bloom-leave-active {
  transition: opacity 0.5s ease;
}

.bloom-enter-from,
.bloom-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* .bloom-enter-active {
  animation: bloom-in;
}

.bloom-leave-active {
  animation: bloom-in;
}

@keyframes bloom-in {
  0% {
    transform: scale(0.70);
  }

  100% {
    transform: scale(1);
  }
} */
</style>