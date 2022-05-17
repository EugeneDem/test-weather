<template>
  <modal-layout
    :modal-type="'confirm'"
    :custom-class="'confirm-modal'"
    :hide-close="true"
  >
    <form class="confirm-modal__wrap" @submit.prevent="formSubmit">
      <div class="confirm-modal__header">
        <h4 class="confirm-modal__title">Choose a city</h4>
        <p class="confirm-modal__subtitle">To find city start typing and pick one from the suggestions</p>
      </div>
      <div class="confirm-modal__content">
        <div class="confirm-modal__control">
          <UiInput
            id="city"
            :error-text="errors.city"
            :value="getCity"
            :is-error="formError"
            name="city"
            type="text"
            placeholder="Search city"
            is-required
            @emitValue="setCityInp"
          />
        </div>
      </div>
      <div class="confirm-modal__action">
        <div class="confirm-modal__action-item">
          <div
            :class="[
              'confirm-modal__btn',
              { 'disabled': formError || cityInp === '' }
            ]"
            @click="clearFrom"
          >Clear</div>
        </div>
        <div class="confirm-modal__action-item">
          <div class="confirm-modal__btn" @click="closeModal">Cancel</div>
          <button
            :disabled="formError || cityInp === ''"
            aria-label="Send form"
            type="submit"
            class="confirm-modal__btn"
          >Add</button>
        </div>
      </div>
    </form>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/components/layouts/modal-layout'
import UiInput from '@/components/UiInput/UiInput'
import { minLength, alpha } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  components: {
    ModalLayout,
    UiInput
  },
  data() {
    return {
      cityInp: '',
      errors: {},
      formError: false
    }
  },
  validations: {
    cityInp: {
      minLength: minLength(4),
      alpha
    }
  },
  computed: {
    ...mapState(['listCity']),
    getCity() {
      return this.cityInp
    }
  },
  methods: {
    closeModal() {
      this.cityInp = ''
      this.$store.dispatch('popup/showPopup', '')
    },
    setCityInp(val) {
      this.cityInp = val
      this.errors = {}
      this.formError = false
    },
    clearFrom() {
      this.cityInp = ''
      this.errors = {}
      this.formError = false
    },
    async formSubmit() {
      this.$v.cityInp.$touch()
      if (this.formError) return
      this.errors = {}
      this.errors.city = (!this.$v.cityInp.minLength) ? `City is required must have at least ${this.$v.cityInp.$params.minLength.min} letters` : (!this.$v.cityInp.alpha) ? 'City is only alphabet characters' : ''

      if (this.$v.$invalid) return

      if (!this.$v.$invalid && !this.formError) {

        const requestParams = {
          method: 'get',
          params: '&q=' + this.cityInp
        }
        const response = await this.$Request.send(requestParams)
        if (response.status === 200) {
          let searchName = false
          for (const [i, v] of this.listCity.entries()) {
            if (v.name === response.data.name) {
              this.listCity.splice(i, 1, response.data)
              searchName = true
              break
            }
          }
          if (!searchName) {
            this.listCity.push(response.data)
          }
          this.closeModal()
        } else {
          this.errors.city = response.response.data.message
          this.formError = true
          console.log('err= ', response.message)
        }
      }
    }
  },
}
</script>
