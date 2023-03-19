import React, { useEffect, useState } from 'react'

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const matchQueryList = window.matchMedia(query);
        setMatches(matchQueryList.matches)
        function handleChange(e) {
            setMatches(e.matches);
        }
        matchQueryList.addEventListener("change", handleChange);
        matchQueryList.addEventListener("load", handleChange);
        return () => {
            matchQueryList.removeEventListener("change", handleChange);
            matchQueryList.removeEventListener("load", handleChange);
        };
    }, [query]);
    return matches;
}