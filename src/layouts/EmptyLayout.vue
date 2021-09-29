<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import message from "@/utils/message";
import localizeFilter from "@/filters/localize.filter";
export default {
  name: "EmptyLayout",
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(message[fbError.code] || 'Что-то пошоль так');
    }
  }
}
</script>

<style scoped>

</style>