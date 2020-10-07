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
              <b-dropdown variant="outline-danger">
                <template v-slot:button-content>
                  <b-icon icon="b-icon-clipboard-plus" aria-hidden="true"></b-icon> Choose meal
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
        <h1>Recipes in your meal:</h1>
        <br/>
        <!-- <b-progress :max="timeLimit" variant="danger" show-progress animated>
          <b-progress-bar :value="timePassed">
            <span>Minutes: <strong>{{timePassed}}</strong></span>
          </b-progress-bar>
        </b-progress>     -->
          <b-button class="mt-3" @click="startMeal">Start meal</b-button>
        <br/>
        <div>
          <RecipePreviewProList :recipes="recipes" />
        </div>
      </div>
      <!-- <div
        v-if="!recipes.length && searched"
        style="text-align: center; margin-left: auto;
        margin-right: auto; background-position: center; font-size: 21px;"
      ><strong>No results found. Try looking for a different recipe.</strong>
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
      //message: "",
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
      //
    }
  },
  methods: {
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
            recipesForMeal.push(recipe.id);
          });
          window.localStorage.setItem('recipesForMeal', recipesForMeal);

          this.recipes = []
          var counter = 0
          var results_dic = response.data;
          window.localStorage.removeItem('Recipies');

          window.localStorage.setItem('Recipies',JSON.stringify(response))
          results_dic.forEach(recipe => {
            counter = counter + recipe.readyInMinutes
          });
          this.timePassed= counter
          this.recipes.push(...results_dic);

        this.searched = true;
        console.log(this.recipes);

      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
    },

    async startMeal(){
      var recipes = window.localStorage.getItem('recipesForMeal');
      if(recipes.length >= 1) {
          window.localStorage.setItem('currentRecipe', 0);
          this.$router.push(`/recipeWithProgress/${recipes[0]}`).catch(() => {
          this.$forceUpdate();
        }); 
      }

    },
    
    // async startTimer() {
    //   window.localStorage.removeItem('recipeTimer');
    //   window.localStorage.setItem('recipeTimer',this.timePassed);
    //   this.timerInterval = setInterval(() => {
    //     this.timePassed -= 1; 
    //     if(this.timePassed <= 0){
    //       localStorage.setItem("recipeTimer", 0)
    //     }else{
    //       localStorage.setItem("recipeTimer", this.timePassed)
    //     }
    //     }, 1000*60);
    // },

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