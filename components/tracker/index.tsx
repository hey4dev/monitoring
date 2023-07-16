'use client';

import { useState } from 'react';
import UpsertTracker from './upsert-tracker';
import { ShowTracker } from './show-tracker';

export const TrackerService = ({
    id,
    title,
    desc,
    serviceUrl,
    refreshTime = 60000,
}: {
    id: number;
    title: string;
    desc: string;
    serviceUrl: string;
    refreshTime?: number;
}) => {
    const [editMode, setEditMode] = useState(false);
    const editModeHandle = () => {
        setEditMode((m) => !m);
    };

    return editMode ? (
        <UpsertTracker id={id} onChange={editModeHandle} />
    ) : (
        <ShowTracker
            id={id}
            title={title}
            desc={desc}
            serviceUrl={serviceUrl}
            refreshTime={refreshTime}
            onEdit={editModeHandle}
        />
    );
};
