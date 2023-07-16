import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Tracker, TrackerOnId, upsertTracker } from '@/redux/tracker/dataSlice';
import { Button, Card, TextInput, Text } from '@tremor/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function UpsertTracker({ id = 0, onChange = () => {} }: { id?: number; onChange?: () => void }) {
    const dispatch = useAppDispatch();
    const tracker = useAppSelector((s) => TrackerOnId(s, id));
    const [addMode, setAddMode] = useState(id ? true : false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm<Tracker>();
    const onSubmit: SubmitHandler<Tracker> = (data) => {
        if (isNaN(data.refreshTime)) {
            setError('refreshTime', {
                message: 'refresh time is not number.',
            });
            return;
        }
        if (id) data.id = id;
        data.data = [];
        dispatch(upsertTracker(data));
        setAddMode(false);
        reset();
        onChange();
    };

    return (
        <Card className="mx-auto my-5 border-dashed border-2 min-h-[200px]">
            {addMode ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                        <div className="grow">
                            <div className="form-group max-w-sm">
                                <Text>title</Text>
                                <TextInput
                                    placeholder="title"
                                    defaultValue={tracker?.title}
                                    error={errors?.title ? true : false}
                                    {...register('title', { required: true })}
                                />
                            </div>
                            <div className="form-group max-w-sm">
                                <Text>description</Text>
                                <TextInput
                                    placeholder="description"
                                    defaultValue={tracker?.desc}
                                    error={errors?.desc ? true : false}
                                    {...register('desc', { required: true })}
                                />
                            </div>
                            <div className="form-group max-w-sm">
                                <Text>url</Text>
                                <TextInput
                                    placeholder="url"
                                    defaultValue={tracker?.url}
                                    error={errors?.url ? true : false}
                                    {...register('url', { required: true })}
                                />
                            </div>
                            <div className="form-group max-w-sm">
                                <Text>refresh time (miliseconde)</Text>
                                <TextInput
                                    placeholder="refresh time"
                                    error={errors?.refreshTime ? true : false}
                                    defaultValue={tracker?.refreshTime.toString() ?? '10000'}
                                    {...register('refreshTime', { required: true, valueAsNumber: true })}
                                />
                            </div>
                            <div className="form-group max-w-sm flex gap-1">
                                <Button type="submit">{id ? 'Edit' : 'Add'}</Button>

                                <Button
                                    color="rose"
                                    onClick={() => {
                                        setAddMode((m) => !m);
                                        onChange();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="flex h-full min-h-[148px] items-center justify-center">
                    <Button onClick={() => setAddMode((m) => !m)}>Add new tracker</Button>
                </div>
            )}
        </Card>
    );
}
