import axios from "axios";

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    await axios.put(
      `https://coach-finnd-app-default-rtdb.firebaseio.com/${userId}.json`,
      coachData
    );

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context) {
    try {
      const res = await axios.get(
        "https://coach-finnd-app-default-rtdb.firebaseio.com/coaches.json"
      );

      const coaches = [];

      for (const key in res.data) {
        const coach = {
          id: key,
          firstName: res.data[key].firstName,
          lastName: res.data[key].lastName,
          description: res.data[key].description,
          hourlyRate: res.data[key].hourlyRate,
          areas: res.data[key].areas,
        };
        coaches.push(coach);
      }
      console.log(coaches);
      context.commit("setCoaches", coaches);
    } catch (error) {
      const err = new Error("Failed to Fetch! Try aging");
      throw err;
    }
  },
};
