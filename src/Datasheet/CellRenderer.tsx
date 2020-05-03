import * as React from 'react';
import ReactDatasheet from 'react-datasheet';


export class CellRenderer<T extends ReactDatasheet.Cell<T>> extends React.PureComponent<ReactDatasheet.CellRendererProps<T>> {

    public render() {

        console.log(`cell: ${this.props.row}, ${this.props.col}`);

        const {
            cell, row, col, attributesRenderer,
            className, style, onMouseDown, onMouseOver, onDoubleClick, onContextMenu
        } = this.props
  
        const {colSpan, rowSpan} = cell
        const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {}
    
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
            {this.props.children}
            </td>
      )
    }
}