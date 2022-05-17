<template>
  <div class="modals">
    <modal-add-city v-if="popup.activePopup === 'addCity'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalAddCity from '@/components/Modals/add-city'

export default {
  name: 'ModalsTpl',
  components: {
    ModalAddCity
  },
  computed: {
    ...mapState(['popup'])
  },
  mounted() {
  },
}
</script>
