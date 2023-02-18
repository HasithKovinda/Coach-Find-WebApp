import { createRouter, createWebHistory } from "vue-router";

import CoachList from "./pages/coaches/CoachList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestReceived from "./pages/requests/RequestReceived.vue";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachList },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetails,
      children: [
        {
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    { path: "/requests", component: RequestReceived },
    { path: "/register", component: CoachRegistration },
    { path: "/auth", component: UserAuth },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
