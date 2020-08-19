<template>
  <v-container class="scores">
    <v-snackbar
      v-model="error.status"
      :timeout="10000"
      top
    >
      {{ error.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="error.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
    error: { status: false, message: '' },
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
      }).catch(() => {
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
