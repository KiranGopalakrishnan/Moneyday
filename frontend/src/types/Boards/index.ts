interface Board {
    id?: string;
    name: string;
    columns: Column[];
}

interface Column {
    id: string;
    title: string;
    type: string;
}

export {Board};
