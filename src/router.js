import { createRouter, createWebHistory } from "vue-router";

import CoachList from "./pages/coaches/CoachList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestReceived from "./pages/requests/RequestReceived.vue";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound.vue";

import store from "./store/index";

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
    {
      path: "/requests",
      component: RequestReceived,
      meta: { authRequired: true },
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { authRequired: true },
    },
    { path: "/auth", component: UserAuth, meta: { requireUnAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.authRequired && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
