import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@tremor/react';
import { RootState } from '../store';

// Define a type for the slice state
export interface TrackerData {
    color: Color;
    tooltip: string;
}

export interface Tracker {
    id: number;
    title: string;
    desc: string;
    url: string;
    refreshTime: number;
    data: TrackerData[];
}

// Define the initial state using that type
const initialState = {
    trackers: [
        {
            id: 1,
            title: 'Redis Server',
            desc: 'Last a hour status',
            url: 'redis/server/health',
            refreshTime: 1000,
            data: [],
        },
        {
            id: 2,
            title: 'Redis',
            desc: 'Last a hour status',
            url: 'redis/health',
            refreshTime: 1000,
            data: [],
        },
        {
            id: 3,
            title: 'Elastic',
            desc: 'Last a hour status',
            url: 'elastic/health',
            refreshTime: 1000,
            data: [],
        },
        {
            id: 4,
            title: 'Kafka',
            desc: 'Last a hour status',
            url: 'kafka/health',
            refreshTime: 1000,
            data: [],
        },
        {
            id: 5,
            title: 'Database',
            desc: 'Last a hour status',
            url: 'database/health',
            refreshTime: 1000,
            data: [],
        },
        {
            id: 6,
            title: 'App Admin Login',
            desc: 'Last a hour status',
            url: 'app/admin/login',
            refreshTime: 350000,
            data: [],
        },
        {
            id: 7,
            title: 'App Admin Panel',
            desc: 'Last a hour status',
            url: 'app/admin/panel',
            refreshTime: 350000,
            data: [],
        },
        {
            id: 8,
            title: 'Pasgah Login',
            desc: 'Last a hour status',
            url: 'pasgah/login',
            refreshTime: 350000,
            data: [],
        },
        {
            id: 9,
            title: 'Pasgah Panel',
            desc: 'Last a hour status',
            url: 'pasgah/panel',
            refreshTime: 350000,
            data: [],
        },
    ] as Tracker[],
};

export const trackerDataSlice = createSlice({
    name: 'trackerData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        deleteTracker: (state, action: PayloadAction<number>) => {
            const index = state.trackers.findIndex((f) => f.id === action.payload);
            if (index !== -1) state.trackers.splice(index, 1);
        },
        upsertTracker: (state, action: PayloadAction<Tracker>) => {
            const index = state.trackers.findIndex((s) => s.id === action.payload.id);
            if (index !== -1) state.trackers[index] = action.payload;
            else {
                action.payload.id = state.trackers.length + 1;
                state.trackers.push(action.payload);
            }
        },
        upsertTrackerData: (state, action: PayloadAction<Tracker>) => {
            if (state.trackers.length > 0) {
                const index = state.trackers.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) state.trackers[index].data = action.payload.data;
                else state.trackers.push(action.payload);
            } else state.trackers = [action.payload];
        },
    },
});

export const { deleteTracker, upsertTracker, upsertTrackerData } = trackerDataSlice.actions;

export const TrackerDataOnId = (state: RootState, id: number) =>
    state ? state?.TrackerData?.trackers.find((f) => f.id === id)?.data ?? [] : [];

export const TrackerOnId = (state: RootState, id: number) => state?.TrackerData?.trackers.find((f) => f.id === id);

export default trackerDataSlice.reducer;
