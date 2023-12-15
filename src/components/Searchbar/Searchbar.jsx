//import { useState } from 'react';
import css from './Searchbar.module.css';
import { Svg } from 'components/Svg/Svg';

export const Searchbar = ({ onSubmitSearchBar }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitSearchBar}>
        <button type="submit" className={css.searchFormButton}>
          <Svg />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          className={css.searchFormInput}
        />
      </form>
    </header>
  );
};
