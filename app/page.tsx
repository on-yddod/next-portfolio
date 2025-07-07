
'use client'

import { useCallback, useEffect, useRef, useState } from "react";

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

export default function Home() {
  const [commandList, setCommandList] = useState<CommandData[]>([]);
  const [outputList, setOutputList] = useState<Array<any>>([]);
  const [input, setInput] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const FocusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  const fetchCommandData = useCallback(async () => {
    await fetchStore(
      "command_list",
      (data: CommandData[]) => setCommandList(data),
      (err: any) => console.error("Error:", err)
    );
  }, []);

  useEffect(() => {
    fetchCommandData();
    FocusInput();
  }, []);


  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [outputList]);

  const ClearTerminal = () => setOutputList([]);

  const ListAllInfomation = () => {
    const generalCommands = commandList.filter(cmd => cmd.type === "general");
    const rendered = generalCommands.map(cmd => ({
      command: cmd.command,
      output: renderOutputComponent(cmd.output)
    }));
    setOutputList(prev => [...prev, ...rendered]);
  }

  const renderOutputComponent = (commandName: string) => {
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

  const MappingCommand = (input: string) => {
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

  const HandleSubmit = (e: React.FormEvent) => {
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
        <div>
          <p className="text-white text-2xl">yddod's Portfolio</p>
          <p>type `help` to start!</p>
        </div>

        {/* Output */}
        <div>
          {outputList.map((item: any, index: number) => (
            <div key={index}>{item?.output}</div>
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


//#region Hardcode
// 'use client'

// import { useEffect, useRef, useState } from "react";
// import Clear from "./Components/Clear";
// import Help from "./Components/Help";
// import About from "./Components/About";
// import Unknown from "./Components/Unknown";
// import Education from "./Components/Education";
// import Skills from "./Components/Skills";
// import Projects from "./Components/Projects";
// import Contact from "./Components/Contact";

// const commandList = [
//   {
//     command: "about",
//     type: "general",
//     output: <About />
//   },
//   {
//     command: "education",
//     type: "general",
//     output: <Education />
//   },
//   {
//     command: "skills",
//     type: "general",
//     output: <Skills />
//   },
//   {
//     command: "projects",
//     type: "general",
//     output: <Projects />
//   },
//   {
//     command: "contact",
//     type: "general",
//     output: <Contact />
//   },
//   {
//     command: "help",
//     type: "special",
//     output: <Help />
//   },
//   {
//     command: "clear -a",
//     type: "special",
//     output: <Clear />
//   },
//   {
//     command: "list -a",
//     type: "special",
//     output: <Clear />
//   },
// ];

// export default function Home() {
//   const [outputList, setOutputList] = useState<Array<any>>([]);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [input, setInput] = useState<string>("");

//   const FocusInput = () => {
//     inputRef.current?.focus();
//     inputRef.current?.select();
//   }

//   useEffect(() => {
//     FocusInput();
//   }, []);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [outputList]);

//   const HandleSubmit = (e: any) => {
//     e.preventDefault();

//     console.log("HandleSubmit input value : ", input);

//     if (input == "") return;

//     const mappedOutput = MappingCommand(input);
//     setOutputList(prev => [...prev, mappedOutput]);
//     setInput("");
//   }

//   const ClearTerminal = () => setOutputList([]);

//   const HandleInputChange = (e: any) => {
//     setInput(e.target.value);
//   }

//   const ListAllInfomation = () => {
//     const filteredCommand = commandList.filter(cmd => cmd.type == "general");
//     console.log(filteredCommand);
//     setOutputList(prev => [...prev, ...filteredCommand]);
//   }

//   const MappingCommand = (input: string) => {
//     const unknownCommandObj = {
//       command: "unknown",
//       output: <Unknown input={input} />
//     };

//     if (input == "list -a") {
//       ListAllInfomation();
//       return;
//     }

//     if (input == "clear -a") ClearTerminal();

//     const findedCommandObj = commandList.find(cmd => cmd.command == input);
//     return findedCommandObj || unknownCommandObj;
//   }

//   return (
//     <div className="flex justify-center bg-black w-full h-full fixed">
//       <div className="w-3/6 text-green-500 font-terminal p-2 overflow-auto scrollbar" ref={scrollRef}>
//         {/* Header */}
//         <div>
//           <p className="text-white text-2xl">yddod's Portfolio</p>
//           <p>type `help` to start!</p>
//         </div>

//         {/* Ouput */}
//         <div>
//           {
//             outputList && outputList.map((item: any, index: number) => (
//               <div key={index}>
//                 {item?.output}
//               </div>
//             ))
//           }
//         </div>

//         {/* Input */}
//         <div>
//           <form onSubmit={(e) => HandleSubmit(e)} className="flex justify-center items-center">
//             <label className="w-[25px]" htmlFor="input">{"~>"}</label>
//             <input type="text" name="input" className="border-none border-[1px] w-full outline-0" ref={inputRef} value={input} onChange={(e) => HandleInputChange(e)} />
//           </form>
//         </div>
//         <div className="w-full h-[120px]"></div>
//       </div>
//     </div>
//   );
// }
//#endregion