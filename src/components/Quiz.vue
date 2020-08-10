<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <div class="quiz">
        akhsdakj
      </div>
    </v-row>
  </v-container>
</template>

<script>
import allQuestions from '@/assets/questions';

export default {
  data: () => ({
    questions: [],
  }),
  mounted() {
    const x = this.getTenRandomQuestions(allQuestions, 10);
    console.log(x);
  },
  methods: {
    getTenRandomQuestions(arr, num) {
      // This algorith was gotten from SO....don't even ask how it works
      let n = num;
      const result = new Array(n);
      let len = arr.length;
      const taken = new Array(len);
      if (n > len) throw new RangeError('getRandom: more elements taken than available');
      while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    },
    generateRandomNum() {
      const max = allQuestions.length;
      return Math.floor(Math.random() * max);
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
