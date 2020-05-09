import * as React from 'react';
import ReactDatasheet from 'react-datasheet';

const isRowSelected = (i: number, selection: ReactDatasheet.Selection | undefined) => {
    if (selection === undefined) return false;

    const {start, end} = selection;
    const posY = (i >= start.i && i <= end.i)
    const negY = (i <= start.i && i >= end.i)

    return  posY || negY
}

export interface CustomCellProps<T extends ReactDatasheet.Cell<T>> extends ReactDatasheet.CellRendererProps<T> {
    selection: ReactDatasheet.Selection | undefined;
}

export class CellRenderer<T extends ReactDatasheet.Cell<T>> extends React.PureComponent<CustomCellProps<T>> {

    public render() {

        // console.log(`cell: ${this.props.row}, ${this.props.col}`);
        // console.log(this.props.selection);

        const {
            cell, row, col, attributesRenderer,
            className, onMouseDown, onMouseOver, onDoubleClick, onContextMenu
        } = this.props;

        const {colSpan, rowSpan} = cell
        const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {}

        const rowSelected = col === 0 && isRowSelected(row, this.props.selection);
    
        return (
            <td
            className={className}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onDoubleClick={onDoubleClick}
            onContextMenu={onContextMenu}
            colSpan={colSpan}
            rowSpan={rowSpan}
            {...attributes}
            >
                {rowSelected && <span>selected: </span>}
                {this.props.children}
            </td>
      )
    }
}