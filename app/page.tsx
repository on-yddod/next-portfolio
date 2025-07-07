'use client'

import { JSX, useCallback, useEffect, useRef, useState } from "react";

import Clear from "./Components/Clear";
import Help from "./Components/Help";
import About from "./Components/About";
import Unknown from "./Components/Unknown";
import Education from "./Components/Education";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
import { fetchStore } from "./utils/fetchStore";

interface CommandData {
  command: string;
  type: "general" | "special";
  title: string;
  output: string;
}

interface IOutputList {
  command: string;
  output: JSX.Element;
}

export default function Home() {
  const [commandList, setCommandList] = useState<CommandData[]>([]);
  const [outputList, setOutputList] = useState<IOutputList[]>([]);
  const [input, setInput] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const FocusInput = useCallback(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const fetchCommandData = useCallback(async () => {
    await fetchStore<CommandData>(
      "command_list",
      (data) => setCommandList(data),
      (err: unknown) => console.error("Error:", err)
    );
  }, []);

  useEffect(() => {
    fetchCommandData();
    FocusInput();
  }, [fetchCommandData, FocusInput]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [outputList]);

  const ClearTerminal = () => setOutputList([]);

  const ListAllInfomation = () => {
    const generalCommands = commandList.filter(cmd => cmd.type === "general");
    const rendered: IOutputList[] = generalCommands.map(cmd => ({
      command: cmd.command,
      output: renderOutputComponent(cmd.output)
    }));
    setOutputList(prev => [...prev, ...rendered]);
  }

  const renderOutputComponent = (commandName: string): JSX.Element => {
    switch (commandName) {
      case "about": return <About />;
      case "education": return <Education />;
      case "skills": return <Skills />;
      case "projects": return <Projects />;
      case "contact": return <Contact />;
      case "help": return <Help commandListParam={commandList} />;
      case "clear": return <Clear />;
      case "list": return <Clear />;
      default: return <Unknown input={commandName} />;
    }
  }

  const MappingCommand = (input: string): IOutputList | undefined => {
    if (input === "list -a") {
      ListAllInfomation();
      return;
    }

    if (input === "clear -a") {
      ClearTerminal();
      return;
    }

    const findedCommandObj = commandList.find(cmd => cmd.command === input);

    if (findedCommandObj) {
      return {
        command: findedCommandObj.command,
        output: renderOutputComponent(findedCommandObj.output)
      };
    }

    return {
      command: "unknown",
      output: <Unknown input={input} />
    };
  }

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const mappedOutput = MappingCommand(input);
    if (mappedOutput) {
      setOutputList(prev => [...prev, mappedOutput]);
    }

    setInput("");
  }

  return (
    <div className="flex justify-center bg-black w-full h-full fixed">
      <div className="w-3/6 text-green-500 font-terminal p-2 overflow-auto scrollbar" ref={scrollRef}>
        {/* Header */}
        <div className="sticky top-[-8px] bg-black">
          <p className="text-white text-2xl">yddod&apos;s Portfolio</p>
        </div>

        {/* Output */}
        <div>
          <p>type <code>help</code> to start!</p>
          {outputList.map((item, index) => (
            <div key={index}>{item.output}</div>
          ))}
        </div>

        {/* Input */}
        <div>
          <form onSubmit={HandleSubmit} className="flex justify-center items-center">
            <label className="w-[25px]" htmlFor="input">{"~>"}</label>
            <input
              type="text"
              name="input"
              className="border-none border-[1px] w-full outline-0 bg-transparent text-green-500"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>

        {/* Keep Space */}
        <div className="w-full h-[120px]" onClick={FocusInput}></div>
      </div>
    </div>
  );
}
