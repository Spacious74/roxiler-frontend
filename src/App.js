import { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import Table from './components/Table/Table.jsx';
import Monthselec from './components/MonthSelector/Monthselec.jsx';
import Stats from './components/Stats/Stats.jsx';
import Barchart from './components/BarChart/Barchart.jsx';
import Piechart from './components/PieChart/Piechart.jsx';

function App() {

  const [searchText, setSearchText] = useState('');
  const [month, setMonth] = useState(0);

  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  }


  return (
    <div className='app'>
      <div className="heading">Roxiler System transaction board</div>
      <Stats month={month} />
      <div className='search-setion flex'>
        < Monthselec onhandleMonthChange={handleMonthChange} />
        < Searchbar onSearchChange={handleSearchChange}  />
        < Barchart month={month} />
        < Piechart month={month} />
      </div>
      < Table searchText={searchText} month={month} />
    </div>
  );
}

export default App;
