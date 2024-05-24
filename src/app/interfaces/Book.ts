export interface BookType {
    id: string;
    title: string;
    category: string;
    collection: string;
    publisher: string;
    author: string;
    UDC: string;
    year_of_publication: string;
    place_of_publication: string;
    ISBN: string;
    price: string;
    total_copies: number;
    available_copies: number;
    borrowed_copies: number;
}

export interface PagesType {
    items: BookType[];
    total: number;
    page: number;
    size: number;
    pages: number;
}
