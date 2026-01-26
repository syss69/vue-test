<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    inputId: string
    modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const displayValue = ref(format(props.modelValue))

watch(
    () => props.modelValue,
    (val) => {
        displayValue.value = format(val)
    }
)
//adaptive width

const widths = ['w-[72px]', 'w-[100px]', 'w-[128px]', 'w-[156px]', 'w-[184px]', 'w-[212px]'] 

const widthClass = computed(() => {
    const len = displayValue.value.replace(/\s/g, '').length
    const step = Math.floor(len / 3)
    return widths[Math.min(step, widths.length - 1)]
})

/*
so this part of the code is optional, 
it possible to do by with using style property style, (:style="{ width: inputWidth + 'px' }")
but I decided to keep only the tailwind, 
increasing the width by 28 px every three characters.
i'm blocked here cause tailwind won't accept dynamic w-[${width}px], so i choose array
 */

//preety input utils

function format(value: number | string): string {
    const digits = value.toString().replace(/\D/g, '')
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') //adding spaces to have a 3digits separated output
}

function parseToDigit(value: string): number{
    return Number(value.replace(/\D/g, '')) //now deleting spaces to save value
}

function onInput(event: Event) {
    const raw = (event.target as HTMLInputElement).value
    const numeric = parseToDigit(raw)

    displayValue.value = format(numeric)
    emit('update:modelValue', numeric)
}

function onBeforeInput(e: InputEvent) {
    if (e.inputType === 'insertText' && /\D/.test(e.data ?? '')) {
        e.preventDefault() //abort input if not a digit
    }
}


</script>
<template>
    <input
    :id="inputId"
    type="text"
    :value="displayValue"
    @beforeinput="onBeforeInput"
    @input="onInput"
    :class="[
      'border-1 border-gray-300 rounded-md px-2 py-1 text-lg outline-none text-gray-300 group-focus-within:text-dark group-focus-within:border-2 group-focus-within:border-primary-light',
      'transition-all duration-150',
      widthClass
    ]"
    inputmode="numeric"
  />
</template>