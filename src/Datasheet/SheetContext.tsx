import * as React from 'react';
import ReactDatasheet from 'react-datasheet';


interface SheetContextData {
    selection: ReactDatasheet.Selection | undefined;
    setSelection: (selection: ReactDatasheet.Selection) => void;
}

const defaultContext: SheetContextData = {
    selection: undefined,
    setSelection: () => {}
};

export const SheetContext = React.createContext(defaultContext);

export function useSheetContext(depsFn?: (selection: ReactDatasheet.Selection, ...deps: any[]) => any[], ...deps: any[]): ReactDatasheet.Selection | undefined  {
    const context = React.useContext(SheetContext);

    const dependencies = depsFn && context.selection ? depsFn(context.selection as ReactDatasheet.Selection, ...deps) : [context.selection];

    return React.useMemo(() =>  context.selection, [...dependencies])
}

interface ProvidedProps {
    selection: ReactDatasheet.Selection | undefined;
}
export function connectSheetContext<OwnProps, OmittedProps extends Omit<OwnProps, 'selection'> = Omit<OwnProps, 'selection'>>(depsFn?: (selection: ReactDatasheet.Selection, ownProps: OwnProps) => any[]) {

    return function(Component: React.ComponentType<OmittedProps & ProvidedProps>) {

        return React.memo((props: OmittedProps) => {
            const selection = useSheetContext(depsFn, props);

            return <Component {...props} selection={selection}/>
        })
    }
}
