
<template>
  <div class="container">
    <div v-if="recipe">
      <br />
      <br />
      <div class="recipe-header mt-3 mb-4">
        <h1 style="text-align:center; color:black;">{{ recipe.title }}</h1>
        <br />
        <img :src="recipe.image" style="width: 70%;height: auto;" class="center" />
      </div>
      <br />
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>
                <div v-if="recipe.vegan">
                  Vegan:
                  <img class="sizeLimit" src="../assets/V.png" />
                </div>
                <div v-else>
                  Vegan:
                  <img class="sizeLimit" src="../assets/x.png" />
                </div>
              </div>
              <div>
                <div v-if="recipe.vegetarian">
                  Vegetarian:
                  <img class="sizeLimit" src="../assets/V.png" />
                </div>
                <div v-else>
                  Vegetarian:
                  <img class="sizeLimit" src="../assets/x.png" />
                </div>
              </div>
              <div>
                <div v-if="recipe.glutenFree">
                  GlutenFree:
                  <img class="sizeLimit" src="../assets/V.png" />
                </div>
                <div v-else>
                  GlutenFree:
                  <img class="sizeLimit" src="../assets/x.png" />
                </div>
              </div>
              <div>Servings: {{ recipe.servings }}</div>

              <div v-if="this.$route.params.privateRecipes">
                <!-- <div>Autour Name: {{ recipe.author_username }}</div>
                <div>Occasion: {{ recipe.occasion }}</div>
                <div>Recipe Owner: {{ recipe.recipe_owner }}</div> -->
              </div>
            </div><span style="font-weight: bold">Ingredients:</span>:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.name + '_' + r.amount  + '_' + r.unit"
              >
                {{ r.name }} ,
                {{ r.amount }}
                {{ r.unit }}
              </li>
            </ul>
          </div>

          <div
            v-if="this.$route.params.privateRecipes || this.$route.params.myRecipes "
            class="wrapped"
          >
            <span style="font-weight: bold">Instructions:</span>
            <ul>
              <li
                v-for="(r, index) in recipe.instructions"
                :key="index + '_' + r.step + '_' + r.instruction"
              >{{ r.instruction }}</li>
            </ul>
          </div>
          <div v-else class="wrapped">
            <span style="font-weight: bold">Instructions:</span>
            <p>
              <span v-html="recipe.instructions"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        if (this.$route.params.privateRecipes || this.$route.query.isPrivate) {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/my_recipes/recipeId/" +
              this.$route.params.recipeId
          );
          this.recipe = new Object();
          this.recipe.title = response.data[0].recipe_name;
          this.recipe.readyInMinutes = response.data[0].ready_in_minutes;
          this.recipe.aggregateLikes = response.data[0].likes;
          this.recipe.vegan = response.data[0].vegan;
          this.recipe.vegetarian = response.data[0].vegetarian;
          this.recipe.glutenFree = response.data[0].gluten_free;
          this.recipe.image = response.data[0].image;
          this.recipe.instructions = response.data[0].instructions;
          this.recipe.servings = response.data[0].amount_of_servings;
          this.recipe.ingredients = response.data[0].ingredients;
          this.recipe.author_username = response.data[0].author_username;
          this.recipe.occasion = response.data[0].occasion;
          this.recipe.recipe_owner = response.data[0].recipe_owner;
          return;
        } else if (this.$route.params.myRecipes) {
          console.log("my recipes!!!");
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/fullview/my_recipes/recipeId/" +
              this.$route.params.recipeId
          );
          console.log(response);
          const keys = Object.keys(response.data);
          console.log(keys);
          this.recipe = new Object();
          this.recipe.title = response.data[[keys[0]]].recipe_name;
          this.recipe.readyInMinutes =
            response.data[[keys[0]]].ready_in_minutes;
          this.recipe.aggregateLikes = response.data[[keys[0]]].likes;
          this.recipe.vegan = response.data[[keys[0]]].vegan;
          this.recipe.vegetarian = response.data[[keys[0]]].vegetarian;
          this.recipe.glutenFree = response.data[[keys[0]]].gluten_free;
          this.recipe.image = response.data[[keys[0]]].image;
          this.recipe.instructions = response.data[[keys[0]]].instructions;
          this.recipe.servings = response.data[[keys[0]]].amount_of_servings;
          this.recipe.ingredients = response.data[[keys[0]]].ingredients;
          return;
        } else {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/recipes/fullview/recipeId/" +
              this.$route.params.recipeId
          );
          if (this.$root.store.username != undefined) {
            await this.axios.put(
              this.$root.store.BASE_URL +
                "/users/add_to_watched/recipeId/" +
                this.$route.params.recipeId
            );
          }
        }

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        instructions,
        ingredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      } = response.data[0];
      let _recipe = {
        instructions,
        ingredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      };
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 250px; */
  /* height: auto; */
  align-content: center;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
}
.sizeLimit{
  width: 30px;
  height: 30px; 
}
</style>