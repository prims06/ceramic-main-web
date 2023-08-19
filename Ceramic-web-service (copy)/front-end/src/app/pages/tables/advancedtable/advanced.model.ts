// Table data
export interface Table {
    idUser:number
    nom: string;
    telephone: number;
    scan: number;
    merite: number;
    
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
