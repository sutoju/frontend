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
        >
          <div v-bind:class="{
          '': !editMode,
          'blurred': editMode
          }">
            <div class="fruit-title">{{ food.type }}</div>
            <div v-if="useEmojis" class="emoji fruit-picture">
              {{ formatEmoji(food.type) }}
            </div>
            <div v-if="!useEmojis"
              class="fruit-picture"
              v-bind:style="{ 'background-image': 'url(' + getPictureURL(food.type) + ')' }"
            >
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

import apple from '../assets/apple.png'
import banana from '../assets/banana.png'
import cucumber from '../assets/cucumber.png'
import orange from '../assets/orange.png'
import plate from '../assets/plate.png'

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
    /*eslint-disable */
    console.log(BANANA_TOGGLE)
    return {
      toastInput: 'qweqw',
      editMode: false,
      useEmojis: !!BANANA_TOGGLE || false
      /*eslint-enable */
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
    getPictureURL(type) {
      switch (type) {
        case 'banana':
          return banana
        case 'cucumber':
          return cucumber
        case 'apple':
          return apple
        case 'orange':
          return orange
        case 'ananas':
          return plate
        default:
          return plate
      }
    },
    setEditMode(bool) {
      this.editMode = bool
    },
    isEditingFood(food) {
      console.log(food)
    },
    editFoodItem(type, action) {
      /*eslint-disable */
      if (!!BANANA_COUNT_LIMIT && BANANA_COUNT_LIMIT !== undefined && BANANA_COUNT_LIMIT !== 'undefined') {
      /*eslint-enable */
        console.log('yes banana')
        console.log(type, action)
        this.$store.dispatch('postFood', { action, type })
      } else {
        console.log('no banana')
        this.$store.dispatch('editFood', { action, type })
      }
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
  width: 220px;
  height: 220px;
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
    height: 100px;
    width: 100px;

    .fruit-title {
      margin-top: 10px;
      font-size: 12pt;
    }

    .emoji {
      font-size: 36pt;
    }

    .fruit-info {
      font-size: 10pt;
    }
  }

  &.editing {
    filter: blur(2px);
  }
}

.blurred {
  filter: blur(6px);
}

.fruit-container {
  // position: relative;
}

.fruit-picture {
  height: 80px;
  padding: $large;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;

  @media (max-width: 767px) {
    height: 46px;
    padding: 0;
    margin-top: -4px;
    margin-bottom: 4px;
    background-size: 45%;
  }
}

.fruit-count {
  border-radius: 13px;
  background: $accent;
  color: white;
  padding: 3px 10px;
  font-size: 13pt;

  @media (max-width: 767px) {
    font-size: 10pt;
  }
}

.fruit-title {
  color: $black;
  font-size: 18pt;
  text-transform: capitalize;
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
      margin-top: 0px;
      font-size: 18pt;
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
