import React from 'react'

export default function FormLabel({
    title,
    required = false,
    labelFor,
}: {
    title: string;
    required?: boolean;
    labelFor: string;
}) {


    return (
        <div className="flex justify-between w-full">
            <label className="form-title" htmlFor={labelFor}>
                {title}
                {required ? <span className="text-brand-red text-xl">*</span> : null}
            </label>
        </div>
    );
}
