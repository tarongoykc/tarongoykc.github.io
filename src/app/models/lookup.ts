export class LookupResult {
    description!: string;
    displaySymbol!: string;
    symbol!: string;
    type!: string;
}

export class SymbolLookup {
    count!: number;
    result!: LookupResult[];
}