import axios from "axios";

export default {
  async contactCoach(context, data) {
    try {
      const newRequest = {
        userEmail: data.email,
        message: data.message,
      };

      const res = await axios.post(
        `https://coach-finnd-app-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,
        newRequest
      );
      newRequest.id = res.data.name;
      (newRequest.coachId = data.coachId),
        context.commit("addRequest", newRequest);
    } catch (error) {
      const err = new Error("Failed to Send the Request !");
      throw err;
    }
  },

  async fetchRequest(context) {
    try {
      const coachId = context.rootGetters.userId;
      const res = await axios.get(
        `https://coach-finnd-app-default-rtdb.firebaseio.com/requests/${coachId}.json`
      );
      const requests = [];

      for (const key in res.data) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: res.data[key].userEmail,
          message: res.data[key].message,
        };

        requests.push(request);

        context.commit("setRequest", requests);
      }
    } catch (error) {
      const err = new Error("Failed to Fetch requests! Try aging");
      throw err;
    }
  },
};
