interface Domain {
  state: string;
  data: any;
}
export interface State {
  [key: string]: Domain;
}
