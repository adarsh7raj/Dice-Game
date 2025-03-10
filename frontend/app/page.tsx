"use client";

import { useState } from "react";
import { randomBytes } from "crypto";

export default  function DiceGame() {
    const [betAmount, setBetAmount] = useState(10);
    const [balance, setBalance] = useState(1000);
    const [rollResult, setRollResult] = useState(0);
     // State to store error message

    const clientSeed = randomBytes(16).toString("hex");
    
    

    async function rollDice() {
        

            try {
                const response = await fetch("https://dice-game-ysbo.onrender.com/roll-dice", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ betAmount, clientSeed })
                });

                const data = await response.json();
                console.log(data.roll);
                setRollResult(data.roll);
                console.log(rollResult);
                setRollResult(data.roll);

                // Update balance using previous state
                setBalance(function(prevBalance){ 
                   return  data.roll >= 4 ? prevBalance + 2 * betAmount : prevBalance - betAmount
                }
                );
          
      
                
            } catch (error) {
                console.error("Error while rolling dice:", error);
            }
    
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">

            {rollResult !== null && (rollResult >= 4 ? "You Won" : "You Lost")}

            </h1>
            <p className="mb-4 text-lg">Balance: ${balance}</p>
            <p className="mb-4 text-lg">Enter Your Bet Amount</p>

            <div className="flex items-center space-x-4">
                <button
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700"
                    onClick={() => {
                        setBetAmount((prev) =>prev - 10)
                    }}
                    disabled={betAmount <= 10} // Disable button if betAmount is already 10
                >
                    -
                </button>

                <div className="border-solid border-white border-[2px]">
                    <input
                        type="number"
                        value={betAmount}
                        disabled // Disable input field
                        className="p-2 text-white bg-gray-700 rounded w-40 text-center"
                    />
                </div>

                <button
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700"
                    onClick={() => {
                        setBetAmount((prev) =>  prev + 10)
                    }}
                    disabled={betAmount >= 100} // Disable button if betAmount is already 100
                >
                    +
                </button>
            </div>

         
            <button
                className="mt-4 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-700"
                onClick={rollDice}
            >
                Roll Dice
            </button>

            {rollResult !== null && (
                <p className="mt-4 text-lg">🎲 You rolled a {rollResult}</p>
            )}
        </div>
    );
}
