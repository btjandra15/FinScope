"use client";

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => router.push("/"), 2000);
    }, []);

    return <div>You have been logged out... Redirecting you to main page...</div>
};

export default LogoutPage;
