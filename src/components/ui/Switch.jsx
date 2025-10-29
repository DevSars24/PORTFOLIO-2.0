const Switch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full ${checked ? "bg-cyan-400" : "bg-slate-600"}`}
    >
      <span
        className={`block w-6 h-6 bg-white rounded-full transform ${
          checked ? "translate-x-6" : "translate-x-0"
        } transition-transform`}
      />
    </button>
  );
  
  export { Switch };
  