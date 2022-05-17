<template>
  <section class="app__main">
    <div class="section section_check">
      <div class="section__container">
        <h1 class="section__title section__title_page">Ошибка 404</h1>
        <div class="section__subtitle">Страница не&nbsp;найдена</div>
        <div class="section__action">
          <div class="section__action-item">
            <router-link :to="'/'" class="btn btn_gold">Вернуться на&nbsp;главную</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'NotFound',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
  @import "~@/styles/_variables.scss";

  .section {
    position: relative;

    &__container {
      max-width: 1212px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      z-index: 1;

      @media #{$laptop} {
        padding-left: 48px;
        padding-right: 48px;
      }

      @media #{$phone} {
        padding-left: 32px;
        padding-right: 32px;
      }
    }

    &__title {
      color: #907760;
      font-size: 60px;
      line-height: 66px;
      font-family: "cb";
      text-align: center;
      letter-spacing: 0.4px;
      text-transform: uppercase;

      @media (min-width: 1024px) and (max-width: 1279px) {
        font-size: calc(22px + (24 - 22) * ((100vw - 1024px) / (1279 - 1024)));
        line-height: calc(24px + (26 - 24) * ((100vw - 1024px) / (1279 - 1024)));
      }

      @media #{$tablet} {
        font-size: 36px;
        line-height: 38px;
        margin-top: 45px;
        margin-bottom: 53px;
      }

      @media #{$phone} {
        font-size: 26px;
        line-height: 28px;
        margin-top: 24px;
        margin-bottom: 34px;
      }
    }

    &__subtitle {
      font-size: 24px;
      line-height: 26px;
      text-align: center;
      letter-spacing: 0.4px;
      margin-bottom: 16px;
      color: #e4e4e4;
    }

    &__action {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__action-item {
      flex-grow: 1;
      padding-top: 20px;

      .btn {
        width: 100%;
      }
    }
  }

  .section_check {
    padding-top: 132px;

    @media #{$phone} {
      padding-top: 40px;
    }

    .section {
      &__title {
        margin-top: 0;
        margin-bottom: 21px;
        letter-spacing: 1.4px;
      }
    }
  }
</style>
