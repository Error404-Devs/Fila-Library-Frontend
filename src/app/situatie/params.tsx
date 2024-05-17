'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudentStatus } from './studentStatus';

const baseUrl = process.env.BASE_URL;

export default function ParamsUrl() {

    const searchParams = useSearchParams();
    const nr_crt = searchParams.get('nr_crt');
    console.log(nr_crt)

    return( 
        <StudentStatus nr_crt={nr_crt} />
    );
}
