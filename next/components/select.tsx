import style from '../styles/Select.module.css';

type SelectProps = any;

const Select = ({ onChange, items, name }: SelectProps) => {
  return (
    <div className={style.searchItem}>
      <label htmlFor={name} className={style.label}>
        {name}
      </label>
      <select id={name} onChange={(e) => onChange(e.target.value)}>
        <option value="''">Any</option>
        {items.length > 0 &&
          items.map((item: any, i: number) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
