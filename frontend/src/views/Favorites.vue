<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Favorites",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["storeIsDetect"]),
  },
  created() {
    this.storeIsDetect(true);
  },
};
</script>
