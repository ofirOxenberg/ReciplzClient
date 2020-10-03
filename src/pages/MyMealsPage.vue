<template  class="container">
  <div>
    <li v-for="item in recipes" :key="item.meal_name">
    <MealPreviewList v-bind:title="item.meal_name" :recipes="item.list" />
    </li>
    <br/>
    
  </div>
</template>

<script>
import MealPreviewList from "../components/MealPreviewList";

export default {
  components: {
    MealPreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const meal_id = "0F70D914-3712-46E1-A3E5-48CEA53E6FE7"
        const response = await this.axios.get(
          this.$root.store.BASE_URL +
           "/users/myMealRecipes" +
            "[" +
              meal_id +
              "]"
        );
        var recipes_resopnse = response.data;
        this.recipes = [];
        this.recipes.push(...recipes_resopnse);
      } catch (error) {
        console.log("almog catch")
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>