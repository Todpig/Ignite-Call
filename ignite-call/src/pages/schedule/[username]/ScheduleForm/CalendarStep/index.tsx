import { Calendar } from "@/Components/Calendar";
import {
  Container,
  TimePiker,
  TimePikerHeader,
  TimePikerItem,
  TimePikerList,
} from "./styles";
import { useState } from "react";
import dayjs from "dayjs";

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDateSelcted = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  return (
    <Container isTimePickerOpen={isDateSelcted}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelcted && (
        <TimePiker>
          <TimePikerHeader>
            {weekDay} <span>{describedate}</span>
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
