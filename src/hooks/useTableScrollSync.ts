import { useRef, useEffect } from 'react';
import { VariableSizeGrid } from 'react-window';

export const useTableScrollSync = () => {
    const gridRef = useRef<VariableSizeGrid>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const header = headerRef.current;
        const handleHeaderScroll = () => {
            console.log(gridRef)
            if (gridRef.current && header) {
                gridRef.current.scrollTo({ scrollLeft: header.scrollLeft });
            }
        };

        header?.addEventListener('scroll', handleHeaderScroll);
        return () => header?.removeEventListener('scroll', handleHeaderScroll);
    }, []);

    const handleGridScroll = ({ scrollLeft }: { scrollLeft: number }) => {
        if (headerRef.current) {
            headerRef.current.scrollLeft = Math.round(scrollLeft);
        }
    };

    return { gridRef, headerRef, handleGridScroll };
}; 