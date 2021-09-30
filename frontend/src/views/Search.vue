<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Search",
  methods: {
    ...mapActions(["storeIsDetect"]),
  },
  created() {
    this.storeIsDetect(true);
  },
};
</script>
