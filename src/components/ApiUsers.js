import React,{useState,useEffect} from 'react';
import axios from 'axios';

const ApiUsers = () => {
    //상태 관리하기
    //1.요청의 결과 2.로딩상태 3.에러
    const [users,setUsers] = useState(null);
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);
    //함수표현식으로 함수 fetchUsers생성
    //async => 비동기 promise를 받는 비동기함수로 만들기
    const fetchUsers = async() => {
        try{
        //users 초기화, error 초기화, loading true 
        setUsers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
            //주소 작성
            'https://jsonplaceholder.typicode.com/users'
        )
        setUsers(response.data);
        }
        catch(e){
            //에러가 발생하면 catch가 실행됨
            //에러번호를 확인하려면 e.response.status 확인
            console.log(e.response.status);
            setError(e);
        }
        //로딩 끝
        setLoading(false);
    }
    //렌더링 될때 axios 사용해서 데이터를 받음
    useEffect(()=>{
        fetchUsers();
    },[])
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
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default ApiUsers;