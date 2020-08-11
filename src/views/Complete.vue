<template>
  <v-container>
    <v-dialog :value="true" persistent max-width="400">
      <v-card>
        <v-card-text>
          <img src="@/assets/checkmark.svg" alt="" class="img">
          <h3>{{ name }}</h3>
          <p class="text py-4">
            You've successfully completed this test. We would get back to you soon.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  computed: {
    score() {
      return this.$route.params.score;
    },
    name() {
      return localStorage.getItem('js-name');
    },
  },
  mounted() {
    if (!this.$route.params.score) {
      this.$router.push({ path: '/home' });
    }
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 80px;
  max-width: 100%;
  margin: 20px auto;
}
</style>
