export interface Country {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };

    name: {
        common: string;
        official: string;
        nativeName?: {
            [langCode: string]: {
                official: string;
                common: string;
            };
        };
    };

    capital?: string[];
    region: string;
    subregion?: string;

    population: number;
    area?: number;

    continents: string[];

    maps?: {
        googleMaps: string;
        openStreetMaps: string;
    };

    cca2: string;
    cca3: string;

    timezones: string[];

    currencies?: {
        [code: string]: {
            name: string;
            symbol: string;
        };
    };

    languages?: {
        [langCode: string]: string;
    };

    coatOfArms?: {
        png?: string;
        svg?: string;
    };

    borders?: string[];
}

export interface UserForm {
    name: string;
    email: string;
    phone: string;
    comment?: string;
    status: 'pending' | 'processed';
}
