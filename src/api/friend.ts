import request from '../utils/request'
import {Result} from "../result";
import {FriendType} from "../type/friendType";
import {UseFetchReturn} from "@vueuse/core";
import {useMyFetch} from "../utils/requestFetch";

export function getFriends(): UseFetchReturn<FriendType[]> {
    return useMyFetch<Result<FriendType[]>>("/api/v1/friend").json();
}