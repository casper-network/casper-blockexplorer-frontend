import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  // TODO: remove this when used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [error, setError] = useState('');

  const submitValue = () => {
    const trimmedValue = search.trim();

    // TODO: Move this magic strings to some consts
    if (trimmedValue.length === 66 || trimmedValue.length === 68) {
      navigate(`/account/${trimmedValue}`);
    } else if (trimmedValue.length === 64) {
      console.log('deploy');
      navigate(`/deploy/${trimmedValue}`);
    } else {
      alert('Wrong value');
    }
  };

  return (
    <div>
      <Header />
      <h2>Search</h2>
      <div>
        {error}
        <input
          value={search}
          onChange={ev => setSearch(ev.target.value)}
          placeholder="PublicKey or DeployHash"
        />
        <button type="button" onClick={submitValue}>
          Search
        </button>
      </div>
    </div>
  );
};
