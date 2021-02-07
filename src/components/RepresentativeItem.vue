<template>
  <div class="item">
    <div v-if="rep.user_id == user_id">
      <p>This is you!</p>
    </div>
    <p><strong>{{rep.username}}</strong></p>
    <p>Description: {{rep.description}}</p>
  </div>
</template>

<style scoped>
    .item {
        padding: 32px;
        border-radius: 32px;
        box-shadow: 0px 0px 12px 6px #ddd;
        margin-bottom: 16px;
        width: 600px;
    }
</style>

<script>

export default {
  name: "RepresentativeItem",
  props: {
      rep: Object,
  },
  data() {
    return {
      user_id: this.$cookie.get('auth-id')
    }
  }
}
</script>
