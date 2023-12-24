export enum USER_ROLE {
  ADMIN = "admin",
  PERFORMER = "performer",
}

// <div className="max-w-[1100px] mx-auto">
// <div className="flex justify-center items-center">
//   <div>
//     <p className="text-xl font-semibold text-gray-600 flex gap-1 items-center my-5 capitalize">
//       <span>Q:</span>
//       {text}
//     </p>
//     <ul>
//       <li>
//         {options.map((option: string, index: number) => (
//           <p
//             key={index}
//             className={`px-3 py-2 rounded mb-1 w-[250px] border border-gray-400 hover:bg-gray-100 hover:shadow cursor-pointer ${
//               selectedOptions.includes(index)
//                 ? "bg-green-300 hover:bg-green-300"
//                 : ""
//             }
//           ${
//             submitButtonDisabled
//               ? "cursor-not-allowed opacity-50"
//               : ""
//           }`}
//             onClick={() => handleOptionSelect(index)}
//           >
//             {option}
//           </p>
//         ))}
//       </li>
//     </ul>

//    <div className="flex justify-between w-[250px] mt-5">
//       <button
//         className={`px-4 py-2 bg-green-500 hover:bg-green-600 transition rounded ${
//           submitButtonDisabled ? "cursor-not-allowed opacity-50" : ""
//         }
//       ${quizQuestions.length === 1 ? "w-full" : ""}
//       `}
//         onClick={handleQuizSubmit}
//       >
//         Submit
//       </button>
//       <button
//         className={`px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded ${
//           quizQuestions.length === 1 ? "hidden" : ""
//         }`}
//         onClick={handleGetNextQuestion}
//       >
//         Next
//       </button>
//     </div>

//     {submitted && (
//       <div className="mt-5">
//         {corrected ? (
//           <div className="w-[200px]">
//             <p className="text-xl font-semibold">Congratulations!</p>
//             <p>Your Answer is Correct</p>
//           </div>
//         ) : (
//           <div>
//             <p className="text-sm text-red-600">
//               Your Answer is wrong
//             </p>
//             <p className="text-xl font-semibold">Explanation:</p>
//             <p>{explanation}</p>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// </div>
// </div>
