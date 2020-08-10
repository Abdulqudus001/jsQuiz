<template>
  <v-container class="fill-height">
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
    <div class="login">
      <v-form @submit.prevent="verifyEmail">
        <v-row align="center" justify="center" class="mx-0">
          <v-text-field
            v-model.trim="email"
            outlined
            label="Email"
            hide-details
            :loading="loading"
            name="email"
            type="email"
            dark
          >
            <template slot="append">
              <v-btn
                icon
                text
                @click.prevent="verifyEmail"
                class="mt-n2"
                color="primary"
                :disabled="email.length < 1"
                :loading="loading"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    loading: false,
    error: { status: false, message: '' },
  }),
  methods: {
    verifyEmail() {
      this.loading = true;
      fetch('https://jsquiz-a5525.firebaseio.com/masterSheet.json')
        .then((res) => res.json())
        .then((res) => {
          const user = res.find((el) => {
            const email = el[1].toLowerCase().trim();
            return email === this.email.toLowerCase();
          });
          if (user && user.length > 0) {
            this.saveToFireBase(user);
          } else {
            this.loading = false;
            this.error.status = true;
            this.error.message = 'Ooops...Seems you are not registered for this internship';
          }
        }).catch(() => {
          this.error.status = true;
          this.error.message = 'Something went wrong, Please try again';
        });
    },
    saveToFireBase([, email, name, , track]) {
      console.log(email, name, track);
      localStorage.setItem('js-email', email);
      localStorage.setItem('js-name', name);
      this.$firebase.collection('users').doc(email).set({
        email,
        name,
        track,
      }).then(() => {
        this.$router.push({ path: 'home' });
        this.loading = false;
      })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.loading = false;
          this.error.status = true;
          this.error.message = 'Something went wrong, Please try again';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
