<template>
  <div class="home fill-height">
    <v-snackbar
      v-model="error.status"
      :timeout="10000"
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
    <v-dialog max-width="400px" :value="showDialog">
      <v-card>
        <v-card-text class="pa-3">
          <h3>Hello {{ name }}</h3>
          <p class="text py-4">
            This is a timed quiz and you are expected to complete all the questions.
            The timer would start as soon as you click continue.
          </p>
          <p v-if="hasPlayedBefore" class="text red--text caption">
            You've taken this test before and as such, your score won't be recorded
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="text-capitalize"
            @click="showDialog = false"
            :loading="loading"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Quiz v-if="showDialog === false" :has-played="hasPlayedBefore" />
  </div>
</template>

<script>
import Quiz from '@/components/Quiz.vue';

export default {
  name: 'Home',
  data: () => ({
    showDialog: true,
    hasPlayedBefore: false,
    error: { status: false, message: '' },
    loading: false,
  }),
  components: { Quiz },
  computed: {
    name() {
      return localStorage.getItem('js-name');
    },
    email() {
      return localStorage.getItem('js-email');
    },
    firebaseUser() {
      return this.$firebase.collection('users').doc(this.email);
    },
  },
  mounted() {
    this.loading = true;
    this.firebaseUser.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().score) {
          this.loading = false;
          this.hasPlayedBefore = true;
        } else {
          this.loading = false;
          this.hasPlayedBefore = false;
        }
      } else {
        this.$router.push({ path: '/login' });
      }
    }).catch(() => {
      this.loading = false;
      this.error.status = true;
      this.error.message = 'Something went wrong, Please try again';
    });
  },
};
</script>

<style lang="scss" scoped>
.text {
  width: 300px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
