<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="errorHandler"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in requestsReceived"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't Received any request</h3>
    </base-card>
  </div>
</template>

<script>
import RequestItem from "../../components/requtes/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    requestsReceived() {
      return this.$store.getters["requests/requests"];
    },

    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.fetchRequest();
  },
  methods: {
    async fetchRequest() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("requests/fetchRequest");
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
