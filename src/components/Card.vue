<template>
  <div class="container rounded card box">
    <div class="title">{{ title }}</div>
    <div class="separator"></div>
    <div class="content">
      <slot>
        <p>Empty card content</p>
        <button class="button fluid">button</button>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'card'
}

</script>

<style scoped lang="scss">
@import '../main.scss';
.card {
  max-width: 400px;
  border-radius: 14px;
}

.title {
  font-size: 16pt;
  margin-bottom: $small;
  text-transform: capitalize;
}

.content {
  margin-top: $medium;
}
</style>
