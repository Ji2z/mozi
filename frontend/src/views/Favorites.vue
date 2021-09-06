<template>
  <div>
    <h1>Favorites</h1>
    <v-btn @click="dialog = true">상세정보</v-btn>
    <Detail v-model="dialog" />
  </div>
</template>

<script>
import Detail from "../components/Detail.vue";

export default {
  name: "Favorites",
  components: {
    Detail,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
