import React from 'react'

export default function WithLoading(Component: any) {
    return function WihLoadingComponent({ isLoading, ...props }: { isLoading: boolean, props?: any }) {
        console.log(isLoading)
        if (!isLoading) return <Component {...props} />;
        console.log("loading")
        return <p>Loading</p>;
    };
}
