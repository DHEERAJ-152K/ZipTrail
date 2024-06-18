import { useState } from "react"


const Shortner = () => {
const[longUrl, setLongUrl]= useState('');

const handleLink=async(e: any)=>{
  e.preventDefault();
  console.log(longUrl);
}

  return (
    <div>
        <form onSubmit={handleLink} className=' flex justify-center'>

            <input type="text" placeholder="Paste your long URL" 
            className=" input input-bordered w-full max-w-xs rounded-xl border-black"
            value={longUrl} onChange={e => setLongUrl(e.target.value)}
            />
            <button className=" mx-5 rounded-xl bg-orange-500 text-black btn btn-xl sm:btn-sm md:btn-md lg:btn-md">Get your Link</button>
        </form>
    </div>
  )
}

export default Shortner
