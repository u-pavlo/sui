// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useRpcClient } from '@mysten/core';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { ValidatorMetaData, DelegatedStake } from '@mysten/sui.js';

export function useGetDelegatedStake(
    address: string
): UseQueryResult<DelegatedStake[], Error> {
    const rpc = useRpcClient();
    return useQuery(['validator', address], () =>
        rpc.getDelegatedStakes(address)
    );
}

export function useGetValidatorMetaData(): UseQueryResult<
    ValidatorMetaData[],
    Error
> {
    const rpc = useRpcClient();
    // keeping the query parent key the same to invalidate all related queries
    return useQuery(['validator', 'all'], async () => {
        return rpc.getValidators();
    });
}
