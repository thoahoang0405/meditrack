<template>
    <div
      class="context-menu-content"
      :style="{ top: posTop + 'px', left: posLeft + 'px' }"
      :class="showAbove ? 'showAbove' : ''"
    >
      <div
        class="context-menu-item"
        @click="this.$emit(item.method)"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="icon">
          <div :class="item.icon"></div>
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
</template>

<script>
import   {TitlePopup} from  "@/js/common/resource"
export default {
  props: {
    posTop: {
      type: Number,
      default: 10,
    },
    posLeft: {
      type: Number,
      default: 10,
    },
    initItem: { type: Array },
  },
  data() {
    return {
      heightOfContextMenu: 150,
      showAbove: false,
      items: [
        { icon: "icon-add", text: TitlePopup.Add, method: "clickAdd" },
        { icon: "icon-edit", text: TitlePopup.Edit, method: "clickEdit" },
        {
          icon: "icon-delete-black",
          text: TitlePopup.Delete,
          method: "clickDelete",
        },
        {
          icon: "icon-replicate",
          text: TitlePopup.Replication,
          method: "clickReplication",
        },
      ],
    };
  },
  
};
</script>

<style scoped>
@import url(./../../css/layout/context-menu.css);
</style>
