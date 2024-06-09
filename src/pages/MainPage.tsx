import React        from "react";
import BlockDrowing from "../components/BlockDrowing.tsx";
import {mainDataInitialType} from "../types/alltypes.ts";

type PropsType = {mainData: mainDataInitialType[], updateMainDataBacklog, updateMainDataSelect};

const MainPage = ( props: PropsType ) => {

    return (
        <main className='App-main'>
            {props.mainData.map((elem, index) => {return <BlockDrowing key={elem.type} 
            updateMainDataBacklog={props.updateMainDataBacklog} 
            updateMainDataSelect ={props.updateMainDataSelect} 
            mainData={elem} mainDataSelect={props.mainData[index-1]} />})}
            
        </main>
    );
}

export default MainPage;