export const columnNames = [
    'Zilele lunii',
    'Totalul cititorilor',
    'Dintre acestia elevi',
    'Pana la 14 ani',
    'Peste 14 ani',
    'Barbati',
    'Femei',
    'Frecventa zilnica',
    'Total doc. difuzate',
    'Filozofie',
    'Stiinte sociala',
    'Stiinte pure',
    'Tehnica',
    'Medicina',
    'Agrotehnica',
    'Literatura',
    'Literatura pentru copii',
    'Alte materii',
    'Limba romana',
    'Alte limbi',
    'Consultate in biblioteca',
    'Intrate in cursul anului',
    'Valoarea carti intrate',
    'Donatii U.B.',
    'Valoare'
];

export const columnKeys: Record<string, string> = {
    'Zilele lunii': 'day',
    'Totalul cititorilor': 'totalReaders',
    'Dintre acestia elevi': 'students',
    'Pana la 14 ani': 'under14',
    'Peste 14 ani': 'over14',
    Barbati: 'men',
    Femei: 'women',
    'Frecventa zilnica': 'dailyFrequency',
    'Total doc. difuzate': 'totalDocuments',
    Filozofie: 'philosophy',
    'Stiinte sociala': 'socialSciences',
    'Stiinte pure': 'pureSciences',
    Tehnica: 'technology',
    Medicina: 'medicine',
    Agrotehnica: 'agriculture',
    Literatura: 'literature',
    'Literatura pentru copii': 'childrenLiterature',
    'Alte materii': 'otherSubjects',
    'Limba romana': 'romanianLanguage',
    'Alte limbi': 'otherLanguages',
    'Consultate in biblioteca': 'consultedBooks',
    'Intrate in cursul anului': 'booksEntered',
    'Valoarea carti intrate': 'valueBooksEntered',
    'Donatii U.B.': 'ubDonations',
    Valoare: 'value'
};

export type StatisticsColumnKeys =
    | 'day'
    | 'totalReaders'
    | 'students'
    | 'under14'
    | 'over14'
    | 'men'
    | 'women'
    | 'dailyFrequency'
    | 'totalDocuments'
    | 'philosophy'
    | 'socialSciences'
    | 'pureSciences'
    | 'technology'
    | 'medicine'
    | 'agriculture'
    | 'literature'
    | 'childrenLiterature'
    | 'otherSubjects'
    | 'romanianLanguage'
    | 'otherLanguages'
    | 'consultedBooks'
    | 'booksEntered'
    | 'valueBooksEntered'
    | 'ubDonations'
    | 'value';
