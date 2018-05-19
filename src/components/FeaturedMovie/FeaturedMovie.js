import React, { Component } from 'react';
import './FeaturedMovie.css';
import { connect } from 'react-redux';

class FeaturedMovie extends Component {

  componentDidMount() {

  }


  render() {
    const featuredMovie = this.props.recentMovies.find(movie => {
      return movie.id === this.props.movieId;
    });
    if (featuredMovie) {
      const image = `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop}`;
      const background = { backgroundImage: `url( ${image} )` }
      return (
        <div className="featuredMovie" style={background} >
          <div className="favoriteButton">
            <p>Add to Favorites</p>
          </div>
          <div className="movieOverview">
            <h2>{featuredMovie.title}</h2>
            <p>{featuredMovie.overview} ...</p>
            
          </div>
        </div>
      );
    } else {
      return (
        <p>LOADING</p>);
    }

  }
}

const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies,
  movieId: state.selectedMovieId
});

export default connect(mapStateToProps)(FeaturedMovie);


