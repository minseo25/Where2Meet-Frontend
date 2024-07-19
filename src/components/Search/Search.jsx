import React, { useState } from 'react';
import { searchAddress } from '../../apis/api';
import SearchInput from './SearchInput';
import SearchOutputGroup from './SearchOutputGroup';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = ({ onNormalMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      if(searchTerm === '') {
        toast.warn('검색어를 입력해주세요🧐', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });  
        return;
      }
      const result = await searchAddress(searchTerm);

      if(result.documents.length === 0) {
        toast.info('검색 결과가 없네요🥹', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });  
        return;
      }
      
      setResults(result.documents);
    } catch(error) {
      toast.error('오류가 발생했어요😞', {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
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
      <ToastContainer icon={false} />
    </div>
  );
};

export default Search;
