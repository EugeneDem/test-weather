<template>
  <div id="app" class="root">
    <router-view/>
    <Modals />
  </div>
</template>

<script>
import Modals from '@/components/Modals/index'

export default {
  name: 'App',
  components: {
    Modals
  },
  watch: {
    state: {
      handler() {this.$store.dispatch('localStorageApp/saveToLocalStorage')},
      deep: true
    }
  },
  computed: {
    state() {
      return this.$store.state
    }
  }
}
</script>
