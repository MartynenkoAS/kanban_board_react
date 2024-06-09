import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App tests", () => {
  it ("проверяем, что появляется Input после нажатия <+Add card>", () => {

    const { getByText, getByTestId } = render (<App />);

    const testingButtonInput = screen.getByTestId("button-BacklogInput");                 // находим  кнопку <+Add card>

          expect(testingButtonInput).toBeVisible();                                       // Ожидаем, что кнопка <+Add card> будет видна

          fireEvent.click(testingButtonInput)                                             // нажимаем кнопку +Add card

    const testingInputTaskTitle = screen.getByTestId("input-task-title");                 // находим input  для ввода title
    const testingButtonSubmit = screen.getByTestId("button-submit");                      // находим button для ввода title

          expect(testingInputTaskTitle).toBeVisible();                                    // Ожидаем, что input появился
          expect(testingButtonSubmit).toBeVisible();                                      // Ожидаем, что button Submit появился

          
          let newTestTitle = `new test task:${String(new Date().getTime())}`
          fireEvent.change(testingInputTaskTitle, {target: {value: newTestTitle}})        // заполняем input названием новой карточки
    
          fireEvent.click(testingButtonSubmit)                                            // нажимаем кнопку Submit

          expect(screen.getByText(newTestTitle)).toBeInTheDocument()                      // проверяем, что элемент с нашим title появился на странице



  });
})
