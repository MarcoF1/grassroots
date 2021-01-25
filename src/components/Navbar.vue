<template>
  <div class="nav-bar">
      <router-link to="/">
        <button v-bind:class="{ selected: $route.name  == 'main'}" class="button">Home</button>
      </router-link>
      <router-link to="/governments">
        <button v-bind:class="{ selected: $route.name  == 'governments'}" class="button">Governments</button>
      </router-link>
      <router-link to="/account">
        <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">Account</button>
      </router-link>
  </div>
</template>


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
  .selected {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 2px black solid
  }
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    /* justify-content: flex-end; */
  }

</style>



