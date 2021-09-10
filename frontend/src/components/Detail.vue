<template>
  <v-dialog :value="value" @input="$emit('input', $event)">
    <v-card>
      <v-card-title class="item-title font-weight-bold" tabindex="0">
        {{ getProduct.name }}
      </v-card-title>
      <v-divider class="accent mx-4"></v-divider>
      <v-card-text class="text-body-1">
        <v-container class="info-box">
          <v-row tabindex="0">
            <v-col class="font-weight-bold" cols="4">종류</v-col>
            <v-col cols="8">{{ getProduct.category }}</v-col>
          </v-row>
          <v-row tabindex="0">
            <v-col class="font-weight-bold" cols="4">제조사</v-col>
            <v-col cols="8">{{ getProduct.company }}</v-col>
          </v-row>
          <v-row tabindex="0">
            <v-col class="font-weight-bold" cols="4">고객센터</v-col>
            <v-col cols="8">{{ getProduct.service_tel }}</v-col>
          </v-row>
          <v-row tabindex="0">
            <v-col class="font-weight-bold" cols="4">성분주의</v-col>
            <v-col cols="8">{{ getProduct.allergy }}</v-col>
          </v-row>
          <v-row v-if="getProduct.caution" tabindex="0">
            <v-col class="font-weight-bold" cols="4">주의사항</v-col>
            <v-col cols="8">{{ beverage.caution }}</v-col>
          </v-row>
          <v-row v-if="getProduct.comparision" tabindex="0">
            <v-col class="font-weight-bold" cols="4">비교</v-col>
            <v-col cols="8">{{ getProduct.comparision }}</v-col>
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
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  data() {
    return {};
  },
  props: ["value"],
  computed: {
    ...mapGetters(["getProduct"]),
  },
};
</script>

<style>
.info-box {
  padding: 24px 0px 0px 0px !important;
}
</style>
