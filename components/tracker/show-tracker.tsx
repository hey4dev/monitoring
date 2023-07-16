'use client';

import { Card, Title, Tracker, Flex, Text, Icon } from '@tremor/react';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TrackerData, TrackerDataOnId, deleteTracker, upsertTrackerData } from '@/redux/tracker/dataSlice';
import { ExclamationTriangleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Loading from './../loading';

const DefaultTrackerdata: TrackerData[] = new Array(60).fill({
    color: 'gray',
    tooltip: 'Maintenance',
});

const fetcher = (url: string) => fetch(url).then((r) => r.text());

export const ShowTracker = ({
    id,
    title,
    desc,
    serviceUrl,
    refreshTime = 60000,
    onEdit = () => {},
}: {
    id: number;
    title: string;
    desc: string;
    serviceUrl: string;
    refreshTime?: number;
    onEdit?: () => void;
}) => {
    const dispatch = useAppDispatch();
    const lastStatus = useAppSelector((s) => TrackerDataOnId(s, id));
    const { locale, url } = useAppSelector((state) => state.config);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [status, setStatus] = useState(DefaultTrackerdata);
    const [loadData, setLoadData] = useState(false);

    const getDisplayTime = useMemo(() => {
        if (locale === 'fa') {
            return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
                dateStyle: 'short',
                timeStyle: 'short',
                hour12: false,
            }).format(lastUpdate);
        } else {
            return new Intl.DateTimeFormat('en-US-u-nu', {
                dateStyle: 'short',
                timeStyle: 'short',
                hour12: false,
            }).format(lastUpdate);
        }
    }, [lastUpdate, locale]);

    useEffect(() => {
        if (lastStatus.length > 0) setStatus(lastStatus);
        setLoadData(true);
    }, []);

    useEffect(() => {
        dispatch(
            upsertTrackerData({
                id,
                title,
                desc,
                url: serviceUrl,
                refreshTime,
                data: status,
            })
        );
    }, [desc, id, refreshTime, serviceUrl, status, title, dispatch]);

    useEffect(() => {
        if (loadData) {
            setLastUpdate(new Date());
            setTimeout(() => {
                const newStatusArray = [...status];
                fetcher(url + '/' + serviceUrl)
                    .then((newStatus) => {
                        newStatusArray.shift();
                        newStatusArray.push(
                            newStatus === 'true'
                                ? { color: 'emerald', tooltip: 'Operational' }
                                : {
                                      color: 'rose',
                                      tooltip: 'Downtime',
                                  }
                        );
                        setStatus(newStatusArray);
                    })
                    .catch((err) => {
                        newStatusArray.shift();
                        newStatusArray.push({
                            color: 'gray',
                            tooltip: 'Maintenance',
                        });
                        setStatus(newStatusArray);
                    });
            }, refreshTime);
        }
    }, [status, url, serviceUrl, refreshTime, loadData]);

    const Uptime = useMemo(() => {
        const lengthUp =
            status.filter((cv) => {
                return cv.tooltip === 'Operational';
            })?.length ?? 0;

        const upPercent = (lengthUp / 60) * 100;
        return upPercent.toFixed(2);
    }, [status]);

    const deleteTrackerHandle = () => {
        if (window.confirm('Do you sure ?')) dispatch(deleteTracker(+id));
    };

    const editModeHandle = () => {
        onEdit();
    };

    return (
        <Card className="mx-auto my-5 group/item">
            <div className="flex">
                <div className="grow">
                    <div className="flex items-center">
                        <Title>{title}</Title>
                        {localStorage.getItem('readonly') === 'false' ? (
                            <div className="invisible group-hover/item:visible">
                                <Icon
                                    icon={TrashIcon}
                                    size="xs"
                                    variant="light"
                                    color="rose"
                                    className="ml-3 cursor-pointer"
                                    tooltip="delete"
                                    onClick={deleteTrackerHandle}
                                />
                                <Icon
                                    icon={PencilIcon}
                                    size="xs"
                                    variant="light"
                                    className="ml-1 cursor-pointer"
                                    tooltip="edit"
                                    onClick={editModeHandle}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Text>{desc}</Text>
                    <Text>Last updated {getDisplayTime}</Text>
                </div>
                {status.findLast((m) => m)?.tooltip !== 'Operational' ? (
                    <span className="relative flex h-10 w-10 justify-center items-center">
                        <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-rose-400 opacity-40"></span>
                        <ExclamationTriangleIcon className="text-rose-500" />
                    </span>
                ) : (
                    <></>
                )}
            </div>
            {loadData ? (
                <>
                    <Flex justifyContent="end" className="mt-4">
                        <Text>Uptime {Uptime}%</Text>
                    </Flex>
                    <Tracker data={status} className="mt-2" />
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <Loading />
                </div>
            )}
        </Card>
    );
};
