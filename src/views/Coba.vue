
<template>
  <select class="form-control measure-sel " id="line-0" data-line="0">	
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram" value="Kilogram">Kilogram</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_gram" value="Gram">Gram</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_pound" value="Pound">Pound</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_ounce" value="Ounce">Ounce</option>
      <option selected="selected" data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_liter" value="Liter">Liter</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_milliliter" value="Milliliter">Milliliter</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_cubic_inch" value="Cubic inch">Cubic inch</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_quart" value="Quart">Quart</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_drop" value="Drop">Drop</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_gallon" value="Gallon">Gallon</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_dash" value="Dash">Dash</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_fluid_ounce" value="Fluid ounce">Fluid ounce</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_pint" value="Pint">Pint</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_pinch" value="Pinch">Pinch</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_cup" value="Cup">Cup</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_teaspoon" value="Teaspoon">Teaspoon</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_tablespoon" value="Tablespoon">Tablespoon</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_dessert_spoon" value="Dessert spoon">Dessert spoon</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_strip" value="Strip">Strip</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_serving" value="Serving">Serving</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_slice" value="Slice">Slice</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_bunch" value="Bunch">Bunch</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_unit" value="Whole">Whole</option>
      <option data-hints="food_ai215e5b85pdh5ajd4aafa3w2zm8" data-measureuri="http://www.edamam.com/ontologies/edamam.owl#Measure_carrot" value="Carrot">Carrot</option>
  </select>
  <Datepicker v-model="date" />
  <div class="input-field">
    <p :class="isFocused ? 'label-visible' : 'label-invisible'">Email</p>
    <input
      :placeholder="!isFocused ? 'Email' : ''"
      @focus="handleOnFocus"
      @blur="handlOnBlur"
    />
  </div>
</template>

<script>
        import { onMounted } from "@vue/runtime-core"
import Datepicker from "vue3-datepicker";
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      isFocused: false,
      date: new Date(),
      url : "https://api.edamam.com/api/nutrition-data?app_id=5142b005&app_key=429fbc5c81937734d42c34c0240d9903"
    };
  },
  components: {
    Datepicker,
  },
  mounted(){
    let self = this;
    let data = {
  "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
  "yield": "About 15 servings",
  "ingr": [
    "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
    "7 cloves garlic, minced",
    "1 tablespoon caraway seeds, crushed",
    "4 teaspoons salt",
    "Freshly ground pepper to taste",
    "1 teaspoon olive oil",
    "1 medium onion, peeled and chopped",
    "3 cups sourdough rye bread, cut into 1/2-inch cubes",
    "1 1/4 cups coarsely chopped pitted prunes",
    "1 1/4 cups coarsely chopped dried apricots",
    "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
    "2 teaspoons chopped fresh rosemary",
    "1 egg, lightly beaten",
    "1 cup chicken broth, homemade or low-sodium canned"
  ]
}
   let tofu = 'food_a269ixea1yf51xbfwgnq2boiwc7x'
   let beef = 'food_bknby1la98smrsbwnthinbam42nj'
   let milk = 'food_aa9qbc1aq7mj74aohn8fnazxk1u5'

   let datas = {
    ingredients : [
        {
            quantity : 1,
            measureURI : 'Measure_gram',
            foodId : tofu,
            weight : 200
        }


    ]
   }
    
    // axios({
    //     method : 'get',
    //     url : 'https://api.edamam.com/api/food-database/v2/parser?app_id=5142b005&app_key=429fbc5c81937734d42c34c0240d9903%09&ingr=%20meat&nutrition-type=cooking',
    //     // data : data
    // })
    axios({
        method : 'get',
        url : 'https://api.edamam.com/api/food-database/v2/parser?app_id=c69eecda&app_key=2bf7736426fd8049962a8c9daf1e60f4&ingr=carrot&nutrition-type=cookin',
        // data : datas
    })
    .then(function(res){
        
    })
  },
  methods: {
    handleOnFocus() {
      
      this.isFocused = true;
    },
    handlOnBlur() {
      this.isFocused = false;
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.label-visible {
  top: -35px;
  left: 4px;
  visibility: visible;
}
.label-invisible {
  top: -10px;
  left: 4px;
  visibility: hidden;
}
.input-field {
  margin-top: 30px;
  position: relative;
}
.input-field > input {
  width: 100%;
}
.input-field > p {
  position: absolute;
  font-size: 14px;
  transition: 0.3s;
}
</style>
