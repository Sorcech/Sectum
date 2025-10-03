import type { RuleItem } from 'async-validator'
import { ExtractPropTypes, PropType } from 'vue'

export type Arrayable<T> = T | T[]

export interface FormItemRule extends RuleItem {
  tigger?: Arrayable<string>
}
export const formItemValidateState = ['success', 'error', ''] as const
export type FormItemValidateState = typeof formItemValidateState[number]

export const formItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: { type: Boolean, default: true }
} as const

export type FormItem = Partial<ExtractPropTypes<typeof formItemProps>>