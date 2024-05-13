'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

interface BooksPaginationProps {
    totalPages: number;
    currentPage: number;
}

const BooksPagination = ({ totalPages, currentPage }: BooksPaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href={createPageURL(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={createPageURL(currentPage - 1)}>
                        {currentPage - 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={createPageURL(currentPage)} isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    {/* ? for some reason doing +1 turns it into a string */}
                    <PaginationLink href={createPageURL(currentPage - -1)}>
                        {currentPage - -1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={createPageURL(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default BooksPagination;
