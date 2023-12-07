import { useEffect, useRef } from "react";

export const useDidUpdateEffect = (callback: () => void, dependencies: any) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            return callback();
        }
    }, dependencies);
};
