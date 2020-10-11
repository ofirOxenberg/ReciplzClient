<template>
  <div class="container">
    <div>
      <div :key="searchkey">
        <br />
        <h1 style="text-align:center; color: black;">My Meals</h1>
        <br />
        <br />
        <b-row style="margin-bottom: 15px;"> 
          <b-col> 
            <br/>
              <b-dropdown variant="outline-dark">
                <template v-slot:button-content>
                  <b-icon icon="b-icon-clipboard-plus" aria-hidden="true"></b-icon>Choose meal
                </template>
                  <b-dropdown-group header="Choose options" class="small">
                    <li v-for="item in myMeals" :key="item.meal_id">
                    <b-dropdown-item-button @click="meal(item.meal_id)">
                      <b-icon icon="blank" aria-hidden="true"></b-icon>
                      Meal {{item.name}} 
                      <td v-if="item.flag">
                        <span class="sr-only">(Selected)</span>
                      </td>

                      <td v-else>
                        <span class="sr-only">(Not selected)</span>
                      </td>
                    </b-dropdown-item-button>
                    </li>
                  </b-dropdown-group>
              </b-dropdown>
          </b-col>
        </b-row>
        <br />
        <br />
        <br />
        <b-row>
        </b-row>
      </div>
    </div>
    <div>
      <div v-if="recipes.length">
        <h1 style="text-align: center;">Recipes in the meal:</h1>
        <br/>
          <b-button class="mt-3" variant="dark" @click="startMeal">Start meal</b-button>
        <div>
          <br/>
          <b-button variant="link" @click="deleteMeal">Delete meal permanently</b-button>
        </div>
        <br/>
        <br/>
        <div>
          <RecipePreviewProList :recipes="recipes" :privateRecipes="true" />
        </div>
      </div>
      <!-- <div v-else>
        <h2>There is no recipes in that meal</h2>
      </div> -->
      <br />
    </div>
  </div>
</template>

<script>
import RecipePreviewProList from "../components/RecipePreviewProList.vue";

export default {
  components: {
    RecipePreviewProList
  },
  data() {
    return {
      recipes: [],
      totalTime: [],
      byPopularity: true,
      search_results: [],
      search_query: "",
      searchkey: 0,
      last_search: [],
      searched: false,
      myMeals: {},
      timeLimit: 0,
      timePassed: 2
    };
  },

  mounted() {
    this.update();
    this.getMeals();
    const meailId = window.localStorage.getItem('selectedMeal');
    if(meailId){
      this.meal(meailId);
    }
  },
  methods: {
    async deleteMeal(){
      try{
        var selectedMeal = window.localStorage.getItem('selectedMeal')
        const response = await this.axios.get(
        this.$root.store.BASE_URL +
          "/users/delete_meal/" + selectedMeal 
        );
        if(response.data.success){
          alert(response.data.message);
          this.$router.go(0);
        }else{
          alert("The meal wasnt deleted");
        }
      }catch (error) {
        console.log(error);
        return;
      }
    },

    async getMeals() {
      try {
        if (this.$root.store.username != undefined) {
          var mealsListRes = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/myMeals"
          );
          
          this.myMeals = mealsListRes.data;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    },

    async meal(num) {
      try {
          window.localStorage.setItem('selectedMeal',num)
          const response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/preview/myMeals/" + num 
          );
          //save recepies ids in local storage
          var recipesForMeal = [];
          response.data.forEach((recipe) => {
            recipesForMeal.push({id:recipe.id,readyInMinutes:recipe.readyInMinutes});
          });
          var allRecipesInMeal = JSON.stringify(recipesForMeal);
          window.localStorage.setItem('recipesForMeal', allRecipesInMeal);

          this.recipes = []
          var counter = 0
          var results_dic = response.data;
          window.localStorage.removeItem('Recipies');

          window.localStorage.setItem('Recipies',JSON.stringify(response))
          results_dic.forEach(recipe => {
            counter = counter + recipe.readyInMinutes
          });
          console.log('results_dic',results_dic);
          this.timePassed= counter
          this.recipes = results_dic.map(r => {
            if(Array.isArray(r)){
              let obj =  r[0];
              obj.readyInMinutes = Number(obj.ready_in_minutes);
              obj.title = obj.recipe_name;
              return obj;
            } 
            return r;
          });

        this.searched = true;
        console.log(this.recipes);

      } catch (error) {
          console.log("error.response.status", error);
          return;
      }
    },

    async startMeal(){
      var recipes = window.localStorage.getItem('recipesForMeal');
      var recipesObject = JSON.parse(recipes);
      if(recipes.length >= 1) {
          window.localStorage.setItem('currentRecipe', 0);
          this.$router.push(`/recipeWithProgress/${recipesObject[0].id}`).catch(() => {
          this.$forceUpdate();
        }); 
      }

    },

    async update() {
      //this.search_history = undefined;
      //this.last_search = this.$root.store.search_history;

      this.searched = false;

      if (this.$root.store.username) {
        if (this.$root.store.search_history.length == 0) {
          // no history
          this.$root.store.addSearchedRecipes([
            {
              username: this.$root.store.username,
              recipes: []
            }
          ]);
        } else {
          // user already has history
          let history_arr = JSON.parse(localStorage.getItem("search_history"));
          for (let i = 0; i < history_arr.length; i++) {
            // try to find the correct user.
            if (this.$root.store.username == history_arr[i].username) {
              // found
              this.last_search.push(...history_arr[i].recipes);
            }
          }
        }
      }
    }
  },

};
</script>

<style lang="scss" scoped>

</style>