import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};
