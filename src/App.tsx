import React, {useEffect, useState}              from "react";
import { BrowserRouter, Routes, Route }          from "react-router-dom";
import MainPage                                  from "./pages/MainPage.tsx";
import TasksPage                                 from "./pages/TasksPage.tsx";
import Header                                    from "./pages/Header.tsx";
import Footer                                    from "./pages/Footer.tsx";
import { mainDataTaskType, mainDataInitialType } from "./types/alltypes.ts"
import "./App.css";


function App() {
  
  let mainDataInitial: mainDataInitialType[] = [];

  if (localStorage.getItem("mainData") != null) {                                     // проверяем, есть ли данные в хранилище, да - берем оттуда, нет - создаем новый массив
    const savedData: string | null = localStorage.getItem("mainData");
          savedData != null && (mainDataInitial = JSON.parse(savedData));
  } else {
          mainDataInitial = [ {type: "Backlog",    tasks: []}, 
                              {type: "Ready",      tasks: []},
                              {type: "in Progres", tasks: []},
                              {type: "Finished",   tasks: []}];
  }

  const [mainData, setMainData] = useState<mainDataInitialType[]>(mainDataInitial);
  
  useEffect(() => {localStorage.setItem("mainData", JSON.stringify(mainData))});                      // для автоматического обновления данных в хранилище, при изменении mainData

  const updateMainDataBacklog = (type: string, newTasks: mainDataTaskType) => {                       // добавляем новую задачу в Backlog
    let newMainData = [...mainData];
    newMainData.forEach((elem, index) => (elem.type === type) && newMainData[index].tasks.push(newTasks));
    setMainData(newMainData);
  }
  
  const updateMainDataSelect = (cardId: string) => {                                           // перемещаем задачу между группами
    let newMainData = [...mainData];
    for (let i = 0; i < newMainData.length - 1; i++ ) {
      for (let y = 0; y < newMainData[i].tasks.length; y++ ) {
        if (newMainData[i].tasks[y].id === cardId) {                        
          let newMainDataTskElm = {id: newMainData[i].tasks[y].id, title: newMainData[i].tasks[y].title, text: newMainData[i].tasks[y].text};
          newMainData[i].tasks.splice(y, 1);
          newMainData[i + 1].tasks.push(newMainDataTskElm);
          cardId = "";
        } 
      }
    }
    setMainData(newMainData);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
          <Routes>
            <Route path="/" element={<MainPage mainData={mainData} updateMainDataBacklog={updateMainDataBacklog} updateMainDataSelect={updateMainDataSelect} />} />
            <Route path="/:taskType/:taskId" element={<TasksPage mainData={mainData} setMainData={setMainData} />} />
          </Routes>
        <Footer mainData={mainData} />
      </div>
    </BrowserRouter>
  );
}

export default App;
