<template>
  <div
    :class="[
      'ui-modal',
      modalClasses
    ]"
    aria-modal="true"
    role="dialog"
  >
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="showDialog"
        class="ui-modal__dialog"
      >
        <div class="ui-modal__content">
          <div
            v-if="!hideClose"
            title="Закрыть модальное окно"
            aria-label="Закрыть модальное окно"
            class="ui-modal__close"
            @click="close"
          />
          <div class="ui-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </transition>
    <!-- <backdrop @click="close"/> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Backdrop from './modal-shadow'

export default {
  name: 'ModalLayout',
  props: {
    customClass: {
      type: String,
      default: ''
    },
    modalType: {
      type: String,
      default: ''
    },
    hideClose: {
      type: Boolean,
      default: false
    }
  },
  // components: { Backdrop },
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapState(['popup']),
    modalClasses() {
      return {
        [`${this.customClass}`]: Boolean(this.customClass),
        [`ui-modal--type-${this.modalType}`]: Boolean(this.modalType)
      }
    }
  },
  methods: {
    close() {
      this.$store.dispatch('popup/showPopup', '')
      this.showDialog = false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.showDialog = true
      }, 1)
    })
    window.addEventListener('keyup', e => {
      if (e.code === 'Escape') {
        this.close();
      }
    })
  }
}
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s, transform 0.4s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
