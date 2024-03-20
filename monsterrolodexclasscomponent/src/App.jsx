import React, { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      monsters: [],
      filteredMonsters: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.monsters !== this.state.monsters || prevState.searchField !== this.state.searchField) {
      const newFilteredMonsters = this.state.monsters.filter((monster) =>
        monster.name.toLowerCase().includes(this.state.searchField.toLowerCase())
      );
      this.setState({ filteredMonsters: newFilteredMonsters });
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={this.onSearchChange}
          placeholder='search monsters'
        />
        <CardList monsters={this.state.filteredMonsters} />
      </div>
    );
  }
}

export default App;
