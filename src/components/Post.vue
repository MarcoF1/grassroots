<template>
  <div class="wrapper">
    <p><strong>{{post.username}}</strong> · {{time}}</p>
    <p>"{{post.text}}"</p>
    <div v-if="post.tags.length > 0" class="tags">
      <div class="tags">
        <div v-for="tag in post.tags.split(',')" v-bind:key="tag" class="tag">
          {{tag}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
    width: 600px;
  }
  .button {
    margin-left: 32px;
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
  @media only screen and (max-width: 800px) {
    .wrapper {
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
