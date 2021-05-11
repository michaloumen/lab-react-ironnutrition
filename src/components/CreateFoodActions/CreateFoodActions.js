import React, {Component} from 'react';
import './CreateFoodActions.css';

class CreateFoodActions extends Component {
    state = {
        showForm: false,

        food : {
            name: '',    
            image: '',
            calories: '',
        }
    }

    handleChange = event => {
        const {name, value} = event.target;

        const updatedForm = { ...this.state.food, [name]: value} //estou pegando tudo que está dentro do this.state.food e estou substituindo pelo name: value 

        this.setState({food: updatedForm}); 
    }

    handleToogleForm = () => {
        this.setState({showForm: !this.state.showForm}) //então se a função for true, isso vai ser false e se a função for false, isso vai ser true. Faz com que mostre e apareça o form
    }

    handleCreateFood = () => {
        /* console.log(this.state.food); */
        const { addFood } = this.props; //ele está vindo via props - está lá no App.js

        addFood(this.state.food);

        this.setState({
            showForm: false, //quero fechar o formulário depois que ele criar a comida
            food : {
                name: '',    
                image: '',
                calories: '',
                //quero que os campos do formulário fiquem vazios
            },
        })
    }

    render() {
        const { showForm } = this.state;

        const {name, image, calories} = this.state.food;

        return (
            <> 
            <button onClick={this.handleToogleForm}>
                {showForm ? (
                    'Close Form'
                ) : (
                    'Create New Food'
                )
            }
            </button>

            {showForm && ( //se o showform for verdade, mostro o formulário, e se não for, ele desaparece
                <form>
                    <input type="text" name="name" placeholder="Food Name" value={name} onChange={this.handleChange}/>
                    <input type="text" name="image" placeholder="Food image URL" value={image} onChange={this.handleChange}/>
                    <input type="number" name="calories" placeholder="Food calories amount" value={calories} onChange={this.handleChange}/>
        
                    <button type="button" onClick={this.handleCreateFood}>Create Food</button>
                </form>
            )}
            </>
        );
    }
};

export default CreateFoodActions;