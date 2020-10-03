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
            <h2 label-cols-sm="2" for="mealNames">choose the required meal:</h2>
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
        <RecipePreviewList title="Your Search Results " :recipes="recipes" />
        <br />
      </div>

      <!-- gets the last query, only if there is no current search -->
      <div v-if="last_search.length != 0 && !searched">
        <RecipePreviewList title="Your Last Search Results " :recipes="last_search" />
        <br />
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
      byPopularity: true,
      search_results: [],
      search_query: "",
      sortby_selected: null,
      searchkey: 0,
      last_search: [],
      //message: "",
      searched: false,
      search_history: [],
      myMeals: {}

    };
  },

  mounted() {
    this.update();
    this.getMeals();
  },
  methods: {
    async SendSearch() {
      try {
        console.log(this.search_query);
        console.log("try send search");

        const response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/recipes/search/query/" +
            this.search_query +
            "/amount/" +
            this.num_of_results,
          {
            params: this.search_params
            //withCredentials: true,
          }
        );

        this.recipes = [];
        const results_dic = response.data;
        this.recipes.push(...results_dic);

        this.searched = true;

        console.log(this.recipes);
        //const recipe_ids = [];

        // saves user's history
        let userExists = false;
        if (this.$root.store.username) {
          let history_arr = JSON.parse(localStorage.getItem("search_history"));

          for (let i = 0; i < history_arr.length; i++) {
            if (
              this.$root.store.username == history_arr[i].username &&
              !userExists
            ) {
              history_arr[i].recipes = this.recipes;
              userExists = true;
              //this.$root.store.addSearchedRecipes(history_arr);
            }
          }

          if (!userExists) {
            //adds a new "key" (user) to the dic
            history_arr.push({
              username: this.$root.store.username,
              recipes: this.recipes
            });
          }

          this.$root.store.addSearchedRecipes(history_arr);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response);
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
          console.log("Almog")
          this.recipes = []
          const results_dic = response.data;
          this.recipes.push(...results_dic);

        this.searched = true;
        console.log(this.recipes);

      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
    },

    async sortByDuration() {
      console.log("sorting results by duration");
      this.recipes.sort(function(x, y) {
        return x.readyInMinutes - y.readyInMinutes;
      });
    },

    async sortByPopularity() {
      console.log("sorting results by popularity");
      this.recipes.sort(function(x, y) {
        return y.aggregateLikes - x.aggregateLikes;
      });
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
.container {
  // max-width: 1400px;
  display: grid;
  justify-content: space-evenly;
  // justify-content: space-around;
}

#results {
  // max-width: 20%;
}
</style>