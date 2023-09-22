export type Ing = {
  amount: any;
  title: string;
  id: string;
  name?: string;
};

export type IN = {
  amount: any;
  title: string;
};

export type Items = {
  items: Ing[];
};

export type ARG = {
  type: "ADD ITEMS";
  itms: Items;
};

export type INST = {
  items: Ing[];
  loading: boolean;
  error: any;
};

export type Ob = {
  status: string;
  message: string;
};

export type ST = {
  status: Ob | null;
};

export type NTF = {
  status: string;
  message: string;
};

export type SAGITM = {
  ITM: string;
  itms: any;
  URL: any;
  mth: string;
};

export type ID = {
  id: string;
};

export type Ingridient = {
  amount: any;
  title: string;
  id: string;
  cl: string;
};

export type CH = {
  children: React.ReactNode;
};
export type AUTH = {
  token: string;
  expiresIn: any;
  userId: string;
};

export type AUTHDATA = {
  token: string;
  expiresIn: string;
  userId: string;
};
export type ITM = {
  email: string;
  password: string;
  returnSecureToken:boolean
};
export type DATA = {
  data: AUTH | null;
  authHandler: (url: string, items: ITM) => void;
  clean: () => void;
  error: {
    Paserr: string;
    Errmsg: string;
  };
};
