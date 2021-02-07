<template>
  <div>
    <div v-if="isRep">
        <p>You are a representative add a bill!</p>
        <form id="add-bill" class='component' v-on:submit.prevent="addBill" method="post">
        <div class="stack">
            <input id='billName' v-model.trim='billName' type='text' name='billName' placeholder="Bill Name">
            <input id='billDescription' v-model.trim='billDescription' type='text' name='billDescription' placeholder="Bill Description">
            <input id='billClosingDate' v-model.trim='billClosingDate' type='text' name='billClosingDate' placeholder="Closing Date">
        </div>
        <input type='submit' value='Add' class="button">
        </form>
    </div>
    <div v-if="government.bills == 0">No Bills yet!</div>
    <div v-for="bill in government.bills" v-bind:key="bill">
        <Bill v-bind:bill="bill"/>
    </div>
  </div>
</template>
<style scoped>
    .stack {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
<script>
import Bill from "../components/Bill.vue";

export default {
  name: "Bills",
  props: {
      government: Object,
      isMember: Boolean,
      isRep: Boolean
  },
  data() {
    return {}
  },
  components: {
      Bill
      },
}
</script>
