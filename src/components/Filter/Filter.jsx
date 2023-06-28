import PropType from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className={css.label}>
      <p className={css['field-name']}>Find abonent by Name</p>
      <input
        type="text"
        name="filter"
        title="To find abonent enter they name"
        placeholder="Searching ....."
        value={filter}
        onChange={onFilterChange}
        className={css.input}
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropType.string.isRequired,
  onFilterChange: PropType.func.isRequired,
};
