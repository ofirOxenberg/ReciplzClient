<template>
  <div class="container">
    <br/>
    <v-btn @click="moveTo">Creat New Recipe</v-btn>
    <RecipePreviewList v-if="!showMsg" title="My Recipes Page" :recipes="recipes" :privateRecipes="true" />
    <h1 v-else-if="showMsg">There arent any private recipes</h1> 
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: [],
      showMsg: false
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
            this.$root.store.BASE_URL + "/users/my_recipes"
          );
          var recipes_array = response.data;
          for (let index = 0; index < recipes_array.length; index++) {
            var family_recipe = new Object();
            family_recipe.id = recipes_array[index][0].recipe_id;
            family_recipe.title = recipes_array[index][0].recipe_name;
            family_recipe.readyInMinutes = recipes_array[index][0].ready_in_minutes;
            family_recipe.aggregateLikes = recipes_array[index][0].likes;
            family_recipe.vegan = recipes_array[index][0].vegan;
            family_recipe.vegetarian = recipes_array[index][0].vegetarian;
            family_recipe.glutenFree = recipes_array[index][0].gluten_free;
            family_recipe.image = recipes_array[index][0].image;
            family_recipe.instructions = recipes_array[index][0].instructions;
            family_recipe.servings = recipes_array[index][0].amount_of_servings;
            family_recipe.ingredients = recipes_array[index][0].ingredients;
            family_recipe.author_username = recipes_array[index][0].author_username;
            family_recipe.occasion = recipes_array[index][0].occasion;
            family_recipe.recipe_owner = recipes_array[index][0].recipe_owner;
            this.recipes.push(family_recipe);
            this.showMsg= false;
            console.log("eror");
          }
        } catch (error) {
          console.log("eror2");
          this.showMsg= true;
          // this.$router.push("/").catch(() => {
          //   this.$forceUpdate();
          // });
        }
      }else{
        console.log("eror3");
        this.showMsg= true;
      }
    },
    moveTo(){
      this.$router.push("/newRecipePage");
    }
  }
};
</script>

