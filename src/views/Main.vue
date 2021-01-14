<template>
  <div>
    <Navbar/>
    <center>
    <h1>Grassroots</h1>
    <p>Informed public, increased voter participation, better democracy</p>

    <br/>

    <p>We are working on a platform to help educate people on their</p>
    <p>local politics and to help them find information that affects their</p>
    <p>local communities to increase voter participation</p>

    <br/>

    <p>Let us know about your relationship with politics to improve our product!</p>    
    <a href="https://forms.gle/r1bcfqU9ZH3a28sv9" target="_blank">
      <button class="button">
      Form
      </button> 
    </a>
    {{'  '}}
    <router-link to="/team">
        <button v-bind:class="{ selected: $route.name  == 'team'}" class="button">Team</button>
    </router-link>
    

    </center>
    
    
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Main",
  components: {
    Navbar
  }
};
</script>
