'use client';
import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { usePathname, useSearchParams, redirect } from 'next/navigation';
import { useEffect } from 'react';
import BookPaginationItem from './BookPaginationItem';

interface BooksPaginationProps {
    totalPages: number;
    currentPage: number;
}

const BooksPagination = ({ totalPages, currentPage }: BooksPaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (currentPage > totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', totalPages.toString());
            redirect(`${pathname}?${params.toString()}`);
        }
    }, []);

    // * page = 0 means ellipsis
    return (
        <Pagination>
            <PaginationContent>
                {totalPages <= 6 &&
                    Array.from({ length: totalPages }, (_, index) => (
                        <BookPaginationItem
                            key={index}
                            page={index + 1}
                            activePage={currentPage}
                        />
                    ))}
                {totalPages > 6 && (
                    <>
                        {currentPage < 4 && (
                            <>
                                <BookPaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={2}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={3}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={4}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem page={0} />
                                <BookPaginationItem
                                    page={totalPages}
                                    activePage={currentPage}
                                />
                            </>
                        )}
                        {4 <= currentPage && currentPage <= totalPages - 3 && (
                            <>
                                <BookPaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem page={0} />
                                <BookPaginationItem
                                    page={currentPage - 1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={currentPage}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={currentPage - -1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem page={0} />

                                <BookPaginationItem
                                    page={totalPages}
                                    activePage={currentPage}
                                />
                            </>
                        )}
                        {currentPage > totalPages - 3 && (
                            <>
                                <BookPaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem page={0} />
                                <BookPaginationItem
                                    page={totalPages - 3}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={totalPages - 2}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={totalPages - 1}
                                    activePage={currentPage}
                                />
                                <BookPaginationItem
                                    page={totalPages}
                                    activePage={currentPage}
                                />
                            </>
                        )}
                    </>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default BooksPagination;
