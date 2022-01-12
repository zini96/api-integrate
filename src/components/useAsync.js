import React,{useReducer,useEffect} from 'react';

//reduce함수 생성
function reducer(state,action){
    switch(action.type){
        case 'LOADING':
            return{
                loading:true,
                data:null,
                error:null
            };
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return{
                loading:false,
                data:null,
                error:action.error
            }
        default:
            return state;
    }
}

//callback은 api를 호출하는 함수(apiuserreducer에서 다운로드 받는 함수)를 전달받음
//변경되는 값은 deps에 받기
function useAsync(callback,deps=[]) {   //파라미터에 디폴트값 지정하기
    //상태관리하기
    //useReducer(함수,초기값)
    const [state,dispatch] = useReducer(reducer,{   //state가 최종적으로 반환됨
        loading:false,
        data:null,
        error:null
    })
    //함수표현식으로 함수 fetchData생성  //usersdata 외에 다른정보도 callback으로 받아서 관리할수 있기 때문에
    //async => 비동기 promise를 받는 비동기함수로 만들기
    const fetchData = async() => {
        try{
        //users 초기화, error 초기화, loading true 
        dispatch({type:'LOADING'})
        const data = await callback()           //비동기전송
        
        //callback으로 받기 위해 고정값 주석처리
        // const response = await axios.get(
        //     //주소 작성
        //     'https://jsonplaceholder.typicode.com/users'
        // )

        //요청이 성공했을때
        dispatch({type:"SUCCESS", data:data})
        }
        catch(e){
            //에러가 발생하면 catch가 실행됨
            //에러번호를 확인하려면 e.response.status 확인
            console.log(e.status);
            dispatch({type:"ERROR", error:e});
        }
        //로딩 끝
    }
    //렌더링될때 호출
    useEffect(()=>{
        fetchData();
    },[])
    return [state,fetchData];
}

export default useAsync;