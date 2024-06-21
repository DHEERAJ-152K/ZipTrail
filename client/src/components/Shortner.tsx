import { useState } from "react";

const Shortner = () => {
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
        console.log(result);
        // Handle success scenario
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error scenario
    }
  };

  return (
    <div>
      <form onSubmit={handleLink} className=" flex justify-center">
        <input
          type="text"
          placeholder="Paste your long URL"
          className=" input input-bordered w-full max-w-xs rounded-xl border-black"
          value={longUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className=" mx-5 rounded-xl bg-orange-500 text-black btn btn-xl sm:btn-sm md:btn-md lg:btn-md"
        >
          Get your Link
        </button>
      </form>
    </div>
  );
};

export default Shortner;
