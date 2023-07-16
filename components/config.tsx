'use client';

import { setLocale, setUrl } from '@/redux/config/configSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid';
import { Select, SelectItem, Text, TextInput } from '@tremor/react';

export default function Config() {
    const dispatch = useAppDispatch();
    const { locale, url } = useAppSelector((state) => state.config);

    return (
        <>
            <div className="form-group max-w-sm">
                <Text>URL</Text>
                <TextInput
                    placeholder="URL"
                    value={url}
                    onChange={(e) => {
                        dispatch(setUrl(e.target.value));
                    }}
                />
            </div>
            <div className="form-group max-w-sm">
                <Text>Locale</Text>
                <Select value={locale} onValueChange={(e) => dispatch(setLocale(e))}>
                    <SelectItem value="en" icon={GlobeAsiaAustraliaIcon}>
                        UTC
                    </SelectItem>
                    <SelectItem value="fa" icon={GlobeAsiaAustraliaIcon}>
                        Tehran
                    </SelectItem>
                </Select>
            </div>
        </>
    );
}
