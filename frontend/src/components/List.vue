<template>
  <div>
    <v-col cols="12" v-if="mode != 'search'">
      <v-btn block class="text-h6 py-3" to="/favorites/add">
        음료 추가하기
      </v-btn>
    </v-col>
    <Detail v-model="detailDialog" />
    <v-col v-for="(item, i) in favorites" :key="i" cols="12">
      <v-card class="info px-3">
        <v-row class="mb-1">
          <v-col cols="8">
            <div class="item-title" tabindex="0">
              {{ item.name }}
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              icon
              @click="openDetailDialog(item)"
              title="세부 정보 조회 버튼"
            >
              <v-icon>mdi-information</v-icon>
            </v-btn>

            <v-btn icon title="탐색 시작 버튼" v-if="mode == 'search'">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

            <v-dialog
              v-model="deleteDialog"
              v-if="mode != 'search'"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, item }">
                <v-btn
                  icon
                  color="red"
                  aria-label="삭제 버튼"
                  v-bind="item"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5" tabindex="0">
                  {{ item.name }} 삭제
                </v-card-title>
                <v-divider class="accent mx-4 v-divider theme--light" />
                <v-card-text class="my-2" tabindex="0">
                  정말 삭제하시겠습니까?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="deleteDialog = false">취소</v-btn>
                  <v-btn text @click="deleteDialog = false">승인</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import Detail from "./Detail.vue";
import { mapActions } from "vuex";

export default {
  name: "FavoriteList",
  components: {
    Detail,
  },
  props: ["mode"],
  data() {
    return {
      detailDialog: false,
      deleteDialog: false,
      favorites: [
        {
          id: 1,
          name: "갈아만든 배",
        },
        {
          id: 10,
          name: "데미소다 오렌지",
        },
        {
          id: 40,
          name: "코카콜라 제로",
        },
      ],
      selected: "",
    };
  },
  methods: {
    ...mapActions(["getProductDetail"]),
    openDetailDialog(item) {
      this.getProductDetail(item);
      this.detailDialog = true;
    },
  },
};
</script>
