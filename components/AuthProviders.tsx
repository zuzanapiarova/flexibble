"use client";

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | undefined;
  };

// Record type in TypeScript = used to create a dictionary of key-value pairs, where the keys and values can have specific types
//so in the Record of providers, the type of key is a string and the type of value is a Provider type we created above
    type Providers = Record<string, Provider>;

    const AuthProviders = () => {
        const [providers, setProviders] = useState<Providers | null>(null);
    
        useEffect(() => {
            const fetchProviders = async () => {
                const res = await getProviders();
        
                setProviders(res);
            }
    
            fetchProviders();
        }, []);
    
        if (providers) {
            return (
                <div>
                    {Object.values(providers).map((provider: Provider, i) => (
                        <button key={i} onClick={() => signIn(provider?.id)}>{provider.id}</button>                   
                    ))}
                </div>
            )
        } else {
            return <></>
        }
    }
    
    export default AuthProviders
