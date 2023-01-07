import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible} class="flex p-2">
        <button 
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 hover:border-transparent rounded"
          onClick={toggleVisibility}>
            {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div class="pl-5">
          <button 
            class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 hover:border-transparent rounded" 
            onClick={toggleVisibility}>Cancel
          </button>
        </div>
        
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
