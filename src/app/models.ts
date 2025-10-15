export interface Country {
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            [langCode: string]: {
                official: string;
                common: string;
            };
        };
    };
}