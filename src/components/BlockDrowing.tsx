import React, { useState }     from "react";
import style                   from "./style.module.css";
import CardTitleInput          from "./CardTitleInput.tsx";
import { Link }                from 'react-router-dom';
import { mainDataInitialType } from "../types/alltypes.ts";

type PropsType = {mainData: mainDataInitialType, updateMainDataSelect, updateMainDataBacklog, mainDataSelect};

const BlockDrowing = ( props: PropsType ) => {

    const [addButtonToggle, setAddButtonToggle] = useState(true);
    const cardTitleInputShow = () => setAddButtonToggle(!addButtonToggle)
    
    return (
        <div className={style.block}>
            <div className={style.block_header}>{props.mainData.type}</div>
                {props.mainData.tasks.length > 0 && props.mainData.tasks.map((elem, index) => 
                {return <Link key={elem.id} className={style.block_element} to={`/${props.mainData.type}/${elem.id}`}> {elem.title} </Link>})}
            
            {!addButtonToggle && <CardTitleInput addButtonToggle={addButtonToggle} setAddButtonToggle={cardTitleInputShow} updateMainDataSelect={props.updateMainDataSelect} 
                                                 updateMainDataBacklog={props.updateMainDataBacklog} mainData={props.mainData} mainDataSelect={props.mainDataSelect}/>}
            {addButtonToggle && props.mainDataSelect === undefined &&
                (<button className={style.button_addCard} data-testid="button-BacklogInput" onClick={cardTitleInputShow}>+Add card</button>)}
            {addButtonToggle && props.mainDataSelect !== undefined && props.mainDataSelect.tasks.length > 0 &&
                (<button className={style.button_addCard} onClick={cardTitleInputShow}>+Add card</button>)}
        </div>
    );
};
export default BlockDrowing;