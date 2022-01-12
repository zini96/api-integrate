import React,{useEffect,useReducer} from 'react';
import axios from 'axios';
import useAsync from './useAsync';

//useAsync에 훅으로 리듀스 함수 reducer 생성

//useAsync를 사용할때 callback으로 불러서 사용할수 있게 만들어둔 함수
async function getUsers(){
    const response = await axios.get(
        //주소 작성
        'https://jsonplaceholder.typicode.com/users'
    )
    return response.data;
}

function ApiUsersReducer() {
    const [state,refetch] = useAsync(getUsers);
    //usereducer로 한번에 받아오지 않고 하나씩 값을 받아오고 싶다면
    //구조분해할당으로 아래처럼 받기
    const {loading,error,data:users} = state;
    //로딩중이라면?
    if(loading) return <div>로딩중...</div>
    //에러가 발생했다면?
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return null;
    return (
        <div>
            <ul>
                {users.map(user=>(
                    <li key={user.id}>{user.username}{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ApiUsersReducer;