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
    <v-row justify="center" align="start" class="my-container mx-auto">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="10"
        :value="value"
        color="yellow"
      >
        {{ questionTime }}
      </v-progress-circular>
      <div class="quiz">
        <div
          class="question"
          v-for="(question, step) in questions"
          :key="`${question.question}-${question.id}`"
        >
          <div v-if="step === index">
            <div class="ques">
              <span v-html="question.question"></span>
              <Code v-if="question.code" :code="question.code" />
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
                v-if="!submitted"
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                @click="handleNext(question)"
                :disabled="!selected"
              >
                Submit
              </v-btn>
              <v-btn
                v-else
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                :loading="savingScore"
                @click="updateUserScore"
              >
                Complete Test
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                v-if="!submitted"
                class="submit my-3"
                color="#febf10"
                min-height="50px"
                @click="handleNext(question)"
                :disabled="!selected"
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
import Code from '@/components/Code.vue';

export default {
  props: {
    hasPlayed: {
      type: Boolean,
      default: false,
    },
  },
  components: { Code },
  data: () => ({
    questions: [],
    index: 0,
    score: 0,
    selected: '',
    showCorrect: false,
    showWrong: false,
    submitted: false,
    isLast: false,
    savingScore: false,
    error: { status: false, message: '' },
    value: 0,
    interval: {},
    questionTime: 0,
  }),
  computed: {
    email() {
      return localStorage.getItem('js-email');
    },
  },
  mounted() {
    const questions = this.getTenRandomQuestions(allQuestions, 10);
    questions.forEach((ques) => {
      // eslint-disable-next-line
      ques.answers = this.shuffleAnswers(ques.answers);
    });
    this.questions = questions;
    this.handleTimer(this.questions[0].time);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    handleTimer(time) {
      this.questionTime = time;
      this.value = 0;
      this.interval = setInterval(() => {
        if (this.value >= 100) {
          this.timeUp();
          return;
        }
        if (this.questionTime <= 0) {
          return;
        }
        this.questionTime -= 1;
        this.value += ((100 / time));
      }, 1000);
    },
    timeUp() {
      this.handleNext(this.questions[this.index]);
    },
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
      clearInterval(this.interval);
      const correctAnswer = question.answers.find((el) => el.correct);
      if (correctAnswer.text === this.selected) {
        this.score += 10;
        this.showCorrect = true;
      } else {
        this.showCorrect = true;
        this.showWrong = true;
      }
    },
    shuffleAnswers(answer) {
      // Also copied this algorithm....don't mess with it
      const copied = [...answer];
      for (let i = copied.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copied[i], copied[j]] = [copied[j], copied[i]];
      }
      return copied;
    },
    updateUserScore() {
      if (this.hasPlayed === false) {
        this.savingScore = true;
        this.$firebase.collection('users').doc(this.email).update({
          score: this.score,
        }).then(() => {
          this.$router.push({
            name: 'Complete',
            params: { score: this.score },
          });
          this.savingScore = false;
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
            this.savingScore = false;
            this.error.status = true;
            this.error.message = 'Something went wrong, Please try again';
          });
      } else {
        this.$router.push({
          name: 'Complete',
          params: { score: this.score },
        });
      }
    },
    goToNext() {
      clearInterval(this.interval);
      this.selected = '';
      this.showCorrect = false;
      this.showWrong = false;
      this.submitted = false;
      if (this.index === this.questions.length - 2) {
        this.isLast = true;
      }
      this.index += 1;
      this.handleTimer(this.questions[this.index].time);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  max-width: 1000px !important;
}

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
  // background-color: #585858;
  background-color: rgba(255, 255, 255, 0.7);
  span {
    color: #060c22;
  }
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
      border: 2px solid;
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
      border: 2px solid #febf10;
    }

    input.correct + label {
      border: 2px solid green;
      animation: scaleUp .3s ease 2;
    }

    input.wrong + label {
      border: 2px solid red;
    }

    input:disabled + label {
      transform: none;
      cursor: not-allowed;
    }

    input:disabled:not(.correct):not(.wrong) + label {
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

/* eslint-disable-next-line */
.submit.theme--light.v-btn::v-deep {
  &.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #999 !important;
    cursor: not-allowed;
  }
}
</style>
