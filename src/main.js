import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import VueCookies from 'vue-cookies';
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueCookies);
Vue.use(VueRouter);

import { BProgress } from 'bootstrap-vue'
Vue.component('b-progress', BProgress)

import { BProgressBar } from 'bootstrap-vue'
Vue.component('b-progress-bar', BProgressBar)

import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)

const router = new VueRouter({
    routes,
});

const shared_data = {
    BASE_URL: "http://recip-lz-server.herokuapp.com",
    username: localStorage.username,
    login(username) {
        localStorage.setItem("username", username);
        this.username = username;
        //this.search_history = undefined;
        //localStorage.removeItem("search_history");
    },
    logout() {
        //Vue.$cookies.remove("session");
        localStorage.removeItem("username");
        this.username = undefined;

        this.search_history = "";
    },
    search_history: localStorage.search_history ?
        localStorage.search_history : [],

    addSearchedRecipes(search_history) {
        localStorage.setItem("search_history", JSON.stringify(search_history));
        this.search_history = search_history;
    },
};

router.beforeEach((to, from, next) => {
    // if there was a transition from logged in to session expired or localStorage was deleted

    // if we try to enter auth required pages and we are not authorized


    if (shared_data.username === undefined ) {
        if (to.matched.some((route) => route.meta.requiresAuth)) {
            next({ name: "login" });
        } else next();
    } else next();
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    FormRatingPlugin,
    InputGroupPlugin,
    IconsPlugin,
    SpinnerPlugin,
    AvatarPlugin,
} from "bootstrap-vue";
[
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    FormRatingPlugin,
    InputGroupPlugin,
    IconsPlugin,
    SpinnerPlugin,
    AvatarPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

try {
    axios.interceptors.request.use(
        function(config) {
            // Do something before request is sent
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
} catch (error) {
    console.log(error);
}

// Add a response interceptor
try {
    axios.interceptors.response.use(
        function(response) {
            // Do something with response data
            return response;
        },
        function(error) {
            //the user was logged in, his session is over.
            if(error.response.status == 401 && shared_data.username) {
                shared_data.logout();
                alert('You are no longer logged in to the website, please log in again');
                router.replace({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath }
                });
            }

            if(error.response.status == 402) {
                alert('The 150 free calls to spooncular API is over, Please pay for spooncular!!');
            }
            
            //the user hasn't logged in yet.
            if(error.response.status == 401) {
                logout();
                alert('Please log in to the website...');
                router.replace({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath }
                }); 
            }
            return Promise.reject(error);
        }
    );
} catch (error) {
    console.log(error);
}



Vue.use(VueAxios, axios);

Vue.config.productionTip = false;



new Vue({
    router,
    data() {
        return {
            store: shared_data,
        };
    },
    methods: {
        toast(title, content, variant = null, append = false) {
            this.$bvToast.toast(`${content}`, {
                title: `${title}`,
                toaster: "b-toaster-top-center",
                variant: variant,
                solid: true,
                appendToast: append,
                autoHideDelay: 3000,
            });
        },
    },
    render: (h) => h(App),
}).$mount("#app");
