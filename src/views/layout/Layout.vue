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
    return {
      options: {
      }
    }
  },
  computed: {
    routePath() {
      return this.$route.fullPath
    }
  },
  watch: {
  },
  created() {
  },
  beforeDestroy() {
    this.unwatch()
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
    },
    randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>
