import * as React from 'react';
import ReactDatasheet from 'react-datasheet';

import { GridElement } from './GridElement';
import { RowRenderer } from './RowRenderer';
import { SheetRenderer } from './SheetRenderer';
import { CellRenderer } from './CellRenderer';

export interface Props {
    data: GridElement[][];
}

class TypedRowRender extends RowRenderer<GridElement> {}
class TypedSheetRenderer extends SheetRenderer<GridElement>{}
class TypedCellRenderer extends CellRenderer<GridElement>{}

export const Datasheet: React.SFC<Props> = props => {
    const { data } = props;
    const [storedData, setStoredData] = React.useState(data);

    const handleCellsChanged: ReactDatasheet.CellsChangedHandler<GridElement> = changes => {
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
    };

    return (
        <ReactDatasheet
            data={storedData}
            onCellsChanged={handleCellsChanged}
            valueRenderer={((val, row, col) => { 
                // console.log(`row: ${row}, col: ${col}`); 
                return val.value;
            })}
            valueViewer={React.memo(props => {
                console.log('i render');
                return (<span>{props.value?.toString()}</span>)
            })}
            // cellRenderer={props => {
            //     return <td >
            //         {props.children}
            //     </td>
            // }}
            // rowRenderer={React.memo(props => {
            //     console.log(props);
            //     console.log(props.cells)
            //     return (
            //         <tr>{props.children}</tr>
            //     )
            // })}
            cellRenderer={TypedCellRenderer}
            rowRenderer={TypedRowRender}
            sheetRenderer={TypedSheetRenderer}
        />
    );
}