<template>
  <base-card>
    <h1>Register as a coach now!</h1>
    <coach-form @form-submit="saveData"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from "../../components/coach/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style></style>
