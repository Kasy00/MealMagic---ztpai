import { useState, useEffect } from "react";

function useLocalState (defaultValue: any, key: string) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalState;