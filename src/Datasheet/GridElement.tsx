import ReactDatasheet from 'react-datasheet';


export interface GridElement extends ReactDatasheet.Cell<GridElement> {
    value: number;
}

export const startingData: GridElement[][] = (new Array(30)).fill(1).map(() => {
    return (new Array(10)).fill(1).map(() => ({
        value: Math.random() * 100
    }));
})