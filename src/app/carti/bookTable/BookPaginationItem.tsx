import {
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const BookPaginationItem = ({
    page,
    activePage
}: {
    page: number;
    activePage?: number;
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    if (page) {
        if (page == activePage) {
            return (
                <PaginationLink
                    onClick={() => {
                        createPageURL(page);
                    }}
                    isActive
                >
                    {page}
                </PaginationLink>
            );
        } else {
            return (
                <PaginationLink
                    onClick={() => {
                        createPageURL(page);
                    }}
                >
                    {page}
                </PaginationLink>
            );
        }
    }
    // when page = 0
    else
        return (
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
        );
};

export default BookPaginationItem;
