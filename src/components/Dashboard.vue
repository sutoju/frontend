<template>
  <div class="title-first">Dashboard</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'dashboard',
  methods: {
    ...mapActions(['createToast'])
  }
}
</script>

<style land="scss">


</style>
