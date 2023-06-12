type Users = {
  avatar?: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
};

type UserError = {
  email: string;
  first_name: string;
  last_name: string;
}
export type { Users, UserError };
