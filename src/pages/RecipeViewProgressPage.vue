<template>
  <div class="container">
      <div>
        <br />
        <br />
        <br />
        <br />
      <b-progress :max="timeLimit" variant="danger" show-progress animated>
        <b-progress-bar :value="recipeTotalTime">
          <span>Minutes: <strong>{{recipeTotalTime}}</strong></span>
        </b-progress-bar>
        <br/>
      </b-progress> 
      <div style="text-align:center">
      <b-button class="next-back" variant="danger" @click="backRecipe">Previous recipe</b-button>
      <b-button class="next-back" variant="danger" @click="nextRecipe">Next recipe</b-button>
      </div>

      </div>
      <br/>
      <br />
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 style="text-align:center; color:black;">{{ recipe.title }}</h1>
        <br />
        <img :src="recipe.image" style="display: block; margin: 0 auto;" /> 
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
            </div><span style="font-weight: bold"> Ingredients:</span>
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
          ><span style="font-weight: bold">Instructions:</span>
            <ul>
              <li
                v-for="(r, index) in recipe.instructions"
                :key="index + '_' + r.step + '_' + r.instruction"
              >{{ r.instruction }}</li>
            </ul>
          </div>
          <div v-else class="wrapped">
            Instructions:
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
    var recipes = JSON.parse(window.localStorage.getItem('recipesForMeal'));
    var current = window.localStorage.getItem('currentRecipe');   
    return {
      recipe: null,
      recipeTotalTime: recipes[current].readyInMinutes,
      recipes: recipes,
      timeLimit: 0,
    };
  },
  mounted(){
  //this.recipeTotalTime = window.localStorage.getItem("recipeTimer");  
  setInterval(()=>{
      if(this.recipeTotalTime <= 0){
          this.recipeTotalTime = 0;
        }else{
          this.recipeTotalTime = this.recipeTotalTime - 1;
        }
  }, 60*1000)

    //this.startProgress();
    this.created();

  },
  methods:{
  async nextRecipe(){
    var currentItem = window.localStorage.getItem('currentRecipe');
    var curr = parseInt(currentItem);
    if(curr === this.recipes.length -1 ) {
      alert("The meal has ended!");
    }
    else {
      var curr = parseInt(currentItem);
      curr = curr + 1;
      window.localStorage.setItem('currentRecipe', curr);
      window.location.href=`http://recip-lz.herokuapp.com/#/recipeWithProgress/${this.recipes[curr].id}`
      this.$router.go(0)
    }  
  },

  async backRecipe(){
    var currentItem = window.localStorage.getItem('currentRecipe');
    if(currentItem === "0") {
      alert("You are already in the first recipe of this meal");
    }
    else {
      var curr = parseInt(currentItem);
      curr = curr - 1;
      window.localStorage.setItem('currentRecipe', curr);
      window.location.href=`http://recip-lz.herokuapp.com/#/recipeWithProgress/${this.recipes[curr].id}`
      this.$router.go(0)
    }  
  },

  async created() {
    try {
      let response;
      try {
        if (this.$route.params.privateRecipes) {
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

        if (response.status !== 200){
          this.$router.replace("/NotFound");}

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

}}



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
.next-back{
  margin-right: 7px;
  margin-left: 7px;
}
.center{
  position: absolute;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.relative{
  position: relative;
}
.sizeLimit{
  width: 30px;
  height: 30px; 
}
</style>



