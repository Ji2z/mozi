<template>
  <v-app>
    <v-app-bar app color="primary" dark flat>
      <div class="toggle">
        <v-btn v-if="mute" @click="mute = !mute">
          <v-icon color="accent">mdi-volume-off</v-icon>
          <span>OFF</span>
        </v-btn>
        <v-btn v-else @click="mute = !mute">
          <v-icon color="accent">mdi-volume-high</v-icon>
          <span>ON</span>
        </v-btn>
      </div>
      <!-- <span class="mx-auto" dark>{{ value }}</span> -->
      <v-toolbar-title class="mx-auto" tabindex="0">
        {{ value }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation app v-model="value" class="primary" grow dark>
      <v-btn value="스캔모드" to="/scan">
        <span>스캔모드</span>
        <v-icon>mdi-cube-scan</v-icon>
      </v-btn>

      <v-btn value="탐색모드" to="/search">
        <span>탐색모드</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="즐겨찾기" to="/favorites">
        <span>즐겨찾기</span>
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>

      <v-btn value="사용법" to="/guide">
        <span>사용법</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      value: "스캔모드",
      mute: false,
    };
  },
};
</script>

<style>
.toggle {
  float: left;
  position: absolute;
}
</style>
