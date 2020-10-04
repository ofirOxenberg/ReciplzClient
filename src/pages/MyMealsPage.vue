<template>
  <div>
    <div class="container">
      <div :key="searchkey">
        <br />
        <h1 style="text-align:centerl; color:black;">My Meals</h1>
        <br />
        <br />
        <b-row style="margin-bottom: 15px;"> 
          <b-col> 
            <br/>
                  <b-dropdown variant="primary">
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
        <h1> Your Search Results </h1>
        <br/>
        <div>
          <b-progress :value="timePassed" :max="timeLimit" show-progress animated></b-progress>    
          <b-button class="mt-3" @click="startTimer">Click me</b-button>
      </div>
      <br/>
      <RecipePreviewList :recipes="recipes" />
      </div>

      <div
        v-if="!recipes.length && searched"
        style="text-align: center; margin-left: auto;
  margin-right: auto; background-position: center; font-size: 21px;"
      >
        <strong>No results found. Try looking for a different recipe.</strong>
      </div>
      <br />
      <br />
      <br />
      <b-row></b-row>
    </div>
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
      timePassed: 45


    };
  },

  mounted() {
    this.update();
    this.getMeals();
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
          console.log(this.recipe.title)
          console.log(this.myMeals);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    },

    async meal(num) {
      try {
          const response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/users/preview/myMeals/" + num 
          );
          this.recipes = []
          var counter = 0
          var results_dic = response.data;
          results_dic.forEach(recipe => {
            counter = counter + recipe.readyInMinutes
          });
          this.recipes.push(...results_dic);

        this.searched = true;
        console.log(this.recipes);

      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
    },
    
    async startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed -= 1), 1000*60);
    },

    async calculateMealTime()
    {
      var total =[]
      const response = await this.axios.get(
        this.$root.store.BASE_URL +
        "/users/preview/myMeals/" + num 
      );
       this.totalTime =[]
      const results_dic = response.data[0].ready_in_minutes;
      this.recipe


    },

    async startMeal(){

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

#results {
  // max-width: 20%;
}
</style>