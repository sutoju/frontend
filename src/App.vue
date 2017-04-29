<template>
  <div id="app">
    <nav>
      <router-link class="nav-link" :to="'/'">dashboard</router-link>
      <router-link class="nav-link" :to="'/recipies'">recipes</router-link>
      <router-link class="nav-link" :to="'/chart'">statistics</router-link>
    </nav>

    <div class="child">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <toasts></toasts>
    <spinner :animating="loadingSomething"></spinner>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Toasts from './Toasts'
import Spinner from './components/Spinner'
import * as api from './api.js'
import './main.scss'

let socket

export default {
  name: 'app',
  mounted () {
    /*eslint-disable */
    console.log('banana', BANANA_COUNT_LIMIT)
    /*eslint-enable */
    if (socket === undefined) {
      socket = api.getSocket('wss://sutoju-logic.eu-gb.mybluemix.net/ws/feed')

      socket.onopen = msg => {
        console.log(msg)
        console.log(socket)
        this.createToast({text: 'Socket opened'})
      }

      socket.onmessage = (message) => {
        console.log(message)
        if (message.data && JSON.parse(message.data)) {
          const data = JSON.parse(message.data)
          console.log('handle message: ', data)
          if (data.messageType) {
            if (data.messageType === 'food' && data.action) {
              const wording = data.action === 'add' ? 'Added' : data.action === 'remove' ? 'Removed' : data.action
              this.createToast({text: wording + ' ' + data.type, className: 'success'})
              this.editFood({ action: data.action, type: data.type, expires: data.expires })
            } else if (data.messageType === 'weight' && data.weight) {
              const { messageType, ...dataPoint } = data
              this.createToast({text: 'Added datapoint ' + messageType, className: 'success'})
              this.addDataPoint(dataPoint)
            }
          }
        }
      }

      socket.onerror = error => this.createToast({text: 'Socket error: ' + error, className: 'error'})
    }
  },
  components: {
    Toasts,
    Spinner
  },
  computed: {
    ...mapGetters(['loadingSomething'])
  },
  methods: {
    ...mapActions(['addDataPoint', 'createToast', 'editFood', 'loadRecipeList'])
  }
}
</script>

<style scoped lang="scss">
@import './main.scss';
#app {
}

.child {
  @extend .sans-serif;
  flex: 1;
}

.nav-link {
  @extend .source-sans;
  color: $accent;
  padding: $medium;
  margin: $small;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: $radius_small;

  @media (max-width: 767px) {

  }

  &.router-link-exact-active {
    // border-bottom: 1px solid $accent;
    color: white !important;
    background: $accent;
  }

  &:visited {
    text-decoration: none;
    color: $accent;
  }
}

nav {
  padding: $medium;
  border-bottom: 1px solid #dedede;
  box-shadow: 0px 1px 1px 0px rgba(132, 132, 132, 0.2);
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    justify-content: space-around;
  }
}

</style>
