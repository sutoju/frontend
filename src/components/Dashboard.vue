<template>
  <div class="container fluid">
    <div class="title-first">Dashboard</div>
  
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

      <div class="filter-header">
        <div class="input-inline">
          <span class="input-label">input</span>
          <input />
        </div>
      </div>

      <div class="food-list container fluid">
        <card class="fruit"
          v-for="food in foodData"
          :title="food.type"
        >
          <div v-bind:class="{
          '': !editMode,
          'blurred': editMode
          }">
            <div class="emoji fruit-picture">
            {{ formatEmoji(food.type) }}
            </div>
            <div class="fruit-info">
              <span>{{ 'x' + food.count }}</span>
              <p>expires {{ formatDuration(food.expires) }}</p>
            </div>
          </div>
          <div v-if="editMode" class="fruit-edit">
            <div class="actions-count">
              {{ food.count }}
              {{ isEditingFood(food) }}
              <icon v-if="food.editing" class="action-spinner" name="circle-o-notch" scale="2" spin></icon>
            </div>
            <div class="actions">
              <button class="button" @click="editFoodItem(food.type, 'add')"><icon name="plus" scale="2"></icon></button>
              <button class="button" @click="editFoodItem(food.type, 'remove')"><icon name="minus" scale="2"></icon></button>
            </div>
          </div>
        </card>
      </div>
    </div>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/minus'
import 'vue-awesome/icons/calendar'
import 'vue-awesome/icons/circle-o-notch'

import Card from './Card'

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
    formatDuration(timestamp) {
      return moment().milliseconds(timestamp).fromNow()
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
    isEditingFood(food) {
      console.log(food)
    },
    editFoodItem(type, action) {
      console.log(type, action)
      this.$store.dispatch('editItem', { action, type })
        .then(success => {

        })
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
  min-height: 200px;
  text-align: center;
  overflow: hidden;
  background-color: white;

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
  color: white;
  display: flex;
  flex-direction: column;

  .actions-count {
    flex: 1;
    text-align: center;
    font-size: 40pt;
    display: flex;
    background: transparentize($accent, 0.1);
    justify-content: center;
    align-items: center;
  }

  .action-spinner {
    margin-left: $medium;
  }

  .actions {
    flex: 1;
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
