//커스텀훅 사용시 보통 use~로 이름 세팅

import {useState} from 'react';

//state에 있던 inputs을 훅으로 분리하기
function useInputs(initialForm){ //initialForm 초기값
    const [form, setForm] = useState(initialForm); //initialForm을 form에 넣어주기
    //onChange=> 보이는 input에 값이 들어가면 상태를 관리하고있던 inputs 값을 변경해주는 훅
    const onChange = (e) => {
        const {name,value} = e.target;
        setForm(form=> ({...form,[name]:value}));
    }
    const reset = () => setForm(initialForm); //reset하면 initialForm 입력, 초기화
    return[form,onChange,reset]; //배열에 순서대로 반환해줌
}
export default useInputs;