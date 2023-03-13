import { useState } from "react";

// este hook es para manipular los inputs
const useInput = () => {    
    const [value, setValue] = useState('')
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return {value, onChange}
}
export default useInput