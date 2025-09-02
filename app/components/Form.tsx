"use client"

type Row<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
};

type FormProps<T> = {
  data: T[];
  columns: Row<T>[];
  rowKey: keyof T;
};

export default function Form<T>({ data, rowKey, columns }: FormProps<T>) {
    return (
        <>
            <h1>Form</h1>
        </>
    );
}

