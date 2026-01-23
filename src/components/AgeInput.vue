<script setup lang="ts">
import { computed, ref } from 'vue';
import NumericInput from './NumericInput.vue';

const props = defineProps<{
  name: string
  modelValue: number
  inputId: string
  minAge: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const error = ref<string | null>(null)

const valueProxy = computed({
    get: () => props.modelValue,
    set: (val: number) => {
        const minHours = props.minAge * 720
        if (val < minHours){
            error.value = 'the enteerd age is bbellow the minimum'
            return
        }
        error.value =null
        emit('update:modelValue', val)
    }
})
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm font-bold tracking-wide text-indigo-950
      group-focus-within:text-violet-700"
    >
      {{ name.toUpperCase() }} IS
    </label>

    <div class="flex items-center gap-2">
      <NumericInput v-model="valueProxy" :inputId="inputId"/>
      <span class="text-indigo-950">hours old</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
