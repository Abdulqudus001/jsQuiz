<template>
  <v-container class="fill-height">
    <div class="login">
      <v-form @submit.prevent="verifyEmail">
        <v-row align="center" justify="center" class="mx-0">
          <v-text-field
            v-model.trim="email"
            outlined
            label="Email"
            hide-details
            :loading="loading"
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
  }),
  methods: {
    verifyEmail() {
      this.loading = true;
      console.log(this.email);
      fetch('https://jsquiz-a5525.firebaseio.com/masterSheet.json')
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const user = res.find((el) => {
            const email = el[1].toLowerCase().trim();
            return email === this.email.toLowerCase();
          });
          console.log(user);
          this.loading = false;
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
