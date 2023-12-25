import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../src/components/page/HomePage"
import Appointment from "../src/components/page/appointment/Appointment.vue"
import Prescription from "../src/components/page/prescription/Prescription.vue"
import Register from "../src/components/page/Register.vue"
import Login from "../src/components/page/Login.vue"
import Record from "../src/components/page/record/Record.vue"
import Account from "../src/components/page/account/AccountManagement.vue"
import Family from "./components/page/familyMember/FamilyMembers.vue"
import axios from "axios";

const routes =  [
      {
        path: '/',
        name: "Register",
        component: Register,
        meta: { guest: true },
      },
      {
        path: '/register',
        name: "Register",
        component: Register,
        meta: { guest: true },
      },
      {
        path: '/login',
        component: Login,
        meta: { guest: true },
      },
      {
        path: '/home',
        component: HomePage,
        meta: {requiresAuth: true},
        children:[

            {
              path: "/home/appointment",
              component: Appointment,
              name: Appointment,
              meta: {requiresAuth: true},
            },
            
            {
              path: "/home/prescription",
              component: Prescription,
            },
            {
              path: "/home/health",
              component: Record,

            },
            {
              path: "/home/family",
              component: Family,
              name: Family,
            },
            {
              path: "/home/account",
              component: Account,
            },
            
        ]
      },
   
        
         
        

    
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach(async (to) => {
//   if (to.fullPath == "/login") return true;

//   const response = await axios({
//     url: "https://localhost:44371/api/Users/user",
//     method: "Get",
//   }).catch(() => {
//     return null;
//   });

//   if (!response) return "/login";
// });
  export default router;