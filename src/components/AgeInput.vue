<script setup lang="ts">
import { computed, watch, ref} from 'vue';
import NumericInput from '@/components/NumericInput.vue';

const props = defineProps<{
  name: string
  modelValue: number
  inputId: string
  minAge: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val
  }
)

const minHours = computed(() => props.minAge * 720)

const error = computed(() => {
    if (localValue.value < minHours.value) {
      return 'The entered age is below the minimum'
    }
    return null
})

function updateValue(value: number) {
    localValue.value = value //Check if entered age is higher than min. age
    if (value >= minHours.value) {
      emit('update:modelValue', value) //if it is, update, if not show error
    }
}
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm tracking-wide text-indigo-900
      group-focus-within:text-violet-700"
    >
      {{ name.toUpperCase() }} IS
    </label>

    <div class="flex items-center gap-2">
      <NumericInput
        :model-value="modelValue"
        @update:model-value="updateValue"
        :input-id="inputId"
      />
      <span class="text-indigo-900">hours old</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
