
const Shortner = () => {
  return (
    <div>
        <form typeof='submit' className=' flex justify-center'>

            <input type="text" placeholder="Type here" className=" input input-bordered w-full max-w-xs rounded-xl border-black" />
            <button className=" mx-5 rounded-xl bg-orange-500 text-black btn btn-xl sm:btn-sm md:btn-md lg:btn-md">Get your Link</button>
        </form>
    </div>
  )
}

export default Shortner
