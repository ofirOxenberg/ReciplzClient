<template>
  <div v-if="recipes.length==0" class="d-flex justify-content-center mb-3">
    <b-spinner style="width: 6rem; height: 6rem; align-items:center;" variant="dark"></b-spinner>
  </div>
  <div v-else class="d-flex flex-column justify-content-center mb-3">
    <div v-if="homePage">
      <br />
      <h3 style="text-align:center">{{ title }}:</h3>
      <br />
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :privateRecipes="privateRecipes" />
      </div>
    </div>
    <div v-else>
      <h3 style="text-align:center">{{ title }}:</h3>
      <br />
      <div class="row" flex-grow-1 v-for="(group, i) in recipeGroups" :key="group">
        <div
          class="col"
          v-for="(r, index) in recipes.slice(i * recipesPerRow, (i+1) * recipesPerRow)"
          :key="index"
        >
          <RecipePreview :privateRecipes="privateRecipes" :myRecipes="myRecipes" :recipe="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
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
    },
    recipesPerRow: {
      type: Number,
      default: 4
    },
    homePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipesInfo: []
    };
  },
  // created() {
  //   this.update();
  // },
  computed: {
    recipeGroups() {
      return Array.from(
        Array(Math.ceil(this.recipes.length / this.recipesPerRow)).keys()
      );
    }
  
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 40px;
}
.text-center {
  align-items: center;
  justify-content: center;
}
</style>