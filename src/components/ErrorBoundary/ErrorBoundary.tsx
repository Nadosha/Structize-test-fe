import React, {ErrorInfo} from 'react';
import * as Sentry from '@sentry/browser';

type Props = {
    children: React.ReactNode;
};

class ErrorBoundary extends React.Component<Props> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo & { [key: string]: any }) {
        Sentry.withScope((scope) => {
            Object.keys(errorInfo).forEach((key) => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
        // @ts-ignore super: cannot invoke an object which is possibly 'undefined'
        super.componentDidCatch(error, errorInfo);
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;