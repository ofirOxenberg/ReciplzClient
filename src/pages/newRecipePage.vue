<template  class="container">
  <div>
    <b-form @submit.prevent="saveRecipe">   
        <b-form-group
        id="input-group-recipeName"
        label-cols-sm="3"
        label="Recipe Name:"
        label-for="recipeName"
        >
        <b-form-input
          id="recipeName"
          v-model="$v.form.recipeName.$model"
          type="text"
          :state="validateState('recipeName')">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="danger" style="width:250px;">save recipe</b-button>
    </b-form> 
        <!-- <b-form-group
        id="input-group-recipePic"
        label-cols-sm="3"
        label="Recipe Picture URL:"
        label-for="image"
        >
        <b-form-input
          id="image"
          v-model="$v.form.image.$model"
          type="text"
          :state="validateState('image')"
        ></b-form-input>
        <b-form-invalid-feedback>Recipe picture is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        id="input-group-recipePreparationTime"
        label-cols-sm="3"
        label="Preparation Time:"
        label-for="PreparationTime"
        >
        <b-form-input
          id="PreparationTime"
          v-model="$v.form.PreparationTime.$model"
          type="text"
          :state="validateState('PreparationTime')"
        ></b-form-input>
        <b-form-invalid-feedback>Recipe preparation time is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        id="input-group-instruction"
        label-cols-sm="3"
        label="Instruction:"
        label-for="instruction"
        >
        <b-form-textarea
          id="instruction"
          v-model="$v.form.instruction.$model"
          type="text"
          rows="6"
          max-rows="20"
          :state="validateState('instruction')"
        ></b-form-textarea>
        <b-form-invalid-feedback>Instruction is required</b-form-invalid-feedback>
        </b-form-group> -->

        <!-- <b-button type="submit" variant="danger" style="width:250px;">save recipe</b-button>
    </b-form>   -->
</div>
</template>

<script>
import {
  required,
  alpha,
} from "vuelidate/lib/validators";
export default {
    data() {
    return {
      form: {
        recipeName: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    }
    },
    validations: {
    form: {
      recipeName: {
        required,
        alpha
      }
     }
    }, 
    methods: {
        validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    saveRecipe(){
            alert("form submittesd")
    }
    }
    }

   

</script>

<style>
.container {
  max-width: 20000px;
  display: grid;
  justify-content: space-evenly;
}
#lable {
  font-size: 20px;
}
</style>