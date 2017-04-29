<template>
  <div class="rounded card">
    <div class="title">{{ title }}</div>
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
  border-radius: 10px;
  padding: $medium;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 16pt;
  text-transform: capitalize;
}

.content {
}
</style>
