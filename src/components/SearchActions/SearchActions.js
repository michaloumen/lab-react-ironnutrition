import React, {Component} from 'react';

class SearchActions extends Component {
    state = {
        name: '',
    }

    handleChange = event => {
        const {name, value} = event.target;

        const {filterFoods} = this.props;

        this.setState({[name]: value}, () => { //estou chamando uma callback para depois que o estado é atualizado
            filterFoods(this.state.name);
        }); 
    }

    render () {
        return (
            <input type="text" name="name" placeholder="Search foods by name" value={this.state.value} onChange={this.handleChange}/>
        )
    }
}

export default SearchActions;
