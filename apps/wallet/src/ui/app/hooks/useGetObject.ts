// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useRpcClient } from '@mysten/core';
import {
    type GetObjectDataResponse,
    normalizeSuiAddress,
} from '@mysten/sui.js';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export function useGetObject(
    objectId: string
): UseQueryResult<GetObjectDataResponse, unknown> {
    const rpc = useRpcClient();
    const normalizedObjId = normalizeSuiAddress(objectId);
    const response = useQuery(
        ['object', normalizedObjId],
        async () => {
            return rpc.getObject(normalizedObjId);
        },
        { enabled: !!objectId }
    );

    return response;
}
