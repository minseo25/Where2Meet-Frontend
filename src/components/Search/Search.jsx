import React, { useState } from 'react';
import { searchAddress } from '../../apis/api';
import SearchInput from './SearchInput';
import SearchOutputGroup from './SearchOutputGroup';

const Search = ({ onNormalMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      if(searchTerm === '') {
        alert("검색어를 입력해주세요.");
        return;
      }
      const result = await searchAddress(searchTerm);
      setResults(result.documents);
    } catch(error) {
      alert("검색 결과를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#9EA9B7] p-8">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onNormalMode={onNormalMode}
        onSearch={handleSearch}
      />
      <div className="mt-4 flex-grow overflow-auto">
        <SearchOutputGroup results={results} onNormalMode={onNormalMode} />
      </div>
    </div>
  );
};

export default Search;
