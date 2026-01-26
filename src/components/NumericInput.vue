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

//tailwind:
// const widths = ['w-[72px]','w-[82px]', 'w-[92px]', 'w-[102px]', 'w-[112px]', 'w-[122px]', 'w-[132px]', 'w-[142px]', 'w-[152px]', 'w-[162px]'] 

// const widthClass = computed(() => {
//   const len = displayValue.value.replace(/\s/g, '').length
//   //72px is enough for 6 digits after start counting
//   const step = Math.max(0, len - 6)
//   return widths[Math.min(step, widths.length - 1)]
// })
//second solution: change width every 3 digits
// const widths = ['w-[72px]', 'w-[100px]', 'w-[128px]', 'w-[156px]', 'w-[184px]', 

// const widthClass = computed(() => {
//     const len = displayValue.value.replace(/\s/g, '').length
//     const step = Math.floor(len / 3)
//     return widths[Math.min(step, widths.length - 1)]
// })

/*
so this part of the code is optional, 
it possible to use styles if you don't need to use Tailwind exclusively.
I'm stuck here because Tailwind doesn't accept dynamic w-[${width}px], so I'm using an array.
uncomment and add widthClass to input component
BTW here is style solution:
 */

const baseWidth = 72
const stepPx = 10 

const widthStyle = computed(() => {
  const len = displayValue.value.replace(/\s/g, '').length
  const extra = len > 6 ? (len - 6) * stepPx : 0
  return {
    width: `${baseWidth + extra}px`
  }
})


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
    :style="widthStyle"
    :class="[
      'border border-gray-300 rounded-md px-2 py-1 text-lg outline-none text-gray-300 group-focus-within:text-indigo-900 group-focus-within:border-violet-700',
      'transition-all duration-150',
    ]"
    inputmode="numeric"
  />
</template>