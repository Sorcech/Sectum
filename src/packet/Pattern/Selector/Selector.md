# Selector 产品选型组件

Selector 产品选型组件用于根据产品参数自动生成产品型号代码。基于配置文件驱动，支持灵活配置不同产品的选型规则，表单字段动态生成。

## 特性

- 📋 **动态表单** - 基于配置文件动态生成表单字段
- 🔧 **灵活配置** - 通过配置文件轻松调整字段和选项
- 🔄 **实时计算** - 根据选择自动生成产品型号
- 📋 **复制功能** - 一键复制生成的产品型号
- 🎨 **美观界面** - 基于 UnoCSS，响应式设计
- ⚡ **轻量级** - 简洁的实现，无额外依赖

## 安装

```ts
import { Selector } from "sectum"
// 或者
import Selector from "sectum"
```

## 基础用法

### 最简单的用法

```vue
<template>
  <Selector />
</template>

<script setup lang="ts">
import Selector from "sectum"
</script>
```

### 自定义产品型号配置

```vue
<template>
  <Selector 
    :product-code-config="{
      prefix: 'PR',
      separator: '_',
      typeDefault: '0'
    }"
  />
</template>

<script setup lang="ts">
import Selector from "sectum"
</script>
```

## 配置说明

组件的行为完全由 `Selector.ts` 配置文件驱动。通过修改配置文件，可以轻松适配不同的产品选型需求。

### 表单字段配置

表单字段在 `formFields` 数组中配置，支持两种字段类型：

#### Select 类型（下拉选择）

```typescript
{
  key: 'type1',              // 字段键名，对应 ProductFormData 中的属性
  label: '类型1',             // 字段标签
  type: 'select',            // 字段类型
  options: typeOptions,      // 选项列表
  placeholder: '请选择类型1'  // 占位符
}
```

#### Input 类型（输入框）

```typescript
{
  key: 'parameters',         // 字段键名
  label: '参数',             // 字段标签
  type: 'input',             // 字段类型
  inputType: 'number',       // 输入框类型（number/text）
  placeholder: '请输入参数'  // 占位符
}
```

### 数据结构

表单数据类型定义在 `ProductFormData` 接口中：

```typescript
export interface ProductFormData {
  type1: string            // 类型1
  type2: string            // 类型2
  type3: string            // 类型3
  type4: string            // 类型4
  type5: string            // 类型5
  parameters: string | number  // 参数
}
```

### 产品型号生成规则

默认产品型号格式：`{前缀}{类型1}{分隔符}{类型2}{类型3}{类型4}{类型5}{分隔符}{参数}`

例如：`X-A-B-C-D-123`

#### 计算逻辑

1. **类型1**：使用前缀 + 类型1值（或默认值 `#`）
2. **类型2**：添加分隔符 + 类型2值（或默认值 `#`）
3. **类型3**：紧跟在类型2后面，无分隔符（或默认值 `#`）
4. **类型4**：紧跟在类型3后面，无分隔符（可选）
5. **类型5**：紧跟在类型4后面，无分隔符（可选）
6. **参数**：如果参数有值，添加分隔符 + 参数值

### 产品型号配置

可以通过 `ProductCodeConfig` 接口自定义产品型号生成规则：

```typescript
export interface ProductCodeConfig {
  prefix: string              // 产品型号前缀，默认为 'X'
  typeDefault: string          // 类型默认值，默认为 '#'
  materialDefault: string      // 材质默认值，默认为 '#'
  separator: string            // 分隔符，默认为 '-'
  dimensionSeparator: string   // 尺寸分隔符，默认为 'x'（未使用）
  emptyPatterns: string[]      // 空值模式，用于判断是否为空结果
}
```

## 自定义配置

### 修改表单字段

在 `Selector.ts` 中修改 `formFields` 数组：

```typescript
export const formFields: FormFieldConfig[] = [
  {
    key: 'type1',
    label: '产品类型',
    type: 'select',
    options: [
      { label: '类型A', value: 'A' },
      { label: '类型B', value: 'B' }
    ],
    placeholder: '请选择产品类型'
  },
  // 添加更多字段...
]
```

### 修改选项列表

```typescript
export const typeOptions: SelectOption[] = [
  { label: '产品A', value: 'A' },
  { label: '产品B', value: 'B' },
  { label: '产品C', value: 'C' }
]
```

### 修改默认产品型号配置

```typescript
export const defaultProductCodeConfig: ProductCodeConfig = {
  prefix: 'MY',              // 自定义前缀
  typeDefault: '0',          // 自定义默认值
  separator: '_',            // 自定义分隔符
  emptyPatterns: ['MY0', 'MY0-0']  // 自定义空值模式
}
```

## 示例

### 完整示例

```vue
<template>
  <div class="container">
    <Selector 
      ref="selectorRef"
      :product-code-config="customConfig"
    />
    
    <div class="mt-4">
      <btn @click="getCode">获取产品型号</btn>
      <btn @click="reset">重置表单</btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Selector from "sectum"
import type { ProductCodeConfig } from '~/packet/Pattern/Selector/Selector'

const selectorRef = ref()

const customConfig: Partial<ProductCodeConfig> = {
  prefix: 'CUSTOM',
  separator: '_'
}

// 获取当前产品型号
const getCode = () => {
  if (selectorRef.value) {
    console.log('产品型号:', selectorRef.value.productCode)
    console.log('表单数据:', selectorRef.value.formData)
  }
}

// 重置表单
const reset = () => {
  if (selectorRef.value) {
    selectorRef.value.handleReset()
  }
}
</script>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| productCodeConfig | `Partial<ProductCodeConfig>` | - | 自定义产品型号配置，会与默认配置合并 |

### Events

暂无自定义事件。

### Methods

通过 ref 可以访问以下方法：

- `handleReset()` - 重置表单到初始状态
- `handleCopy()` - 复制产品型号到剪贴板

### Exposed Properties

通过 ref 可以访问以下属性：

- `formData` - 当前表单数据（`ProductFormData` 类型）
- `productCode` - 计算后的产品型号（computed，字符串类型）

## 配置驱动架构

组件的核心特点是**配置驱动**，所有表单字段和选项都通过 `Selector.ts` 配置文件管理：

### 优势

1. **灵活性**：通过修改配置文件即可适配不同产品
2. **可维护性**：配置集中管理，易于维护
3. **可扩展性**：轻松添加或删除字段
4. **类型安全**：TypeScript 类型定义保证配置正确性

### 配置文件结构

```
Selector.ts
├── SelectOption              // 选项接口
├── ProductFormData          // 表单数据类型
├── FormFieldConfig          // 字段配置接口
├── ProductCodeConfig        // 产品型号配置接口
├── formFields               // 表单字段配置数组
├── defaultProductCodeConfig // 默认产品型号配置
└── calculateProductCode     // 产品型号计算函数
```

## 注意事项

1. **配置修改**：修改 `Selector.ts` 后需要重启开发服务器
2. **字段键名**：`formFields` 中的 `key` 必须与 `ProductFormData` 接口中的属性名一致
3. **空值处理**：如果产品型号计算结果为空（匹配 `emptyPatterns`），将显示为空字符串
4. **复制功能**：需要浏览器支持 Clipboard API，否则会使用降级方案
5. **数值输入**：`input` 类型的数字字段会自动转换为 `number` 类型
6. **动态生成**：表单字段根据 `formFields` 数组自动生成，顺序与数组顺序一致

## 扩展建议

### 添加新字段类型

如果需要添加新的字段类型（如日期选择器、多选框等），需要：

1. 在 `FormFieldConfig` 接口中添加新的类型
2. 在 `Selector.vue` 中添加对应的渲染逻辑
3. 更新 `formFields` 配置

### 自定义计算规则

如果需要更复杂的产品型号计算规则，可以：

1. 修改 `calculateProductCode` 函数
2. 扩展 `ProductCodeConfig` 接口添加新的配置项
3. 在组件中使用自定义配置
