import {useEffect, useState} from "react";

type SearchValue = string | number;
const useDebounce = (searchValue: SearchValue, delay: number) => {

    const [value, setValue] = useState<SearchValue>(searchValue);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue(searchValue);
        }, delay);

        return () => clearTimeout(timeout);
    }, [searchValue])

    return value;
}

export default useDebounce;
