import {useState} from "react";

const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const register = (name,rules={}) => {
        return {
          name,
          value: formData[name] || "",
          onChange: handleChange,
          "data-rules": rules,  
        };
      };
    const resetForm = () => {
        setFormData(initialState);
    };
    return {
        formData,
        resetForm,
        register
    };
};

export default useForm;