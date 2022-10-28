export class SentimentData {
    symbol!: string;
    year!: number;
    month!: number;
    change!: number;
    mspr!: number;
}

export class Sentiment {
    data!: SentimentData[];
    symbol!: string;
}