<template>
  <div v-if="getListCity" class="weather-card">
    <div class="weather-card__panel">
      <h4 class="weather-card__title">{{ getList.name }}, {{ getList.sys.country }}</h4>
      <p class="weather-card__location">{{ getName(getList.sys.country) }}</p>
      <div class="weather-card__content">
        <div class="weather-card__values-list">
          <div class="weather-card__values">
            <div class="weather-card__values-label">Weather</div>
            <div class="weather-card__values-input">{{ getList.weather[0].main }}</div>
          </div>
          <div class="weather-card__values">
            <div class="weather-card__values-label">Temperature</div>
            <div class="weather-card__values-input">{{ getTemperature(getList.main.temp) }} °C</div>
          </div>
          <div class="weather-card__values">
            <div class="weather-card__values-label">Humidity</div>
            <div class="weather-card__values-input">{{ getList.main.humidity }} %</div>
          </div>
        </div>
        <div class="weather-card__label-updated">{{ timer.value }}</div>
      </div>
      <div class="weather-card__actions">
        <div class="weather-card__btn" @click="loadData(getList.name)">Reload</div>
        <div v-if="dataType === 'list'" class="weather-card__btn" @click="removeItem(getList.id)">Remove</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'WidgetCard',
  props: {
    dataList: {
      type: Object,
      default() {
        return {}
      }
    },
    dataType: {
      type: String,
      default: 'single'
    }
  },
  data() {
    return {
      getList: {},
      timer: {
        value: 0,
        interval: null
      },
    }
  },
  computed: {
    ...mapState(['currentCity', 'listCity']),
    getListCity() {
      return this.getList !== null && Object.keys(this.getList).length !== 0
    }
  },
  mounted() {
    this.getList = this.dataList
    if (this.getList?.lastUpdate) {
      this.setTimer(this.dataList.lastUpdate)
    }
  },
  methods: {
    getName(name) {
      const regionNames = new Intl.DisplayNames(
        [name], {type: 'region'}
      )
      return (this.dataType === 'single') ? 'Your current location' : regionNames.of(name)
    },
    getTemperature(count) {
      return Math.ceil(count)
    },
    async loadData(name) {
      const requestParams = {
        method: 'get',
        params: '&q=' + name
      }
      const response = await this.$Request.send(requestParams)
      if (response.status === 200) {
        this.getList = response.data
        this.getList.lastUpdate = new Date()
        if (this.dataType === 'single') {
          this.$store.dispatch('setCurrentCity', this.getList)
          this.setTimer(this.getList.lastUpdate)
        }
        if (this.dataType === 'list') {
          for (const [i, v] of this.listCity.entries()) {
            this.setTimer(this.listCity[i].lastUpdate)
            if (v.name === name) {
              this.listCity.splice(i, 1, this.getList)
              this.$store.dispatch('setListCity', this.listCity)
              this.setTimer(this.getList.lastUpdate)
              break
            }
          }
        }
      } else {
        console.log('err')
      }
    },
    removeItem(id) {
      for (const [i, v] of this.listCity.entries()) {
        if (v.id === id) {
          this.listCity.splice(i, 1)
          break
        }
      }
      this.$store.dispatch('setListCity', this.listCity)
    },
    setTimer(val) {
      this.clearTimer()

      const timer = setInterval(() => {
        const minutes = moment(val).fromNow()

        this.timer.value = minutes
      }, 1000)

      this.timer.interval = timer
    },
    clearTimer() {
      clearInterval(this.timer.interval)
      this.timer.value = 0
    }
  }
}
</script>
