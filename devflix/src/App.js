import SearchForm from './components/SearchForm/SearchForm.jsx';
import MovieList from './components/MovieList/MovieList.jsx';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TheMovieDB</h1>
        <SearchForm />
      </header>
      <MovieList />
    </div>
  );
}

export default App;
