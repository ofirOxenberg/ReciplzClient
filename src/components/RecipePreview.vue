<template>
  <div class="main-preview">
    <h5
      style="text-align: center; font-weight: bold; font-size: 24px;"
      :title="recipe.title"
      class="recipe-title"
    >{{ recipe.title }}</h5>
    <br>
    <!-- family recipes -->
    <router-link
      v-if="privateRecipes"
      :to="{ name: 'recipe', params: { recipeId: recipe.id,
    privateRecipes: true
     } }"
      class="recipe-body"
    >
      <div class="recipe-body">
        <img :src="recipe.image" style="width: 60%;height: auto;" class="recipe-image" id="image" />
      </div>
    </router-link>
    <!-- family recipes -->

    <!-- My recipes -->
    <router-link
      v-else-if="myRecipes"
      :to="{ name: 'recipe', params: { recipeId: recipe.id,
    myRecipes: true
     } }"
      class="recipe-body"
    >
      <div class="recipe-body">
        <img :src="recipe.image" style="width: 60%;height: auto;" class="recipe-image" id="image" />
      </div>
    </router-link>
    <!-- My recipes -->

    <!-- API recipes -->
    <router-link
      v-else
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-body"
    >
      <div class="recipe-body">
        <img :src="recipe.image" style="width: 60%;height: auto;" class="recipe-image" id="image" />
      </div>
    </router-link>
    <!-- API recipes -->

    <div>
      <div class="recipe-preview">
        <table class="center">
          <tr>
            <td class="img">
              {{ recipe.readyInMinutes }}
            </td>
            <td class="img">
              <img src="../assets/clock.png" />
            </td>
            <td class="img">
              {{ recipe.aggregateLikes }}
            </td>
            <td class="img">
              <img style="width: 30px; height: 30px;" src="../assets/like.png" />
            </td>
          </tr>
          <tr v-if="this.$root.store.username != undefined" style="text-align:center;">
              <!-- v-if="this.$root.store.username != undefined && !privateRecipes && !myRecipes" -->
              <td v-if=" saveTheRecipe == true || saved == true" class="center">
                <b-icon-heart-fill variant="danger"></b-icon-heart-fill>
              </td>
               <td v-else class="center">
                <b-icon-heart @click="heart"></b-icon-heart>
              </td>

              <td class="img" v-if="watched">
                <img class="center" src="../assets/visible.png" />
              </td>
              <td class="img" v-if="recipe.glutenFree">
                <img class="center" src="../assets/no-gluten.png" />
              </td>
              <td class="img" v-if="recipe.vegan">
                <img class="center" src="../assets/vegan-food.png" />
              </td>
              <td class="img" v-if="recipe.vegetarian">
                <img class="center" src="../assets/vegetarian-food-symbol.png" />
              </td>
               <!-- <template>
                <div>
                  <b-dropdown variant="outline-danger">
                    <template v-slot:button-content>
                      <b-icon icon="b-icon-clipboard-plus" aria-hidden="true"></b-icon> Add To Meal
                    </template>

                        <b-dropdown-group class="small">
                          <li v-for="item in myMeals" :key="item.meal_id">
                          <b-dropdown-item-button @click="meal(item.meal_id)">
                            <b-icon icon="blank" aria-hidden="true"></b-icon>
                            {{item.name}} Meal 
                            <td v-if="item.flag">
                              <span class="sr-only">(Selected)</span>
                            </td>
                            <td v-else>
                              <span class="sr-only">(Not selected)</span>
                            </td>
                          </b-dropdown-item-button>
                          </li>
                        </b-dropdown-group>
                        <b-dropdown-divider></b-dropdown-divider>
                        <input v-model="mealName" placeholder="Enter new meal name">
                       <b-dropdown-item-button variant="danger" @click="createMeal(mealName)">
                          <b-icon icon="clipboard-plus" aria-hidden="true"></b-icon>
                          Create new meal
                      </b-dropdown-item-button>
                  </b-dropdown>
                </div>
              </template> -->
          </tr>    
          <tr v-else>
            <td v-if="recipe.glutenFree" class="img">
              <img class="center img" src="../assets/no-gluten.png" />
            </td>
            <td v-if="recipe.vegan" class="img">
              <img class="center img" src="../assets/vegan-food.png" />
            </td>
            <td v-if="recipe.vegetarian" class="img">
              <img class="center img" src="../assets/vegetarian-food-symbol.png" />
            </td>
          </tr>
          <tr v-if="this.$root.store.username != undefined" style="text-align:center;">
            <template>
                <div style="margin-top: 10px;">
                  <b-dropdown variant="outline-danger">
                    <template v-slot:button-content>
                      <b-icon icon="b-icon-clipboard-plus" aria-hidden="true"></b-icon> Add To Meal
                    </template>

                        <b-dropdown-group class="small">
                          <li v-for="item in myMeals" :key="item.meal_id">
                          <b-dropdown-item-button @click="meal(item.meal_id)">
                            <!-- v-if="isInMeal" -->
                            <b-icon icon="check" aria-hidden="true"></b-icon>
                            {{item.name}} Meal 
                          </b-dropdown-item-button>
                          </li>
                        </b-dropdown-group>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-group>
                        <input v-model="mealName" placeholder="Enter new meal name">
                      <b-dropdown-item-button variant="danger" @click="createMeal(mealName)">
                          <b-icon icon="clipboard-plus" aria-hidden="true"></b-icon>
                          Create new meal
                      </b-dropdown-item-button>
                      </b-dropdown-group>
                  </b-dropdown>
                </div>
            </template>
          </tr>
        </table>
      </div>
      <br />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      saveTheRecipe: false,
      watched: false,
      saved: false,
      mealRecipe: false,
      isInMeal: null,
      myMeals: {}
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    privateRecipes: {
      type: Boolean,
      required: false,
      default: false
    },
    myRecipes: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    this.update();
    //this.getMeals();
  },
  methods: {
    async update() {
      if (this.$root.store.username != undefined) {
        try {
          const watch_and_save_response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/recipeInfo/" +
              "[" +
              this.recipe.id +
              "]"
          );
          this.watched = watch_and_save_response.data[this.recipe.id].watched;
          this.saved = watch_and_save_response.data[this.recipe.id].saved;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    },
    async heart() {
      if(this.saveTheRecipe == ture)
      {
      try{
        this.saveTheRecipe = false;
          if (this.$root.store.username != undefined) {
          await this.axios.put(
            this.$root.store.BASE_URL +
              "/users/remove_from_favorites/recipeId/" +
              this.recipe.id
          );
        }
      }catch (error) {
        console.log("error.response.status", error.response.status);
        return;
      }
      }else{
        this.saveTheRecipe = true;
        try {
          if (this.$root.store.username != undefined) {
            await this.axios.put(
            this.$root.store.BASE_URL +
              "/users/add_to_favorites/recipeId/" +
              this.recipe.id
          );
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        return;
      }

      }
      
      
    
    },
    async getMeals() {
      try {
        if (this.$root.store.username != undefined) {
          var isInMealBoolean = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/getRecipesMealsFlags/"+this.recipe.id+'/'+item.meal_id
          );
          this.isInMeal = isInMealBoolean;

          this.myMeals = mealsListRes.data;
          console.log("flag test")
          console.log(isInMealBoolean)
          console.log(this.isInMeal);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    },
    async meal(num) {
      this.mealRecipe = true;
      //this.getMeals();
      try {
        if (this.$root.store.username != undefined) {
          //this.myMeals[num].flag = true;
          await this.axios.put(
            this.$root.store.BASE_URL +
              "/users/recipesForMeal/recipeId/" +
              this.recipe.id +'/'+num
          );
          alert("The recipe was saved successfully")
          this.$router.go(0).catch(() => {
          this.$forceUpdate();})
        }
      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
    },
    async createMeal(mealName) {

      try {
        if (this.$root.store.username != undefined) {
          
          var response = await this.axios.put(
            this.$root.store.BASE_URL +
              "/users/creat_meal/" + mealName
          );

          this.myMeals[response.data] = {name : mealName, meal_id : response.data, flag : true};
          alert("The meal created successfully")
          this.$router.go(0).catch(() => {
          this.$forceUpdate();})
        }
      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
    }
    
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.main-preview {
  text-align: center;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  background-position: center;
  /* box-shadow: 0px 0px 10px 10px #d1d1e9; */
}
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  font-weight: bold;
  text-align: center;
}
.recipe-preview > .recipe-body {
  width: 100px;
  height: 100px;
  position: relative;
}
.recipe-preview .recipe-body .recipe-image {
  /* margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto; */
  display: block;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 20px;
  width: 20px;
  height: 20px;
  opacity: 0.5;
}
.recipe-image:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px rgb(255, 255, 255);
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
  font-size: 28pt;
  font-weight: bold;
  font-family: "calibri";
  color: white;
  font-weight: bold;
}
.recipe-preview .recipe-footer .recipe-title {
  font-weight: bold;
  padding: 15px 15px;
  width: 100%;
  font-size: 30pt;
  font-family: "calibri";
  color: white;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  margin-top: 60px;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  font-weight: bold;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  font-weight: bold;
}
.col {
  border-style: solid;
  border-width: 0.5px;
  color: white;
  width: 50%;
  font-weight: bold;
  padding: 20px 30px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.img{
  width: 30px;
  height: 30px; 
  padding-right: 10px; 
  display: inline;
}
#image {
  height: 250px;
  width: 320px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  /* align-content: center; */
}
#ppp {
  opacity: 0;
}
#td {
  /* align-content: center; */
  /* margin-left: auto;
  margin-right: auto; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* #logo {
   margin-left: auto;
  margin-right: auto;
    align-content: center;
} */
#image_div {
  /* width: 100%;
  height: 100%; */
  margin-left: auto;
  margin-right: auto;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.padding{
  padding-right: 10px;
}
</style>