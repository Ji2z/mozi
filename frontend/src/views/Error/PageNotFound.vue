<template>
  <div>
    <v-container fill-height>
      <v-row justify="center" align="center" class="mt-5">
        <v-col cols="12">
          <v-img
            class="mx-auto"
            max-height="150"
            max-width="250"
            src="@/assets/mz_error.png"
            alt="에러페이지"
            tabindex="0"
          ></v-img>
          <div class="px-5">
            <p tabindex="0" v-html="errorTitle"></p>
            <p tabindex="0" v-html="errorMsg1"></p>
            <p tabindex="0" v-html="errorMsg2"></p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  data() {
    return {
      errorTitle: "죄송합니다.<br />요청하신 페이지를 찾을 수 없습니다.",
      errorMsg1:
        "페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.",
      errorMsg2: "입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.",
    };
  },
};
</script>
