<template  class="container">
  <div>
    <br/>
    <br/>
    <RecipePreviewList title="My Favorites" :recipes="recipes" />
    <br/>
    <br/>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";

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
          this.$root.store.BASE_URL + "/users/preview/my_favorites"
        );
        var recipes_resopnse = response.data;
        this.recipes = [];
        this.recipes.push(...recipes_resopnse);
      } catch (error) {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>

