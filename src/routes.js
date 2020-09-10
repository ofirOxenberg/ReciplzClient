import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [{
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("./pages/RegisterPage"),
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("./pages/LoginPage"),
    },
    {
        path: "/newRecipePage",
        name: "newRecipePage",
        component: () =>
            import ("./pages/newRecipePage"),
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import ("./pages/SearchPage"),

    },
    {
        path: "/recipe/:recipeId",
        name: "recipe",
        component: () =>
            import ("./pages/RecipeViewPage"),
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("./pages/AboutPage"),
    },
    {
        path: "/myRecipes",
        name: "myRecipes",
        component: () =>
            import ("./pages/MyRecipesPage"),
    },
    {
        path: "/myFavorites",
        name: "myFavorites",
        component: () =>
            import ("./pages/MyFavoritesPage"),
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    },
];


export default routes;