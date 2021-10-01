<template>
  <div>
    <List mode="favorite" />
  </div>
</template>

<script>
import List from "../../components/List";
import { mapActions } from "vuex";

export default {
  name: "FavoritesList",
  components: {
    List,
  },
  methods: {
    ...mapActions(["storeIsDetect"]),
  },
  created() {
    this.storeIsDetect(true);
  },
};
</script>
