import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		const genres = [ { _id: '', name: 'All Genre' }, ...getGenres() ];
		this.setState({
			movies: getMovies(),
			genres
		});
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({
			movies
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleLike = (movie) => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({
			movies
		});
	};

	handlePageChange = (page) => {
		this.setState({
			currentPage: page
		});
	};

	handleGenreSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1
		});
	};

	getPagedData = () => {
		const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;
		const filtered =
			selectedGenre && selectedGenre._id ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;
		const sorted = _.orderBy(filtered, [ sortColumn.path ], [ sortColumn.order ]);
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		if (count === 0) return <p>No Movies in the database</p>;
		const { currentPage, pageSize, sortColumn } = this.state;
		const { totalCount, data } = this.getPagedData();
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-3">
						<ListGroup
							items={this.state.genres}
							onItemSelect={this.handleGenreSelect}
							selectedItem={this.state.selectedGenre}
						/>
					</div>
					<div className="col">
						<p>Showing {totalCount} movies in the database</p>
						<MoviesTable
							movies={data}
							onLike={this.handleLike}
							onSort={this.handleSort}
							sortColumn={sortColumn}
							onDelete={this.handleDelete}
						/>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							onPageChange={this.handlePageChange}
							currentPage={currentPage}
							pages={this.state.pages}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
