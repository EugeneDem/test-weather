<template>
  <div
    :class="uiInputClasses"
    class="ui-input"
  >
    <input
      ref="inputControl"
      :value="value"
      v-bind="$attrs"
      class="ui-input__control"
      v-on="$listeners"
      @input="emitValue"
      @change="emitEl"
    >
    <div
      v-if="errorText || localErrorText"
      class="ui-input__error"
      v-html="errorText || localErrorText"
    />
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    errorText: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const filledFlag = (this.value !== '')

    return {
      tempVal: null,
      localIsError: false,
      localErrorText: '',
      isFilled: filledFlag
    }
  },
  computed: {
    uiInputClasses() {
      return {
        [`ui-input_is-error`]: this.isError || this.errorText || this.localIsError || this.localErrorText,
        [`ui-input_is-required`]: this.isRequired,
        [`ui-input_is-filled`]: this.isFilled
      }
    }
  },
  watch: {
    value() {
      this.isFilled = (this.value !== '')
    }
  },
  mounted() {
  },
  methods: {
    emitValue(event) {
      const target = event.target
      let value = target.value

      this.isFilled = (target.value !== '')

      this.$emit('emitValue', value)
    },
    emitEl(event) {
      this.$emit('emitEl', event.target)
    }
  }
}
</script>
