<template>
  <div class="workarea">
    <h1 class="workarea__title">World Weather</h1>
    <div class="workarea__content">
      <div class="widget-list">
        <p class="widget-list__title">Watch weather in your current location</p>
        <div class="widget-list__row widget-list__row_single">
          <div class="widget-list__item">
            <weather-card :data-list="currentCity" :data-type="'single'" :key="keyCode" />
          </div>
        </div>
      </div>
      <div class="widget-list">
        <div
          :class="[
            'widget-list__row',
            { 'widget-list__row_scroll' : listCity.length > 3 }
            ]"
          >
          <div v-for="(item, index) in listCity" :key="index" class="widget-list__item">
            <weather-card :data-list="item" :key="keyCodeList" :data-type="'list'" />
          </div>
        </div>
        <div class="widget-list__btn-add" @click="addCity('addCity')" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WeatherCard from '@/components/WidgetCard'

export default {
  name: 'HomeTpl',
  components: {
    WeatherCard
  },
  data() {
    return {
      keyCode: 0,
      keyCodeList: 0,
      currentCityDefault: { name: 'Moscow' },
      listCityDefault: [{ name: 'Penza' }, { name: 'Perm' }, { name: 'Novosibirsk' }, { name: 'Kazan' }]
    }
  },
  computed: {
    ...mapState(['currentCity', 'listCity'])
  },
  watch: {
    listCity() {
      this.keyCodeList++
    }
  },
  mounted() {
    this.fetchData()
  },
  destroyed() {
  },
  methods: {
    fetchData() {
      (Object.keys(this.currentCity).length) ?
        this.getCurrentCity(this.currentCityDefault) :
        this.getCurrentCity(this.currentCity);
      (this.listCity.length) ?
        this.getListCity(this.listCity) :
        this.getListCity(this.listCityDefault);
    },
    addCity(popupType) {
      this.$store.dispatch('popup/showPopup', popupType)
    },
    async getCurrentCity(item) {
      const requestParams = {
        method: 'get',
        params: '&q=' + item.name
      }
      const response = await this.$Request.send(requestParams)
      if (response.status === 200) {
        const currentCity = response.data
        currentCity.lastUpdate = new Date()
        this.keyCode++
        this.$store.dispatch('setCurrentCity', currentCity)
      } else {
        console.log('err')
      }
    },
    async getListCity(arr) {
      const cityListArr = []
      const load = async(item) => {
        const requestParams = {
          method: 'get',
          params: '&q=' + item.name
        }
        const response = await this.$Request.send(requestParams)
        if (response.status === 200) {
          const currentCity = response.data
          currentCity.lastUpdate = new Date()
          cityListArr.push(currentCity)
        } else {
          console.log('err')
        }
      }
      arr.map(item => {
        load(item)
      })
      this.$store.dispatch('setListCity', cityListArr)
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/_variables.scss";
</style>
