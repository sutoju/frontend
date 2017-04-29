<template>
  <div>
    <div class="title-first">
      Dashboard
    </div>
  
    <div class="container fluid">
      <div class="container-header">
        <div class="container-title">Current food stock</div>
        <button 
          v-bind:class="{
            'text-button': !editMode,
            'text-button highlighted': editMode
            }"
          @click="setEditMode(!editMode)"
        >
          {{ editMode ? 'Done' : 'Edit' }}
        </button>
      </div>

      <div class="food-list">
        <card class="fruit"
          v-for="food in foodData"
          :title="food.type">
          <div v-bind:class="{
          '': !editMode,
          'blurred': editMode
          }">
            <div class="emoji fruit-picture">
            {{ formatEmoji(food.type) }}
            </div>
            <div class="fruit-info">
              <p>added: {{ formatTime(food.added) }}</p>
              <p>expires: {{ formatTime(food.expires) }}</p>
            </div>
          </div>
          <div v-if="editMode" class="fruit-edit">
            <div class="actions">
              <button><icon name="plus" scale="2"></icon></button>
              <button><icon name="minus" scale="2"></icon></button>
            </div>
          </div>
        </card>
      </div>
    </div>
  
  </div>
</template>

<script>
import Vue from 'vue'
import VueEmoji from 'vue-emojione'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/minus'

import Card from './Card'

Vue.use(VueEmoji, {
  imageType: 'svg',
  sprites: true
})

export default {
  name: 'dashboard',
  components: {
    Card
  },
  mounted() {
    console.log('mounted')
    this.loadFoodData()
  },
  data() {
    return {
      toastInput: 'qweqw',
      editMode: false
    }
  },
  computed: {
    ...mapGetters(['foodData'])
  },
  methods: {
    formatTime(timestamp) {
      return moment().milliseconds(timestamp).format('DD/MM/YYYY')
    },
    formatEmoji(type) {
      switch (type) {
        case 'banana':
          return '🍌'
        case 'cucumber':
          return '🥒'
        case 'apple':
          return '🍎'
      }
    },
    setEditMode(bool) {
      this.editMode = bool
    },
    ...mapActions(['createToast', 'loadFoodData'])
  }
}
</script>

<style lang="scss">
@import '../main.scss';

.food-list {
  display: flex;
  flex-wrap: wrap;
}

.fruit {
  position: relative;
  min-width: 200px;
  // max-width: 200px;
  // max-height: 200px;
  min-height: 200px;
  text-align: center;
  overflow: hidden;

  &.editing {
    filter: blur(2px);
  }
}

.blurred {
  filter: blur(6px);
}

.fruit-image {}

.fruit-edit {
  position: absolute;
  background-color: transparentize(black, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  filter: none;
  transition: all 1s;

  .actions {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    transition: all 1s;

    button {
      flex: 1;
      background: transparent;
      border: none;
      color: white;

      &:active {
        background: transparentize(white, 0.5);
      }
    }
  }
}

.emoji {
  font-size: 60pt;
}
</style>
