<template>
  <v-container class="scores">
    Helloo scores
  </v-container>
</template>

<script>
export default {
  data: () => ({
    scores: [],
  }),
  created() {
    if (!localStorage.getItem('js-admin')) {
      this.$router.push({ path: '/login' });
    }
  },
  mounted() {
    this.getScores();
  },
  methods: {
    getScores() {
      this.$firebase.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.scores.push(doc.data());
        });
        console.log(this.scores);
      }).catch((err) => {
        console.log(err);
        this.loading = false;
        this.error.status = true;
        this.error.message = 'Something went wrong, Please try again';
      });
    },
  },
};
</script>

<style>
.scores {
  color: #fff;
}
</style>
