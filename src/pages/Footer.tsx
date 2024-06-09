import React from "react";
import {mainDataInitialType} from "../types/alltypes.ts";

type PropsType = {mainData: mainDataInitialType[]};

const Footer = ( props: PropsType ) => {

    return (
        <footer className="App-header App-footer">
            <div>{`Active tasks:   <${props.mainData[0].tasks.length + props.mainData[1].tasks.length + props.mainData[2].tasks.length}>\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
                    Finished tasks: <${props.mainData[3].tasks.length}>`}</div>
            <div>Kanban board by ALEX, 2024</div>
        </footer>
    );
}
export default Footer;