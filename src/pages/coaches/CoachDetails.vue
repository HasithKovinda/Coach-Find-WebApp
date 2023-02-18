<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isSelected: null,
    };
  },

  created() {
    this.isSelected = this.$store.getters["coaches/coaches"].find(
      (coach) => coach.id === this.id
    );
  },

  computed: {
    fullName() {
      return this.isSelected.firstName + "" + this.isSelected.lastName;
    },
    contactLink() {
      return this.$route.path + "/" + "contact";
    },
    rate() {
      return this.isSelected.hourlyRate;
    },
    areas() {
      return this.isSelected.areas;
    },
    description() {
      return this.isSelected.description;
    },
  },
};
</script>

<style></style>
