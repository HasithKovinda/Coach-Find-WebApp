<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="errorHandler"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating....." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="formSubmit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isFormValid">
          Please enter valid email or password(password must contain at least 6
          characters)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isFormValid: true,
      authMode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.authMode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchButtonCaption() {
      if (this.authMode === "login") {
        return "Signup Instead";
      } else {
        return "Login Instead";
      }
    },
  },
  methods: {
    async formSubmit() {
      this.isFormValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password === "" ||
        this.password.length < 6
      ) {
        this.isFormValid = false;
        return;
      }

      const payload = { email: this.email, password: this.password };

      this.isLoading = true;
      try {
        if (this.authMode === "login") {
          await this.$store.dispatch("login", payload);
        } else {
          await this.$store.dispatch("signup", payload);
        }
      } catch (error) {
        this.error = error.message || "Failed to authenticate!";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.authMode === "login") {
        this.authMode = "signup";
      } else {
        this.authMode = "login";
      }
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
