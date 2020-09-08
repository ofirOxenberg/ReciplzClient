<template>
  <div>
    <h1 v-if="showMsg">hi</h1>
    <RecipePreviewList v-else title="Last watched recipes" :recipes="recipes" :homePage="true" />
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
      showMsg 
    };
  },
  props: {
    showMsg: {
      type: Boolean,
      required: false,
      default: false
    },
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
          console.log(error);
        }
      }
    }
  }
};
</script> 