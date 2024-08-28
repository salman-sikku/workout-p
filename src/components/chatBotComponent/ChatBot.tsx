"use client";
import React, { useState, useEffect, useRef } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { IoIosNutrition } from "react-icons/io";
import { FaBottleWater } from "react-icons/fa6";
import { GiKneeCap } from "react-icons/gi";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promt, setPromt] = useState('What should I eat before and after my workout?');
  const [promtTwo, setPromtTwo] = useState('How much water should I drink during exercise?');
  const [promtThree, setPromtThree] = useState('What can I do to prevent injuries during my workout?');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const runChat = async (prompt: string) => {
    const newMessages = [
      ...messages,
      { role: "user", text: prompt },
    ];
    setMessages(newMessages);
    localStorage.setItem('chatMessages', JSON.stringify(newMessages));


    setIsLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const botResponce = response.text();
    let responceArr = botResponce.split("**");
    let newArr: any = '';
    for (let i = 0; i < responceArr.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArr += responceArr[i]
      } else {
        newArr += "<b>" + responceArr[i] + "</b>";
      }
    }
    let newResponce = newArr.split("*").join("</br>")
    const updatedMessages = [
      ...newMessages,
      { role: "model", text: newResponce },
    ];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setIsLoading(false);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      runChat(input);
      setInput('');
    }
  };

  const handleDeleteMessages = () => {
    // Clear messages from state and local storage
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  const handlePromt = (promt: string) => {
    runChat(promt)
  }

  return (
    <>
      <div className='relative flex flex-col h-[84vh] overflow-hidden'>
        {
          messages.length < 1 ? (
            <div className='h-full flex justify-center'>
              <div className='md:mt-12 mt-10 text-center'>
                <h2 className='text-[24px] md:text-[46px] font-[500] text-[#c4c7c5] mb-8'>How can I help you today</h2>
                <div className='flex flex-wrap justify-center gap-4'>
                  <div onClick={() => handlePromt(promt)} className='relative hover:cursor-pointer flex w-32 md:w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[13px] md:text-[15px] shadow-xxs transition hover:border-[#714dff] disabled:cursor-not-allowed'>
                    <span className='w-6 md:w-7 h-6 md:h-7 flex text-[#714dff] text-[16px] md:text-[18px] justify-center items-center bg-[#f0ecff] rounded-full'>
                      <IoIosNutrition />
                    </span>
                    <p className='line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500 break-word'>{promt}</p>
                  </div>
                  <div onClick={() => handlePromt(promtTwo)} className='relative hover:cursor-pointer flex w-32 md:w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[13px] md:text-[15px] shadow-xxs transition hover:border-[#714dff] disabled:cursor-not-allowed'>
                    <span className='w-6 md:w-7 h-6 md:h-7 flex text-[#714dff] text-[16px] md:text-[18px] justify-center items-center bg-[#f0ecff] rounded-full'>
                      <FaBottleWater />
                    </span>
                    <p className='line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500 break-word'>{promtTwo}</p>
                  </div>
                  <div onClick={() => handlePromt(promtThree)} className='relative hover:cursor-pointer flex w-32 md:w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[13px] md:text-[15px] shadow-xxs transition hover:border-[#714dff] disabled:cursor-not-allowed'>
                    <span className='w-6 md:w-7 h-6 md:h-7 flex text-[#714dff] text-[16px] md:text-[18px] justify-center items-center bg-[#f0ecff] rounded-full'>
                      <GiKneeCap />
                    </span>
                    <p className='line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500 break-word'>{promtThree}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='scrollbarSet flex flex-col space-y-4 overflow-y-auto md:mt-2 mb-24 flex-1 p-4'>
              {messages.map((msg, index) => (
                <div key={index} className={`flex max-w-[80%] px-6 py-4 text-sm md:text-[1rem] font-[400] leading-[1.4rem] sm:leading-[1.3rem] md:leading-[1.5rem] ${msg.role === "user" ? 'self-end text-[rgba(0,0,0,0.80)] bg-[rgba(0,0,0,0.04)]' : 'text-[#fff] bg-[#714dff] mt-[20px]'}`}
                  style={{ borderRadius: msg.role === "user" ? "10px 10px 0px 10px" : "10px 10px 10px 0px" }}>
                  <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                </div>
              ))}
              {isLoading && (
                <div className='text-[1rem] bg-[#714dff] text-[#fff] font-[400] leading-[1.8] w-[80px] h-[50px] flex justify-center items-center' style={{ borderRadius: "10px 10px 10px 0px" }}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ background: "none", display: "block", shapeRendering: "auto", margin: "10px 25px" }} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="84" cy="50" r="10" fill="#ffffff">
                      <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                      <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
                    </circle><circle cx="16" cy="50" r="10" fill="#ffffff">
                      <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;1" values="0;10" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                      <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
                    </circle><circle cx="50" cy="50" r="10" fill="#ffffff">
                      <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;1" values="0;10" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                      <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
                    </circle><circle cx="84" cy="50" r="10" fill="#ffffff">
                      <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;1" values="0;10" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                      <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
                    </circle><circle cx="16" cy="50" r="10" fill="#ffffff">
                      <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                      <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff" begin="0s"></animate>
                    </circle>
                  </svg>
       

                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )
        }

        <div className="absolute bottom-0 w-full flex justify-center items-center md:h-[100px] h-[70px] bg-white">
          <form onSubmit={handleSendMessage} className='mx-auto w-full flex items-center justify-between py-2 px-4 rounded-[26px] border-[2px] border-[#714dff]'>
            <div className='text-[22px] text-gray-600 hover:cursor-pointer hover:text-gray-800' onClick={handleDeleteMessages} title="Clear Chat">
              <RiDeleteBin6Line />
            </div>
            <div className='w-[78%] md:w-[84%]'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                placeholder='Ask me anything...'
                className='w-full text-[14px] md:text-[15px] font-medium border-none outline-none bg-transparent'
              />
            </div>
            <div>
              <button className={`${input.length < 1 ? "bg-[#f0ecff] text-[#714dff]" : "bg-[#714dff] text-[#fff]"} px-2 text-[18px] rounded-full py-2 ease-in duration-300 hover:bg-[#714dff] hover:text-[#fff]`}>
                <IoIosSend />
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default ChatBot;
