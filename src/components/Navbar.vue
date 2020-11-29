<template>
  <div class="nav-bar">
      <router-link to="/">
        <button v-bind:class="{ selected: $route.name  == 'main'}" class="button">Home</button>
      </router-link>
      <router-link to="/find">
        <button v-bind:class="{ selected: $route.name  == 'find'}" class="button">Districs</button>
      </router-link>
      <router-link to="/account">
        <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">Account</button>
      </router-link>
  </div>
</template>
<style scoped>
  .selected {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 2px black solid
  }
</style>

<script>
export default {
  name: "NavBar",
  data() {
    return {}
  }
};
</script>

<style scoped>
  .button {
    margin: 8px;
  }

</style>



