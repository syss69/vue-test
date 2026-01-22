<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  name: string
  modelValue: number
  inputId: string
  minAge: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const error = ref<string | null>(null);

function onInput(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value

  if(!/^\d*$/.test(inputValue)){
    error.value = 'You can write only integers'
    return
  }
  const inputNumber = Number(inputValue)
  if(inputNumber < Math.floor(props.minAge * 720)){
    error.value = 'The entered age is below the minimum'
    return
  }
  error.value = null
  emit('update:modelValue', Number(inputValue))

}
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm font-bold tracking-wide text-gray-700"
    >
      {{ name.toUpperCase() }} IS
    </label>

    <div class="flex items-center gap-2">
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="onInput"
        class="border border-gray-300 rounded px-2 py-1 text-lg outline-none"
        placeholder="0"
      />
      <span class="text-gray-600">hours old</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
