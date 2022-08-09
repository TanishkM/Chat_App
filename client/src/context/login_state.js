import login_cont from "./login_cont";
import { useState } from "react";

const NoteState = (props) => {
  const [spage, setSpage] = useState(false) ;
  const setpage=async ()=>{
    setSpage(!spage)

}

  return (
    <login_cont.Provider value={{ spage, setpage }}>
      {props.children}
    </login_cont.Provider>
  )

}
export default NoteState;