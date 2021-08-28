export interface Room {
  _id: String;
  number: String;
  vacancyStatus: String;
  totalSlot: Number;
  userID: Array<String>;
  admissionDate: Date;
  dischargeDate: Date;
}
