'use client';

import { TrackerService } from '@/components/tracker';
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Grid, Card, Flex } from '@tremor/react';
import { Cog6ToothIcon, WindowIcon } from '@heroicons/react/24/solid';
import Config from '@/components/config';
import { useAppSelector } from '@/redux/hook';
import UpsertTracker from '@/components/tracker/upsert-tracker';
import DarkModeSwitch from '@/components/darkModeSwitch';
import { motion } from 'framer-motion';
import ReadOnlySwitch from '@/components/readOnlySwitch';

export default function Home() {
    const services = useAppSelector((s) => s.TrackerData.trackers);
    return (
        <main className="flex min-h-screen flex-col p-5 dark:bg-slate-800 bg-gray-200">
            <Card>
                <div className="flex flex-wrap gap-2">
                    <h1 className="text-2xl dark:text-gray-200 text-slate-800 grow">Monitoring</h1>
                    <div className="flex gap-3">
                        <DarkModeSwitch />
                        <ReadOnlySwitch />
                    </div>
                </div>
            </Card>

            <TabGroup>
                <TabList className="mt-8">
                    <Tab icon={WindowIcon}>Dashboard</Tab>
                    <Tab icon={Cog6ToothIcon}>Config</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-2">
                            {services.map((service, idx) => (
                                <motion.div
                                    key={service.id}
                                    style={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 * idx + 0.1 }}
                                >
                                    <TrackerService
                                        id={service.id}
                                        title={service.title}
                                        desc={service.desc}
                                        serviceUrl={service.url}
                                        refreshTime={service.refreshTime}
                                    />
                                </motion.div>
                            ))}
                            {localStorage.getItem('readonly') === 'false' ? (
                                <motion.div
                                    style={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 * services.length + 0.1 }}
                                >
                                    <UpsertTracker />
                                </motion.div>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid numItemsSm={1} numItemsMd={3} numItemsLg={5} className="gap-2 mt-3">
                            <Config />
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    );
}
