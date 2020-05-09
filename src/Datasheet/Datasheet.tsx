import * as React from 'react';
import ReactDatasheet from 'react-datasheet';

import { GridElement } from './GridElement';
import { RowRenderer } from './RowRenderer';
import { SheetRenderer } from './SheetRenderer';
import { CellRenderer, CustomCellProps } from './CellRenderer';
import { SheetContext, connectSheetContext } from './SheetContext';

const isRowSelected = (i: number, selection: ReactDatasheet.Selection) => {
    if (selection === undefined) return false;

    const {start, end} = selection;
    const posY = (i >= start.i && i <= end.i)
    const negY = (i <= start.i && i >= end.i)

    return  posY || negY
}

class TypedRowRender extends RowRenderer<GridElement> {}
class TypedSheetRenderer extends SheetRenderer<GridElement>{}
class TypedCellRenderer extends CellRenderer<GridElement>{}

const ConnectedCellRenderer = connectSheetContext<CustomCellProps<GridElement>>((selection, cellProps) => [cellProps.col === 0 && isRowSelected(cellProps.row, selection)])(TypedCellRenderer);

const valueRenderer = (val: GridElement) => val.value;
const ValueViewer = React.memo((props: ReactDatasheet.ValueViewerProps<GridElement>) => <span>{Math.round(props.value as number).toString()}</span>);

export interface Props {
    data: GridElement[][];
}

export const Datasheet: React.SFC<Props> = props => {
    const { data } = props;
    const [storedData, setStoredData] = React.useState(data);
    const [selection, setSelection] = React.useState<ReactDatasheet.Selection | undefined>();

    const handleCellsChanged: ReactDatasheet.CellsChangedHandler<GridElement> = React.useCallback(changes => {
        const newData = storedData.map(s => s.map(v => v));
        changes.forEach(change => {
            newData[change.row][change.col] = {
                ...change.cell,
                value: parseFloat(change.value as string)
            }
        });

        if (changes.length > 0) {
            console.log('updating sheet state');
            setStoredData(newData);
        }
    }, [storedData]);

    return (
        <SheetContext.Provider value={{selection, setSelection}} >
            <ReactDatasheet
                data={storedData}
                onCellsChanged={handleCellsChanged}
                valueRenderer={valueRenderer}
                valueViewer={ValueViewer}
                cellRenderer={ConnectedCellRenderer}
                rowRenderer={TypedRowRender}
                sheetRenderer={TypedSheetRenderer}
                onSelect={setSelection}
            />
        </SheetContext.Provider>
    );
}