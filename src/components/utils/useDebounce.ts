import { useEffect, useState } from "react";

// Move into hooks folder
// Quick easy debounce handler (probs dont need to reuse, but keeps it reusable if others used it later down the line)
export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
