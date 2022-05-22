<template>
  <div class="app">
    <main class="app__main">
      <router-view :key="routePath" />
    </main>
  </div>
</template>

<script>

export default {
  name: 'LayoutTpl',
  data() {
    return {}
  },
  computed: {
    routePath() {
      return this.$route.fullPath
    }
  },
  watch: {
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
    }
  }
}
</script>
