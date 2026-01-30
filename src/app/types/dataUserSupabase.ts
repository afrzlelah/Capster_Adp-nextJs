export type UserDataSupabase = {
  id: string;
  username: string;
  role: string;
  password: string;
  emai: string;
  points: number;
  nextBooking: {
    id: string;
    services: string;
    date: string;
    jam: string;
    barber: string;
  };
};
