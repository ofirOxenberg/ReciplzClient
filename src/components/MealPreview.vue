<template  class="container">
  <div>
    <br/>
    <RecipePreviewList title="My meal Page" :recipes="recipes" />
  </div>
</template>


<script>
import RecipePreviewList from "./RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
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