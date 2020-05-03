import * as React from 'react';
import ReactDatasheet from 'react-datasheet';


export class SheetRenderer<T extends ReactDatasheet.Cell<T>> extends React.PureComponent<ReactDatasheet.SheetRendererProps<T>> {

    public render() {
        const { children } = this.props;

        console.log(this.props);
        console.log(`sheet re-renderd`);
        return (
            <table className={this.props.className}>
                <tbody>
                {this.props.children}
                </tbody>
            </table>
        )
    }
}