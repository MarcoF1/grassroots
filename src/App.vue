<template>
  <div id="app">
    <!-- Set name or it defaults to '/' in router.js -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  beforeCreate: function() {
  }
};
</script>

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.success-message {
  color: green;
  margin: auto;
}

.error-message {
  color: red;
  margin: auto;
}

.button {
  max-height: 3em;
  font-size: 1.1em;
  letter-spacing: .2em;
  text-transform: uppercase;
  border-radius: 5px 5px 5px 5px;
	background: rgb(0, 0, 0);
	padding: 0.35em 0.75em;
  color: rgb(255, 255, 255);
  border: none;
  display: inline-block;
  cursor: pointer;
}

.input {
  margin: 32px
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.form-container input {
  font-size: 1.2em;
}

.center {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
}

.center-row {
    display: flex;
    align-items: center;
    justify-items: center;
}

</style>