import style from '../styles/Select.module.css';
import { UtilityType, FilterChangeType } from '../types/types';

type SelectProps = {
  items: UtilityType[];
  currentSelected: string;
  name: 'source' | 'category';
  onChange: (params: FilterChangeType) => void;
};

const Select = ({ onChange, items, name, currentSelected }: SelectProps) => (
  <div className={style.searchItem}>
    <label htmlFor={name} className={style.label}>
      {name}
    </label>
    <select
      id={name}
      name={name}
      onChange={({ target }) => onChange({ name, keyword: target.value })}
      value={currentSelected}
    >
      <option value="">Any</option>
      {items.length > 0 &&
        items.map((item: UtilityType, i: number) => (
          <option key={i} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  </div>
);

export default Select;
