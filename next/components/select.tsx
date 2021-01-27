import style from '../styles/Select.module.css';
import { UtilityType } from '../types/types';

type SelectProps = {
  onChange: (name: 'source' | 'search' | 'category', keyword: string) => void;
  items: UtilityType[];
  name: 'source' | 'category';
};

const Select = ({ onChange, items, name }: SelectProps) => {
  return (
    <div className={style.searchItem}>
      <label htmlFor={name} className={style.label}>
        {name}
      </label>
      <select
        id={name}
        name={name}
        onChange={({ target }) => onChange(name, target.value)}
      >
        <option value="''">Any</option>
        {items.length > 0 &&
          items.map((item: UtilityType, i: number) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
