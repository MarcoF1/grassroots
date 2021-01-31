<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
        </div>
      </div>
    
      <div class="overview">
        <Tabs :mode="mode">
          <tab title="Home">
              <h1>{{government.name}}</h1>
              <p>Description: {{government.name}}</p>
              <p>Reps: {{government.reps.length}}</p>
              <p>Members: {{government.users.length}}</p>
              <button v-if="!isMember" class="button" v-on:click="joinGovernment">Join</button> 
              <button v-else class="button" v-on:click="leaveGovernment">Leave</button> 
          </tab>

          <tab title="Representatives">
            <div v-if="isRep">
              <p>You are a representative</p>
            </div>
            <div v-for="rep in government.reps" v-bind:key="rep" class="item">
                <div v-if="rep.user_id == user_id">
                  <p>This is you!</p>
                </div>
                <p><strong>{{rep.username}}</strong></p>
                <p>Description: {{rep.description}}</p>
            </div>
          </tab>

          <tab title="Bills">
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
              <div v-for="bill in government.bills" v-bind:key="bill" class="item">
                <p><strong>{{bill.name}}</strong></p>
                <p>Description: {{bill.description}}</p>
                <p>Closing Date: {{bill.closing_date}}</p>
              </div>
          </tab>

          <tab title="Calendar">
            Calendar will go here!
          </tab>
          
        </Tabs>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrap {
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .stack {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    padding-top: 32px;
    width: 50%;
  }
  .overview {
    width: 50%;
  }
  .item {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
    width: 600px;
  }
  @media only screen and (max-width: 800px) {
    .overview {
      width: 100%;
    }
    .top {
      width: 100%;
    }
  }
</style>

<script>
import LocationMap from "../components/LocationMap.vue";
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Post from "./Post.vue";
import axios from "axios";

export default {
  name: "Government",

  data() {
    return {
      government: {},
      government_id: parseInt(this.$route.params.id),
      isRep: false,
      isMember: false,
      user_id: this.$cookie.get('auth-id'),
      billName: "",
      billDescription: "",
      billClosingDate: "",
      messages: [],
      errors: [],
    }
  },
  components: {
    LocationMap,
    Navbar,
    Post,
    Tabs,
    Tab
  },
  created: function() {
    this.getGovernment()
  },
  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    },
    getGovernment: function() {
      axios
        .get(`/api/governments/id/${this.government_id}` )
        .then((res) => {
          this.government = res.data.government;
          this.isRep = this.government.reps.some( rep => rep.user_id == this.$cookie.get('auth-id'))
          this.isMember = this.government.users.some( member => member.user_id == this.$cookie.get('auth-id'))
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
    },
    joinGovernment: function() {
      const bodyContent = { government_id: this.government_id};
      axios
        .post(`/api/governments/join`, bodyContent)
        .then(() => {
          this.messages.push("Joined new government!!")
          this.isMember = true;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    },
    leaveGovernment: function() {
      axios
        .delete(`/api/governments/leave/${this.government_id}`)
        .then(() => {
          this.messages.push("Left government")
          this.isMember = false;
          this.isRep = false;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    },
    addBill: function() {
      const bodyContent = { 
        government_id: this.government_id, 
        name: this.billName,
        description: this.billDescription,
        closing_date: this.billClosingDate
      };
      axios
        .post(`/api/bills`, bodyContent)
        .then(() => {
          this.messages.push("Added bill!")
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    },
    }
}
</script>

<style scoped>
form {
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>