import { useState } from "react";

const Shortner = (result: any) => {
  const [Url, setUrl] = useState(""); //useState hook to store input longURL
  const longUrl = Url.trim();

  //URL validator
  function isValidUrl(string: any) {
    try {
      if (string.includes(" ")) {
        return false;
      }
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  //function to handle the submitted form data
  const handleLink = async (e: any) => {
    e.preventDefault();
    console.log(longUrl);

    //data fetching using Fetch API
    try {
      if (!isValidUrl(longUrl)) {
        alert("Invalid URL! Try again..");
      } else {
        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        });

        const result = await response.json();
        console.log(result.shortUrl);
        // Handle success scenario
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error scenario
    }
  };

  return (
    <div className=" border border-black rounded-xl p-2 max-w-xl h-fit">
      <form onSubmit={handleLink} className="w-full">
        <input
          type="text"
          placeholder="Paste your long URL"
          className=" input input-bordered w-full rounded-xl bg-transparent border-black"
          value={longUrl}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-between w-full mt-5">
          <div className="badge badge-outline w-full py-6 rounded-xl	">
            default
          </div>
          <button className="rounded-xl bg-orange-500 text-black btn btn-xl sm:btn-sm md:btn-md lg:btn-md ml-2">
            COPY
          </button>
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-orange-500 text-black btn btn-xl sm:btn-sm md:btn-md lg:btn-md w-full"
        >
          Get your Link
        </button>
      </form>
    </div>
  );
};

export default Shortner;
