export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  isadmin: boolean;
  picture?: string;
}

export interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  inputformat: string;
  outputformat: string;
  constraints: string[];
  exampleinput: string[];
  exampleoutput: string[];
}

export interface Testcase {
  input: string;
  expectedoutput: string;
}

export interface Testresult {
  testcase: number;
  status: boolean;
}
