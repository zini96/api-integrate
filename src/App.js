import './App.css';
// import Counter from './components/Counter';
import UserList from './components/UserList';
import React, {useState, useRef, useReducer} from 'react';
import CreateUser from './components/CreateUser';
import useInputs from './hooks/useInputs';

//useReducer사용하기
  //초기state 객체로 만들어주기
  const initialState = {
    // inputs: {
    //   username:'',
    //   userage:''
    // },
    users:[
      {id:1,username:"그린",age:30, member:false},
      {id:2,username:"블루",age:20, member:false},
      {id:3,username:"핑크",age:18, member:false},
      {id:4,username:"레드",age:27, member:false}
    ]
  }

  function reducer(state,action){
    switch(action.type){
      case 'CHANGE_INPUT':  //type이 해당케이스일때만 리턴
        return{
          ...state, //기존의 inputd의 state는 그대로 리턴 Object.assign과 동일한 효과
          inputs:{
            ...state.inputs, //inputs의 원본 받아오기
            [action.name]:action.value //input의 값이 변경된걸 dispatch를 통해 reducer의 전체 state를 업데이트해줌
          }
        };
        case 'CREATE_USER':
          return{
            // inputs: state.inputs,
            users:[
              ...state.users,
              action.user
            ]
          }
        case 'MEMBER_TOGGLE':
          return{
            // inputs:state.inputs,
            users: state.users.map(user=>
              user.id === action.id ? {...user,member:!user.member} : user
            )
          }
        case 'MEMBER_DELETE':
          return{
            // inputs:state.inputs,
            users: state.users.filter(user=>user.id !== action.id)
          }
        default:
          return state;
    }
  }



//UserDispatch라는 Context를 생성하고 내보내기
export const UserDispatch = React. createContext(null);


function App() {
  const [{username,userage},onChange,reset] = useInputs({
    username:'',
    userage:''
  })
  const [state,dispatch] = useReducer(reducer,initialState);
  const {users} = state;
  // const {username,userage} = state.inputs; //input이 가진 이름과 나이를 구조분해할당
  const nextId = useRef(5);

  //useReducer사용하기
  // function onChange(e){
  //   const {name,value} = e.target; //해당 인풋의 값을 구조분해할당해서 각자 담아주고, setInput으로 업데이트
  //   dispatch({ //reducer를 실행하고 action에 값을 전달
  //     type:'CHANGE_INPUT',
  //     name: name,
  //     value: value
  //   })
  // }

  //users를 update해주는 함수
  function onCreate(){
    dispatch({
      type:'CREATE_USER',
      user:{ //객체를 만들때 부여한 키:input에 담긴 값
        id:nextId.current,
        username:username,
        age: userage
      }
    })
    nextId.current = nextId.current+1;
  }

  function onToggle(id){
    dispatch({
      type:"MEMBER_TOGGLE",
      id:id
    })
  }

  function onDelete(id){
    dispatch({
      type:"MEMBER_DELETE",
      id:id
    })
  }

  //useState사용하기
  // const [inputs,setInput] = useState({  //input=상태,setInput=변한 값 업데이트
  //   username:'',
  //   userage:''
  // })

  

  // //구조분해할당으로 각자 담아주기
  // const {username,userage} = inputs;
  // const [users,setUsers] = useState([
  //   {id:1,username:"그린",age:30},
  //   {id:2,username:"블루",age:20},
  //   {id:3,username:"핑크",age:18},
  //   {id:4,username:"레드",age:27}
  // ])

  // //input의 값이 변경되면 onChange실행
  // function onChange(e){
  //   const {name,value} = e.target; //해당 인풋의 값을 구조분해할당해서 각자 담아주고, setInput으로 업데이트
  //   setInput({
  //     ...inputs, //상태
  //     [name]:value
  //   })
  // }

  // function onCreate(){
  //   setUsers([
  //     ...users,
  //     {id:nextId.current, username:username, age:userage}
  //   ])
  // }

  return (
    <UserDispatch.Provider value={dispatch}>
    <div className="App">
      {/* <Counter></Counter> */}
      <CreateUser username={username} userage={userage} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users}/> 
      {/* UseContext를 사용해서 전역적으로 값을 전달해줄수 있기 때문에 User에 필요하던 값을 UserList를 통할 이유X */}
      {/* <UserList users={users} onToggle={onToggle} onDelete={onDelete}/> */} 
    </div>
    </UserDispatch.Provider>
  );
}

export default App;
