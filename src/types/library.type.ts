export type InputDatabase = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export type TBook = {
  title: string;
  author: string;
  pubDate: Date;
  pages: {
    page: number;
    contentPage: string;
  }[];
}

export type TUpdateBook = Omit<TBook, 'pages'>;