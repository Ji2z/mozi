<template>
  <div>
    <v-expansion-panels class="pa-4">
      <v-expansion-panel v-for="(item, i) in guides" :key="i" class="mb-4 info">
        <v-expansion-panel-header class="text-h6 font-weight-bold">
          {{ item.title }}
        </v-expansion-panel-header>
        <v-expansion-panel-content tabindex="0">
          {{ item.description }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "Guide",

  data() {
    return {
      guides: [
        {
          title: "스캔모드",
          description: `하단의 메뉴에서 스캔모드를 눌러 스캔을 시작할 수 있습니다.
            스캔모드에서는 자동으로 카메라가 켜지며,
            별도의 촬영없이 인식된 상품에 대한 정보를 음성으로 안내합니다.`,
        },
        {
          title: "탐색모드",
          description: `하단의 메뉴에서 탐색모드를 눌러 원하는 상품을 탐색할 수 있습니다.
            즐겨찾기 목록이 뜨며 그 중 탐색을 원하는 상품의 세부 정보를 확인할 수 있습니다.
            탐색을 원하는 상품을 누르면 카메라가 켜지고 스캔모드와 동일하게 스캔하여
            인식된 물체가 해당 상품인지 아닌지 음성으로 안내합니다.`,
        },
        {
          title: "즐겨찾기",
          description: `하단의 메뉴에서 즐겨찾기를 눌러 즐겨찾기 편집 페이지로 이동할 수 있습니다.
            상단의 상품 추가하기 버튼을 눌러 스캔모드와 동일한 화면으로 이동합니다.
            인식된 상품을 즐겨찾기 목록에 추가할 수 있고 후에 탐색모드에서 탐색할 수 있습니다.
            인터넷 사용 기록을 삭제하거나 기기를 바꾸는 경우 즐겨찾기 목록이 삭제됩니다.`,
        },
        {
          title: "음성지원",
          description: `좌측 상단의 버튼을 눌러 음성안내를 자유롭게 끄고 켤 수 있습니다.`,
        },
      ],
    };
  },
};
</script>
