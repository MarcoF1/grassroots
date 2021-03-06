<template>
  <div>
    <div v-if="isRep">
      <p>You are a representative</p>
    </div>
    <div v-for="rep in government.reps" v-bind:key="rep">
        <RepresentativeItem v-bind:rep="rep"/>
    </div>
  </div>
</template>

<script>
import RepresentativeItem from "../components/RepresentativeItem.vue";


export default {
  name: "Representatives",
  props: {
      government: Object,
      isMember: Boolean,
      isRep: Boolean
  },
  data() {
    return {}
  },
  components: {
    RepresentativeItem
  },
}
</script>
