<template>
  <div>
    <v-col class="" cols="12">
      <h1 tabindex="0">탐색할 음료 선택</h1>
    </v-col>
    <List mode="search" />
  </div>
</template>

<script>
import List from "../components/List";

export default {
  name: "Search",
  components: {
    List,
  },
  data() {
    return {};
  },
};
</script>
