<template>
  <div class="container mx-auto">
    <div class="h-80 bg-green-600">
      <video :src="src"></video>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/helpers/storage";

export default {
  name: "CurrentChanel",
  data() {
    return {
      src: "",
    };
  },

  methods: {
    getChanelVideoUrl() {
      this.src = getItem("chanel");
    },
  },

  mounted() {
    this.getChanelVideoUrl();
  },
};
</script>

<style lang="scss" scoped></style>
