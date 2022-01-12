import Hello from "./components/Hello";
import React,{Component} from "react";

// function App2() {
//   return (
//     <Hello/>
//   );
// }

class App2 extends Component{
  render(){
    return(
      <div>
        <Hello/>
      </div>
    );
  }
}

export default App2;
