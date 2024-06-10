import React, {ChangeEvent, useEffect, useState} from "react";
import style    from "../components/style.module.css";
import { Link, useParams }   from 'react-router-dom';
import {mainDataInitialType} from "../types/alltypes.ts"

type PropsType = {mainData: mainDataInitialType[], setMainData: (arg: mainDataInitialType[]) => void};

const TasksPage = ( props: PropsType ) => {

    const {taskType, taskId} = useParams();                                         // получем параметры из ссылки страницы
    const [selectTask, setSelectTask] = useState({type: taskType as string, id: taskId as string, title: "", text: ""});

    const foundTask = () => {                                                       // находим нужную задачу в основном массиве с данными
        let mainDataUseTask = props.mainData.find(elem => elem.type === taskType);
        if (mainDataUseTask) {
            mainDataUseTask.tasks.forEach(task => task.id === taskId && setSelectTask({type: mainDataUseTask!.type, ...task}))
        }
    }

    useEffect(() => {foundTask()}, []);                                                  // вызываем функцию поиска один раз.

    const [editTitleToggle, setEditTitleToggle] = useState(false);
    const edidTitleInputShow = () => {setEditTitleToggle(!editTitleToggle); saveData(selectTask)}
    const [editTextToggle,  setEditTextToggle]  = useState(false);
    const edidTextInputShow  = () => {setEditTextToggle(!editTextToggle); saveData(selectTask)}

    const handlerChangeInputTitle = (e: ChangeEvent<HTMLInputElement>): void => setSelectTask({type: selectTask.type, id: selectTask.id, title: e.target.value,   text: selectTask.text});
    const handlerChangeInputText  = (e: ChangeEvent<HTMLInputElement>): void => setSelectTask({type: selectTask.type, id: selectTask.id, title: selectTask.title, text: e.target.value});
        
    const saveData = (savedElm) => {                                                 // сохраняем изменения title и text в основном массиве данных
        let newMainData = [...props.mainData];
        newMainData.forEach((elem, index) => (elem.type === selectTask.type) && newMainData[index].tasks.forEach((task) => {
            if (task.id === selectTask.id) {
                task.title = selectTask.title;
                task.text  = selectTask.text;
            } }));
            props.setMainData(newMainData);
    }

    return (
        <main className='App-main'>
            <div className={style.taskPage_cover}>
                <div className={style.taskPage_task}>
                    <div>
                        <div className={style.taskPage_type}>{selectTask.type}</div>
                        {!editTitleToggle && (<div className={style.taskPage_title} onClick={edidTitleInputShow}>{selectTask.title}</div>)}
                        { editTitleToggle &&  (<div>
                            <input  className={style.taskPage_fildsInputTitle} type="text" onChange={handlerChangeInputTitle} value={selectTask.title} />
                            <button className={style.taskPage_button} onClick={edidTitleInputShow}> Save </button>
                        </div>)}
                        {!editTextToggle  && (<div  className={style.taskPage_text}  onClick={edidTextInputShow}> {selectTask.text} </div>)}
                        { editTextToggle &&  (<div>
                            <textarea  className={style.taskPage_fildsInputText} onChange={handlerChangeInputText} value={selectTask.text} />
                            <button className={style.taskPage_button} onClick={edidTextInputShow}> Save </button>
                        </div>)}
                     </div>
                    <div  className={style.taskPage_id}>id: {selectTask.id}   </div>
                </div>
                <Link className={style.taskPage_return} to="/"></Link>
            </div>
        </main>
    );
}

export default TasksPage;