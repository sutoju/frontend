<template>
  <div id="app">
    <nav>
      <router-link class="button" :to="'/'">home</router-link>
      <router-link class="button" :to="'/dashboard'">dashboard</router-link>
      <router-link class="button" :to="'/chart'">charts</router-link>
    </nav>
  
    <div class="child container fluid">
      <router-view></router-view>
    </div>

    <toasts></toasts>
  
  </div>
</template>

<script>
import Toasts from './Toasts'
import './main.scss'

export default {
  name: 'app',
  components: {
    Toasts
  }
}
</script>

<style scoped lang="scss">
@import './main.scss';
#app {
  border: 20px solid yellow;
}

.child {
  @extend .sans-serif;
  flex: 1;
}

nav {
  padding: $medium;
  border-bottom: 1px solid $dark_grey;
}

</style>
