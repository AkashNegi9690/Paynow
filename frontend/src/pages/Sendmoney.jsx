import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const SendMoney = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id");
   const name = searchParams.get("name");
   const [amount,setAmount]=useState();
   const navigate=useNavigate();

   return <div class="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
         <div
            class="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
         >
            <div class="flex flex-col p-6">
               <h2 class="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div class="p-6">
               <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                     <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                  </div>
                  <h3 class="text-2xl font-semibold">{name}</h3>
               </div>
               <div class="space-y-4">
                  <div class="space-y-2">
                     <label
                        class="text-sm font-medium  "
                        for="amount"
                     >
                        Amount (in Rs)
                     </label>
                     <input
                     onChange={(e)=>{
                        setAmount(e.target.value)
                     }}
                        type="number"
                        class="no-spin-button flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        required
                     />
                  </div>
                  <button onClick={() => {
                     axios.post("https://paynow-7wln.onrender.com/api/v1/account/transfer",{
                        to:id,
                        amount
                     },{
                        headers:{
                           Authorization:"Bearer "+localStorage.getItem("token")
                        }
                     }).then(response=>{
                        if(response.status === 200){
                           navigate("/dashboard")
                        }
                     })
                  }} class="justify-center rounded-md text-sm font-medium   h-10 px-4 py-2 w-full bg-green-500 text-white">
                     Initiate Transfer
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
}