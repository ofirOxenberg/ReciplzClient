<template>
  <div class="container">
    <br />
    <br />
    <h1 style="text-align: center;">Create new recipe</h1>
    <br/>
    <br/>
    <br/>
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
          v-if="!$v.form.recipeName.$model">
          Recipe name is required</b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group 
          id="input-group-serving" 
          label-cols-sm="3" 
          label="Number of servings:" 
          label-for="serving">
            <b-form-select 
            id="serving"
            v-model="$v.form.serving.$model" 
            style="width:100px;"
            :options="serving"
            :state="validateState('serving')"
            ></b-form-select>
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
        <b-form-invalid-feedback v-if="!$v.form.image.url">Profile picture must be valid URL</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group 
        id="input-group-ready_in_minutes" 
        label-cols-sm="3" 
        label="Preparation time in Minutes:" 
        label-for="ready_in_minutes">
        <b-form-select
          id="ready_in_minutes"
          v-model="$v.form.ready_in_minutes.$model"
          :options="minutes"
          :state="validateState('ready_in_minutes')"
        ></b-form-select>
        <b-form-invalid-feedback>Recipe preparation time is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        id="input-group-ingredients"
        label-cols-sm="3"
        label="ingredients:"
        label-for="ingredients"
        ><textarea
          rows="3"
          max-rows="25"
          class="textarea"
          style="resize: vertical"
          id="ingredients"
          v-model="$v.form.ingredients.$model"
          type="text"
          :state="validateState('ingredients')"
        ></textarea>
        <b-form-invalid-feedback 
          v-if="!$v.form.instruction.required">
          Ingredients are required</b-form-invalid-feedback>
        </b-form-group> 

        <b-form-group
        id="input-group-instruction"
        label-cols-sm="3"
        label="Instruction:"
        label-for="instruction"
        ><textarea
          rows="3"
          max-rows="25"
          class="textarea"
          style="resize: vertical"
          id="instruction"
          v-model="$v.form.instruction.$model"
          type="text"
          :state="validateState('instruction')"
        ></textarea>
        <b-form-invalid-feedback 
          v-if="!$v.form.instruction.required">
          Instruction are required</b-form-invalid-feedback>
        </b-form-group>
        <br/>
        <br/>
        <br/>
        <b-button type="submit" variant="dark" style="width:250px;">save recipe</b-button>
    </b-form>  
</div>
</template>

<script>
import minutes from "../assets/minutes";

import {
  required,
  alpha,
  url
} from "vuelidate/lib/validators";
export default {
    data() {
      return {
        form: {
          recipeName: "",
          instruction: "",
          ingredients: "",
          image: "",
          submitError: undefined,
          serving: null,
          ready_in_minutes: null,
        },
        minutes: [{ value: null, text: "", disabled: true }],
        serving: [
              {value: null, text: 0, disabled: true},
              {value: "1" , text: 1},
              {value: "2" , text: 2},
              {value: "3" , text: 3},
              {value: "4" , text: 4},
              {value: "5" , text: 5},
              {value: "6" , text: 6},
              {value: "7" , text: 7},
              {value: "8" , text: 8},
              {value: "9" , text: 9},
              {value: "10" , text: 10}
        ],
        errors: [],
        validated: false
      }
    },
    validations: {
      form: {
          recipeName: {
              required,
          },
          serving:{
            required
          },
          image: {
            url,
            required
          },
          ready_in_minutes: {
             required,
          },
          instruction:{
              required
          },
          ingredients:{
              required
          }
      } 
    }, 
     mounted() {
    this.minutes.push(...minutes);
  },
    methods: {
      validateState(param) {
          const { $dirty, $error } = this.$v.form[param];
          return $dirty ? !$error : null;
      },
      saveRecipe(){
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.sendingForm();
      },
      async sendingForm(){
        try {
        const response = await this.axios.put(
          this.$root.store.BASE_URL + "/users/add_new_recipe",
          {
            recipeName: this.form.recipeName,
            instruction: this.form.instruction,
            image: this.form.image,
            ready_in_minutes: this.form.ready_in_minutes,
            serving: this.form.serving,
            ingredients: this.form.ingredients,
          }
        );
        console.log(response)
        if(!response.data.success){
          alert(response.data.message)
        }else{
          alert("The recipe was saved Successfully")
          this.$router.push("/myRecipes").catch(() => {
          this.$forceUpdate();
        });
        }
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
#lable {
  font-size: 20px;
}
</style>