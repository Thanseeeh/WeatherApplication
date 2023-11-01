import './App.css';
import Search from './components/search/search';

function App() {

  const handleOnSearchChange = (SearchData) => {
    console.log(SearchData);
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
    </div>
  );
}

export default App;
