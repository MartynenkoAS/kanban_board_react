import React, {ChangeEvent, useState} from "react";
import style from "./style.module.css";

const CardTitleInput = (props) => {
    
    const [caseTitle, setCaseTitle] = useState("");
    const handlerChangeInput  = (e: ChangeEvent<HTMLInputElement>):void => setCaseTitle(e.target.value);
    
    function handlerKeyPress(e) {                                   // чтобы можно было ввести title нажав Enter
        if(e.key === 'Enter'){ 
            submitFunc()
        }
    }

    const submitFunc = () => {
        if (caseTitle !== "") {
            let mainDataNewElement = {id: String(new Date().getTime()), title: caseTitle, text: "Text description..."}
            props.updateMainDataBacklog(props.mainData.type, mainDataNewElement);
        }
        props.setAddButtonToggle()
    }

    const updateSelectFunc = (e) => {
        props.updateMainDataSelect(e);
        props.setAddButtonToggle()
    }

    return (
        <>
            {!props.addButtonToggle && props.mainDataSelect === undefined && 
                (<div className={style.caseTitleInputGroup}>
                    <input  className={style.caseTitleInput} data-testid="input-task-title"  type="text" onChange={handlerChangeInput} placeholder="New task title..." onKeyDown={handlerKeyPress} />
                    <button className={style.button_submit}  data-testid="button-submit" onClick={submitFunc}>Submit</button>
                </div>)}
            {!props.addButtonToggle && props.mainDataSelect !== undefined && 
                (<div className={style.caseTitleInputGroup}>
                        <select className={style.caseAddList} onChange={e => updateSelectFunc(e.target.value)}>
                            <option key="0" className={style.block_element} value={0}> Choice... </option>
                            {props.mainDataSelect.tasks.length > 0 && 
                            props.mainDataSelect.tasks.map((elem, index) => {return <option key={elem.id} className={style.block_element} value={elem.id}> {elem.title} </option>})}
                        </select>
                </div>)}
        </>
    );
}
export default CardTitleInput