<template>
  <v-container class="scores">
    <v-data-table :headers="headers" :items="scores" />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    scores: [],
    headers: [
      {
        text: 'Name',
        value: 'name',
        sortable: false,
      },
      {
        text: 'Email',
        value: 'email',
        sortable: false,
      },
      {
        text: 'Score',
        value: 'score',
      },
      {
        text: 'Track',
        value: 'track',
        sortable: false,
      },
    ],
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
