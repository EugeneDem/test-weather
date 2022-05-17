<template>
  <div class="promo-modal-close-layer" />
</template>

<script>
export default {
  computed: {
    scrollBarWidth() {
      const div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      const scrollWidth = div.offsetWidth - div.clientWidth;
      div.parentNode.removeChild(div);

      return scrollWidth;
    }
  },
  mounted() {
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${this.scrollBarWidth}px`;
    });
  },
  destroyed() {
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
  }
}
</script>

<style lang="scss">
  .promo-modal-close-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
