import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import key from '../../key.js';
import movieCleaner from '../../cleaners/movieCleaner';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header/Header';
import { FavoriteMovies } from '../FavoriteMovies/FavoriteMovies';
import RecentMovies from '../RecentMovies/RecentMovies';
import { addRecentMovies } from '../../actions/index';

export class App extends Component {

  async componentDidMount() {
    const recentMovieData = await this.getMovies();
    this.props.setRecentMovies(recentMovieData);
  }

  getMovies = async () => {
    const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
    try {
      const response = await fetch(endPoint);
      if (response.status !== 200) {
        throw new Error('Could not retreive data');
      }
      const rawRecentMovieData = await response.json();
      const recentMovieData = movieCleaner(rawRecentMovieData);
      return recentMovieData;
    } catch (error) {
      this.props.setRecentMovies([{
        id: 0,
        title: "Oh No!",
        poster: "Error",
        backdrop: "Error",
        overview: "We encountered an error and couldn't retreive your data"
      }]);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="mainContainer" >
          <switch>
            <Route exact path='/' component={ RecentMovies } />
            <Route exact path='/favorites' component={ FavoriteMovies } />
          </switch>
        </section> 
      </div>
    );
  }
}


export const mapDispatchToProps = (dispatch) => ({
  setRecentMovies: (recentMovieData) => dispatch(addRecentMovies(recentMovieData))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
