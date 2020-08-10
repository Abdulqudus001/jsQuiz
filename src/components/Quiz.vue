<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <div class="quiz">
        <div
          class="question"
          v-for="(question, step) in questions"
          :key="`${question.question}-${question.id}`"
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
                  :disabled="submitted"
                  v-model="selected"
                  :class="[
                    showCorrectInput(answer) ? 'correct' : null,
                    showWrongInput(answer) ? 'wrong' : null,
                    submitted ? 'disabled' : null
                  ]"
                >
                <label :for="`radio${question.id}-${index}`">
                  {{ answer.text }}
                </label>
              </div>
            </div>
            <template v-if="isLast">
              <v-btn
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                @click="handleComplete(question)"
              >
                Submit Done
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                v-if="!submitted"
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                @click="handleNext(question)"
              >
                Submit
              </v-btn>
              <v-btn
                v-else
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                @click="goToNext"
              >
                Next
              </v-btn>
            </template>
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
    score: 0,
    selected: '',
    showCorrect: false,
    showWrong: false,
    submitted: false,
    isLast: false,
  }),
  mounted() {
    this.questions = this.getTenRandomQuestions(allQuestions, 10);
    console.log(this.questions);
  },
  methods: {
    showCorrectInput(answer) {
      return this.showCorrect && answer.correct;
    },
    showWrongInput(answer) {
      return this.showWrong && answer.text === this.selected;
    },
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
    handleNext(question) {
      this.showCorrect = false;
      this.submitted = true;
      // const isCorrect = false;
      const correctAnswer = question.answers.find((el) => el.correct);
      if (correctAnswer.text === this.selected) {
        this.score += 10;
        this.showCorrect = true;
      } else {
        this.showCorrect = true;
        this.showWrong = true;
      }
    },
    handleComplete(question) {
      this.handleNext(question);
      console.log(this.score);
    },
    goToNext() {
      this.selected = '';
      this.showCorrect = false;
      this.showWrong = false;
      this.submitted = false;
      if (this.index === this.questions.length - 1) {
        this.isLast = true;
      } else {
        this.index += 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
  width: 500px;
  max-width: calc(100% - 24px);
  color: #fff;
  margin: 0 auto;
}

.ques {
  width: 100%;
  padding: 30px 20px;
  margin: 30px 0;
  text-align: left;
  background-color: #585858;
  border-radius: 5px;
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

    input:hover + label {
      transform: scale(1.01);
    }

    input:focus + label,
    input:active + label,
    input:checked + label {
      border: 1px solid #febf10;
    }

    input.correct + label {
      border: 1px solid green;
      animation: scaleUp .3s ease 2;
    }

    input.wrong + label {
      border: 1px solid red;
    }

    input:disabled + label {
      transform: none;
      cursor: not-allowed;
    }

    input:disabled:not(.correct) + label {
      border-color: #fff;
    }
  }
}

.submit {
  width: 100%;
  background-color: #febf10;
  text-transform: capitalize;
  font-weight: 600;
}

@keyframes scaleUp {
  from, to {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
}
</style>
