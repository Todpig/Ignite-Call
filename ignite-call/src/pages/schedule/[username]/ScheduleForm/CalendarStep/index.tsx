import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePiker,
  TimePikerHeader,
  TimePikerItem,
  TimePikerList,
} from "./styles";

export function CalendarStep() {
  const isDateSelcted = true;
  return (
    <Container isTimePickerOpen={isDateSelcted}>
      <Calendar />
      {isDateSelcted && (
        <TimePiker>
          <TimePikerHeader>
            terça-feira <span>20 de setembro</span>
          </TimePikerHeader>
          <TimePikerList>
            <TimePikerItem>08:00h</TimePikerItem>
            <TimePikerItem>09:00h</TimePikerItem>
            <TimePikerItem>10:00h</TimePikerItem>
            <TimePikerItem>11:00h</TimePikerItem>
            <TimePikerItem>12:00h</TimePikerItem>
            <TimePikerItem>13:00h</TimePikerItem>
            <TimePikerItem>14:00h</TimePikerItem>
          </TimePikerList>
        </TimePiker>
      )}
    </Container>
  );
}
