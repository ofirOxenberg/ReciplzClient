<template>
  <div>
    <RecipePreviewList v-if="!showMsg" title="Last watched recipes" :recipes="recipes" :homePage="true" />
    <h1 v-else-if="showMsg">There arent any last watched recipes</h1> 
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
      recipes: [],
      showMsg: false,
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
          this.showMsg= false;
        
        } catch (error) {
          this.showMsg= true;
          console.log(error)

        }
      }
      else{
        this.showMsg= true;
      }
    }
  }
};
</script> 