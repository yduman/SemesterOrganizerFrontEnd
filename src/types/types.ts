export type SignUpFormValues = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type Team = {
  id: number;
  name: string;
};
