<template>
  <div>
    <span v-if="showCode">
      <icn name="copy" solid></icn>
    </span>
    <Transition name="slide-fade">
      <pre class="language-html" v-if="showCode" v-highlight>
        <code class="language-html">{{ sourceCode }}</code>
      </pre>
    </Transition>
    <div @click="showOrHideCode">
      <span>{{ showCode ? "隐藏代码" : "显示代码" }}</span>
      <icn name="code" solid></icn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  className: { type: String, default: "", require: true },
  compName: { type: String, default: "", require: true },
  demoName: { type: String, default: "", require: true }
})
const showCode = ref(false)
const showOrHideCode = () => {
  showCode.value = !showCode.value
}
const sourceCode = ref("")
async function getSourceCode() {
  sourceCode.value = (
    await import(`/packet/${props.className}/${props.compName}/${props.demoName}.vue?raw`)
  ).default
}
onMounted(() => {
  getSourceCode();
})
console.log(sourceCode);

</script>