const CatagorySelectBtn = (props) => {
  const { checked, onChange, id, name, img } = props;
  return (
    <div>
      <input
        className="absolute left-[-99999px]"
        checked={checked}
        onChange={onChange}
        type="radio"
        name={name}
        id={id}
      />
      <label htmlFor={id}>
        <div
          className={`w-fit text-center rounded bg-orange-50 px-1.5 ${
            checked
              ? "outline outline-2 outline-indigo-500 py-[calc(.5rem_-_2px)]"
              : "py-2"
          }`}
        >
          <div className="bg-orange-100 p-2 w-12 rounded-full">
            <img className="" src={img} />
          </div>
          <p className="mt-2 text-slate-800">{id}</p>
        </div>
      </label>
    </div>
  );
};

export default CatagorySelectBtn;
