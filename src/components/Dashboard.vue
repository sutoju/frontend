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

      <div class="food-list">
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
              <span class="fruit-count">{{ 'x' + food.count }}</span>
              <p>expires {{ formatDuration(food.expires) }}</p>
            </div>
          </div>
          <div v-if="editMode" class="fruit-edit">
            <div class="actions-count">
              <div class="actions-type">{{ food.type }}</div>
              <div>{{ food.count }}</div>
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
        case 'orange':
          return '🍊'
        case 'ananas':
          return '🍍'
        default:
          return '🍽️'
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
      this.$store.dispatch('postFood', { action, type })
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
  margin-top: $medium;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
}

.fruit {
  position: relative;
  min-width: 220px;
  text-align: center;
  overflow: hidden;
  background-color: white;
  border: 1px solid #dedede;
  box-shadow: 0px 1px 1px 0px rgba(132, 132, 132, 0.2);
  font-size: 1rem;
  margin: 0 $medium $medium 0;
  @extend .source-sans;
  color: #404040;

  @media (max-width: 767px) {
    font-size: 0.8rem;
    flex: 1 1 auto;
    min-width: 30%;

    .emoji {
      font-size: 30pt;
    }
  }

  &.editing {
    filter: blur(2px);
  }
}

.blurred {
  filter: blur(6px);
}

.fruit-image {}

.fruit-count {
  border-radius: 13px;
  background: $accent;
  color: white;
  padding: 3px 10px;
  font-size: 13pt;
}

.fruit-name {
  color: $black;
  font-size: 18pt;
}

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
    flex-direction: column;
    background: transparentize($accent, 0.1);
    justify-content: center;
    align-items: center;

    .actions-type {
      font-size: 16pt;
      text-transform: capitalize;

      @media (max-width: 767px) {
        display: none;
      }
    }
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
