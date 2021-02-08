<template>
  <div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
        <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
        <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
    </div>
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
        <Bill v-bind:bill="bill" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
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
import axios from "axios";

export default {
    name: "Bills",
    props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean
    },
    data() {
        return {
            messages: [],
            errors: [],
            billName: "",
            billDescription: "",
            billClosingDate: "",
        }
    },
    components: {
        Bill
    },
    methods: {
        addBill: function() {
            const bodyContent = { 
                government_id: this.government.government_id, 
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
