<template>
  <div class="home fill-height">
    <v-dialog max-width="400px" :value="showDialog">
      <v-card>
        <v-card-text class="pa-3">
          <h3>Hello {{ name }}</h3>
          <p class="text py-4">
            This is a timed quiz and you are expected to complete all the questions.
            The timer would start as soon as you click continue.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="text-capitalize"
            @click="showDialog = false"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Quiz v-if="showDialog === false" />
  </div>
</template>

<script>
import Quiz from '@/components/Quiz.vue';

export default {
  name: 'Home',
  data: () => ({
    showDialog: false,
  }),
  components: { Quiz },
  computed: {
    name() {
      return localStorage.getItem('js-name');
    },
    email() {
      return localStorage.getItem('js-email');
    },
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
