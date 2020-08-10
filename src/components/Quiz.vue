<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <div class="quiz">
        <div
          class="question"
          v-for="(question, step) in questions"
          :key="question.id"
        >
          <div v-if="step === index">
            <div class="ques">
            {{ question.question }}
            </div>
            <div
              class="answers"
              v-for="(answer, index) in question.answers"
              :key="answer.text"
            >
              <div class="answer">
                <input
                  type="radio"
                  :value="answer.text"
                  :name="question.question"
                  :id="`radio${question.id}-${index}`"
                >
                <label :for="`radio${question.id}-${index}`">
                  {{ answer.text }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import allQuestions from '@/assets/questions';

export default {
  data: () => ({
    questions: [],
    index: 0,
  }),
  mounted() {
    this.questions = this.getTenRandomQuestions(allQuestions, 10);
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

.ques {
  width: 100%;
  border: 1px solid red;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
}

.answers {
  .answer {
    text-align: left;
    position: relative;
    margin: 10px 0;
    input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      position: absolute;
    }

    label {
      border: 1px solid;
      display: block;
      border-radius: 5px;
      padding: 20px;
      cursor: pointer;
    }

    input:hover + label,
    input:focus + label,
    input:active + label {
      border: 1px solid red;
    }
  }
}
</style>
