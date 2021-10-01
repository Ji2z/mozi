<template>
  <div>
    <div class="searchTitle mt-5 mb-5">탐색할 음료 선택</div>
    <List mode="search" />
  </div>
</template>

<script>
import List from "../../components/List";

export default {
  name: "SearchList",
  components: {
    List,
  },
};
</script>
