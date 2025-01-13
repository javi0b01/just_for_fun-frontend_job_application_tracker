export interface INotify {
  severity: string;
  summary: string;
  detail: string;
}

export interface IResponse {
  message: INotify;
  data: any;
}

export interface IApp {
  job: {
    source: string;
    uri: string;
  };
  company: {
    name: string;
    contact: string;
    url: string;
    email: string;
    phone: null;
  };
  application: {
    dateApplied: Date;
    response: string;
    position: string;
    model: string;
    notes: null;
  };
  _id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
