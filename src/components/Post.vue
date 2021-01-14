<template>
  <div class="wrapper">
    <div class="buttons">
      <button v-if='true' class="button" v-on:click="like">↑</button>
      <button v-else class="button" v-on:click="unlike">↑</button>
      {{'  '}}
      <button v-if='true' class="button" v-on:click="dislike">↓</button>
      <button v-else class="button" v-on:click="unldislike">↓</button>
    </div>
    <div class="text">
      <div class="side">
        <router-link :to="`user/${post.user_id}`">
          <strong>{{post.username}}</strong>
        </router-link>
        <div class="time">· {{time}}</div>
      </div>
      <p>"{{post.text}}"</p>
      <div v-if="post.tags.length > 0" class="tags">
        <div class="tags">
          <div v-for="tag in post.tags.split(',')" v-bind:key="tag" class="tag">
            {{tag}}
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<style scoped>

  .buttons {
    padding: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;

  }
  .button {
    margin: 8px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
    width: 600px;
  }
  .text {
    width: 600px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .tags {
    display: flex;
  }
  .tag {
    background: rgb(252, 167, 255);
    margin-right: 8px;
    padding: 8px;
    border-radius: 16px;
  }
  .side {
    display: flex;
    align-items: center;
  }

  .time {
    margin-left: 8px;
  }
  @media only screen and (max-width: 800px) {
    .wrapper {
      width: 100%;
    }
    .text {
      width: 100%;
    }
  }

</style>

<script>


export default {
  name: "Post",
  props: {
    post: Object,
  },
  computed: {
    time() {
      return this.timeDifference(Date.now(), parseInt(this.post.timestamp))
    },
  },
  methods: {

    like () {

    },
    unlike () {

    },
    dislike () {

    },
    undislike () {

    },
    timeDifference(current, previous) {

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
      }

      else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }

      else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }

      else if (elapsed < msPerMonth) {
          return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
      }

      else if (elapsed < msPerYear) {
          return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
      }

      else {
          return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
      }
    }
  }
};
</script>
