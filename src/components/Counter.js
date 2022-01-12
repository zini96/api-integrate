import {useReducer, useState} from "react";
function Counter(){

    function reducer(state,action){
        //action.type에 따라 다르게 처리
        switch(action.type){
            case 'INCREASE' :
            return state + 1;
            case 'DECREASE' :
            return state -1;
            default:
            return state
        }
        //if문 사용해도 되고 switch문 사용해도 됨
    }

    //useReducer로 상태관리하기
    const [number, dispatch] = useReducer(reducer,0);

    //useState로 상태관리하기
    // const [number,setNumber] = useState(0);
    const onIncrease = () =>{
        dispatch({type:"INCREASE"})
        // setNumber(prevNumber => prevNumber+1);
    }
    const onDecrease = () => {
        dispatch({type:"DECREASE"})
        // setNumber(prevNumber => prevNumber-1)
    }
    return(
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}
export default Counter;

