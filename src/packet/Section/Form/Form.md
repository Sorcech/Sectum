# Form component

<br />

Form component is used to quickly create form fields when some information needs to be collected and verified.

## Basic usage

```ts
import Form from "sectionui"
import FormItem from "sectionui"
```
## Basic

```
<template>
  <Form :model="model"></Form>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
interface Model {
  name: string
}
const model = reactive({} as Model)
</script>
```