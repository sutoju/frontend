<template>
  <div id="app">
    <nav>
      <router-link class="nav-link" :to="'/'">home</router-link>
      <router-link class="nav-link" :to="'/dashboard'">dashboard</router-link>
      <router-link class="nav-link" :to="'/chart'">charts</router-link>
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
import Toasts from './Toasts'
import * as api from './api.js'
import './main.scss'

let socket

export default {
  name: 'app',
  mounted () {
    if (!socket) {
      socket = api.getSocket('ws://sutoju-logic.eu-gb.mybluemix.net/ws/weights-feed')
      socket.onopen = event => console.log('on open', event)
      socket.onmessage = (message) => {
        if (message.data && JSON.parse(message.data).weight) {
          console.log('should add datapoint: ', JSON.parse(message.data))
        }
      }
    }
  },
  components: {
    Toasts
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
