<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="errorHandler"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <filter-coach @change-filter="setFilters"></filter-coach>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button link to="/auth" v-if="!isLoggedIn">Login</base-button>
          <base-button
            v-if="isLoggedIn && !isCoach && !this.isLoading"
            link
            to="/register"
            >Register As a coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filtersCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard.vue";
import CoachItem from "../../components/coach/CoachItem.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import FilterCoach from "./../../components/coach/FilterCoach.vue";
export default {
  components: { CoachItem, BaseCard, BaseButton, FilterCoach },
  data() {
    return {
      isLoading: false,
      error: null,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },

    filtersCoaches() {
      const coach = this.$store.getters["coaches/coaches"];

      return coach.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes("frontend"))
          return true;
        if (this.filters.backend && coach.areas.includes("backend"))
          return true;
        if (this.filters.career && coach.areas.includes("career")) return true;
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
    },
    async loadCoaches() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (error) {
        this.error = error.message || "Something went wrong";
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
