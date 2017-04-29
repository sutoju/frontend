<template>
  <div class="toast-container">
    <div 
      class="container toast" 
      v-for="toast in getVisibleToasts"
      v-bind:class="toast.className"
    >
      {{toast.text}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'toasts',
  computed: {
    ...mapGetters(['getVisibleToasts'])
  }
}

</script>

<style scoped lang="scss">
@import './main.scss';

.toast-container {
  position: fixed;
  bottom: 2 * $large;
  left: 2 * $large;
  pointer-events: none;

  @media (max-width: 767px) {
    top: $large * 4;
    left: $medium;
    right: $medium;
  }
}

.toast {
  @extend .source-sans;
  border-radius: $radius_small;
  color: #cacaca;
  padding: $medium $large;
  background-color: #474747;
  border: 1px solid darken(#474747, 4);
  text-transform: capitalize;
  text-align: center;

  &.default {
  }

  &.success {
    color: #494949;
    background-color: #70dd97;
    border: 1px solid darken(#54dc88, 4);
  }

  &.error {
    color: #494949;
    background-color: #ea6a76;
    border: 1px solid darken(#ea6a76, 4);
  }
}

</style>
