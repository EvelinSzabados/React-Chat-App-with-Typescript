import React from 'react'

export default function WithLoading(Component: any) {
    return function WihLoadingComponent({ isLoading, ...props }: { isLoading: boolean, props?: any }) {

        if (!isLoading) return <Component {...props} />;

        return <p>Loading</p>;
    };
}
