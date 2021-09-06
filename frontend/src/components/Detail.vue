<template>
  <v-dialog :value="value" @input="$emit('input', $event)">
    <v-card>
      <v-card-title class="text-h5">
        {{ beverage.name }}
      </v-card-title>
      <v-divider class="accent mx-4"></v-divider>
      <v-card-text>
        <v-container class="info-box">
          <v-row>
            <v-col class="font-weight-bold" cols="4">종류</v-col>
            <v-col cols="8">{{ beverage.category }}</v-col>
          </v-row>
          <v-row>
            <v-col class="font-weight-bold" cols="4">제조사</v-col>
            <v-col cols="8">{{ beverage.company }}</v-col>
          </v-row>
          <v-row>
            <v-col class="font-weight-bold" cols="4">고객센터</v-col>
            <v-col cols="8">{{ beverage.service_tel }}</v-col>
          </v-row>
          <v-row>
            <v-col class="font-weight-bold" cols="4">성분주의</v-col>
            <v-col cols="8">{{ beverage.allergy }}</v-col>
          </v-row>
          <v-row v-if="beverage.caution">
            <v-col class="font-weight-bold" cols="4">주의사항</v-col>
            <v-col cols="8">{{ beverage.caution }}</v-col>
          </v-row>
          <v-row v-if="beverage.comparision">
            <v-col class="font-weight-bold" cols="4">비교</v-col>
            <v-col cols="8">{{ beverage.comparision }}</v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click.native="$emit('input', false)">
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      beverage: {
        name: "갈아만든 배",
        category: "음료수",
        company: "해태음료",
        service_tel: "080-023-3449",
        allergy:
          "우유, 메밀, 땅콩, 대두, 밀, 복숭아, 토마토, 아황산류, 호두, 잣을 사용한 제품과 같은 제조시설에서 제조하고 있습니다.",
        caution: null,
        comparision: null,
      },
    };
  },
  props: ["value"],
};
</script>

<style lang="scss">
.info-box {
  padding: 24px 0px 0px 0px !important;
}
</style>
