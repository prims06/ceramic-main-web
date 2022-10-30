export interface ChartType {
    series?: any;
    plotOptions?: any;
    stroke?: any;
    dataLabels?: any;
    chart?: any;
    legend?: any;
    colors?: any;
    labels?: any;
}

export interface Stat {
    title: string;
    icon: string;
    value: string;
}

export interface Chat {
    id?: number;
    name?: string;
    message?: string;
    image?: string;
    time?: string;
    align?: string;
    text?: string;
}

export interface Inscription {
    idUser: number;
    date_inscription: Date;
    nom: string;
    telephone : number;
}

export interface paiement {
    telephone : number;
    merite : number;
}