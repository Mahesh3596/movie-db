import { useCallback, useEffect } from "react"

export const useInfiniteScroll = (scrollRef, dispatch) => {
    let refCurrent = null;
    const scrollObserver = useCallback(node => {
        new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.intersectionRatio > 0) {
                    dispatch({type: 'LOAD_MORE'})
                }
            })
        }).observe(node);
    }, [dispatch])

    useEffect(() => {
        if (!refCurrent && scrollRef.current) {
            refCurrent = scrollRef.current
            scrollObserver(scrollRef.current)
        }
    }, [scrollObserver, scrollRef])
}