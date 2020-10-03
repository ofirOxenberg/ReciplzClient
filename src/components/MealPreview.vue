<template>  

  <div class="container">
    <br/>
    <!-- <RecipePreviewList title="My meal Page" :recipes="recipes" /> -->
    <!-- Change to meal name -->
    <h5
      style="text-align: center; font-weight: bold; font-size: 24px;"
      :title="meal.title"
      class="meal-name"
    >{{ recipe.title }}</h5>

    <router-link
      v-if="privateRecipes"
      :to="{ name: 'recipe', params: { recipeId: recipe.id,
    privateRecipes: true
     } }"
      class="recipe-body"
    >
      <div class="recipe-body">
        <img :src="recipe.image" class="recipe-image" id="image" />
      </div>
    </router-link>
  </div>
</template>

<script>
//import RecipePreviewList from "./RecipePreviewList";

export default {
//   components: {
//     RecipePreviewList
//   },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
          const meal_id_try = "0F70D914-3712-46E1-A3E5-48CEA53E6FE7"
        const response = await this.axios.get(
          this.$root.store.BASE_URL +
           "/users/myMealRecipes" +
              meal_id_try
        );
        console.log(response)
        var recipes_resopnse = response.recipe_id;
        this.recipes = [];
        this.recipes.push(...recipes_resopnse);
      } catch (error) {
        console.log("almog catch")
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>

<style scoped>
.meal-name {
  font-weight: bold;
  padding: 15px 15px;
  width: 100%;
  font-size: 30pt;
  font-family: "calibri";
  color: white;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  margin-top: 60px;
}
</style>