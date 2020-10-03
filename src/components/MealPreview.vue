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
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/users/preview/myMeals"
        );
        var recipes_resopnse = response.data;
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