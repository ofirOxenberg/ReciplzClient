<template  class="container">
  <div>
    <li v-for="item in recipes" :key="item.meal_name">
    <RecipePreviewList v-bind:title="item.meal_name" :recipes="item.list" />
    </li>
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
          this.$root.store.BASE_URL + "/users/preview/myMeals"
        );
        console.log("almog1")
        console.log(response.data)
        var recipes_resopnse = response.data;
        console.log("almog2")
        this.recipes = recipes_resopnse;
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