import React, {FC} from 'react';
import {StatusEnum} from "../app/types/common";
import {Skeleton} from "@mui/material";

interface LoadingSkeleton {
    count: number;
    loading: string;
}

const LoadingSkeleton: FC<LoadingSkeleton> = ({count, loading}) => {
    if (loading === StatusEnum.pending) {
        const skeletons = [];

        for (let i = 0; i < count; i++) {
            skeletons.push(<Skeleton key={i} height={60}/>);
        }
        return <>
            {skeletons}
        </>
    }
    return <></>;
};

export default LoadingSkeleton;
