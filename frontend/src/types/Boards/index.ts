

interface Timeframe {
    startDate: string;
    endDate: string;
}

interface CostSummary {
    totalTimeSpent: number,
    totalCost: number,
}

interface BoardInfo {
    id: number;
    timeframe?: Timeframe;
    budget?: number;
    defaultRate: number; 
}

interface CostPerDay {
    date: string,
    cost: number,
}

interface Board {
    id?: number;
    name: string;
    columns: Column[];
    isTracking?: boolean;
    timeframe?: Timeframe;
    budget?: number;
    defaultRate?: number; 
    currencyCode?: string;
}

interface Column {
    id: string;
    title: string;
    type: string;
}

export {Board, BoardInfo, Timeframe, CostSummary, CostPerDay};
