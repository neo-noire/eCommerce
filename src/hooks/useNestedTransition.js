import React, { useEffect, useState } from 'react'

export const useNestedTransition = (state) => {
    const [firstTransition, setFirstTransition] = useState(false)
    const [secondTransition, setSecondTransition] = useState(false)

    useEffect(() => {
        setFirstTransition(state)
        setTimeout(() => {
            setSecondTransition(state)
        }, 0);
    }, [state])

    return { first: firstTransition, second: secondTransition }
}
