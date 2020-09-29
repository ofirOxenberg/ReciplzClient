<template>
  <div class="container">
    <br />
    <br />
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
          <b-form-invalid-feedback 
          v-if="!$v.form.recipeName.required">
          Recipe name is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
          v-if="!$v.form.recipeName.alpha">
          Recipe name must contain letters only</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
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
        <b-form-invalid-feedback v-if="!$v.form.image.required">Recipe picture is required</b-form-invalid-feedback>
        </b-form-group>

        <!-- <b-form-group id="input-group-recipePreparationTime" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select
          id="PreparationTime"
          v-model="$v.form.PreparationTime.$model"
          :options="numbers"
          :state="validateState('PreparationTime')"
        ></b-form-select>
        <b-form-invalid-feedback>Recipe preparation time is required</b-form-invalid-feedback>
        </b-form-group> -->

        <b-row>
          <b-col>
            <b-form-select style="width:185px;" v-model="cuisine_chosen" :options="cuisines"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select style="width:185px;" v-model="diet_chosen" :options="diets"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select style="width:185px;" v-model="intolerance_chosen" :options="intolerances"></b-form-select>
          </b-col>
        </b-row>

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
        <b-form-invalid-feedback 
          v-if="!$v.form.instruction.required">
          Instruction are required</b-form-invalid-feedback>
        </b-form-group> 
      
        <br/>
        <br/>
        <br/>
        <b-button type="submit" variant="danger" style="width:250px;">save recipe</b-button>
    </b-form>  
</div>
</template>

<script>
import numbers from "../assets/numbers";
import cuisines from "../assets/cuisine";
import diets from "../assets/diet";
import intolerances from "../assets/intolerance";

import {
  required,
  alpha,
} from "vuelidate/lib/validators";
export default {
    data() {
      return {
        form: {
          recipeName: "",
          instruction: "",
          submitError: undefined,
          cuisine_chosen: null,
            cuisines: [{ value: null, text: "-Select Cuisine-", disabled: true }],

          diet_chosen: null,
            diets: [{ value: null, text: "-Select Diet-", disabled: true }],

          intolerance_chosen: null,
            intolerances: [{ value: null, text: "-Select Intolerance-", disabled: true }],
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
          },
          image: {
            required
          },
          // PreparationTime: {
          //     required,
          // },
          instruction:{
              required
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

<style lang="scss" scoped>
.container {
  max-width: 20000px;
  display: grid;
  justify-content: space-evenly;
}
#lable {
  font-size: 20px;
}
</style>