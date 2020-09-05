<template>
  <RecipePreviewList title="Last watched recipes" :recipes="recipes" :homePage="true" />
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
      if (this.$root.store.username) {
        try {
          const response = await this.axios.get(
            this.$root.store.BASE_URL + "/users/my_last_watched"
          );
          var recipes_resopnse = response.data;
          this.recipes = [];
          var _recipes = [];
          _recipes.push(...recipes_resopnse);
          this.recipes = _recipes;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script> 