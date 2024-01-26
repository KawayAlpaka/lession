"use client";

interface IProps {
  text?: string;
  onClick?: () => void;
}

export const Button = ({
  text = "hello",
  onClick = () => {
    alert("hello world");
  },
}: IProps) => {
  return <button onClick={onClick}>{text}</button>;
};
