<template>
  <div class="wrapper">
    <h4>Poster</h4>
    <p>{{post.text}}</p>
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
  }
  .button {
    margin-left: 32px;
  }
</style>

<script>


export default {
  name: "Post",

  props: {
    post: Object,
  },
};
</script>
