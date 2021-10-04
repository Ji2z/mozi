<template>
  <div>
    <v-col cols="12" v-if="mode == 'favorite'">
      <v-btn
        block
        class="text-h6 py-3"
        to="/favorites/add"
        aria-label="음료 추가하기 버튼"
      >
        음료 추가하기
      </v-btn>
    </v-col>
    <Detail v-model="detailDialog" />
    <div v-if="favorites == null || favorites.length == 0" class="imgDiv">
      <img src="@/assets/box.png" alt="" height="150px" width="150px" /> <br />
      즐겨찾기를 추가해주세요!
    </div>
    <div v-else>
      <v-col v-for="(item, i) in favorites" :key="i" cols="12">
        <v-card class="info px-3">
          <v-row class="mb-1">
            <v-col>
              <div class="item-title" tabindex="0">
                {{ item.name }} ({{ item.type }})
              </div>
            </v-col>
            <v-card-actions class="ml-auto">
              <v-btn
                icon
                @click="openDetailDialog(item)"
                aria-label="세부 정보 조회 버튼"
              >
                <v-icon>mdi-information</v-icon>
              </v-btn>

              <v-btn
                icon
                aria-label="탐색 시작 버튼"
                v-if="mode == 'search'"
                @click="searchStart(item)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>

              <v-dialog
                v-if="mode == 'favorite'"
                :retain-focus="false"
                v-model="dialog[i]"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon color="red" aria-label="음료 삭제 버튼" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="item-title font-weight-bold"
                    tabindex="0"
                  >
                    {{ item.name }} ({{ item.type }})
                  </v-card-title>
                  <v-divider class="accent mx-4 v-divider theme--light" />
                  <v-card-text class="pt-5 text-body-1" tabindex="0">
                    <span>정말 삭제하시겠습니까?</span>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click="closeDeleteDialog(i)"
                      aria-label="삭제 취소"
                    >
                      취소
                    </v-btn>
                    <v-btn
                      text
                      @click="deleteItem(item, i)"
                      aria-label="삭제 승인"
                    >
                      승인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
    </div>
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
  props: {
    mode: String,
  },
  data() {
    return {
      detailDialog: false,
      dialog: [],
      favorites: [],
    };
  },
  methods: {
    ...mapActions(["getProductDetail"]),
    searchStart(item) {
      this.$router.push({
        name: "searchScan",
        params: { name: item.name, type: item.type },
      });
    },
    async openDetailDialog(item) {
      await this.getProductDetail(item);
      this.detailDialog = true;
    },
    closeDeleteDialog(idx) {
      this.$set(this.dialog, idx, false);
    },
    deleteItem(item, idx) {
      this.favorites.splice(idx, 1);
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      this.$set(this.dialog, idx, false);
    },
  },
  created() {
    this.favorites = JSON.parse(localStorage.getItem("favorite"));
  },
};
</script>
