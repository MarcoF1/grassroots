<template>
  <div>
    <Navbar/>
    <center>
    <h1>Team</h1>
    <p><a href="https://www.linkedin.com/in/moisestrejo/" target="_blank">Moises Trejo</a>, <a href="https://www.linkedin.com/in/jason-ramirez-17b3aa154/" target="_blank">Jason Ramirez</a>, <a href="https://www.linkedin.com/in/marcofleming/" target="_blank">Marco Fleming</a></p>
    
    
    
    <br/>
    <p>We are three underepresented minorities studying at MIT who are<p>
    <p>passionate about education and government participation.</p>
    <p>We are interested in using technology to bridge the gap between
    <p>representatives and the public.</p>
    </center>
    
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Team",
  components: {
    Navbar
  }
};
</script>
