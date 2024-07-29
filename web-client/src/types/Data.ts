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
  testcases: Testcase[];
}

export interface Testcase {
  input: string;
  expectedoutput: string;
}

export interface Testresult {
  testcase: number;
  status: boolean;
}

export interface Filter {
  keyword?: string;
  difficulty?: string;
}

export interface Submission {
  _id: string;
  user_id: string;
  problem_id: Problem;
  language: string;
  message: string;
  status: boolean;
  createdAt: Date;
}
