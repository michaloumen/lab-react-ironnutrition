import React, {Component} from 'react';
import FoodBox from './components/FoodBox/FoodBox';
import CreateFoodActions from './components/CreateFoodActions/CreateFoodActions';
import './App.css';
import foods from './foods.json';
import SearchActions from'./components/SearchActions/SearchActions';
import FoodsCart from './components/FoodsCart/FoodsCart'

class App extends Component {
  state = {
    allFoods: foods,
    foods,

    foodsCart: [],
  }

  displayFoods = () => {
    return this.state.foods.map(food => <FoodBox food={food} updateCart={this.updateCart} deleteItem={this.deleteItem}/>)
  }

  addFood = newFood => {
    this.setState({foods: [...this.state.foods, newFood], allFoods: [...this.state.allFoods, newFood]}) //meu array vai ter todas as comidas que existem + a newFood (porque estou adicionando)
  }

  filterFoods = foodName => {
    const filteredFoods = this.state.allFoods.filter(food => food.name.toLowerCase().includes(foodName.toLowerCase()));

    this.setState({foods: filteredFoods}); //para atualizar nosso foods
  }

  updateCart = productInfo => {
    const existentProductIndex = this.state.foodsCart.findIndex(foodInfo => {
      return foodInfo.name === productInfo.name;
      //se eu achar um produto no foodInfo, um produto igual, ele vai guardar a posição que isso se encontra dentro do nosso array
    });

    if (existentProductIndex >= 0){ //se for maior que zero, existe..então vai ter que acrescentar
      const foodsCartCopy = [...this.state.foodsCart];
      foodsCartCopy[existentProductIndex].quantity += productInfo.quantity;

      this.setState({ foodsCart: foodsCartCopy })
    } else {
      this.setState({foodsCart: [...this.state.foodsCart, productInfo]}); //se for menor que 0, ele é novo, então só adiciona
    }
  }

  deleteItem = productName => {
    const existentProductIndexAllFoods = this.state.allFoods.findIndex(foodInfo => {
      return foodInfo.name === productName;
    });

    const existentProductIndexFoods = this.state.foods.findIndex(foodInfo => {
      return foodInfo.name === productName;
    });

    const existentProductIndexFoodsCart = this.state.foodsCart.findIndex(foodInfo => {
      return foodInfo.name === productName;
    });

    if (existentProductIndexAllFoods >= 0){
      const allFoodsCopy = [...this.state.allFoods];
      allFoodsCopy.splice(existentProductIndexAllFoods, 1);
  
      this.setState({allFoods: allFoodsCopy});      
    };
    
    if (existentProductIndexFoods >= 0){
      const foodsCopy = [...this.state.foods];
      foodsCopy.splice(existentProductIndexFoods, 1);
  
      this.setState({foods: foodsCopy});      
    }

    if (existentProductIndexFoodsCart >= 0) {
      const foodsCartCopy = [...this.state.foodsCart];
      foodsCartCopy.splice(existentProductIndexFoodsCart, 1);
  
      this.setState({foodsCart: foodsCartCopy});
    }
  }
  //tá fazendo tudo isso porque pode ter dois array de foods que podem ser diferentes -> o da página de exibição e o da pesquisa

  render () {
    return (
      <div>
        <h1>IronNutrition</h1>

        <SearchActions filterFoods={this.filterFoods}/>
  
        <CreateFoodActions addFood={this.addFood}/>

        <section className="foods-info-container">
          <div className="display-foods">
            {this.displayFoods()}          
          </div>   
          <div className="foods-cart">
            <FoodsCart foodsInfo={this.state.foodsCart}/>
          </div>  
        </section>
      </div>
    );
  }
}

export default App;
