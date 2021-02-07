<template>
  <div class="item">
    <p><strong>{{bill.name}}</strong></p>
    <p>Description: {{bill.description}}</p>
    <p>Closing Date: {{bill.closing_date}}</p>
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
  name: "Bill",
  props: {
      bill: Object,
  },
  data() {
    return {}
  }
}
</script>
