import React from 'react';
import Articles from './articles';
import Select from './select';
import style from '../styles/Main.module.css';
import {
  CurrentSearchType,
  DataStateType,
  UtilityType,
  FilterChangeType,
} from '../types/types';

type MainProps = {
  currentData: DataStateType;
  currentSearch: CurrentSearchType;
  sources: UtilityType[];
  categories: UtilityType[];
  onChange: (params: FilterChangeType) => void;
  clearData: () => void;
};

const Main = ({
  currentData: { filteredData, data },
  currentSearch: { search, category, source },
  sources,
  categories,
  onChange,
  clearData,
}: MainProps) => (
  <>
    <div
      className={sources ? style.searchWithSource : style.searchWithoutSource}
    >
      <div className={style.searchItem}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="..."
          value={!filteredData ? '' : search}
          onChange={({ target }) =>
            onChange({ name: 'search', keyword: target.value })
          }
        />
      </div>
      <Select
        onChange={onChange}
        items={categories}
        name="category"
        currentSelected={category}
      />
      {sources && (
        <Select
          onChange={onChange}
          items={sources}
          name="source"
          currentSelected={source}
        />
      )}
      <div className={style.searchItem}>
        <button onClick={() => clearData()}>Clear</button>
      </div>
    </div>
    <main className={style.main}>
      <Articles filteredData={filteredData} data={data} />
    </main>
  </>
);

export default Main;
