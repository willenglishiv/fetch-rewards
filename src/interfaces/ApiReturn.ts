export default interface ApiReturn {
  occupations: string[];
  states: {
    name: string;
    abbreviation: string;
  }[];
}
