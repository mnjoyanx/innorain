<template>
  <div class="container mx-auto">
    <h2 class="text-4xl my-4">Channels</h2>
    <div class="flex justify-between" v-if="channels.length">
      <div
        class="border p-2 border-separate cursor-pointer"
        v-for="chanel in channels"
        :key="chanel.id"
        @click="getCurrentChanelHandler(chanel.url, chanel.id)"
      >
        <img :src="chanel.image" alt="" />
        <p class="text-center">{{ chanel.name }}</p>
      </div>
    </div>
    <template v-else>
      <p>loading...</p>
    </template>
  </div>
</template>

<script>
import { getChannels } from "@/api/getChannels";
import { setItem } from "@/helpers/storage";

export default {
  name: "ChanelList",
  data() {
    return {
      channels: [],
      isLoading: true,
    };
  },

  methods: {
    async getChannels() {
      this.isLoading = true;
      try {
        const data = await getChannels();
        this.channels = data.data.message.rows;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        return err;
      }
    },

    getCurrentChanelHandler(url, id) {
      setItem("chanel", url);
      this.$router.push({ name: "CurrentChannel", params: { id } });
    },
  },

  mounted() {
    this.getChannels();
  },
};
</script>

<style lang="scss" scoped></style>
