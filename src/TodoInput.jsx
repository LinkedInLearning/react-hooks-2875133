import React from "react";
import { useForm } from "react-hook-form";

export default React.forwardRef(function TodoInput(props, ref) {
  const { register, handleSubmit, setValue } = useForm();

  function submitTodo({ title, category }) {
    props.onAddTodo({
      title: title,
      category: category,
    });

    setValue('title', '');
  }

  const title_register = register('title');

  return (
    <form onSubmit={handleSubmit(submitTodo)}>
      <div className="row">
        <div className="column column-75">
          <input
            type="text"
            placeholder="Todo hinzufügen"
            {...title_register}
            ref={(elem) => {
              title_register.ref(elem);
              ref.current = elem;
            }}
          />
        </div>
        <div className="column column-25">
          <select
            defaultValue={'Privat'}
            {...register('category')}
          >
            <option value="Privat">Privat</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <button role="button">Hinzufügen</button>
    </form>
  );
});
