<template>
  <div>
    <br/>
      <br/>
      <br/>
       <div id="Hello"> Hello everyone ! </div>
      <br/>
      <br/>
      
      <p>
      We are third-year students of Information System, at the academit  Tel-Aviv collage.
      <br/>
      In the last 3 years we got experience in many different systems, languages and frameworks such as: Java, C++, HTML, PHP, SQL and more.
        <br/>
         <br>
        This semester we took a web development course, which taught us some very usefull skills for the industry.
        <br/>
        This recipes website is our final project for the degree and it's based on all the things we've learned in those 3 years.
      <br/>
       <br/>
        
        <u><strong>On our website the user can: </strong></u>
        <br/>
        <br/>
        - create an account,<br/>
        - explore random recipes on the main page, add a recipe to favorites and more.<br/>
        - plan a meal combained of number of recipes.<br/>
        - watch your meal progress bar according to the meal plan        
        <br/>
         <br/>   
               
         For the server side - we used an API and worked with <a style="color: rgba(238, 107, 107, 0.911)" href="https://spoonacular.com/food-api"><strong> spoonacular</strong></a> website to get recipes,
     <br/>
      along with using Azure DB ....

     <br/>  
      <br/>  
      
<br> 
  </p>
</div>
</template>

<script>
    export default {
        name: "AboutPage"
    }
</script>

<style>

  p {
    text-align:center;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: large;
  }

#Hello {
  font-size: 35px;
  text-align: center;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
  .card {
    display: flex;
    align-items: center;
    align-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* color: black; */
    opacity: 0.5;
  }

/* .card .row {
  opacity: 0.5;
} */

  .container {
    padding: 0 16px;
    display: flex;
    justify-content: center;
  }

  h1{
    text-align: center;
    color:black;
    font-size: 40px;
    opacity: 100%;
  }


  #mail  {
    font-size: 20px;
    color: black; 
  }

    img {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }


</style>