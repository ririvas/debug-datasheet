import * as React from 'react';
import ReactDatasheet from 'react-datasheet';


export class RowRenderer<T extends ReactDatasheet.Cell<T>> extends React.PureComponent<ReactDatasheet.RowRendererProps<T>> {


    public render() {
        const { children } = this.props;
        // console.log(this.props);
        // console.log(`Row rendered: ${this.props.row}`);

        return (
            <tr>
                {children}
            </tr>
        )
    }
}