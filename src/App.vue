<template>
  <div id="app">
    <nav>
      <router-link class="nav-link" :to="'/'">dashboard</router-link>
      <router-link class="nav-link" :to="'/chart'">charts</router-link>
      <router-link class="nav-link" :to="'/recipies'">recipies</router-link>
    </nav>
  
    <div class="child container fluid">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <toasts></toasts>
  
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Toasts from './Toasts'
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
      socket = api.getSocket('ws://sutoju-logic.eu-gb.mybluemix.net/ws/feed')

      socket.onopen = msg => {
        console.log(msg)
        console.log(socket)
        this.createToast('Socket opened')
      }

      socket.onmessage = (message) => {
        console.log(message)
        if (message.data && JSON.parse(message.data)) {
          const data = JSON.parse(message.data)
          console.log('handle message: ', data)
          if (data.messageType) {
            if (data.messageType === 'food' && data.action) {
              this.createToast(data.action + 'ed one ' + data.type)
              this.editFood({ action: data.action, type: data.type, expires: data.expires })
            } else if (data.messageType === 'weight' && data.weight) {
              const { messageType, ...dataPoint } = data
              this.createToast('Added datapoint ' + messageType)
              this.addDataPoint(dataPoint)
            }
          }
        }
      }

      socket.onerror = error => this.createToast('Socket error: ' + error)
    }
  },
  components: {
    Toasts
  },
  methods: {
    ...mapActions(['addDataPoint', 'createToast', 'editFood'])
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
