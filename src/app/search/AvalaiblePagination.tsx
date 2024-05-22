'use client';
import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { usePathname, useSearchParams, redirect } from 'next/navigation';
import { useEffect } from 'react';
import AvalaiblePaginationItem from './AvalaiblePainationItem';

interface AvalaiblePaginationProps {
    totalPages: number;
    currentPage: number;
}

const AvalaiblePagination = ({ totalPages, currentPage }: AvalaiblePaginationProps) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (currentPage > totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', totalPages.toString());
            redirect(`${pathname}?${params.toString()}`);
        }
    }, []);

    return (
        <Pagination>
            <PaginationContent>
                {totalPages <= 6 &&
                    Array.from(
                        { length: totalPages }, // loops through totalPages times
                        (_, index) => (
                            <AvalaiblePaginationItem
                                key={index}
                                page={index + 1}
                                activePage={currentPage}
                            />
                        )
                    )}
                {totalPages > 6 && (
                    <>
                        {currentPage < 4 && (
                            <>
                                <AvalaiblePaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={2}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={3}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={4}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem page={0} />
                                <AvalaiblePaginationItem
                                    page={totalPages}
                                    activePage={currentPage}
                                />
                            </>
                        )}
                        {4 <= currentPage && currentPage <= totalPages - 3 && (
                            <>
                                <AvalaiblePaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem page={0} />
                                <AvalaiblePaginationItem
                                    page={currentPage - 1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={currentPage}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={currentPage - -1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem page={0} />

                                <AvalaiblePaginationItem
                                    page={totalPages}
                                    activePage={currentPage}
                                />
                            </>
                        )}
                        {currentPage > totalPages - 3 && (
                            <>
                                <AvalaiblePaginationItem
                                    page={1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem page={0} />
                                <AvalaiblePaginationItem
                                    page={totalPages - 3}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={totalPages - 2}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
                                    page={totalPages - 1}
                                    activePage={currentPage}
                                />
                                <AvalaiblePaginationItem
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
export default AvalaiblePagination;
